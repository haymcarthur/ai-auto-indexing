import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ControlDashboard Icon
 */
export const ControlDashboard = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M11 21h8c.55 0 1.02-.2 1.41-.59.39-.39.59-.86.59-1.41v-6H11v8zm10-10V5c0-.55-.2-1.02-.59-1.41A1.93 1.93 0 0 0 19 3h-4v8h6zM3 11h10V3H5c-.55 0-1.02.2-1.41.59S3 4.45 3 5v6zm6 10v-8H3v6c0 .55.2 1.02.59 1.41.39.39.86.59 1.41.59h4zm4-2v-4h6v4h-6zm4-10V5h2v4h-2zm-6 0H5V5h6v4zM7 19H5v-4h2v4z" />
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

ControlDashboard.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
