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
  const recordingBlobRef = useRef(null); // Store blob in ref for synchronous access
  const stopResolveRef = useRef(null); // Resolves the stopRecording() Promise when onstop fires

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
          chunksRef.current.push(event.data);
        }
      };

      // Handle recording stop
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });

        // Store in both state AND ref for synchronous access
        recordingBlobRef.current = blob;
        setRecordingBlob(blob);
        setIsRecording(false);

        // Resolve the stopRecording() Promise (if pending)
        if (stopResolveRef.current) {
          stopResolveRef.current(blob);
          stopResolveRef.current = null;
        }

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
      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);
      setPermissionGranted(true);

      // Handle user stopping screen share from browser UI
      displayStream.getVideoTracks()[0].onended = () => {
        // Stop the media recorder — onstop will handle blob creation and
        // resolve the stopRecording() Promise. Don't manually snapshot
        // chunksRef here because onstop fires immediately after and would
        // create a duplicate blob containing the same data.
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
   * Stop recording and return a Promise that resolves with the recording blob
   * once the MediaRecorder has fully finalized (onstop has fired).
   * Safe to call even if the recorder is already stopped.
   */
  const stopRecording = useCallback(() => {
    // Already stopped (e.g. user ended screen share via browser UI) —
    // onstop already fired and set recordingBlobRef, so resolve immediately.
    if (!mediaRecorderRef.current || mediaRecorderRef.current.state !== 'recording') {
      return Promise.resolve(recordingBlobRef.current);
    }

    return new Promise((resolve) => {
      // 5-second safety timeout in case onstop never fires
      const timeout = setTimeout(() => {
        stopResolveRef.current = null;
        resolve(recordingBlobRef.current);
      }, 5000);

      stopResolveRef.current = (blob) => {
        clearTimeout(timeout);
        resolve(blob);
      };

      mediaRecorderRef.current.stop();
    });
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
   * Get the current recording blob synchronously.
   * Prefer awaiting stopRecording() to get the blob deterministically.
   */
  const getRecordingBlob = useCallback(() => {
    return recordingBlobRef.current;
  }, []);

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
