import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * SocialSend Icon
 */
export const SocialSend = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M9.86 16.2A55.96 55.96 0 0 1 3 19l3.66-6h10.55l-7.35 3.2ZM3.08 5c2.32.8 4.6 1.74 6.81 2.81 1.91.84 4.31 1.9 7.32 3.2H6.69L3.08 5Zm19.32 6.09A905.83 905.83 0 0 1 10.71 6C5.33 3.64 3.88 3 2.87 3c-.56 0-1.08.25-1.42.69A2 2 0 0 0 1.28 6L5 12l-3.72 6.05a2 2 0 0 0 .17 2.26c.34.45.87.7 1.43.69 1 0 2.44-.64 7.8-3 2.76-1.22 6.53-2.88 11.72-5.1a1 1 0 0 0 .6-.9 1 1 0 0 0-.6-.91Z" fillRule="evenodd" />
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

SocialSend.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
