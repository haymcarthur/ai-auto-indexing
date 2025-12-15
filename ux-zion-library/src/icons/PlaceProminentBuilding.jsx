import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * PlaceProminentBuilding Icon
 */
export const PlaceProminentBuilding = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M14 19h2v-5h-2Zm-3 0h2v-5h-2Zm-3 0h2v-5H8Zm13 1H3v-4h3a1 1 0 0 0 1-1v-2.28l5-1.67 5 1.67V15a1 1 0 0 0 1 1h3ZM9 9a3 3 0 0 1 6 0v1l-2.68-.9a1 1 0 0 0-.64 0L9 10Zm13 5h-3v-2a1 1 0 0 0-.68-.95L17 10.61V9a5 5 0 0 0-4-4.9V2h-2v2.1A5 5 0 0 0 7 9v1.61l-1.32.44A1 1 0 0 0 5 12v2H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1Z" />
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

PlaceProminentBuilding.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
