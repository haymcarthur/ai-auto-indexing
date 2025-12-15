import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * PlaceAmusement Icon
 */
export const PlaceAmusement = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="m16.39 20-3.58-5.56a1 1 0 0 0-1.4-.21 1 1 0 0 0-.21.21L7.61 20H5a23.14 23.14 0 0 0 1.17-7h11.66A23.45 23.45 0 0 0 19 20ZM10 20l2-3 2 3Zm6-9H8l4-4Zm5.71 9.29C20.47 19.05 20 14.55 20 12a1 1 0 0 0-.35-.76L13 5.54V4h2V2h-4v3.54l-6.65 5.7A1 1 0 0 0 4 12c0 2.55-.47 7.05-1.71 8.29A1 1 0 0 0 3 22h18a1 1 0 0 0 1-1 1 1 0 0 0-.29-.71Z" />
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

PlaceAmusement.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
