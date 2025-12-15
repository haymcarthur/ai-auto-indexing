import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * MediaVolumeMute Icon
 */
export const MediaVolumeMute = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="m13.49 18.33-2.65-3.79 2.65-2.65v6.44ZM21 4.38 19.62 3 3 19.62 4.38 21l5.06-5L12 19.61c.54.66 1.45.88 2.24.55a2 2 0 0 0 1.21-1.81V9.94L21 4.38ZM7 13.5V9.85h3.53L14 5v1.65l2-1.92a1.94 1.94 0 0 0-1.2-1.58c-.75-.3-1.6-.13-2.19.42L9.49 7.89H7a2 2 0 0 0-2 2v3.91c.01.44.18.87.47 1.2L7 13.5Z" fillRule="evenodd" />
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

MediaVolumeMute.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
