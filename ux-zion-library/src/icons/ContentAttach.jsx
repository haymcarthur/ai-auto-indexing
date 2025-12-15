import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ContentAttach Icon
 */
export const ContentAttach = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M10 23c-2.9 0-5-2.31-5-5.5V9c0-4 2.79-7 6.5-7S18 5 18 9v7h-2V9c0-2.9-1.89-5-4.5-5S7 6.1 7 9v8.5c0 1.74.93 3.5 3 3.5s3-1.76 3-3.5V10c0-.6-.15-2-1.5-2S10 9.4 10 10v7H8v-7c0-2.39 1.41-4 3.5-4S15 7.61 15 10v7.5c0 3.19-2.1 5.5-5 5.5Z" />
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

ContentAttach.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
