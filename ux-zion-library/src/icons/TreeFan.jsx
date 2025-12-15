import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * TreeFan Icon
 */
export const TreeFan = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M0 15v1a1 1 0 0 0 1 1h7.54a4 4 0 0 0 6.92 0H23a1 1 0 0 0 1-1v-1a12 12 0 0 0-24 0Zm16 0h2a6 6 0 0 0-1.36-3.81l-1.43 1.43A3.93 3.93 0 0 1 16 15Zm4 0a8 8 0 0 0-1.94-5.23l1.41-1.41A9.93 9.93 0 0 1 21.8 13a10.36 10.36 0 0 1 .2 2Zm-3.43-6.57L18 7a10 10 0 0 0-5-1.95v2a8.11 8.11 0 0 1 3.57 1.38ZM6 7a10 10 0 0 1 5-1.95v2a8.11 8.11 0 0 0-3.57 1.38Zm2.88 2.88a6 6 0 0 1 6.24 0l-1.47 1.47a4 4 0 0 0-3.3 0Zm-1.52 1.31 1.43 1.43A3.93 3.93 0 0 0 8 15H6a6 6 0 0 1 1.36-3.81ZM5.94 9.77A8 8 0 0 0 4 15H2a10.36 10.36 0 0 1 .2-2 9.93 9.93 0 0 1 2.33-4.64ZM12 17a2 2 0 1 0-2-2 2 2 0 0 0 2 2Z" />
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

TreeFan.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
