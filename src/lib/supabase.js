import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase config:', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Create a new test session for the index-creation test
 * @returns {Promise<{sessionId: string}>} The created session data
 */
export async function createTestSession() {
  // Get project status from URL parameter, default to 'planning'
  const params = new URLSearchParams(window.location.search);
  const projectStatus = params.get('status') || 'planning';

  console.log('Creating test session with status:', projectStatus);

  const { data, error} = await supabase
    .from('test_sessions')
    .insert({
      test_id: 'index-creation',
      started_at: new Date().toISOString(),
      project_status: projectStatus
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating test session:', error);
    throw error;
  }

  console.log('Test session created:', data);

  return {
    sessionId: data.id
  };
}

/**
 * Save task completion data
 * @param {string} sessionId - The test session ID
 * @param {Object} taskData - Task completion data
 * @param {number} taskData.timeSpent - Time spent in seconds
 * @param {boolean} taskData.successful - Whether task was completed successfully
 * @param {number} taskData.difficulty - Difficulty rating (1-5)
 */
export async function saveTaskCompletion(sessionId, taskData) {
  const now = new Date().toISOString();
  const startedAt = new Date(Date.now() - (taskData.timeSpent * 1000)).toISOString();

  const { data, error } = await supabase
    .from('task_completions')
    .insert({
      session_id: sessionId,
      task_id: 'A',  // Using 'A' to match database constraint
      self_reported_success: taskData.successful,
      actual_success: taskData.successful,
      difficulty_rating: taskData.difficulty,
      time_spent_seconds: taskData.timeSpent,
      started_at: startedAt,
      completed_at: now
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving task completion:', error);
    throw error;
  }

  return data;
}

/**
 * Save validation data for the task
 * @param {string} sessionId - The test session ID
 * @param {Object} validationData - Validation results
 * @param {boolean} validationData.garyAdded - Whether Gary was added correctly
 * @param {boolean} validationData.ronaldAdded - Whether Ronald was added correctly
 * @param {boolean} validationData.correctGroup - Whether both were added to Edgar's group
 * @param {boolean} validationData.correctRelationships - Whether relationships are correct
 */
export async function saveValidationData(sessionId, validationData) {
  const { data, error } = await supabase
    .from('task_validation_data')
    .insert({
      session_id: sessionId,
      task_id: 'A',  // Using 'A' to match database constraint
      validation_data: validationData
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving validation data:', error);
    throw error;
  }

  return data;
}

/**
 * Save survey responses from follow-up questions
 * @param {string} sessionId - The test session ID
 * @param {Array<Object>} responses - Array of question responses
 */
export async function saveSurveyResponses(sessionId, responses) {
  console.log('[SURVEY] Saving survey responses for session:', sessionId);
  console.log('[SURVEY] Raw responses:', responses);

  const surveyResponses = responses.map(response => ({
    session_id: sessionId,
    question_id: response.questionId,
    answer: response.answer
  }));

  console.log('[SURVEY] Formatted survey responses:', surveyResponses);

  const { data, error } = await supabase
    .from('survey_responses')
    .insert(surveyResponses)
    .select();

  console.log('[SURVEY] Insert result:', { data, error });

  if (error) {
    console.error('Error saving survey responses:', error);
    console.error('[SURVEY] Error details:', JSON.stringify(error, null, 2));
    throw error;
  }

  return data;
}

/**
 * Complete the test session
 * @param {string} sessionId - The test session ID
 * @param {string} recordingUrl - URL of the uploaded recording (optional)
 */
export async function completeTestSession(sessionId, recordingUrl = null) {
  const updateData = {
    completed_at: new Date().toISOString()
  };

  if (recordingUrl) {
    updateData.recording_url = recordingUrl;
  }

  console.log('[COMPLETE] Attempting to complete session:', sessionId);
  console.log('[COMPLETE] Update data:', updateData);

  const { data, error } = await supabase
    .from('test_sessions')
    .update(updateData)
    .eq('id', sessionId)
    .select()
    .single();

  console.log('[COMPLETE] Update result:', { data, error });
  console.log('[COMPLETE] Session completed_at after update:', data?.completed_at);

  if (error) {
    console.error('Error completing test session:', error);
    throw error;
  }

  return data;
}

/**
 * Upload screen recording to Supabase Storage
 * @param {Blob} recordingBlob - The recording blob
 * @param {string} sessionId - The test session ID
 * @returns {Promise<string>} The public URL of the uploaded recording
 */
export async function uploadRecording(recordingBlob, sessionId) {
  console.log('[UPLOAD] Starting recording upload for session:', sessionId);
  console.log('[UPLOAD] Recording blob size:', recordingBlob?.size, 'bytes');

  const fileName = `index-creation/${sessionId}_${Date.now()}.webm`;

  const { data, error } = await supabase.storage
    .from('test-recordings')
    .upload(fileName, recordingBlob, {
      contentType: 'video/webm',
      upsert: false
    });

  console.log('[UPLOAD] Upload result:', { data, error });

  if (error) {
    console.error('Error uploading recording:', error);
    throw error;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('test-recordings')
    .getPublicUrl(fileName);

  console.log('[UPLOAD] Public URL generated:', publicUrl);

  return publicUrl;
}

/**
 * Update test session with recording permission status
 * @param {string} sessionId - The test session ID
 * @param {boolean} granted - Whether recording permission was granted
 */
export async function updateRecordingPermission(sessionId, granted) {
  // Note: recording_permitted column doesn't exist in the schema
  // This is a no-op for now, but we keep the function for API compatibility
  console.log('[RECORDING] Recording permission status:', granted, 'for session:', sessionId);
  return { id: sessionId };
}
