import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * MediaBackward Icon
 */
export const MediaBackward = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M15 4.6 13.71 3 3.39 11.2a1 1 0 0 0-.2 1.4 1 1 0 0 0 .2.2L13.71 21 15 19.4 5.68 12ZM18.07 17l-6.14-5 6.14-5Zm.85-11.8a1.91 1.91 0 0 0-2 .22l-6.15 5a2.07 2.07 0 0 0-.25 2.92l.25.25 6.15 5a1.85 1.85 0 0 0 2 .21A2 2 0 0 0 20 17V7a2 2 0 0 0-1.08-1.8Z" />
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

MediaBackward.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
