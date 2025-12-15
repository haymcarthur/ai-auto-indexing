import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * DiscoveryHeritage Icon
 */
export const DiscoveryHeritage = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M20 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm0-6a4 4 0 0 0-4 4c0 3 4 6 4 6s4-3 4-6a4 4 0 0 0-4-4Zm-6-8V3a8.22 8.22 0 0 1 3 3h-3Zm-2 0H8V2.27a7.75 7.75 0 0 1 4 0V6Zm0 6H8V8h4v4Zm0 5.74a8 8 0 0 1-4 0V14h4v3.74ZM6 6.01H3a8.22 8.22 0 0 1 3-3v3Zm0 6H2.26a7.75 7.75 0 0 1 0-4H6v4Zm0 5a8.37 8.37 0 0 1-3-3h3v3Zm12-7c0 .67-.09 1.34-.26 2h2.06a10 10 0 1 0-5.8 7.16V8h3.74c.17.66.26 1.33.26 2Z" fillRule="evenodd" />
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

DiscoveryHeritage.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
