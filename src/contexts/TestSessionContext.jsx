import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useScreenRecording } from '../hooks/useScreenRecording';
import {
  createTestSession,
  saveTaskCompletion,
  saveValidationData,
  saveSurveyResponses,
  completeTestSession,
  uploadRecording,
  updateRecordingPermission
} from '../lib/supabase';

const TestSessionContext = createContext(null);

/**
 * Provider for test session state and operations
 */
export function TestSessionProvider({ children }) {
  const [sessionId, setSessionId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [testComplete, setTestComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recording = useScreenRecording();

  // Initialize test session
  useEffect(() => {
    const initSession = async () => {
      try {
        const session = await createTestSession();
        setSessionId(session.sessionId);
        setStartTime(Date.now());
      } catch (error) {
        console.error('Failed to initialize test session:', error);

        // Create a mock session ID for testing without database
        setSessionId('mock-session-' + Date.now());
        setStartTime(Date.now());
      }
    };

    initSession();
  }, []);

  // Handle recording start
  const handleRecordingStart = useCallback(async () => {
    if (sessionId) {
      try {
        await updateRecordingPermission(sessionId, true);
      } catch (error) {
        console.error('Failed to update recording permission:', error);
      }
    }
  }, [sessionId]);

  // Handle task completion with survey responses (called when user completes all questions)
  const handleTaskComplete = useCallback(async (task1CensusData, task2CensusData, validateTask, allResponses) => {
    if (!sessionId) {
      alert('Error: No session ID found. Please refresh and try again.');
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate time spent
      const timeSpent = Math.floor((Date.now() - startTime) / 1000); // in seconds

      // Validate BOTH tasks separately
      const task1ValidationResults = validateTask(task1CensusData);
      const task2ValidationResults = validateTask(task2CensusData);

      // Extract responses from new structure
      const { task1, task2, final, taskOrder } = allResponses;

      // Parse task1 responses
      const task1Success = task1?.find(r => r.questionId.includes('success'))?.answer;
      const task1Difficulty = parseInt(task1?.find(r => r.questionId.includes('difficulty'))?.answer || '3');
      const task1Method = task1?.[0]?.method; // 'Prompt' or 'Highlight'

      // Parse task2 responses
      const task2Success = task2?.find(r => r.questionId.includes('success'))?.answer;
      const task2Difficulty = parseInt(task2?.find(r => r.questionId.includes('difficulty'))?.answer || '3');
      const task2Method = task2?.[0]?.method; // 'Prompt' or 'Highlight'

      // Parse final responses
      const preferredMethod = final?.find(r => r.questionId === 'preferred-method')?.answer;
      const overallFeedback = final?.find(r => r.questionId === 'overall-feedback')?.answer;

      // Stop recording
      recording.stopRecording();

      // Wait a moment for recording to finalize
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Save to database (with error handling to not block completion)
      const isMockSession = sessionId.startsWith('mock-');

      if (!isMockSession) {
        // Determine actual success for EACH task based on separate validations
        const task1ActualSuccess = task1ValidationResults.allPeopleAdded || false;
        const task2ActualSuccess = task2ValidationResults.allPeopleAdded || false;

        let recordingUrl = null;

        // Collect any errors to report to user
        const errors = [];

        // Map method names to database-compatible task IDs
        // Database constraint only allows 'A', 'B', 'C'
        const mapMethodToTaskId = (method) => {
          if (method === 'Prompt') return 'A';
          if (method === 'Highlight') return 'B';
          return method; // fallback
        };

        // Save Task 1 completion with Task 1's validation results
        try {
          const task1SelfReported = task1Success === 'yes';
          const task1MappedId = mapMethodToTaskId(task1Method);
          await saveTaskCompletion(sessionId, {
            timeSpent: Math.floor(timeSpent / 2), // Approximate half time for task 1
            selfReportedSuccess: task1SelfReported,
            actualSuccess: task1ActualSuccess, // Use Task 1's validation result
            difficulty: task1Difficulty,
            taskId: task1MappedId // Map 'Prompt' → 'A', 'Highlight' → 'B'
          });
        } catch (error) {
          console.error('Error saving Task 1:', error);
          errors.push(`Task 1: ${error.message}`);
        }

        // Save Task 2 completion with Task 2's validation results
        try {
          const task2SelfReported = task2Success === 'yes';
          const task2MappedId = mapMethodToTaskId(task2Method);
          await saveTaskCompletion(sessionId, {
            timeSpent: Math.floor(timeSpent / 2), // Approximate half time for task 2
            selfReportedSuccess: task2SelfReported,
            actualSuccess: task2ActualSuccess, // Use Task 2's validation result
            difficulty: task2Difficulty,
            taskId: task2MappedId // Map 'Prompt' → 'A', 'Highlight' → 'B'
          });
        } catch (error) {
          console.error('Error saving Task 2:', error);
          errors.push(`Task 2: ${error.message}`);
        }

        // Save survey responses to survey_responses table
        try {
          // Only save if we have valid responses
          if (preferredMethod && overallFeedback) {
            // Map preferred method to database-compatible value
            const mappedPreferredMethod = mapMethodToTaskId(preferredMethod);

            await saveSurveyResponses(sessionId, {
              preferredMethod: mappedPreferredMethod, // Map 'Prompt' → 'A', 'Highlight' → 'B'
              overallFeedback: overallFeedback
            });
          } else {
            errors.push('Survey responses missing');
          }
        } catch (error) {
          console.error('Error saving survey responses:', error);
          errors.push(`Survey: ${error.message}`);
        }

        // Show errors to user if any occurred
        if (errors.length > 0) {
          console.error('SAVE ERRORS:', errors);
          alert('Some data may not have been saved:\n' + errors.join('\n'));
        }

        // Save validation data with all survey responses included in JSON
        try {
          const validationDataWithResponses = {
            task1Validation: task1ValidationResults,
            task2Validation: task2ValidationResults,
            surveyResponses: [...task1, ...task2, ...final] // Include all survey responses in the JSON
          };
          await saveValidationData(sessionId, validationDataWithResponses);
        } catch (error) {
          console.error('Error saving validation data:', error);
        }

        // Upload recording if available
        const recordingBlob = recording.getRecordingBlob();

        if (recordingBlob) {
          try {
            recordingUrl = await uploadRecording(recordingBlob, sessionId);
          } catch (uploadError) {
            console.error('Failed to upload recording:', uploadError);
          }
        }

        // ALWAYS complete session, even if some saves failed
        try {
          await completeTestSession(sessionId, recordingUrl);
        } catch (error) {
          console.error('Error completing test session:', error);
          alert('Warning: Your responses may not have been saved. Please contact support.');
        }
      }

      setTestComplete(true);

    } catch (error) {
      console.error('Failed to complete test:', error);
      alert('There was an error submitting your responses. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [sessionId, startTime, recording, isSubmitting]);

  const value = {
    sessionId,
    recording,
    testComplete,
    isSubmitting,
    handleRecordingStart,
    handleTaskComplete
  };

  return (
    <TestSessionContext.Provider value={value}>
      {children}
    </TestSessionContext.Provider>
  );
}

/**
 * Hook to use test session context
 */
export function useTestSession() {
  const context = useContext(TestSessionContext);
  if (!context) {
    throw new Error('useTestSession must be used within a TestSessionProvider');
  }
  return context;
}
