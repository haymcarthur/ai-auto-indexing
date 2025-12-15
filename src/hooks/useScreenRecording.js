import { useState, useRef, useCallback } from 'react';

/**
 * Custom hook for screen and audio recording
 * @returns {Object} Recording state and control methods
 */
export function useScreenRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingBlob, setRecordingBlob] = useState(null);
  const [error, setError] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [recordingStopped, setRecordingStopped] = useState(false);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const partialRecordingsRef = useRef([]);
  const recordingBlobRef = useRef(null); // Store blob in ref for synchronous access

  /**
   * Request permission and start recording
   */
  const startRecording = useCallback(async () => {
    try {
      setError(null);
      setRecordingStopped(false);
      chunksRef.current = []; // Reset chunks for new recording session
      recordingBlobRef.current = null; // Reset blob ref

      // Request screen capture
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          mediaSource: 'screen',
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 }
        },
        audio: false // Screen audio, not system audio
      });

      // Request microphone audio
      let audioStream = null;
      try {
        audioStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100
          },
          video: false
        });
      } catch (audioError) {
        console.warn('Microphone access denied or unavailable:', audioError);
        // Continue with screen only if microphone is not available
      }

      // Combine streams
      const tracks = [...displayStream.getVideoTracks()];
      if (audioStream) {
        tracks.push(...audioStream.getAudioTracks());
      }

      const combinedStream = new MediaStream(tracks);
      streamRef.current = combinedStream;

      // Create MediaRecorder with VP9 codec at 2.5 Mbps
      const options = {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: 2500000 // 2.5 Mbps
      };

      // Fallback to default codec if VP9 is not supported
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options.mimeType = 'video/webm';
      }

      const mediaRecorder = new MediaRecorder(combinedStream, options);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      // Handle data available event
      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          console.log('[RECORDING] Data chunk received, size:', event.data.size, 'bytes');
          chunksRef.current.push(event.data);
        }
      };

      // Handle recording stop
      mediaRecorder.onstop = () => {
        console.log('[RECORDING] MediaRecorder stopped, chunks:', chunksRef.current.length);
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        console.log('[RECORDING] Created blob, size:', blob.size, 'bytes');

        // Store in both state AND ref for synchronous access
        recordingBlobRef.current = blob;
        setRecordingBlob(blob);
        setIsRecording(false);

        console.log('[RECORDING] Blob stored in ref and state');

        // Clean up streams
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };

      // Handle errors
      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event.error);
        setError(event.error.message);
        setIsRecording(false);
      };

      // Start recording
      console.log('[RECORDING] Starting MediaRecorder...');
      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);
      setPermissionGranted(true);
      console.log('[RECORDING] MediaRecorder started successfully');

      // Handle user stopping screen share from browser UI
      displayStream.getVideoTracks()[0].onended = () => {
        console.log('Screen sharing stopped by user');

        // Save the current recording chunks as a partial recording
        if (chunksRef.current.length > 0) {
          const partialBlob = new Blob(chunksRef.current, { type: 'video/webm' });
          partialRecordingsRef.current.push(partialBlob);
          console.log('Saved partial recording, total partials:', partialRecordingsRef.current.length);
        }

        // Stop the media recorder
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }

        // Set recording stopped state
        setRecordingStopped(true);
        setIsRecording(false);

        // Clean up streams
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };

    } catch (err) {
      console.error('Error starting recording:', err);
      let errorMessage = 'Failed to start recording';

      if (err.name === 'NotAllowedError') {
        errorMessage = 'Permission denied. Please allow screen recording to continue.';
        setPermissionGranted(false);
      } else if (err.name === 'NotFoundError') {
        errorMessage = 'No screen recording device found.';
      } else if (err.name === 'NotReadableError') {
        errorMessage = 'Screen recording device is already in use.';
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setIsRecording(false);
    }
  }, []);

  /**
   * Stop recording
   */
  const stopRecording = useCallback(() => {
    console.log('[RECORDING] stopRecording called');
    console.log('[RECORDING] MediaRecorder state:', mediaRecorderRef.current?.state);
    console.log('[RECORDING] Current chunks:', chunksRef.current.length);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      console.log('[RECORDING] Stopping MediaRecorder...');
      mediaRecorderRef.current.stop();
    } else {
      console.warn('[RECORDING] MediaRecorder not recording or not available');
    }
  }, []);

  /**
   * Reset recording state
   */
  const resetRecording = useCallback(() => {
    setRecordingBlob(null);
    recordingBlobRef.current = null;
    setError(null);
    chunksRef.current = [];
  }, []);

  /**
   * Get the current recording blob (combines all partial recordings if any)
   */
  const getRecordingBlob = useCallback(() => {
    console.log('[RECORDING] getRecordingBlob called');
    console.log('[RECORDING] recordingBlobRef:', recordingBlobRef.current ? `${recordingBlobRef.current.size} bytes` : 'null');
    console.log('[RECORDING] recordingBlob state:', recordingBlob ? `${recordingBlob.size} bytes` : 'null');
    console.log('[RECORDING] Partial recordings:', partialRecordingsRef.current.length);

    // Use ref instead of state for synchronous access
    const currentBlob = recordingBlobRef.current;

    // If we have partial recordings, combine them with the final recording
    if (partialRecordingsRef.current.length > 0 && currentBlob) {
      const allBlobs = [...partialRecordingsRef.current, currentBlob];
      console.log('[RECORDING] Combining', allBlobs.length, 'recording segments');
      return new Blob(allBlobs, { type: 'video/webm' });
    } else if (partialRecordingsRef.current.length > 0) {
      // Only partial recordings exist
      console.log('[RECORDING] Returning', partialRecordingsRef.current.length, 'partial recordings');
      return new Blob(partialRecordingsRef.current, { type: 'video/webm' });
    }

    console.log('[RECORDING] Returning recordingBlob from ref:', currentBlob ? `${currentBlob.size} bytes` : 'null');
    return currentBlob;
  }, [recordingBlob]);

  return {
    isRecording,
    recordingBlob,
    error,
    permissionGranted,
    recordingStopped,
    startRecording,
    stopRecording,
    resetRecording,
    getRecordingBlob
  };
}
