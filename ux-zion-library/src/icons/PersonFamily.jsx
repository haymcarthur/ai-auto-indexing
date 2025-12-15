import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * PersonFamily Icon
 */
export const PersonFamily = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M15 19a2 2 0 0 1 4 0Zm2-7a1 1 0 1 1-1 1 1 1 0 0 1 1-1Zm1.75 3.42a3 3 0 1 0-3.5 0A4 4 0 0 0 13 19v1a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1a4 4 0 0 0-2.25-3.58Zm-7.75.41h-1a1 1 0 0 0-1 1v3.08H7v-3.05a1 1 0 0 0-1-1H5v-1a3.05 3.05 0 0 1 3-3.09 3.05 3.05 0 0 1 3 3.09ZM8 6.06a1 1 0 1 1-1 1 1 1 0 0 1 1-1Zm5 8.74a5.13 5.13 0 0 0-3.7-5A3.09 3.09 0 0 0 8 4a3.09 3.09 0 0 0-1.3 5.85 5.13 5.13 0 0 0-3.7 5v2.06a1 1 0 0 0 1 1h1V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3.11h1a1 1 0 0 0 1-1Z" />
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

PersonFamily.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
