import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ThingMapPin Icon
 */
export const ThingMapPin = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M12 8a1 1 0 1 0 1 1 1 1 0 0 0-1-1Zm0 4a3 3 0 1 1 3-3 3 3 0 0 1-3 3Zm0-8a5 5 0 0 0-5 5v.11c0 2.64 3.11 7.71 5 10.46 1.89-2.75 5-7.83 5-10.46A5 5 0 0 0 12.11 4H12Zm0 19c-2.36-3.2-7-9.89-7-13.89a7 7 0 0 1 14 0c0 4-4.64 10.69-7 13.89Z" />
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

ThingMapPin.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
