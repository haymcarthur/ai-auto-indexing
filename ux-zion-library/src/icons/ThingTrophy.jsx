import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ThingTrophy Icon
 */
export const ThingTrophy = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M20 7a1 1 0 0 1-.37.75L18 9V5h2Zm-8 6a4 4 0 0 1-4-4V4h8v5a4 4 0 0 1-4 4ZM4.37 7.74A1 1 0 0 1 4 7V5h2v4ZM14 20h-4v-1h4Zm7-17h-3.28A2 2 0 0 0 16 2H8a2 2 0 0 0-1.72 1H3a1 1 0 0 0-1 1v3a3 3 0 0 0 1.13 2.38l4.17 3.34a6 6 0 0 0 3.7 2.19V17H9a1 1 0 0 0-1 1v2H7v2h10v-2h-1v-2a1 1 0 0 0-1-1h-2v-2.09a6 6 0 0 0 3.7-2.19l4.18-3.34A3 3 0 0 0 22 7V4a1 1 0 0 0-1-1Z" />
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

ThingTrophy.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
