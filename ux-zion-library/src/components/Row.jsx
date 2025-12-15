import React from 'react'
import PropTypes from 'prop-types'

/**
 * Row
 *
 * A flex row container for laying out components horizontally.
 * Matches Zion UI design system.
 *
 * @param {node} children - Child elements
 * @param {string} alignX - Horizontal alignment: 'start', 'center', 'end', 'space-between'
 * @param {string} alignY - Vertical alignment: 'start', 'center', 'end', 'stretch'
 * @param {number} gap - Gap between items (in spacing units, 1 unit = 4px)
 */
export const Row = ({
  children,
  alignX = 'start',
  alignY = 'center',
  gap = 0,
  ...rest
}) => {
  const getJustifyContent = () => {
    switch (alignX) {
      case 'center':
        return 'center'
      case 'end':
        return 'flex-end'
      case 'space-between':
        return 'space-between'
      case 'start':
      default:
        return 'flex-start'
    }
  }

  const getAlignItems = () => {
    switch (alignY) {
      case 'start':
        return 'flex-start'
      case 'end':
        return 'flex-end'
      case 'stretch':
        return 'stretch'
      case 'center':
      default:
        return 'center'
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: getJustifyContent(),
        alignItems: getAlignItems(),
        gap: `${gap * 4}px`
      }}
      {...rest}
    >
      {children}
    </div>
  )
}

Row.propTypes = {
  children: PropTypes.node,
  alignX: PropTypes.oneOf(['start', 'center', 'end', 'space-between']),
  alignY: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
  gap: PropTypes.number
}
