import { useState, useEffect } from 'react';
import { Button } from "../../ux-zion-library/src/components/Button";
import { spacing } from "../../ux-zion-library/src/tokens/spacing";
import { colors } from "../../ux-zion-library/src/tokens/colors";
import { useTestSession } from '../contexts/TestSessionContext';

/**
 * Instruction panel component for user testing
 * @param {Object} props
 * @param {Function} props.onRecordingStart - Callback when recording starts
 * @param {Function} props.onTaskComplete - Callback when user indicates task is complete
 * @param {boolean} props.isRecording - Whether recording is active
 * @param {string} props.recordingError - Error message from recording
 * @param {Function} props.startRecording - Function to start recording
 * @param {number} props.currentTask - Current task number (1 or 2)
 */
export function InstructionPanel({
  onRecordingStart,
  onTaskComplete,
  isRecording,
  recordingError,
  startRecording,
  recordingStopped,
  currentTask = 1
}) {
  const { isSubmitting } = useTestSession();
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [recordingAttempted, setRecordingAttempted] = useState(false);
  const [hasStartedTask, setHasStartedTask] = useState(false);
  const [taskOrder] = useState(() => Math.random() < 0.5 ? ['Prompt', 'Highlight'] : ['Highlight', 'Prompt']);
  const [responses, setResponses] = useState({
    task1Success: null,
    task1Difficulty: null,
    task2Success: null,
    task2Difficulty: null,
    preferredMethod: null,
    overallFeedback: ''
  });
  const [errors, setErrors] = useState({});
  // Store all collected responses to submit at the end
  const [collectedResponses, setCollectedResponses] = useState({
    task1: null,
    task2: null,
    final: null
  });

  // Auto-advance to Task 1 after recording enabled
  useEffect(() => {
    if (isRecording && currentStep === 0) {
      setCurrentStep(1);
    }
  }, [isRecording, currentStep]);

  // Reset panel when task changes
  useEffect(() => {
    if (currentTask === 2) {
      // Reset to Task 2 instructions (step 4)
      setCurrentStep(4);
      setIsOpen(true);
      setHasStartedTask(false);
      setErrors({});
    }
  }, [currentTask]);

  // Force panel open when recording stops
  useEffect(() => {
    if (recordingStopped) {
      setIsOpen(true);
    }
  }, [recordingStopped]);

  // Handle recording start
  const handleStartRecording = async () => {
    setRecordingAttempted(true);
    await startRecording();
  };

  // Update response for questions
  const updateResponse = (field, value) => {
    setResponses(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error for this field
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  // Handle moving to questions
  const handleStartQuestions = () => {
    setIsOpen(true);
    // Move to appropriate question based on current task
    if (currentStep === 1) {
      setCurrentStep(2); // Task 1 Q1
    } else if (currentStep === 4) {
      setCurrentStep(5); // Task 2 Q1
    }
  };

  // Handle next question
  const handleNextQuestion = () => {
    const step = currentStep;

    // Check if recording is still active before allowing any action
    if (!isRecording || recordingStopped) {
      alert('Recording is not active. Please restart the recording before continuing.');
      return;
    }

    // Validate current question
    const newErrors = {};
    if (step === 2 && responses.task1Success === null) {
      newErrors.task1Success = 'Please select an option';
    } else if (step === 3 && responses.task1Difficulty === null) {
      newErrors.task1Difficulty = 'Please select a difficulty rating';
    } else if (step === 5 && responses.task2Success === null) {
      newErrors.task2Success = 'Please select an option';
    } else if (step === 6 && responses.task2Difficulty === null) {
      newErrors.task2Difficulty = 'Please select a difficulty rating';
    } else if (step === 7 && responses.preferredMethod === null) {
      newErrors.preferredMethod = 'Please select a method';
    } else if (step === 8 && responses.overallFeedback.trim() === '') {
      newErrors.overallFeedback = 'Please provide a response';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If on Task 1 Q2 (step 3), store Task 1 responses and notify parent
    if (step === 3) {
      const task1Responses = [
        {
          questionId: `task1-${taskOrder[0].toLowerCase()}-success`,
          questionText: 'Did you complete the task successfully?',
          answer: responses.task1Success,
          method: taskOrder[0]
        },
        {
          questionId: `task1-${taskOrder[0].toLowerCase()}-difficulty`,
          questionText: 'How difficult was this task?',
          answer: responses.task1Difficulty.toString(),
          method: taskOrder[0]
        }
      ];

      // Store Task 1 responses for later submission
      setCollectedResponses(prev => ({ ...prev, task1: task1Responses }));

      // Notify parent to switch to Task 2 (but don't submit data yet)
      if (onTaskComplete) {
        onTaskComplete(task1Responses, false); // false = don't save yet
      }
      return;
    }

    // If on last final question (step 8), submit ALL responses (Task 1, Task 2, and final questions)
    if (step === 8) {
      const task2Responses = [
        {
          questionId: `task2-${taskOrder[1].toLowerCase()}-success`,
          questionText: 'Did you complete the task successfully?',
          answer: responses.task2Success,
          method: taskOrder[1]
        },
        {
          questionId: `task2-${taskOrder[1].toLowerCase()}-difficulty`,
          questionText: 'How difficult was this task?',
          answer: responses.task2Difficulty.toString(),
          method: taskOrder[1]
        }
      ];

      const finalResponses = [
        {
          questionId: 'preferred-method',
          questionText: 'Which method did you prefer?',
          answer: responses.preferredMethod
        },
        {
          questionId: 'overall-feedback',
          questionText: 'What would you change about this experience overall?',
          answer: responses.overallFeedback
        }
      ];

      // Submit ALL responses together: Task 1, Task 2, and final questions
      const allResponses = {
        task1: collectedResponses.task1,
        task2: task2Responses,
        final: finalResponses,
        taskOrder: taskOrder // Include task order for reference
      };

      if (onTaskComplete) {
        onTaskComplete(allResponses, true); // true = save now
      }
    } else {
      // Move to next question
      setCurrentStep(step + 1);
    }
  };

  // Handle start/continue task
  const handleStartTask = () => {
    setHasStartedTask(true);
    setIsOpen(false);
  };

  // Effect to call onRecordingStart when recording begins
  useEffect(() => {
    if (isRecording && onRecordingStart) {
      onRecordingStart();
    }
  }, [isRecording, onRecordingStart]);

  const steps = [
    // Step 0: Introduction
    {
      title: 'Welcome to the Index Creation Study',
      content: (
        <div>
          <p style={{ marginBottom: spacing.xs }}>
            Thank you for participating in this study. You will be testing two different methods that use AI to help you index names on a historical document.
          </p>
          <div style={{
            padding: spacing.sm,
            marginBottom: spacing.sm,
            backgroundColor: colors.blue.blue00,
            border: `2px solid ${colors.blue.blue60}`,
            borderRadius: '4px'
          }}>
            <p style={{ marginBottom: spacing.xs, fontWeight: 600, fontSize: '15px' }}>
              ⚠️ Screen Recording Required
            </p>
            <p style={{ marginBottom: 0, fontSize: '14px', color: colors.gray.gray70 }}>
              You must enable screen and audio recording to participate. Click the button below to grant permission.
            </p>
          </div>
          {recordingError && (
            <div style={{
              padding: spacing.xs,
              marginBottom: spacing.xs,
              backgroundColor: colors.danger.danger02,
              border: `1px solid ${colors.danger.danger60}`,
              borderRadius: '4px',
              color: colors.danger.danger60
            }}>
              <strong>Error:</strong> {recordingError}
            </div>
          )}
          {isRecording && (
            <div style={{
              padding: spacing.xs,
              marginBottom: spacing.xs,
              backgroundColor: colors.green.green02,
              border: `1px solid ${colors.green.green60}`,
              borderRadius: '4px',
              color: colors.green.green60
            }}>
              <strong>Recording active</strong> - You may now proceed
            </div>
          )}
          <div style={{ marginTop: spacing.sm }}>
            {!isRecording && (
              <Button
                variant="blue"
                emphasis="high"
                onClick={handleStartRecording}
              >
                Enable Screen Recording
              </Button>
            )}
          </div>
        </div>
      )
    },
    // Step 1: Task 1 Instructions
    {
      title: `${taskOrder[0]} Method`,
      content: (
        <div>
          <p style={{ marginBottom: spacing.sm }}>
            You have found your ancestor "John Ockerman" on this Kentucky Census Record along with 3 other John Ockermans. Your ancestor is married to Reamy and has 4 children. Your task is to use this method to index John along with his wife and 4 children.
          </p>
          <p style={{ marginBottom: spacing.sm, fontSize: '14px', color: colors.gray.gray70 }}>
            While there is AI that can assist with this task, the AI can get the information wrong so make sure you double check all of the details to make sure they are captured correctly.
          </p>
          <p style={{ marginBottom: spacing.sm, fontSize: '14px', color: colors.gray.gray60 }}>
            <strong>Tip:</strong> You can reopen this panel at any time by clicking the tab on the left side.
          </p>
        </div>
      )
    },
    // Step 2: Task 1 Question 1
    {
      title: 'Task 1 - Question 1 of 2',
      content: (
        <div>
          <label style={{
            display: 'block',
            marginBottom: spacing.xs,
            fontWeight: 600,
            fontSize: '15px'
          }}>
            Did you complete the task successfully?
            <span style={{ color: colors.red.red60 }}>*</span>
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xxs }}>
            {[
              { value: 'yes', label: 'Yes, I completed it' },
              { value: 'partially', label: 'Partially' },
              { value: 'no', label: 'No, I did not complete it' }
            ].map(option => (
              <label
                key={option.value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.xxs,
                  padding: spacing.xs,
                  border: `1px solid ${responses.task1Success === option.value ? colors.blue.blue60 : colors.gray.gray10}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  backgroundColor: responses.task1Success === option.value ? colors.blue.blue00 : 'transparent'
                }}
              >
                <input
                  type="radio"
                  name="task1Success"
                  value={option.value}
                  checked={responses.task1Success === option.value}
                  onChange={(e) => updateResponse('task1Success', e.target.value)}
                  style={{ cursor: 'pointer' }}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          {errors.task1Success && (
            <p style={{ color: colors.red.red60, fontSize: '13px', marginTop: spacing.xxs }}>
              {errors.task1Success}
            </p>
          )}
        </div>
      )
    },
    // Step 3: Task 1 Question 2
    {
      title: 'Task 1 - Question 2 of 2',
      content: (
        <div>
          <label style={{
            display: 'block',
            marginBottom: spacing.xs,
            fontWeight: 600,
            fontSize: '15px'
          }}>
            How difficult was this task?
            <span style={{ color: colors.red.red60 }}>*</span>
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
            {[
              { value: 1, label: 'Very difficult' },
              { value: 2, label: 'Difficult' },
              { value: 3, label: 'Medium' },
              { value: 4, label: 'Easy' },
              { value: 5, label: 'Very easy' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => updateResponse('task1Difficulty', option.value)}
                style={{
                  width: '100%',
                  padding: spacing.sm,
                  border: `2px solid ${responses.task1Difficulty === option.value ? colors.blue.blue60 : colors.gray.gray10}`,
                  borderRadius: '4px',
                  backgroundColor: responses.task1Difficulty === option.value ? colors.blue.blue00 : colors.gray.gray00,
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                  textAlign: 'left'
                }}
              >
                {option.value}. {option.label}
              </button>
            ))}
          </div>
          {errors.task1Difficulty && (
            <p style={{ color: colors.red.red60, fontSize: '13px', marginTop: spacing.xxs }}>
              {errors.task1Difficulty}
            </p>
          )}
        </div>
      )
    },
    // Step 4: Task 2 Instructions
    {
      title: `${taskOrder[1]} Method`,
      content: (
        <div>
          <p style={{ marginBottom: spacing.sm }}>
            You have found your ancestor "John Ockerman" on this Kentucky Census Record along with 3 other John Ockermans. Your ancestor is married to Reamy and has 4 children. Your task is to use this method to index John along with his wife and 4 children.
          </p>
          <p style={{ marginBottom: spacing.sm, fontSize: '14px', color: colors.gray.gray70 }}>
            While there is AI that can assist with this task, the AI can get the information wrong so make sure you double check all of the details to make sure they are captured correctly.
          </p>
          <p style={{ marginBottom: spacing.sm, fontSize: '14px', color: colors.gray.gray60 }}>
            <strong>Tip:</strong> You can reopen this panel at any time by clicking the tab on the left side.
          </p>
        </div>
      )
    },
    // Step 5: Task 2 Question 1
    {
      title: 'Task 2 - Question 1 of 2',
      content: (
        <div>
          <label style={{
            display: 'block',
            marginBottom: spacing.xs,
            fontWeight: 600,
            fontSize: '15px'
          }}>
            Did you complete the task successfully?
            <span style={{ color: colors.red.red60 }}>*</span>
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xxs }}>
            {[
              { value: 'yes', label: 'Yes, I completed it' },
              { value: 'partially', label: 'Partially' },
              { value: 'no', label: 'No, I did not complete it' }
            ].map(option => (
              <label
                key={option.value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.xxs,
                  padding: spacing.xs,
                  border: `1px solid ${responses.task2Success === option.value ? colors.blue.blue60 : colors.gray.gray10}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  backgroundColor: responses.task2Success === option.value ? colors.blue.blue00 : 'transparent'
                }}
              >
                <input
                  type="radio"
                  name="task2Success"
                  value={option.value}
                  checked={responses.task2Success === option.value}
                  onChange={(e) => updateResponse('task2Success', e.target.value)}
                  style={{ cursor: 'pointer' }}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          {errors.task2Success && (
            <p style={{ color: colors.red.red60, fontSize: '13px', marginTop: spacing.xxs }}>
              {errors.task2Success}
            </p>
          )}
        </div>
      )
    },
    // Step 6: Task 2 Question 2
    {
      title: 'Task 2 - Question 2 of 2',
      content: (
        <div>
          <label style={{
            display: 'block',
            marginBottom: spacing.xs,
            fontWeight: 600,
            fontSize: '15px'
          }}>
            How difficult was this task?
            <span style={{ color: colors.red.red60 }}>*</span>
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
            {[
              { value: 1, label: 'Very difficult' },
              { value: 2, label: 'Difficult' },
              { value: 3, label: 'Medium' },
              { value: 4, label: 'Easy' },
              { value: 5, label: 'Very easy' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => updateResponse('task2Difficulty', option.value)}
                style={{
                  width: '100%',
                  padding: spacing.sm,
                  border: `2px solid ${responses.task2Difficulty === option.value ? colors.blue.blue60 : colors.gray.gray10}`,
                  borderRadius: '4px',
                  backgroundColor: responses.task2Difficulty === option.value ? colors.blue.blue00 : colors.gray.gray00,
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                  textAlign: 'left'
                }}
              >
                {option.value}. {option.label}
              </button>
            ))}
          </div>
          {errors.task2Difficulty && (
            <p style={{ color: colors.red.red60, fontSize: '13px', marginTop: spacing.xxs }}>
              {errors.task2Difficulty}
            </p>
          )}
        </div>
      )
    },
    // Step 7: Final Question 1
    {
      title: 'Final Questions - 1 of 2',
      content: (
        <div>
          <label style={{
            display: 'block',
            marginBottom: spacing.xs,
            fontWeight: 600,
            fontSize: '15px'
          }}>
            Which method did you prefer?
            <span style={{ color: colors.red.red60 }}>*</span>
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xxs }}>
            {[
              { value: taskOrder[0], label: `${taskOrder[0]} Method` },
              { value: taskOrder[1], label: `${taskOrder[1]} Method` }
            ].map(option => (
              <label
                key={option.value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.xxs,
                  padding: spacing.xs,
                  border: `1px solid ${responses.preferredMethod === option.value ? colors.blue.blue60 : colors.gray.gray10}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  backgroundColor: responses.preferredMethod === option.value ? colors.blue.blue00 : 'transparent'
                }}
              >
                <input
                  type="radio"
                  name="preferredMethod"
                  value={option.value}
                  checked={responses.preferredMethod === option.value}
                  onChange={(e) => updateResponse('preferredMethod', e.target.value)}
                  style={{ cursor: 'pointer' }}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          {errors.preferredMethod && (
            <p style={{ color: colors.red.red60, fontSize: '13px', marginTop: spacing.xxs }}>
              {errors.preferredMethod}
            </p>
          )}
        </div>
      )
    },
    // Step 8: Final Question 2
    {
      title: 'Final Questions - 2 of 2',
      content: (
        <div>
          <label style={{
            display: 'block',
            marginBottom: spacing.xs,
            fontWeight: 600,
            fontSize: '15px'
          }}>
            What would you change about this experience overall?
            <span style={{ color: colors.red.red60 }}>*</span>
          </label>
          <textarea
            value={responses.overallFeedback}
            onChange={(e) => updateResponse('overallFeedback', e.target.value)}
            placeholder="Please share any feedback about your overall experience..."
            style={{
              width: '100%',
              minHeight: '120px',
              padding: spacing.xs,
              border: `1px solid ${errors.overallFeedback ? colors.red.red60 : colors.gray.gray10}`,
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
          {errors.overallFeedback && (
            <p style={{ color: colors.red.red60, fontSize: '13px', marginTop: spacing.xxs }}>
              {errors.overallFeedback}
            </p>
          )}
        </div>
      )
    }
  ];

  return (
    <>
      {/* Scrim overlay - renders first so z-index stacking works correctly */}
      {(currentStep === 0 || ((currentStep === 1 || currentStep === 4) && !hasStartedTask) || recordingStopped) && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
          pointerEvents: recordingStopped ? 'auto' : 'none'
        }} />
      )}

      {/* Tab when panel is closed */}
      {!isOpen && currentStep >= 1 && (
        <div
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            zIndex: 10000,
            cursor: 'pointer',
            backgroundColor: colors.blue.blue60,
            color: 'white',
            padding: `${spacing.md} ${spacing.xs}`,
            borderTopRightRadius: '4px',
            borderBottomRightRadius: '4px',
            boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            fontWeight: 600,
            fontSize: '14px',
            letterSpacing: '0.5px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.blue.blue70;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.blue.blue60;
          }}
        >
          Instructions
        </div>
      )}

      {/* Instruction panel */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '400px',
          height: '100vh',
          backgroundColor: colors.gray.gray00,
          borderRight: `1px solid ${colors.gray.gray10}`,
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: spacing.md,
            borderBottom: `1px solid ${colors.gray.gray10}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: spacing.xs
          }}>
            <h2 style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: 600,
              flex: 1
            }}>
              {steps[currentStep].title}
            </h2>
            {/* Recording indicator */}
            {isRecording && !recordingStopped && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xxs,
                padding: `${spacing.xxs} ${spacing.xs}`,
                backgroundColor: colors.red.red60,
                color: 'white',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }} />
                Recording
              </div>
            )}
          </div>

          {/* Content */}
          <div style={{
            flex: 1,
            padding: spacing.md,
            paddingBottom: spacing.lg,
            overflowY: 'auto'
          }}>
            {steps[currentStep].content}
          </div>

          {/* Footer with buttons and step indicator */}
          <div style={{
            borderTop: `1px solid ${colors.gray.gray10}`,
            backgroundColor: colors.gray.gray02
          }}>
            {/* Recording stopped warning */}
            {recordingStopped && (
              <div style={{
                padding: spacing.sm,
                paddingBottom: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.xs
              }}>
                <div style={{
                  padding: spacing.xs,
                  marginBottom: spacing.xs,
                  backgroundColor: 'transparent',
                  border: `2px solid ${colors.yellow.yellow60}`,
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: colors.gray.gray70,
                  textAlign: 'center'
                }}>
                  ⚠️ Recording stopped - Please restart to continue
                </div>
                <Button
                  variant="blue"
                  emphasis="high"
                  fullWidth
                  onClick={handleStartRecording}
                >
                  Restart Screen Recording
                </Button>
              </div>
            )}

            {/* Action buttons for Task Instructions (steps 1 and 4) */}
            {(currentStep === 1 || currentStep === 4) && !recordingStopped && (
              <div style={{
                padding: spacing.md,
                paddingBottom: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.xs
              }}>
                <Button
                  variant="blue"
                  emphasis="high"
                  size="lg"
                  fullWidth
                  onClick={handleStartTask}
                  disabled={!isRecording}
                >
                  {hasStartedTask ? 'Continue Task' : 'Get Started'}
                </Button>
                {hasStartedTask && (
                  <Button
                    variant="blue"
                    emphasis="medium"
                    size="lg"
                    fullWidth
                    onClick={handleStartQuestions}
                    disabled={!isRecording}
                  >
                    I'm Done
                  </Button>
                )}
              </div>
            )}

            {/* Question buttons */}
            {(currentStep === 2 || currentStep === 3 || currentStep === 5 || currentStep === 6 || currentStep === 7 || currentStep === 8) && !recordingStopped && (
              <div style={{
                padding: spacing.md,
                paddingBottom: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.xs
              }}>
                <Button
                  variant="blue"
                  emphasis="high"
                  size="lg"
                  fullWidth
                  onClick={handleNextQuestion}
                  disabled={isSubmitting || !isRecording}
                >
                  {isSubmitting ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: spacing.xs }}>
                      <span style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid white',
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite'
                      }} />
                      Submitting...
                    </span>
                  ) : (
                    currentStep === 8 ? 'Submit Feedback' : 'Next'
                  )}
                </Button>
              </div>
            )}

            {/* Progress indicator - 8 dots for steps 1-8 */}
            {currentStep >= 1 && (
              <div style={{
                padding: spacing.sm,
                display: 'flex',
                justifyContent: 'center',
                gap: spacing.xxs
              }}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((stepNum) => (
                  <div
                    key={stepNum}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: stepNum <= currentStep
                        ? colors.blue.blue60
                        : colors.gray.gray20,
                      transition: 'background-color 0.3s ease'
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
