import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ThingMovie Icon
 */
export const ThingMovie = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="m20 16-3-1v-2l3-1ZM5 17v-6h10v6Zm16.53-6.85a1 1 0 0 0-1 0L17 11a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4l-5 5h2.65L10 20.65 13.35 24H16l-5-5h4a2 2 0 0 0 2-2l3.55.9a1 1 0 0 0 1 0A1 1 0 0 0 22 17v-6a1 1 0 0 0-.47-.85ZM14 4a1 1 0 1 1-1 1 1 1 0 0 1 1-1Zm0 4a3 3 0 1 0-3-3 3 3 0 0 0 3 3ZM6 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2Zm0 6a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
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

ThingMovie.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
