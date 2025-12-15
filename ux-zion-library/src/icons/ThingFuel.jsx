import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ThingFuel Icon
 */
export const ThingFuel = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M14 7H4V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3Zm0 14H4V9h10v12Zm9-17.4-1.62-1.2-3.18 4a1 1 0 0 0-.2.6v9.5L16.13 18V4a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v18a1 1 0 0 0 1 1h12.12a1 1 0 0 0 1-1v-1.5l3.47-2.7A1 1 0 0 0 20 17V9.39l1.87.56.64-1.9L20 7.29l3-3.69Z" />
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

ThingFuel.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
