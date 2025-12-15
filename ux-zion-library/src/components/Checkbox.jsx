import React from 'react'
import PropTypes from 'prop-types'
import { colors, transparentColors } from '../tokens/colors'

/**
 * Checkbox
 *
 * A checkbox component with three states: unselected, checked, and indeterminate.
 * Matches Zion UI design system.
 *
 * @param {boolean} checked - Whether the checkbox is checked
 * @param {boolean} indeterminate - Whether the checkbox is in indeterminate state (minus sign)
 * @param {boolean} disabled - Whether the checkbox is disabled
 * @param {function} onChange - Change handler
 * @param {string} label - Optional label text
 */
export const Checkbox = ({
  checked = false,
  indeterminate = false,
  disabled = false,
  onChange,
  label,
  ...rest
}) => {
  const [isHovered, setIsHovered] = React.useState(false)

  // Determine checkbox appearance based on state
  const getCheckboxStyles = () => {
    // Disabled states
    if (disabled) {
      if (checked || indeterminate) {
        return {
          fill: colors.gray.gray40,
          stroke: 'none'
        }
      }
      return {
        fill: colors.gray.gray00,
        stroke: colors.gray.gray40
      }
    }

    // Selected states (checked or indeterminate)
    if (checked || indeterminate) {
      return {
        fill: colors.blue.blue50,
        stroke: 'none'
      }
    }

    // Unselected state
    return {
      fill: colors.gray.gray00,
      stroke: colors.gray.gray100
    }
  }

  const checkboxStyles = getCheckboxStyles()

  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked)
    }
  }

  const containerStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none'
  }

  const labelStyles = {
    fontFamily: '"Lato", sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    color: disabled ? colors.gray.gray40 : colors.gray.gray100
  }

  return (
    <div
      style={containerStyles}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      {/* Checkbox SVG */}
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transition: 'all 0.15s ease'
        }}
      >
        {/* Hover circle background */}
        {isHovered && !disabled && (
          <circle
            cx="15"
            cy="15"
            r="15"
            fill={transparentColors.transparentBlue03}
          />
        )}

        {/* Checkbox background */}
        <rect
          x={checkboxStyles.stroke !== 'none' ? '5.5' : '5'}
          y={checkboxStyles.stroke !== 'none' ? '5.5' : '5'}
          width={checkboxStyles.stroke !== 'none' ? '19' : '20'}
          height={checkboxStyles.stroke !== 'none' ? '19' : '20'}
          rx="4"
          fill={checkboxStyles.fill}
          stroke={checkboxStyles.stroke}
          strokeWidth={checkboxStyles.stroke !== 'none' ? '1' : '0'}
        />

        {/* Check icon */}
        {checked && !indeterminate && (
          <path
            d="M10 15L13.5 18.5L20 12"
            stroke={disabled ? colors.gray.gray00 : colors.gray.gray00}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Minus icon (indeterminate) */}
        {indeterminate && (
          <line
            x1="10"
            y1="15"
            x2="20"
            y2="15"
            stroke={disabled ? colors.gray.gray00 : colors.gray.gray00}
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}
      </svg>

      {/* Label */}
      {label && <span style={labelStyles}>{label}</span>}
    </div>
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string
}
