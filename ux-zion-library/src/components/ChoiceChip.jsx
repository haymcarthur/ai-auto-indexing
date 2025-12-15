import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { colors, transparentColors, chipColors, buttonColors } from '../tokens/colors'
import { Avatar } from './Avatar'

/**
 * ChoiceChip
 *
 * Clickable chip for making selections, with optional icon or avatar.
 *
 * @param {string} label - Text to display in the chip
 * @param {boolean} selected - Whether the chip is selected
 * @param {boolean} disabled - Whether the chip is disabled
 * @param {node} startIcon - Optional icon element to display before text
 * @param {object} avatar - Optional avatar configuration
 * @param {function} onClick - Click handler
 */
export const ChoiceChip = ({
  label,
  selected = false,
  disabled = false,
  startIcon,
  avatar,
  onClick,
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const hasStartElement = startIcon || avatar

  // Determine padding based on whether there's a start element
  const getPadding = () => {
    return {
      paddingLeft: hasStartElement ? '2px' : '11px',
      paddingRight: '11px',
      paddingTop: hasStartElement ? '4px' : '8px',
      paddingBottom: hasStartElement ? '4px' : '8px'
    }
  }

  // Determine background and text colors
  const getColors = () => {
    if (disabled) {
      return {
        backgroundColor: transparentColors.transparentGray03,
        color: colors.gray.gray40
      }
    }
    if (selected) {
      return {
        backgroundColor: chipColors.selectedBlue,
        color: buttonColors.highText
      }
    }
    return {
      backgroundColor: transparentColors.transparentGray03,
      color: colors.gray.gray100
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
      {avatar && <Avatar size="xs" {...avatar} />}
      {startIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{startIcon}</span>}
      {label}
    </button>
  )
}

ChoiceChip.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  startIcon: PropTypes.node,
  avatar: PropTypes.object,
  onClick: PropTypes.func
}
