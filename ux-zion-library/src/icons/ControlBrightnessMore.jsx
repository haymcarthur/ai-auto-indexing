import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ControlBrightnessMore Icon
 */
export const ControlBrightnessMore = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M11 1.05h2V4h-2V1.05Zm-6.04 2.5 1.8 1.79-1.42 1.41-1.79-1.79 1.41-1.41ZM4 11H1v2h3v-2Zm16.45-6.05-1.4-1.4-1.8 1.78 1.4 1.41 1.8-1.79Zm-3.21 13.71 1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4ZM23 11h-3v2h3v-2ZM12 6a6 6 0 1 0 .01 12.01A6 6 0 0 0 12 6Zm-4 6a4 4 0 1 0 8 0 4 4 0 0 0-8 0Zm5 8v2.95h-2V20h2Zm-8.04.45-1.41-1.41 1.79-1.8 1.41 1.41-1.79 1.8Z" />
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

ControlBrightnessMore.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
