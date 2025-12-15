import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ContentDetach Icon
 */
export const ContentDetach = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="m4.38 21 1.09-1.09A4.82 4.82 0 0 0 10 23c2.9 0 5-2.38 5-5.65v-7l1.19-1.19V16H18V9.12c0-.53-.05-1.07-.15-1.59L21 4.38 19.62 3 3 19.62 4.38 21Zm2.7-2.7L13 12.39v5c0 1.79-.93 3.59-3 3.59a2.93 2.93 0 0 1-2.92-2.68ZM11.36 4C8.81 4 7 6 7 8.82v4.23L5 15V8.82C5 4.93 7.74 2 11.36 2A6.13 6.13 0 0 1 16 4.05l-1.38 1.38A4.18 4.18 0 0 0 11.36 4ZM8 12V9.78A3.57 3.57 0 0 1 11.33 6h.4c.8-.02 1.6.22 2.27.67L12.46 8a1.65 1.65 0 0 0-2.35 1.53v.54L8 12Z" />
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

ContentDetach.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
