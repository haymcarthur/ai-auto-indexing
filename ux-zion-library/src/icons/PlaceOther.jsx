import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * PlaceOther Icon
 */
export const PlaceOther = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M23 5h-2V3h2Zm0 12h-2v-2h2Zm0 4h-2v-2h2Zm-4 0h-2v-2h2Zm-4 0h-2v-2h2Zm-4 0H9v-2h2Zm-4 0H5v-2h2Zm-4 0H1v-2h2ZM19 5h-2V3h2Zm-6-2h2v2h-2Zm10 6h-2V7h2Zm0 4h-2v-2h2ZM3 13H1v-2h2Zm0 4H1v-2h2Zm8-8H9V7h2ZM7 9H5V7h2ZM3 9H1V7h2Z" />
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

PlaceOther.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
