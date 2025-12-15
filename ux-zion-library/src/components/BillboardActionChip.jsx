import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { colors, transparentColors, chipColors, buttonColors } from '../tokens/colors'
import { body } from '../tokens/typography'
import { Avatar } from './Avatar'

/**
 * BillboardActionChip
 *
 * Larger action chip with optional icon or avatar, suitable for billboard displays.
 *
 * @param {string} label - Text to display in the chip
 * @param {string} variant - Color variant: 'blue', 'green', 'yellow', 'red', 'purple'
 * @param {boolean} selected - Whether the chip is selected
 * @param {boolean} disabled - Whether the chip is disabled
 * @param {boolean} inline - Use inline styling (reduced padding)
 * @param {boolean} lowEmphasis - Use low emphasis styling (no fill, reduced padding)
 * @param {node} startIcon - Optional icon element to display before text
 * @param {object} avatar - Optional avatar configuration
 * @param {function} onClick - Click handler
 */
export const BillboardActionChip = ({
  label,
  variant = 'blue',
  selected = false,
  disabled = false,
  inline = false,
  lowEmphasis = false,
  startIcon,
  avatar,
  onClick,
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const hasStartElement = startIcon || avatar

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

  // Determine padding
  const getPadding = () => {
    if (lowEmphasis) {
      return {
        paddingLeft: hasStartElement ? '4px' : '0',
        paddingRight: '0',
        paddingTop: hasStartElement ? '4px' : '8px',
        paddingBottom: hasStartElement ? '4px' : '8px'
      }
    }
    if (inline) {
      return {
        paddingLeft: hasStartElement ? '4px' : '8px',
        paddingRight: '8px',
        paddingTop: '2px',
        paddingBottom: '2px'
      }
    }
    return {
      paddingLeft: hasStartElement ? '4px' : '26px',
      paddingRight: '26px',
      paddingTop: hasStartElement ? '4px' : '8px',
      paddingBottom: hasStartElement ? '4px' : '8px'
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
    gap: hasStartElement ? '8px' : '0',
    borderRadius: '50px',
    ...padding,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    ...body.c,
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
      {avatar && <Avatar size="xs" {...avatar} />}
      {startIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{startIcon}</span>}
      {label}
    </button>
  )
}

BillboardActionChip.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['blue', 'green', 'yellow', 'red', 'purple']),
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  lowEmphasis: PropTypes.bool,
  startIcon: PropTypes.node,
  avatar: PropTypes.object,
  onClick: PropTypes.func
}
