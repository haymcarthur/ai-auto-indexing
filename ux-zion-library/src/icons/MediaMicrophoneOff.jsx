import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * MediaMicrophoneOff Icon
 */
export const MediaMicrophoneOff = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M13.27 4.9a1.19 1.19 0 0 0-2.38 0v3.9l-1.78 1.79V5A3 3 0 0 1 15 4.65l-1.73 1.76V4.9ZM5.14 11h1.69c0 .56.09 1.11.26 1.64L5.83 13.9c-.45-.9-.68-1.9-.69-2.9ZM21 4.27l-1.4-1.41L3 19.59 4.4 21l4.16-4.2a7 7 0 0 0 2.53.9V21h2v-3.3A7 7 0 0 0 19 11h-1.67a5.16 5.16 0 0 1-5.22 5.1c-.8 0-1.57-.18-2.29-.52l1.65-1.66A3 3 0 0 0 15.11 11v-.73l5.9-6Z" fillRule="evenodd" />
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

MediaMicrophoneOff.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
