import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * DocumentCertificate Icon
 */
export const DocumentCertificate = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M12 11H7V9h5v2Zm-6 9V4h8v4h6V6.59L15.41 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h7v-2H6Zm17.99-5A6 6 0 0 1 21 20.19v2.82a1 1 0 0 1-1.71.7L18 22.41l-1.28 1.29A1 1 0 0 1 15 23v-2.81A6 6 0 0 1 18 9a6.03 6.03 0 0 1 5.99 6ZM22 15c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4 4-1.8 4-4ZM7 14h4v-2H7v2Zm12-1a1 1 0 0 0-1 1c0-.55-.45-1-1-1s-1 .45-1 1c0 1 2 3 2 3s2-2 2-3a1 1 0 0 0-1-1Z" />
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

DocumentCertificate.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
