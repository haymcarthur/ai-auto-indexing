import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * NoticeMute Icon
 */
export const NoticeMute = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="m8 10.7-2.16 2.15c.1-.32.16-.66.16-1V9a6 6 0 0 1 8.94-5.22l-1.5 1.5A4 4 0 0 0 8 9v1.7Zm.5 8.3a4.06 4.06 0 0 0 7 0h-7Zm-.67-3 8-8c.1.32.16.66.17 1v2.84c0 1.62.74 3.15 2 4.16H7.83ZM18 11.84V9c0-.9-.2-1.78-.59-2.58l4.5-4.51L20.5.5.82 20.18l1.42 1.41L5.83 18H21v-2.72l-.68-.23A3.37 3.37 0 0 1 18 11.84Z" />
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

NoticeMute.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
