import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * MediaForward Icon
 */
export const MediaForward = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M20.61 11.2 10.29 3 9 4.6l9.32 7.4L9 19.4l1.29 1.6 10.32-8.2a1 1 0 0 0 .2-1.4 1 1 0 0 0-.2-.2ZM5.93 17V7l6.14 5ZM14 12a2 2 0 0 0-.74-1.59l-6.15-5a1.91 1.91 0 0 0-2-.22A2 2 0 0 0 4 7v10a2 2 0 0 0 1.08 1.8 1.85 1.85 0 0 0 2-.21l6.15-5A2 2 0 0 0 14 12Z" />
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

MediaForward.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
