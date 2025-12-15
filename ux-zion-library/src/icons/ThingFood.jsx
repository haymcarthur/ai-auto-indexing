import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ThingFood Icon
 */
export const ThingFood = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M8 6V2H6v4a2 2 0 0 1-1 1.72V2H3v5.72A2 2 0 0 1 2 6V2H0v4a4 4 0 0 0 3 3.86V22h2V9.86A4 4 0 0 0 8 6Zm13 8V7a27.15 27.15 0 0 1 1 7Zm-.29-11.71a1 1 0 0 0-1.41 0A1 1 0 0 0 19 3v19h2v-6h2a1 1 0 0 0 1-1c0-9.31-3.16-12.57-3.29-12.71ZM12 19a4 4 0 1 1 4-4 4 4 0 0 1-4 4Zm0-10a6 6 0 1 0 6 6 6 6 0 0 0-6-6Zm1.5 4a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0-3 0C9 16 12 18 12 18s3-2 3-3.5a1.5 1.5 0 0 0-1.5-1.5Z" />
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

ThingFood.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
