import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { colors, transparentColors } from '../tokens/colors'
import { body } from '../tokens/typography'
import { ContentCheck, NoticeWarning, NoticeImportant, MenuClose } from '../icons'

/**
 * TextArea
 *
 * A textarea input field with label, message, and various states.
 * Matches Zion UI design system.
 *
 * @param {string} label - Main label text (uses body.a)
 * @param {string} labelLarge - Optional large label text (uses body.b)
 * @param {string} message - Optional message text below textarea (uses body.a)
 * @param {string} value - Textarea value (controlled)
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {string} status - Field status: 'default', 'valid', 'warning', 'error'
 * @param {boolean} disabled - Whether the field is disabled
 * @param {boolean} billboard - Use larger height (161px instead of 117px)
 * @param {boolean} clearable - Show clear button
 * @param {function} onClear - Clear button click handler
 * @param {component} icon - Optional icon to show to the left of textarea text
 * @param {number} maxLength - Optional maximum character count
 * @param {number} rows - Number of rows (affects initial height)
 * @param {string} resize - Resize behavior: 'both', 'vertical', 'horizontal', 'none'
 */
export const TextArea = ({
  label,
  labelLarge,
  message,
  value,
  onChange,
  placeholder,
  status = 'default',
  disabled = false,
  billboard = false,
  clearable = false,
  onClear,
  icon: Icon,
  maxLength,
  rows,
  resize = 'both',
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false)

  // Status configurations
  const statusConfig = {
    default: {
      labelColor: colors.gray.gray100,
      strokeColor: transparentColors.transparentGray40,
      messageColor: colors.gray.gray100,
      icon: null
    },
    valid: {
      labelColor: colors.green.green70,
      strokeColor: colors.green.green50,
      messageColor: colors.green.green70,
      icon: ContentCheck
    },
    warning: {
      labelColor: colors.yellow.yellow70,
      strokeColor: colors.yellow.yellow50,
      messageColor: colors.yellow.yellow70,
      icon: NoticeWarning
    },
    error: {
      labelColor: colors.danger.danger70,
      strokeColor: colors.danger.danger50,
      messageColor: colors.danger.danger70,
      icon: NoticeImportant
    }
  }

  const currentStatus = disabled ? statusConfig.default : statusConfig[status]
  const StatusIcon = currentStatus.icon

  // Label styles
  const labelStyles = {
    ...body.a,
    color: disabled ? transparentColors.transparentGray40 : currentStatus.labelColor,
    marginBottom: '4px',
    display: 'block'
  }

  const labelLargeStyles = {
    ...body.b,
    color: disabled ? transparentColors.transparentGray40 : currentStatus.labelColor,
    marginBottom: '4px',
    display: 'block'
  }

  // Textarea container styles
  const textareaContainerStyles = {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start'
  }

  // Textarea styles
  const textareaStyles = {
    ...body.b,
    width: '100%',
    minHeight: billboard ? '161px' : '117px',
    height: billboard ? '161px' : '117px',
    padding: Icon ? '8px 8px 8px 32px' : '8px',
    paddingRight: clearable ? '32px' : '8px',
    borderRadius: '4px',
    border: isFocused && !disabled
      ? status === 'default'
        ? `2px solid ${colors.blue.blue50}`
        : `2px solid ${currentStatus.strokeColor}`
      : `1px solid ${currentStatus.strokeColor}`,
    backgroundColor: disabled ? transparentColors.transparentGray02 : colors.gray.gray00,
    color: disabled ? transparentColors.transparentGray40 : colors.gray.gray100,
    outline: 'none',
    transition: 'border-color 0.15s ease',
    boxSizing: 'border-box',
    resize: resize,
    fontFamily: 'inherit',
    lineHeight: '1.5'
  }

  // Placeholder styles
  const placeholderColor = transparentColors.transparentGray40

  // Icon container styles (left side of textarea)
  const iconContainerStyles = {
    position: 'absolute',
    left: '8px',
    top: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    color: disabled ? transparentColors.transparentGray40 : colors.gray.gray100
  }

  // Clear button styles
  const clearButtonStyles = {
    position: 'absolute',
    top: '8px',
    right: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: '2px',
    border: 'none',
    background: 'none',
    color: colors.gray.gray60,
    transition: 'color 0.15s ease'
  }

  // Message container styles
  const messageContainerStyles = {
    ...body.a,
    marginTop: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px'
  }

  // Message content styles
  const messageContentStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: currentStatus.messageColor
  }

  // Character count styles
  const charCountStyles = {
    ...body.a,
    color: colors.gray.gray60,
    whiteSpace: 'nowrap'
  }

  const handleClear = () => {
    if (onClear) {
      onClear()
    } else if (onChange) {
      // Create synthetic event
      onChange({ target: { value: '' } })
    }
  }

  const currentLength = value?.length || 0

  return (
    <div style={{ width: '100%' }} {...rest}>
      {/* Placeholder color styles */}
      <style>
        {`
          .text-area-input::placeholder {
            color: ${placeholderColor};
            opacity: 1;
          }
          .text-area-input::-webkit-input-placeholder {
            color: ${placeholderColor};
            opacity: 1;
          }
          .text-area-input::-moz-placeholder {
            color: ${placeholderColor};
            opacity: 1;
          }
          .text-area-input:-ms-input-placeholder {
            color: ${placeholderColor};
            opacity: 1;
          }
        `}
      </style>

      {/* Label */}
      {label && !labelLarge && (
        <label style={labelStyles}>
          {label}
        </label>
      )}

      {/* Large Label */}
      {labelLarge && (
        <label style={labelLargeStyles}>
          {labelLarge}
        </label>
      )}

      {/* Textarea Container */}
      <div style={textareaContainerStyles}>
        {/* Left Icon */}
        {Icon && (
          <div style={iconContainerStyles}>
            <Icon width="16px" height="16px" />
          </div>
        )}

        {/* Textarea Field */}
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={textareaStyles}
          className="text-area-input"
          rows={rows}
          maxLength={maxLength}
        />

        {/* Clear Button */}
        {clearable && value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            style={clearButtonStyles}
            onMouseEnter={(e) => e.currentTarget.style.color = colors.gray.gray100}
            onMouseLeave={(e) => e.currentTarget.style.color = colors.gray.gray60}
            aria-label="Clear textarea"
          >
            <MenuClose width="18px" height="18px" />
          </button>
        )}
      </div>

      {/* Message with Status Icon and Character Count */}
      {(message || maxLength) && (
        <div style={messageContainerStyles}>
          <div style={messageContentStyles}>
            {message && (
              <>
                {StatusIcon && (
                  <StatusIcon width="14px" height="14px" />
                )}
                <span>{message}</span>
              </>
            )}
          </div>
          {maxLength && (
            <div style={charCountStyles}>
              {currentLength}/{maxLength}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

TextArea.propTypes = {
  label: PropTypes.string,
  labelLarge: PropTypes.string,
  message: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  status: PropTypes.oneOf(['default', 'valid', 'warning', 'error']),
  disabled: PropTypes.bool,
  billboard: PropTypes.bool,
  clearable: PropTypes.bool,
  onClear: PropTypes.func,
  icon: PropTypes.elementType,
  maxLength: PropTypes.number,
  rows: PropTypes.number,
  resize: PropTypes.oneOf(['both', 'vertical', 'horizontal', 'none'])
}
