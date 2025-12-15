import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * PlaceVillage Icon
 */
export const PlaceVillage = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M14 17h3v-3h-3Zm-7 0h3v-3H7Zm-3-6 2-4h13l2 4Zm10 9v-2h-4v2H6v-7h12v7ZM8 4h1v1H8Zm7 0h1v1h-1Zm7.89 7.55-3-6A1 1 0 0 0 19 5h-1V3a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v2h-2V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2H5a1 1 0 0 0-.89.55l-3 6A1 1 0 0 0 2 13h2v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8h2a1 1 0 0 0 .89-1.45Z" />
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

PlaceVillage.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
