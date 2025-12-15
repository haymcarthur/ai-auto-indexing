import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * SocialLove Icon
 */
export const SocialLove = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M8 6a3 3 0 0 0-3 3c0 3.36 4.64 7.21 7 8.81 2.36-1.6 7-5.45 7-8.81a3 3 0 0 0-3-3 3.16 3.16 0 0 0-3 3 1 1 0 0 1-2 0 3.16 3.16 0 0 0-3-3Zm4 14a1 1 0 0 1-.53-.15C11.12 19.63 3 14.49 3 9a5 5 0 0 1 5-5 5.09 5.09 0 0 1 4 2.08A5.09 5.09 0 0 1 16 4a5 5 0 0 1 5 5c0 5.49-8.12 10.63-8.47 10.85A1 1 0 0 1 12 20Z" />
      <path d="M12 19c-2.77-1.74-8-6.07-8-10a4 4 0 0 1 4-4 4.09 4.09 0 0 1 3.19 1.67l.81 1.1.81-1.1A4.12 4.12 0 0 1 16 5a4 4 0 0 1 4 4c0 3.93-5.23 8.26-8 10Z" />
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

SocialLove.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
