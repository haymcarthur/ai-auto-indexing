import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * HelpPreserver Icon
 */
export const HelpPreserver = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M14 18.7v-3.26A4 4 0 0 0 15.44 14h3.26a7 7 0 0 1-4.7 4.7ZM5.3 14h3.26A4 4 0 0 0 10 15.44v3.26A7 7 0 0 1 5.3 14ZM10 5.3v3.26A3.83 3.83 0 0 0 8.56 10H5.3A7 7 0 0 1 10 5.3Zm2 8.7a2 2 0 1 1 2-2 2 2 0 0 1-2 2Zm6.7-4h-3.26A3.83 3.83 0 0 0 14 8.56V5.3a7 7 0 0 1 4.7 4.7Zm2.3 0h-.23A9 9 0 0 0 14 3.23V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.23A9 9 0 0 0 3.23 10H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.23A9 9 0 0 0 10 20.77V21a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.23A9 9 0 0 0 20.77 14H21a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z" />
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

HelpPreserver.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
