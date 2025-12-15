import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ActivitySoccer Icon
 */
export const ActivitySoccer = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M9.35 19.42 9 17l1.8-2h3.4l1.8 2-.35 2.45a8.88 8.88 0 0 1-6.3 0ZM9.14 4 11 5.77V9l-1.4 1-3.32-.94L5 7a8.11 8.11 0 0 1 4.14-3ZM19 7l-1.28 2.06-3.32.94L13 9V5.77L14.86 4A8.11 8.11 0 0 1 19 7ZM7.35 15.76 5 16a8.45 8.45 0 0 1-1-3.61L6 11l2.68.87.32 1.81ZM19 16l-2.34-.24L15 13.68l.33-1.81L18 11l2 1.39A8.45 8.45 0 0 1 19 16ZM12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z" />
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

ActivitySoccer.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
