import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { colors, transparentColors } from '../tokens/colors'
import { body } from '../tokens/typography'
import { ContentCheck, NoticeWarning, NoticeImportant, ArrowCaret } from '../icons'

/**
 * Select
 *
 * A select dropdown component with label, message, and various states.
 * Matches Zion UI design system.
 *
 * @param {string} label - Main label text (uses body.a)
 * @param {string} labelLarge - Optional large label text (uses body.b)
 * @param {string} message - Optional message text below select (uses body.a)
 * @param {string} value - Select value (controlled)
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {string} status - Field status: 'default', 'valid', 'warning', 'error'
 * @param {boolean} disabled - Whether the field is disabled
 * @param {boolean} billboard - Use larger height (44px instead of 40px)
 * @param {component} icon - Optional icon to show to the left of select text
 * @param {array} options - Array of option objects with {value, label} or array of strings
 * @param {node} children - Optional children for custom options
 */
export const Select = ({
  label,
  labelLarge,
  message,
  value,
  onChange,
  placeholder,
  status = 'default',
  disabled = false,
  billboard = false,
  icon: Icon,
  options,
  children,
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

  // Select container styles
  const selectContainerStyles = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  }

  // Select styles
  const selectStyles = {
    ...body.b,
    width: '100%',
    height: billboard ? '44px' : '40px',
    padding: Icon ? '8px 32px 8px 32px' : '8px 32px 8px 8px',
    borderRadius: '4px',
    border: isFocused && !disabled
      ? `2px solid ${colors.blue.blue50}`
      : `1px solid ${currentStatus.strokeColor}`,
    backgroundColor: disabled ? transparentColors.transparentGray02 : colors.gray.gray00,
    color: disabled ? transparentColors.transparentGray40 : colors.gray.gray100,
    outline: 'none',
    transition: 'border-color 0.15s ease',
    boxSizing: 'border-box',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer'
  }

  // Placeholder color for disabled option
  const placeholderColor = transparentColors.transparentGray40

  // Icon container styles (left side of select)
  const iconContainerStyles = {
    position: 'absolute',
    left: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    color: disabled ? transparentColors.transparentGray40 : colors.gray.gray100
  }

  // Caret icon styles (right side of select)
  const caretStyles = {
    position: 'absolute',
    right: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    color: disabled ? transparentColors.transparentGray40 : colors.gray.gray100,
    transform: 'rotate(90deg)'
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

  return (
    <div style={{ width: '100%' }} {...rest}>
      {/* Placeholder color styles */}
      <style>
        {`
          .select-field option[disabled] {
            color: ${placeholderColor};
          }
          .select-field:invalid {
            color: ${placeholderColor};
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

      {/* Select Container */}
      <div style={selectContainerStyles}>
        {/* Left Icon */}
        {Icon && (
          <div style={iconContainerStyles}>
            <Icon width="16px" height="16px" />
          </div>
        )}

        {/* Select Element */}
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={selectStyles}
          className="select-field"
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children || options?.map((option) => {
            // Handle both string arrays and object arrays
            if (typeof option === 'string') {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              )
            }
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )
          })}
        </select>

        {/* Caret Icon */}
        <div style={caretStyles}>
          <ArrowCaret width="16px" height="16px" />
        </div>
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

Select.propTypes = {
  label: PropTypes.string,
  labelLarge: PropTypes.string,
  message: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  status: PropTypes.oneOf(['default', 'valid', 'warning', 'error']),
  disabled: PropTypes.bool,
  billboard: PropTypes.bool,
  icon: PropTypes.elementType,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    ])
  ),
  children: PropTypes.node
}
