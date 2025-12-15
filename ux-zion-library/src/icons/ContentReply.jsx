import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ContentReply Icon
 */
export const ContentReply = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M10.18 19.68a.92.92 0 0 1-.64-.26l-7.27-7.28a.89.89 0 0 1-.02-1.26l.02-.02 7.27-7.28a.91.91 0 0 1 1.55.65v3.63C17.72 7.86 22 12 22 18.32v.45c0 .5-.39.9-.88.91a.92.92 0 0 1-.91-.85c-.23-3.45-2.1-5.06-5.91-5.06a7.46 7.46 0 0 0-3.18.54v4.46a.9.9 0 0 1-.56.84.83.83 0 0 1-.38.07Zm-6-8.18 5.08 5.08v-2.81c0-.32.18-.6.45-.77a8.44 8.44 0 0 1 4.56-1 9.55 9.55 0 0 1 4.18.83c-1.56-2-4.1-3.1-7.36-3.1h-.91a.9.9 0 0 1-.91-.91v-2.4L4.18 11.5Z" />
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

ContentReply.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
