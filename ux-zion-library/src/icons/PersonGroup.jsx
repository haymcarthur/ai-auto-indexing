import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * PersonGroup Icon
 */
export const PersonGroup = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M18 15a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 18 15Zm2.37 4.06a3.5 3.5 0 1 0-5-.21l.21.21C14.15 19.59 13 20.62 13 22h2c0-.6 1.41-1.36 3-1.36s3 .76 3 1.36h2c0-1.38-1.15-2.41-2.63-2.94ZM6 15a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 6 15Zm2.37 4.06a3.5 3.5 0 1 0-4.95-.21l.21.21C2.15 19.59 1 20.62 1 22h2c0-.6 1.41-1.36 3-1.36S9 21.4 9 22h2c0-1.38-1.15-2.41-2.63-2.94ZM12 4a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 12 4Zm3 7h2c0-1.38-1.15-2.41-2.63-2.94a3.5 3.5 0 1 0-4.95-.21l.21.21C8.15 8.59 7 9.62 7 11h2c0-.6 1.41-1.36 3-1.36s3 .76 3 1.36Z" />
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

PersonGroup.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
