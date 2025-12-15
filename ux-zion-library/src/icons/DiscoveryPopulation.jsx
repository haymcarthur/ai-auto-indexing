import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * DiscoveryPopulation Icon
 */
export const DiscoveryPopulation = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M19 18a5 5 0 0 0-5 5v1h2v-1a3 3 0 1 1 6 0v1h2v-1a5 5 0 0 0-5-5Zm0-2a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm3-1a3 3 0 1 0-6 0 3 3 0 0 0 6 0ZM9 6V2.26a7.75 7.75 0 0 1 4 0V6H9ZM7 6H4a8.3 8.3 0 0 1 3-3v3Zm0 6H3.26a7.75 7.75 0 0 1 0-4H7v4Zm0 5a8.3 8.3 0 0 1-3-3h3v3Zm8-14a8.3 8.3 0 0 1 3 3h-3V3Zm0 7V8h3.74c.17.65.26 1.32.26 2h2a10 10 0 1 0-8 9.8v-2.06a7.75 7.75 0 0 1-4 0V14h4v-2H9V8h4v2h2Z" fillRule="evenodd" />
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

DiscoveryPopulation.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
