import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from "../../ux-zion-library/src/components/Button";
import { spacing } from "../../ux-zion-library/src/tokens/spacing";
import { colors } from "../../ux-zion-library/src/tokens/colors";

/**
 * Modal for collecting task completion feedback
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onSubmit - Callback with responses when submitted
 * @param {Function} props.onClose - Callback when modal is closed
 */
export function TaskQuestionsModal({ isOpen, onSubmit, onClose }) {
  const [responses, setResponses] = useState({
    taskSuccess: null, // 'yes' | 'partially' | 'no'
    difficulty: null, // 1-5
    confusing: '',
    workedWell: ''
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleSubmit = () => {
    // Validate responses
    const newErrors = {};

    if (responses.taskSuccess === null) {
      newErrors.taskSuccess = 'Please select an option';
    }

    if (responses.difficulty === null) {
      newErrors.difficulty = 'Please select a difficulty rating';
    }

    if (responses.confusing.trim() === '') {
      newErrors.confusing = 'Please provide a response';
    }

    if (responses.workedWell.trim() === '') {
      newErrors.workedWell = 'Please provide a response';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Format responses for submission
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

    onSubmit(formattedResponses);
  };

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

  const modalContent = (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: spacing.md
    }}>
      <div style={{
        backgroundColor: colors.gray.gray00,
        borderRadius: '8px',
        width: '100%',
        maxWidth: '600px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
      }}>
        {/* Header */}
        <div style={{
          padding: spacing.md,
          borderBottom: `1px solid ${colors.gray.gray10}`
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: 600
          }}>
            Task Feedback
          </h2>
          <p style={{
            margin: `${spacing.xxs} 0 0 0`,
            color: colors.gray.gray60,
            fontSize: '14px'
          }}>
            Please answer these questions about your experience
          </p>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: spacing.md
        }}>
          {/* Question 1: Task Success */}
          <div style={{ marginBottom: spacing.md }}>
            <label style={{
              display: 'block',
              marginBottom: spacing.xs,
              fontWeight: 600,
              fontSize: '15px'
            }}>
              1. Did you complete the task successfully?
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

          {/* Question 2: Difficulty Rating */}
          <div style={{ marginBottom: spacing.md }}>
            <label style={{
              display: 'block',
              marginBottom: spacing.xs,
              fontWeight: 600,
              fontSize: '15px'
            }}>
              2. How difficult was this task?
              <span style={{ color: colors.red.red60 }}>*</span>
            </label>
            <div style={{ display: 'flex', gap: spacing.xs }}>
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  onClick={() => updateResponse('difficulty', rating)}
                  style={{
                    flex: 1,
                    padding: spacing.sm,
                    border: `2px solid ${responses.difficulty === rating ? colors.blue.blue60 : colors.gray.gray10}`,
                    borderRadius: '4px',
                    backgroundColor: responses.difficulty === rating ? colors.blue.blue00 : colors.gray.gray00,
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 600,
                    transition: 'all 0.2s'
                  }}
                >
                  {rating}
                </button>
              ))}
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: spacing.xxs,
              fontSize: '12px',
              color: colors.gray.gray60
            }}>
              <span>Very Easy</span>
              <span>Very Difficult</span>
            </div>
            {errors.difficulty && (
              <p style={{ color: colors.red.red60, fontSize: '13px', marginTop: spacing.xxs }}>
                {errors.difficulty}
              </p>
            )}
          </div>

          {/* Question 3: What was confusing */}
          <div style={{ marginBottom: spacing.md }}>
            <label style={{
              display: 'block',
              marginBottom: spacing.xs,
              fontWeight: 600,
              fontSize: '15px'
            }}>
              3. What was most confusing or difficult?
              <span style={{ color: colors.red.red60 }}>*</span>
            </label>
            <textarea
              value={responses.confusing}
              onChange={(e) => updateResponse('confusing', e.target.value)}
              placeholder="Please describe any confusing or difficult aspects..."
              style={{
                width: '100%',
                minHeight: '100px',
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

          {/* Question 4: What worked well */}
          <div style={{ marginBottom: spacing.md }}>
            <label style={{
              display: 'block',
              marginBottom: spacing.xs,
              fontWeight: 600,
              fontSize: '15px'
            }}>
              4. What worked well?
              <span style={{ color: colors.red.red60 }}>*</span>
            </label>
            <textarea
              value={responses.workedWell}
              onChange={(e) => updateResponse('workedWell', e.target.value)}
              placeholder="Please describe what worked well..."
              style={{
                width: '100%',
                minHeight: '100px',
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
        </div>

        {/* Footer */}
        <div style={{
          padding: spacing.md,
          borderTop: `1px solid ${colors.gray.gray10}`,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: spacing.xs
        }}>
          <Button
            variant="gray"
            emphasis="low"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="blue"
            emphasis="high"
            onClick={handleSubmit}
          >
            Submit Feedback
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
