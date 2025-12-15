import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * DiscoveryNameMeaning Icon
 */
export const DiscoveryNameMeaning = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M10 16a2.79 2.79 0 0 1 2.56-3H13a2.79 2.79 0 0 1 3 3h-6Zm5-6a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM7 20v-2h1v-2H7v-3h1v-2H7V8h1V6H7V4h12v16H7ZM19 2H7a2 2 0 0 0-2 2v2H3v2h2v3H3v2h2v3H3v2h2v2c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" fillRule="evenodd" />
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

DiscoveryNameMeaning.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
