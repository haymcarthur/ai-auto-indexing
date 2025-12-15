import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { colors } from '../tokens/colors'
import { elevation } from '../tokens/elevation'

/**
 * Slider
 *
 * A slider component with a draggable handle that can move along a track.
 * Matches Zion UI design system.
 *
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {number} value - Current value
 * @param {function} onChange - Callback when value changes
 * @param {number} step - Step increment (default 1)
 */
export const Slider = ({
  min = 0,
  max = 100,
  value = 50,
  onChange,
  step = 1,
  ...rest
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const trackRef = useRef(null)

  // Calculate percentage position
  const percentage = ((value - min) / (max - min)) * 100

  // Update value based on mouse position
  const updateValue = (clientX) => {
    if (!trackRef.current) return

    const rect = trackRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percentage = x / rect.width
    let newValue = min + percentage * (max - min)

    // Snap to step
    newValue = Math.round(newValue / step) * step

    // Clamp to min/max
    newValue = Math.max(min, Math.min(max, newValue))

    if (onChange && newValue !== value) {
      onChange(newValue)
    }
  }

  // Mouse down handler
  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
    updateValue(e.clientX)
  }

  // Track click handler
  const handleTrackClick = (e) => {
    if (e.target === trackRef.current) {
      updateValue(e.clientX)
    }
  }

  // Global mouse event handlers
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        updateValue(e.clientX)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, min, max, step])

  // Container styles
  const containerStyles = {
    position: 'relative',
    width: '100%',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none'
  }

  // Track styles
  const trackStyles = {
    position: 'relative',
    width: '100%',
    height: '1px',
    backgroundColor: colors.gray.gray40,
    cursor: 'pointer'
  }

  // Handle styles
  const handleSize = isHovered || isDragging ? '18px' : '15px'
  const handleColor = isHovered || isDragging ? colors.blue.blue60 : colors.blue.blue80
  const handleElevation = isHovered || isDragging ? elevation[2] : elevation[1]

  const handleStyles = {
    position: 'absolute',
    top: '50%',
    left: `${percentage}%`,
    width: handleSize,
    height: handleSize,
    backgroundColor: handleColor,
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
    boxShadow: handleElevation,
    transition: isDragging ? 'none' : 'all 0.2s ease',
    zIndex: 1
  }

  return (
    <div style={containerStyles} {...rest}>
      <div
        ref={trackRef}
        style={trackStyles}
        onClick={handleTrackClick}
      >
        <div
          style={handleStyles}
          onMouseDown={handleMouseDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </div>
    </div>
  )
}

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func,
  step: PropTypes.number
}
