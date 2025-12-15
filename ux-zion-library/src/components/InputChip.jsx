import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { colors, transparentColors, chipColors, buttonColors } from '../tokens/colors'
import { ContentRemove } from '../icons/ContentRemove'

/**
 * InputChip
 *
 * Chip for input with remove functionality and optional start icon.
 *
 * @param {string} label - Text to display in the chip
 * @param {boolean} selected - Whether the chip is selected
 * @param {node} startIcon - Optional icon element to display before text (sm size)
 * @param {function} onRemove - Handler for remove button click
 * @param {function} onClick - Click handler for the chip
 */
export const InputChip = ({
  label,
  selected = false,
  startIcon,
  onRemove,
  onClick,
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isRemoveHovered, setIsRemoveHovered] = useState(false)

  // Determine background and text colors
  const getColors = () => {
    if (selected) {
      return {
        backgroundColor: chipColors.selectedBlue,
        color: buttonColors.highText,
        iconColor: buttonColors.highText
      }
    }
    return {
      backgroundColor: transparentColors.transparentGray03,
      color: colors.gray.gray100,
      iconColor: colors.gray.gray90
    }
  }

  const colorStyles = getColors()

  const chipStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    borderRadius: '50px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '8px',
    paddingBottom: '8px',
    border: 'none',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
    fontFamily: '"Lato", sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1,
    userSelect: 'none',
    backgroundColor: colorStyles.backgroundColor,
    color: colorStyles.color,
    opacity: isHovered && onClick && !selected ? 0.8 : 1
  }

  const removeButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    opacity: isRemoveHovered ? 0.6 : 1,
    transition: 'opacity 0.2s ease'
  }

  const handleChipClick = (e) => {
    if (onClick) {
      onClick(e)
    }
  }

  const handleRemoveClick = (e) => {
    e.stopPropagation()
    if (onRemove) {
      onRemove(e)
    }
  }

  return (
    <div
      style={chipStyles}
      onClick={handleChipClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      {startIcon && (
        <span style={{ display: 'flex', alignItems: 'center', color: colorStyles.iconColor }}>
          {startIcon}
        </span>
      )}
      {label}
      <button
        style={removeButtonStyles}
        onClick={handleRemoveClick}
        onMouseEnter={() => setIsRemoveHovered(true)}
        onMouseLeave={() => setIsRemoveHovered(false)}
        aria-label="Remove"
      >
        <ContentRemove size="xs" style={{ color: colorStyles.iconColor }} />
      </button>
    </div>
  )
}

InputChip.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  startIcon: PropTypes.node,
  onRemove: PropTypes.func.isRequired,
  onClick: PropTypes.func
}
