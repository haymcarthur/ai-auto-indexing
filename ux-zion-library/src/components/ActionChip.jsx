import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { colors, transparentColors, chipColors, buttonColors } from '../tokens/colors'

/**
 * ActionChip
 *
 * Clickable chip for actions with multiple color variants.
 *
 * @param {string} label - Text to display in the chip
 * @param {string} variant - Color variant: 'blue', 'green', 'yellow', 'red', 'purple'
 * @param {boolean} selected - Whether the chip is selected
 * @param {boolean} disabled - Whether the chip is disabled
 * @param {boolean} inline - Use inline styling (reduced padding)
 * @param {boolean} lowEmphasis - Use low emphasis styling (no fill, reduced padding)
 * @param {function} onClick - Click handler
 */
export const ActionChip = ({
  label,
  variant = 'blue',
  selected = false,
  disabled = false,
  inline = false,
  lowEmphasis = false,
  onClick,
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false)

  // Color configurations for each variant
  const variantColors = {
    blue: {
      text: transparentColors.transparentBlue90,
      fill: transparentColors.transparentBlue03,
      selectedFill: chipColors.selectedBlue,
      selectedText: buttonColors.highText
    },
    green: {
      text: transparentColors.transparentGreen90,
      fill: transparentColors.transparentGreen03,
      selectedFill: chipColors.selectedGreen,
      selectedText: buttonColors.highText
    },
    yellow: {
      text: transparentColors.transparentYellow90,
      fill: transparentColors.transparentYellow03,
      selectedFill: chipColors.selectedYellow,
      selectedText: buttonColors.highText
    },
    red: {
      text: transparentColors.transparentRed90,
      fill: transparentColors.transparentRed03,
      selectedFill: chipColors.selectedRed,
      selectedText: buttonColors.highText
    },
    purple: {
      text: transparentColors.transparentPurple90,
      fill: transparentColors.transparentPurple03,
      selectedFill: chipColors.selectedPurple,
      selectedText: buttonColors.highText
    }
  }

  const currentVariant = variantColors[variant] || variantColors.blue

  // Determine padding based on inline and lowEmphasis props
  const getPadding = () => {
    if (lowEmphasis) {
      return {
        paddingLeft: '0',
        paddingRight: '0',
        paddingTop: '8px',
        paddingBottom: '8px'
      }
    }
    if (inline) {
      return {
        paddingLeft: '8px',
        paddingRight: '8px',
        paddingTop: '2px',
        paddingBottom: '2px'
      }
    }
    return {
      paddingLeft: '11px',
      paddingRight: '11px',
      paddingTop: '8px',
      paddingBottom: '8px'
    }
  }

  // Determine background and text colors
  const getColors = () => {
    if (disabled) {
      return {
        backgroundColor: colors.gray.gray03,
        color: colors.gray.gray40
      }
    }
    if (lowEmphasis) {
      return {
        backgroundColor: 'transparent',
        color: colors.gray.gray100
      }
    }
    if (selected) {
      return {
        backgroundColor: currentVariant.selectedFill,
        color: currentVariant.selectedText
      }
    }
    return {
      backgroundColor: currentVariant.fill,
      color: currentVariant.text
    }
  }

  const padding = getPadding()
  const colorStyles = getColors()

  const chipStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50px',
    ...padding,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: '"Lato", sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1,
    userSelect: 'none',
    ...colorStyles,
    opacity: isHovered && !disabled && !selected ? 0.8 : 1
  }

  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e)
    }
  }

  return (
    <button
      style={chipStyles}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      {...rest}
    >
      {label}
    </button>
  )
}

ActionChip.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['blue', 'green', 'yellow', 'red', 'purple']),
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  lowEmphasis: PropTypes.bool,
  onClick: PropTypes.func
}
