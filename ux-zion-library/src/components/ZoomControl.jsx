import React from 'react'
import PropTypes from 'prop-types'
import { colors } from '../tokens/colors'
import { elevation } from '../tokens/elevation'
import { ControlZoomOut, ControlZoomIn } from '../icons'

/**
 * ZoomControl
 *
 * A combined zoom control with zoom out (left) and zoom in (right) buttons.
 * Matches Zion UI design system.
 *
 * @param {function} onZoomOut - Callback when zoom out is clicked
 * @param {function} onZoomIn - Callback when zoom in is clicked
 * @param {boolean} disabled - Whether the control is disabled
 */
export const ZoomControl = ({
  onZoomOut,
  onZoomIn,
  disabled = false,
  ...rest
}) => {
  const [isContainerHovered, setIsContainerHovered] = React.useState(false)
  const [isZoomOutHovered, setIsZoomOutHovered] = React.useState(false)
  const [isZoomInHovered, setIsZoomInHovered] = React.useState(false)

  const containerStyles = {
    display: 'inline-flex',
    width: '72px',
    height: '36px',
    borderRadius: '4px',
    backgroundColor: colors.gray.gray00,
    boxShadow: isContainerHovered && !disabled ? elevation[4] : elevation[2],
    overflow: 'hidden',
    transition: 'box-shadow 0.15s ease'
  }

  const getButtonStyles = (isHovered) => ({
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: isHovered && !disabled ? colors.gray.gray02 : colors.gray.gray00,
    cursor: disabled ? 'not-allowed' : 'pointer',
    padding: 0,
    transition: 'background-color 0.15s ease',
    opacity: disabled ? 0.4 : 1
  })

  const handleZoomOut = () => {
    if (!disabled && onZoomOut) {
      onZoomOut()
    }
  }

  const handleZoomIn = () => {
    if (!disabled && onZoomIn) {
      onZoomIn()
    }
  }

  return (
    <div
      style={containerStyles}
      onMouseEnter={() => setIsContainerHovered(true)}
      onMouseLeave={() => setIsContainerHovered(false)}
      {...rest}
    >
      <button
        style={getButtonStyles(isZoomOutHovered)}
        onClick={handleZoomOut}
        disabled={disabled}
        aria-label="Zoom out"
        onMouseEnter={() => setIsZoomOutHovered(true)}
        onMouseLeave={() => setIsZoomOutHovered(false)}
      >
        <ControlZoomOut size="sm" color={colors.gray.gray100} />
      </button>
      <button
        style={getButtonStyles(isZoomInHovered)}
        onClick={handleZoomIn}
        disabled={disabled}
        aria-label="Zoom in"
        onMouseEnter={() => setIsZoomInHovered(true)}
        onMouseLeave={() => setIsZoomInHovered(false)}
      >
        <ControlZoomIn size="sm" color={colors.gray.gray100} />
      </button>
    </div>
  )
}

ZoomControl.propTypes = {
  onZoomOut: PropTypes.func,
  onZoomIn: PropTypes.func,
  disabled: PropTypes.bool
}
