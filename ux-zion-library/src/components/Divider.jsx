import React from 'react'
import PropTypes from 'prop-types'
import { transparentColors } from '../tokens/colors'
import { paragraph } from '../tokens/typography'

/**
 * Divider
 *
 * A simple divider line component for separating content.
 * Matches Zion UI design system.
 *
 * @param {string} orientation - Orientation of the divider: 'horizontal' or 'vertical'
 * @param {string} label - Optional label text to display in the divider
 */
export const Divider = ({
  orientation = 'horizontal',
  label,
  ...rest
}) => {
  const lineStyles = {
    width: orientation === 'horizontal' ? '100%' : '1px',
    height: orientation === 'horizontal' ? '1px' : '100%',
    backgroundColor: transparentColors.transparentGray10,
    border: 'none',
    margin: 0
  }

  const labelStyles = {
    ...paragraph.xs,
    color: transparentColors.transparentGray80,
    margin: 0,
    marginTop: orientation === 'horizontal' ? '6px' : 0,
    marginLeft: orientation === 'vertical' ? '6px' : 0
  }

  const containerStyles = {
    display: 'flex',
    flexDirection: orientation === 'horizontal' ? 'column' : 'row',
    alignItems: orientation === 'horizontal' ? 'stretch' : 'flex-start'
  }

  // If no label, render simple divider
  if (!label) {
    return <hr style={lineStyles} {...rest} />
  }

  // Render divider with label below (or to the right for vertical)
  return (
    <div style={containerStyles} {...rest}>
      <hr style={lineStyles} />
      <span style={labelStyles}>{label}</span>
    </div>
  )
}

Divider.propTypes = {
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  label: PropTypes.string
}
