import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * PlaceLowerDivision Icon
 */
export const PlaceLowerDivision = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M22 19h-2v2h2Zm-6 0h-2v2h2ZM4 10H2v2h2Zm18 0h-2v2h2Zm0 3h-2v2h2Zm0 3h-2v2h2Zm0-9h-2v2h2Zm0-3h-2v2h2Zm-3 15h-2v2h2Zm0-15h-2v2h2Zm-3 0h-2v2h2Zm-3 0h-2v2h2Zm-3 0H8v2h2ZM7 4H5v2h2ZM4 4H2v2h2Zm0 3H2v2h2Zm7 8v4H4v-4Zm-7 6h7a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2Z" />
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

PlaceLowerDivision.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
