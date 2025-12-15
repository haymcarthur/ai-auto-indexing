import React from 'react'
import PropTypes from 'prop-types'
import { colors, transparentColors, buttonColors } from '../tokens/colors'

/**
 * FilterChip
 *
 * Non-clickable chip for filtering content.
 *
 * @param {string} label - Text to display in the chip
 * @param {boolean} selected - Whether the chip is selected
 * @param {boolean} disabled - Whether the chip is disabled
 */
export const FilterChip = ({ label, selected = false, disabled = false, ...rest }) => {
  const chipStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50px',
    paddingLeft: '11px',
    paddingRight: '11px',
    paddingTop: '8px',
    paddingBottom: '8px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'default',
    transition: 'all 0.2s ease',
    fontFamily: '"Lato", sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1,
    userSelect: 'none',
    backgroundColor: disabled
      ? transparentColors.transparentGray03
      : selected
      ? buttonColors.highBlue
      : transparentColors.transparentGray03,
    color: disabled
      ? colors.gray.gray40
      : selected
      ? buttonColors.highText
      : colors.gray.gray100
  }

  return (
    <div style={chipStyles} {...rest}>
      {label}
    </div>
  )
}

FilterChip.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  disabled: PropTypes.bool
}
