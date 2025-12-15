import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { colors } from '../tokens/colors'
import { body } from '../tokens/typography'

/**
 * TooltipOverlay
 *
 * A tooltip overlay component for displaying helpful text on hover.
 * Matches Zion UI design system.
 *
 * @param {node} children - Tooltip content text
 * @param {element} triggerElement - Element that triggers the tooltip
 * @param {string} position - Tooltip position: 'top', 'bottom', 'left', 'right'
 * @param {boolean} visible - Control tooltip visibility
 */
export const TooltipOverlay = ({
  children,
  position = 'top',
  visible = false,
  style = {},
  ...rest
}) => {
  const tooltipRef = useRef(null)

  // Tooltip styles
  const tooltipStyles = {
    padding: '2px 8px',
    borderRadius: '4px',
    backgroundColor: colors.gray.gray100,
    boxSizing: 'border-box',
    ...body.a,
    color: colors.gray.gray00,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    ...style
  }

  if (!visible) return null

  return (
    <div ref={tooltipRef} style={tooltipStyles} {...rest}>
      {children}
    </div>
  )
}

TooltipOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  visible: PropTypes.bool,
  style: PropTypes.object
}

/**
 * Tooltip Hook
 *
 * Hook to manage tooltip state
 */
export const useTooltip = () => {
  const [isVisible, setIsVisible] = useState(false)

  const showTooltip = () => setIsVisible(true)
  const hideTooltip = () => setIsVisible(false)

  return {
    isVisible,
    showTooltip,
    hideTooltip
  }
}
