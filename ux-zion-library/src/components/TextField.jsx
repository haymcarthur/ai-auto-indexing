import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { colors, transparentColors } from '../tokens/colors'
import { body } from '../tokens/typography'
import { ContentCheck, NoticeWarning, NoticeImportant, MenuClose } from '../icons'

/**
 * TextField
 *
 * A text input field with label, message, and various states.
 * Matches Zion UI design system.
 *
 * @param {string} label - Main label text (uses body.a)
 * @param {string} labelLarge - Optional large label text (uses body.b)
 * @param {string} message - Optional message text below input (uses body.a)
 * @param {string} value - Input value (controlled)
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {string} status - Field status: 'default', 'valid', 'warning', 'error'
 * @param {boolean} disabled - Whether the field is disabled
 * @param {boolean} billboard - Use larger height (44px instead of 40px)
 * @param {boolean} clearable - Show clear button
 * @param {function} onClear - Clear button click handler
 * @param {component} icon - Optional icon to show to the left of input text
 * @param {string} type - Input type (text, password, email, etc.)
 */
export const TextField = ({
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
  type = 'text',
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

  // Input container styles
  const inputContainerStyles = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  }

  // Input styles
  const inputStyles = {
    ...body.b,
    width: '100%',
    height: billboard ? '44px' : '40px',
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
    boxSizing: 'border-box'
  }

  // Placeholder styles
  const placeholderColor = transparentColors.transparentGray40

  // Icon container styles (left side of input)
  const iconContainerStyles = {
    position: 'absolute',
    left: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    color: disabled ? transparentColors.transparentGray40 : colors.gray.gray100
  }

  // Clear button styles
  const clearButtonStyles = {
    position: 'absolute',
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
    color: currentStatus.messageColor,
    marginTop: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  }

  const handleClear = () => {
    if (onClear) {
      onClear()
    } else if (onChange) {
      // Create synthetic event
      onChange({ target: { value: '' } })
    }
  }

  return (
    <div style={{ width: '100%' }} {...rest}>
      {/* Placeholder color styles */}
      <style>
        {`
          .text-field-input::placeholder {
            color: ${placeholderColor};
            opacity: 1;
          }
          .text-field-input::-webkit-input-placeholder {
            color: ${placeholderColor};
            opacity: 1;
          }
          .text-field-input::-moz-placeholder {
            color: ${placeholderColor};
            opacity: 1;
          }
          .text-field-input:-ms-input-placeholder {
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

      {/* Input Container */}
      <div style={inputContainerStyles}>
        {/* Left Icon */}
        {Icon && (
          <div style={iconContainerStyles}>
            <Icon width="16px" height="16px" />
          </div>
        )}

        {/* Input Field */}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={inputStyles}
          className="text-field-input"
        />

        {/* Clear Button */}
        {clearable && value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            style={clearButtonStyles}
            onMouseEnter={(e) => e.currentTarget.style.color = colors.gray.gray100}
            onMouseLeave={(e) => e.currentTarget.style.color = colors.gray.gray60}
            aria-label="Clear input"
          >
            <MenuClose width="18px" height="18px" />
          </button>
        )}
      </div>

      {/* Message with Status Icon */}
      {message && (
        <div style={messageContainerStyles}>
          {StatusIcon && (
            <StatusIcon width="14px" height="14px" />
          )}
          <span>{message}</span>
        </div>
      )}
    </div>
  )
}

TextField.propTypes = {
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
  type: PropTypes.string
}
