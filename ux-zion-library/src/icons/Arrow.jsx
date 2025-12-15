import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * Arrow Icon
 *
 * A directional arrow icon matching Zion UI design system.
 *
 * @param {string} direction - Arrow direction: 'forward', 'backward', 'up', 'down'
 * @param {string} width - Icon width (default: '20px')
 * @param {string} height - Icon height (default: '20px')
 */
export const Arrow = ({ direction = 'forward', size = 'sm', backgroundColor, ...rest }) => {
  const iconSize = iconSizes[size]

  // Rotation based on direction
  const getRotation = () => {
    switch (direction) {
      case 'backward':
        return '180deg'
      case 'up':
        return '-90deg'
      case 'down':
        return '90deg'
      case 'forward':
      default:
        return '0deg'
    }
  }

  const svg = (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: `rotate(${getRotation()})`,
        display: 'block'
      }}
      {...rest}
    >
      {/* Arrow line */}
      <path
        d="M4 10H16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arrow head */}
      <path
        d="M11 5L16 10L11 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  if (backgroundColor) {
    return (
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor,
        borderRadius: '50%',
        padding: iconBackgroundPadding[size]
      }}>
        {svg}
      </div>
    )
  }

  return svg
}

Arrow.propTypes = {
  direction: PropTypes.oneOf(['forward', 'backward', 'up', 'down']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
