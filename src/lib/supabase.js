import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Create a new test session for the index-creation test
 * @returns {Promise<{sessionId: string}>} The created session data
 */
export async function createTestSession() {
  // Get project status from URL parameter, default to 'planning'
  const params = new URLSearchParams(window.location.search);
  const projectStatus = params.get('status') || 'planning';

  const { data, error} = await supabase
    .from('test_sessions')
    .insert({
      test_id: 'ai-auto-index',
      started_at: new Date().toISOString(),
      project_status: projectStatus
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating test session:', error);
    throw error;
  }

  return {
    sessionId: data.id
  };
}

/**
 * Save task completion data
 * @param {string} sessionId - The test session ID
 * @param {Object} taskData - Task completion data
 * @param {number} taskData.timeSpent - Time spent in seconds
 * @param {boolean} taskData.selfReportedSuccess - Whether user reported task as successful
 * @param {boolean} taskData.actualSuccess - Whether task was actually completed successfully (validated)
 * @param {number} taskData.difficulty - Difficulty rating (1-5)
 * @param {string} taskData.taskId - Task ID (e.g., 'Prompt', 'Highlight', 'A', 'B', etc.)
 */
export async function saveTaskCompletion(sessionId, taskData) {
  const now = new Date().toISOString();
  const startedAt = new Date(Date.now() - (taskData.timeSpent * 1000)).toISOString();

  const { data, error } = await supabase
    .from('task_completions')
    .insert({
      session_id: sessionId,
      task_id: taskData.taskId || 'A',  // Use provided taskId or default to 'A'
      self_reported_success: taskData.selfReportedSuccess ?? taskData.successful ?? false,
      actual_success: taskData.actualSuccess ?? taskData.successful ?? false,
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
 * @param {Object} surveyData - Survey data with preferredMethod and overallFeedback
 */
export async function saveSurveyResponses(sessionId, surveyData) {
  // Database schema uses specific columns: preferred_method, preference_reason
  // (same structure as highlights test)
  const { data, error } = await supabase
    .from('survey_responses')
    .insert({
      session_id: sessionId,
      preferred_method: surveyData.preferredMethod,
      preference_reason: surveyData.overallFeedback
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving survey responses:', error);
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

  const { data, error } = await supabase
    .from('test_sessions')
    .update(updateData)
    .eq('id', sessionId)
    .select()
    .single();

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
  const fileName = `ai-auto-index/${sessionId}_${Date.now()}.webm`;

  const { data, error } = await supabase.storage
    .from('test-recordings')
    .upload(fileName, recordingBlob, {
      contentType: 'video/webm',
      upsert: false
    });

  if (error) {
    console.error('Error uploading recording:', error);
    throw error;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('test-recordings')
    .getPublicUrl(fileName);

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
  return { id: sessionId };
}
