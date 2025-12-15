import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * DiscoveryTradition Icon
 */
export const DiscoveryTradition = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M10.8 6.5 12 5.3l1.2 1.2 1.3-1.3L13.3 4l1.2-1.2-1.3-1.3L12 2.7l-1.2-1.2-1.3 1.3L10.7 4 9.5 5.2Zm.3 14 4.7-1.8.9 1.8Zm.9-9.6 1.2 2.3-2.9 1.2Zm3 6-7.3 2.7L9 17.1l5.1-2.1Zm4.4 4.2L13 8.1a1.13 1.13 0 0 0-1.53-.47 1.18 1.18 0 0 0-.47.47l-6.4 13a.91.91 0 0 0 .1 1 1.27 1.27 0 0 0 .9.4h12.9a1.05 1.05 0 0 0 .9-.5 1 1 0 0 0 0-.9Z" />
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

DiscoveryTradition.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
