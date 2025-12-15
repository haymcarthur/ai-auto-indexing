import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * DiscoveryNamePopularity Icon
 */
export const DiscoveryNamePopularity = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M21 15h-1a1 1 0 0 0-1 1v4h-2v-4a1 1 0 0 0-1-1h-1v-2a3 3 0 1 1 6 0v2Zm-3-7a5 5 0 0 0-5 5v3a1 1 0 0 0 1 1h1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4h1a1 1 0 0 0 1-1v-3a5 5 0 0 0-5-5Zm0-2a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm3-1a3 3 0 1 0-6 0 3 3 0 0 0 6 0ZM7 6v2H5a7.6 7.6 0 0 1 2-2Zm0 8H4.26a7.75 7.75 0 0 1 0-4H7v4Zm0 4a7.6 7.6 0 0 1-2-2h2v2Zm-5-6a10 10 0 0 0 10 10v-2a7.9 7.9 0 0 1-3-.59V16h3v-2H9v-4h3V8H9V4.59A7.9 7.9 0 0 1 12 4V2A10 10 0 0 0 2 12Z" fillRule="evenodd" />
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

DiscoveryNamePopularity.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
