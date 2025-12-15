import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * DiscoveryWheelchair Icon
 */
export const DiscoveryWheelchair = ({ size = 'sm', backgroundColor, ...props }) => {
  const iconSize = iconSizes[size]

  const svg = (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M9.5 20a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7ZM10 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm8.82 15-1-5H14.4a5.6 5.6 0 0 0-1.74-2H17v-2h-6V7.82a3 3 0 1 0-2 0V11a5.5 5.5 0 1 0 6 5.48v-.5h1.2l1 5H20V19h-1.18Z" fillRule="evenodd" />
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

DiscoveryWheelchair.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
