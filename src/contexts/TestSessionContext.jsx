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
      console.error('No session ID found');
      setTestComplete(true); // Show thank you screen anyway
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    // Calculate time spent and validate immediately
    const timeSpent = Math.floor((Date.now() - startTime) / 1000); // in seconds
    const task1ValidationResults = validateTask(task1CensusData);
    const task2ValidationResults = validateTask(task2CensusData);

    // Extract responses from new structure
    const { task1, task2, final, taskOrder } = allResponses;

    // Start stopping the recording — returns a Promise that resolves with
    // the blob once onstop has fully fired. Don't await here so the thank
    // you screen shows immediately.
    const recordingBlobPromise = recording.stopRecording();

    // IMMEDIATELY show thank you screen - don't make user wait for database operations
    setTestComplete(true);
    setIsSubmitting(false);

    // Do all database operations in the background (non-blocking)
    // User already sees thank you screen, so they won't retry or refresh
    const saveInBackground = async () => {
      try {
        // Wait for recording to finalize (resolves when onstop fires, not a blind timeout)
        const recordingBlob = await recordingBlobPromise;

        const isMockSession = sessionId.startsWith('mock-');

        if (isMockSession) {
          console.log('Mock session - skipping database saves');
          return;
        }

        // Parse responses
        const task1Success = task1?.find(r => r.questionId.includes('success'))?.answer;
        const task1Difficulty = parseInt(task1?.find(r => r.questionId.includes('difficulty'))?.answer || '3');
        const task1Method = task1?.[0]?.method; // 'Prompt' or 'Highlight'

        const task2Success = task2?.find(r => r.questionId.includes('success'))?.answer;
        const task2Difficulty = parseInt(task2?.find(r => r.questionId.includes('difficulty'))?.answer || '3');
        const task2Method = task2?.[0]?.method; // 'Prompt' or 'Highlight'

        const preferredMethod = final?.find(r => r.questionId === 'preferred-method')?.answer;
        const overallFeedback = final?.find(r => r.questionId === 'overall-feedback')?.answer;

        // Determine actual success for EACH task
        const task1ActualSuccess = task1ValidationResults.allPeopleAdded || false;
        const task2ActualSuccess = task2ValidationResults.allPeopleAdded || false;

        // Map method names to database-compatible task IDs
        const mapMethodToTaskId = (method) => {
          if (method === 'Prompt') return 'A';
          if (method === 'Highlight') return 'B';
          return method;
        };

        // Save Task 1 completion
        try {
          const task1SelfReported = task1Success === 'yes';
          const task1MappedId = mapMethodToTaskId(task1Method);
          await saveTaskCompletion(sessionId, {
            timeSpent: Math.floor(timeSpent / 2),
            selfReportedSuccess: task1SelfReported,
            actualSuccess: task1ActualSuccess,
            difficulty: task1Difficulty,
            taskId: task1MappedId
          });
          console.log('✅ Task 1 saved successfully');
        } catch (error) {
          console.error('❌ Error saving Task 1:', error);
        }

        // Save Task 2 completion
        try {
          const task2SelfReported = task2Success === 'yes';
          const task2MappedId = mapMethodToTaskId(task2Method);
          await saveTaskCompletion(sessionId, {
            timeSpent: Math.floor(timeSpent / 2),
            selfReportedSuccess: task2SelfReported,
            actualSuccess: task2ActualSuccess,
            difficulty: task2Difficulty,
            taskId: task2MappedId
          });
          console.log('✅ Task 2 saved successfully');
        } catch (error) {
          console.error('❌ Error saving Task 2:', error);
        }

        // Save survey responses
        try {
          if (preferredMethod && overallFeedback) {
            const mappedPreferredMethod = mapMethodToTaskId(preferredMethod);
            await saveSurveyResponses(sessionId, {
              preferredMethod: mappedPreferredMethod,
              overallFeedback: overallFeedback
            });
            console.log('✅ Survey responses saved successfully');
          } else {
            console.warn('⚠️ Survey responses missing');
          }
        } catch (error) {
          console.error('❌ Error saving survey responses:', error);
        }

        // Save validation data
        try {
          const validationDataWithResponses = {
            task1Validation: task1ValidationResults,
            task2Validation: task2ValidationResults,
            surveyResponses: [...task1, ...task2, ...final]
          };
          await saveValidationData(sessionId, validationDataWithResponses);
          console.log('✅ Validation data saved successfully');
        } catch (error) {
          console.error('❌ Error saving validation data:', error);
        }

        // Upload recording (blob was captured when onstop fired, above)
        let recordingUrl = null;
        if (recordingBlob) {
          try {
            recordingUrl = await uploadRecording(recordingBlob, sessionId);
            console.log('✅ Recording uploaded successfully');
          } catch (error) {
            console.error('❌ Failed to upload recording:', error);
          }
        } else {
          console.warn('⚠️ No recording blob available — permission may have been denied');
        }

        // Complete session
        try {
          await completeTestSession(sessionId, recordingUrl);
          console.log('✅ Test session completed successfully');
        } catch (error) {
          console.error('❌ Error completing test session:', error);
        }

        console.log('🎉 All background saves completed');

      } catch (error) {
        console.error('❌ Background save process failed:', error);
      }
    };

    // Fire and forget - don't await this
    saveInBackground();

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
