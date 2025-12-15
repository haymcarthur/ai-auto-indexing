import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * PlaceFarm Icon
 */
export const PlaceFarm = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M19 19v-3h-4v3h-1v-6.38l3-1.5 3 1.5V19ZM5 15h3v4H5ZM6.5 5A1.5 1.5 0 0 1 8 6.5V8H5V6.5A1.5 1.5 0 0 1 6.5 5ZM8 13H5v-3h3Zm14 6v-7a1 1 0 0 0-.55-.89l-4-2a1 1 0 0 0-.9 0l-4 2A1 1 0 0 0 12 12v7h-2V6.5a3.5 3.5 0 0 0-7 0V19H0v2h24v-2Z" />
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

PlaceFarm.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
