import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * DocumentImageBroken Icon
 */
export const DocumentImageBroken = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="m11.04 9.33-2.4 2.36a1.76 1.76 0 0 1 .15-1.73 1.83 1.83 0 0 1 2.25-.63Zm6.29-6.17L16.14 2H5.74a1.82 1.82 0 0 0-1.83 1.79v12.54l1.82-1.8V3.8h9.13v1.8l2.47-2.43ZM19.9 5.7l.43.42v13.8a1.81 1.81 0 0 1-1.82 1.8H5.73a1.8 1.8 0 0 1-1.28-.53L4.3 21l-1.01 1L2 20.74l1.9-1.87 1.83-1.8 4.42-4.34 5.46-5.36 3-2.94 2.1-2.06L22 3.64l-2.1 2.05Zm-1.7 1.68-7.15 7.02 1.07 1.04 1.82-3.58 2.74 5.38H8.15L5.73 19.6v.31h12.78V7.37h-.31Z" />
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

DocumentImageBroken.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
