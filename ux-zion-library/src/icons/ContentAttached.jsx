import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ContentAttached Icon
 */
export const ContentAttached = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M15.41 2H6a2 2 0 0 0-2 2v7.1a5 5 0 0 0 0 8v.9c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V6.59L15.41 2ZM6 20v-7.7a4.3 4.3 0 0 1 1.5-.3H12c.6 0 2 .15 2 1.53s-1.4 1.52-2 1.52H8v2h4c2.4 0 4-1.43 4-3.56S14.39 10 12 10H7.5c-.5 0-1 .07-1.5.19V4h8v4h4v12H6Zm16-8" />
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

ContentAttached.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
