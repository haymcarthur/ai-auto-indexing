import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * PlaceIsland Icon
 */
export const PlaceIsland = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="m10.75 20 1.75-8.55L14.25 20h-3.5ZM22 4.93l1-1.73c-3.83-2.19-7.67-1.32-10.5 2.07C9.67 1.89 5.83 1.01 2 3.2l1 1.73c2.83-1.6 5.38-1.09 7.63 1.26-4.18.86-7.19 3.54-7.19 7.81h2c0-3.38 2.42-5.28 5.75-5.88L8.5 20.77A1 1 0 0 0 9.2 22h6.26a1 1 0 0 0 1-1v-.26L13.79 8.12c3.33.6 5.75 2.5 5.75 5.88h2c0-4.27-3.01-6.95-7.2-7.81 2.25-2.37 4.83-2.9 7.66-1.26Z" />
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

PlaceIsland.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
