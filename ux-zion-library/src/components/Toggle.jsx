import React from 'react'
import PropTypes from 'prop-types'
import { colors, transparentColors } from '../tokens/colors'

/**
 * Toggle
 *
 * A toggle switch component with on/off states.
 * Matches Zion UI design system.
 *
 * @param {boolean} checked - Whether the toggle is on (checked)
 * @param {boolean} disabled - Whether the toggle is disabled
 * @param {function} onChange - Change handler
 * @param {string} label - Optional label text
 */
export const Toggle = ({
  checked = false,
  disabled = false,
  onChange,
  label,
  ...rest
}) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const [isFocused, setIsFocused] = React.useState(false)

  // Determine toggle appearance based on state
  const getToggleStyles = () => {
    // Rectangle is at x=10 with width=36, so edges are at x=10 and x=46
    // Circle has radius=10
    // Left: far left of circle at x=8 (2px left of rect edge), so center at x=18
    // Right: far right of circle at x=48 (2px right of rect edge), so center at x=38

    // Disabled state
    if (disabled) {
      return {
        circleX: checked ? 38 : 18,
        circleFill: colors.gray.gray05,
        trackFill: colors.gray.gray20
      }
    }

    // Selected state
    if (checked) {
      return {
        circleX: 38,
        circleFill: colors.blue.blue50,
        trackFill: colors.blue.blue30
      }
    }

    // Default (unselected) state
    return {
      circleX: 18,
      circleFill: colors.gray.gray02,
      trackFill: colors.gray.gray40
    }
  }

  const toggleStyles = getToggleStyles()

  const handleClick = () => {
    if (!disabled) {
      setIsFocused(true)
      if (onChange) {
        onChange(!checked)
      }
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
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
      onBlur={handleBlur}
      tabIndex={disabled ? -1 : 0}
      {...rest}
    >
      {/* Toggle SVG */}
      <svg
        width="50"
        height="34"
        viewBox="5 0 50 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transition: 'all 0.15s ease'
        }}
      >
        {/* Hover/Focus circle background */}
        {(isHovered || isFocused) && !disabled && (
          <circle
            cx={toggleStyles.circleX + 2}
            cy="17"
            r="15"
            fill={checked ? transparentColors.transparentBlue03 : transparentColors.transparentGray03}
            style={{
              transition: 'cx 0.2s ease'
            }}
          />
        )}

        {/* Track (rectangle) */}
        <rect
          x="12"
          y="11"
          width="36"
          height="12"
          rx="6"
          fill={toggleStyles.trackFill}
        />

        {/* Circle with drop shadow */}
        <defs>
          <filter id="toggleShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="1" floodColor="rgba(0, 0, 0, 0.25)" />
          </filter>
        </defs>

        <circle
          cx={toggleStyles.circleX + 2}
          cy="17"
          r="10"
          fill={toggleStyles.circleFill}
          filter="url(#toggleShadow)"
          style={{
            transition: 'cx 0.2s ease'
          }}
        />
      </svg>

      {/* Label */}
      {label && <span style={labelStyles}>{label}</span>}
    </div>
  )
}

Toggle.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string
}
