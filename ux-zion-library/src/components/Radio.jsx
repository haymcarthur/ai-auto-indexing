import React from 'react'
import PropTypes from 'prop-types'
import { colors, transparentColors } from '../tokens/colors'

/**
 * Radio
 *
 * A radio button component with two states: unselected and selected.
 * Matches Zion UI design system.
 *
 * @param {boolean} selected - Whether the radio is selected
 * @param {boolean} disabled - Whether the radio is disabled
 * @param {function} onChange - Change handler
 * @param {string} label - Optional label text
 * @param {string} value - Value for the radio button
 * @param {string} name - Name for radio group
 */
export const Radio = ({
  selected = false,
  disabled = false,
  onChange,
  label,
  value,
  name,
  ...rest
}) => {
  const [isHovered, setIsHovered] = React.useState(false)

  // Determine radio appearance based on state
  const getRadioStyles = () => {
    // Disabled states
    if (disabled) {
      if (selected) {
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

    // Selected state
    if (selected) {
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

  const radioStyles = getRadioStyles()

  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(value)
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
      {/* Radio SVG */}
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

        {/* Radio outer circle */}
        <circle
          cx="15"
          cy="15"
          r={radioStyles.stroke !== 'none' ? '9.5' : '10'}
          fill={radioStyles.fill}
          stroke={radioStyles.stroke}
          strokeWidth={radioStyles.stroke !== 'none' ? '1' : '0'}
        />

        {/* Radio inner circle (selected state) */}
        {selected && (
          <circle
            cx="15"
            cy="15"
            r="4"
            fill={colors.gray.gray00}
          />
        )}
      </svg>

      {/* Label */}
      {label && <span style={labelStyles}>{label}</span>}
    </div>
  )
}

Radio.propTypes = {
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string
}
