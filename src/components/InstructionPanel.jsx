import { useState, useEffect } from 'react';
import { Button } from '../../../ux-zion-library/src/components/Button';
import { spacing } from '../../../ux-zion-library/src/tokens/spacing';
import { colors } from '../../../ux-zion-library/src/tokens/colors';

/**
 * Instruction panel component for user testing
 * @param {Object} props
 * @param {Function} props.onRecordingStart - Callback when recording starts
 * @param {Function} props.onTaskComplete - Callback when user indicates task is complete
 * @param {boolean} props.isRecording - Whether recording is active
 * @param {string} props.recordingError - Error message from recording
 * @param {Function} props.startRecording - Function to start recording
 */
export function InstructionPanel({
  onRecordingStart,
  onTaskComplete,
  isRecording,
  recordingError,
  startRecording,
  recordingStopped
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [recordingAttempted, setRecordingAttempted] = useState(false);
  const [hasStartedTask, setHasStartedTask] = useState(false);
  const [responses, setResponses] = useState({
    taskSuccess: null,
    difficulty: null,
    confusing: '',
    workedWell: ''
  });
  const [errors, setErrors] = useState({});

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
    setCurrentStep(2); // Move to first question
  };

  // Handle next question
  const handleNextQuestion = () => {
    const step = currentStep;

    // Validate current question
    const newErrors = {};
    if (step === 2 && responses.taskSuccess === null) {
      newErrors.taskSuccess = 'Please select an option';
    } else if (step === 3 && responses.difficulty === null) {
      newErrors.difficulty = 'Please select a difficulty rating';
    } else if (step === 4 && responses.confusing.trim() === '') {
      newErrors.confusing = 'Please provide a response';
    } else if (step === 5 && responses.workedWell.trim() === '') {
      newErrors.workedWell = 'Please provide a response';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If on last question, submit
    if (step === 5) {
      const formattedResponses = [
        {
          questionId: 'task-success',
          questionText: 'Did you complete the task successfully?',
          answer: responses.taskSuccess
        },
        {
          questionId: 'difficulty-rating',
          questionText: 'How difficult was this task?',
          answer: responses.difficulty.toString()
        },
        {
          questionId: 'most-confusing',
          questionText: 'What was most confusing or difficult?',
          answer: responses.confusing
        },
        {
          questionId: 'what-worked-well',
          questionText: 'What worked well?',
          answer: responses.workedWell
        }
      ];

      if (onTaskComplete) {
        onTaskComplete(formattedResponses);
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
    {
      title: 'Welcome to the Index Creation Study',
      content: (
        <div>
          <p style={{ marginBottom: spacing.xs }}>
            Thank you for participating in this study. We're testing a new feature for creating indexes in historical records.
          </p>
          <p style={{ marginBottom: spacing.xs }}>
            <strong>Before we begin, you must enable screen and audio recording.</strong>
          </p>
          <p style={{ marginBottom: spacing.xs, color: colors.gray.gray60 }}>
            Your recording will help us understand how you interact with the interface. All data will be kept confidential and used only for research purposes.
          </p>
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
            {isRecording && (
              <Button
                variant="blue"
                emphasis="high"
                onClick={() => setCurrentStep(1)}
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      )
    },
    {
      title: 'Your Task',
      content: (
        <div>
          <p style={{ marginBottom: spacing.sm }}>
            <strong>Task:</strong> Add <strong>Gary Fadden</strong> and <strong>Ronald Fadden</strong> to <strong>Edgar Fadden's household</strong>.
          </p>
          <p style={{ marginBottom: spacing.sm, fontSize: '14px', color: colors.gray.gray60 }}>
            <strong>Tip:</strong> You can reopen this panel at any time by clicking the tab on the left side.
          </p>
        </div>
      )
    },
    {
      title: 'Question 1 of 4',
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
                  border: `1px solid ${responses.taskSuccess === option.value ? colors.blue.blue60 : colors.gray.gray10}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  backgroundColor: responses.taskSuccess === option.value ? colors.blue.blue00 : 'transparent'
                }}
              >
                <input
                  type="radio"
                  name="taskSuccess"
                  value={option.value}
                  checked={responses.taskSuccess === option.value}
                  onChange={(e) => updateResponse('taskSuccess', e.target.value)}
                  style={{ cursor: 'pointer' }}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          {errors.taskSuccess && (
            <p style={{ color: colors.red.red60, fontSize: '13px', marginTop: spacing.xxs }}>
              {errors.taskSuccess}
            </p>
          )}
        </div>
      )
    },
    {
      title: 'Question 2 of 4',
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
                onClick={() => updateResponse('difficulty', option.value)}
                style={{
                  width: '100%',
                  padding: spacing.sm,
                  border: `2px solid ${responses.difficulty === option.value ? colors.blue.blue60 : colors.gray.gray10}`,
                  borderRadius: '4px',
                  backgroundColor: responses.difficulty === option.value ? colors.blue.blue00 : colors.gray.gray00,
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
          {errors.difficulty && (
            <p style={{ color: colors.red.red60, fontSize: '13px', marginTop: spacing.xxs }}>
              {errors.difficulty}
            </p>
          )}
        </div>
      )
    },
    {
      title: 'Question 3 of 4',
      content: (
        <div>
          <label style={{
            display: 'block',
            marginBottom: spacing.xs,
            fontWeight: 600,
            fontSize: '15px'
          }}>
            What was most confusing or difficult?
            <span style={{ color: colors.red.red60 }}>*</span>
          </label>
          <textarea
            value={responses.confusing}
            onChange={(e) => updateResponse('confusing', e.target.value)}
            placeholder="Please describe any confusing or difficult aspects..."
            style={{
              width: '100%',
              minHeight: '120px',
              padding: spacing.xs,
              border: `1px solid ${errors.confusing ? colors.red.red60 : colors.gray.gray10}`,
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
          {errors.confusing && (
            <p style={{ color: colors.red.red60, fontSize: '13px', marginTop: spacing.xxs }}>
              {errors.confusing}
            </p>
          )}
        </div>
      )
    },
    {
      title: 'Question 4 of 4',
      content: (
        <div>
          <label style={{
            display: 'block',
            marginBottom: spacing.xs,
            fontWeight: 600,
            fontSize: '15px'
          }}>
            What worked well?
            <span style={{ color: colors.red.red60 }}>*</span>
          </label>
          <textarea
            value={responses.workedWell}
            onChange={(e) => updateResponse('workedWell', e.target.value)}
            placeholder="Please describe what worked well..."
            style={{
              width: '100%',
              minHeight: '120px',
              padding: spacing.xs,
              border: `1px solid ${errors.workedWell ? colors.red.red60 : colors.gray.gray10}`,
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
          {errors.workedWell && (
            <p style={{ color: colors.red.red60, fontSize: '13px', marginTop: spacing.xxs }}>
              {errors.workedWell}
            </p>
          )}
        </div>
      )
    }
  ];

  return (
    <>
      {/* Tab when panel is closed */}
      {!isOpen && currentStep >= 1 && (
        <div
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            zIndex: 1000,
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
          zIndex: 1000,
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
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.xxs,
                  padding: `${spacing.xxs} ${spacing.xs}`,
                  backgroundColor: colors.yellow.yellow60,
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 600
                }}>
                  ⚠ Recording stopped - Click below to reshare
                </div>
                <Button
                  variant="blue"
                  emphasis="high"
                  onClick={handleStartRecording}
                  style={{ width: '100%' }}
                >
                  Restart Screen Recording
                </Button>
              </div>
            )}

            {/* Action buttons */}
            {currentStep === 1 && !recordingStopped && (
              <div style={{
                padding: spacing.md,
                paddingBottom: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.xs
              }}>
                <Button
                  variant="blue"
                  emphasis="medium"
                  size="lg"
                  fullWidth
                  onClick={handleStartTask}
                >
                  {hasStartedTask ? 'Continue Task' : 'Get Started'}
                </Button>
                <Button
                  variant="blue"
                  emphasis="high"
                  size="lg"
                  fullWidth
                  onClick={handleStartQuestions}
                >
                  I'm Done
                </Button>
              </div>
            )}

            {/* Question buttons */}
            {currentStep >= 2 && currentStep <= 5 && (
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
                >
                  {currentStep === 5 ? 'Submit Feedback' : 'Next'}
                </Button>
              </div>
            )}

            {/* Progress indicator - 5 circles for Task + 4 Questions */}
            {currentStep >= 1 && (
              <div style={{
                padding: spacing.sm,
                display: 'flex',
                justifyContent: 'center',
                gap: spacing.xxs
              }}>
                {[1, 2, 3, 4, 5].map((stepNum) => (
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

      {/* Add pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  );
}
