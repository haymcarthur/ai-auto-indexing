import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * MediaSkipBackward15 Icon
 */
export const MediaSkipBackward15 = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M12 2a10.35 10.35 0 0 0-7.1 2.9L3 3v6h6L6.4 6.4A7.64 7.64 0 0 1 12 4a8 8 0 0 1 0 16v2a10 10 0 0 0 0-20m-1 14.05H9.72v-4.71a3.51 3.51 0 0 1-.44.42l-.69.56-.59-.77L10 10h1Zm3.08-3.87A1.9 1.9 0 0 1 16 14.06a2 2 0 0 1-.2.83c-.56 1.42-2.58 1.46-3.8.89V14.7a2.57 2.57 0 0 0 2.38.16 1 1 0 0 0 0-1.41 2.24 2.24 0 0 0-1.76-.1l-.51-.27.2-3.08h3.19v1.08h-2.08l-.1 1.19a3.22 3.22 0 0 1 .76-.09Z" />
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

MediaSkipBackward15.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
