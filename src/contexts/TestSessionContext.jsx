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
        console.log('Initializing test session...');
        const session = await createTestSession();
        setSessionId(session.sessionId);
        setStartTime(Date.now());
        console.log('Test session initialized successfully:', session);
      } catch (error) {
        console.error('Failed to initialize test session:', error);
        console.error('Error details:', error.message, error);

        // Create a mock session ID for testing without database
        console.warn('Using mock session ID for testing');
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
        console.log('Recording permission updated');
      } catch (error) {
        console.error('Failed to update recording permission:', error);
      }
    }
  }, [sessionId]);

  // Handle task completion with survey responses (called when user completes all questions)
  const handleTaskComplete = useCallback(async (censusData, validateTask, responses) => {
    console.log('handleTaskComplete called', { sessionId, isSubmitting });
    console.log('Survey responses received:', responses);

    if (!sessionId) {
      alert('Error: No session ID found. Please refresh and try again.');
      return;
    }

    if (isSubmitting) {
      console.log('Already submitting, ignoring duplicate request');
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate time spent
      const timeSpent = Math.floor((Date.now() - startTime) / 1000); // in seconds

      // Validate the task
      const validationResults = validateTask(censusData);
      console.log('Validation results:', validationResults);

      // Determine task success based on validation and user response
      const taskSuccessResponse = responses.find(r => r.questionId === 'task-success');
      const difficultyResponse = responses.find(r => r.questionId === 'difficulty-rating');

      console.log('Task success response:', taskSuccessResponse);
      console.log('Difficulty response:', difficultyResponse);

      const successful = taskSuccessResponse?.answer === 'yes' &&
                        validationResults.garyAdded &&
                        validationResults.ronaldAdded;

      console.log('Calculated successful:', successful);

      // Stop recording
      recording.stopRecording();

      // Wait a moment for recording to finalize
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Save to database (with error handling to not block completion)
      const isMockSession = sessionId.startsWith('mock-');

      console.log('Is mock session:', isMockSession);

      if (!isMockSession) {
        try {
          // Save task completion
          console.log('Saving task completion...');
          await saveTaskCompletion(sessionId, {
            timeSpent,
            successful,
            difficulty: parseInt(difficultyResponse?.answer || '3')
          });

          // Save validation data with survey responses included in JSON
          console.log('Saving validation data with survey responses...');
          const validationDataWithResponses = {
            ...validationResults,
            surveyResponses: responses // Include survey responses in the JSON
          };
          await saveValidationData(sessionId, validationDataWithResponses);

          // Upload recording if available
          let recordingUrl = null;
          const recordingBlob = recording.getRecordingBlob();
          console.log('Recording blob available:', !!recordingBlob, 'Size:', recordingBlob?.size);

          if (recordingBlob) {
            try {
              console.log('Uploading recording...');
              recordingUrl = await uploadRecording(recordingBlob, sessionId);
              console.log('Recording uploaded successfully! URL:', recordingUrl);
            } catch (uploadError) {
              console.error('Failed to upload recording:', uploadError);
            }
          } else {
            console.warn('No recording blob available - recording may not have been captured');
          }

          // Complete session
          console.log('Completing test session...');
          await completeTestSession(sessionId, recordingUrl);
          console.log('Test session data saved to database');
        } catch (dbError) {
          console.error('Failed to save to database:', dbError);
          console.log('Continuing with local data only');
        }
      } else {
        console.log('Mock session - skipping database save');
        console.log('Survey responses:', responses);
        console.log('Validation results:', validationResults);
        console.log('Time spent:', timeSpent, 'seconds');
      }

      console.log('Test session completed successfully');
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
