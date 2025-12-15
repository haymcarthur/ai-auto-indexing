import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ActivityFootball Icon
 */
export const ActivityFootball = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="m8.66 13.27-1.6-1.59L6 12.74l1.6 1.6-1.6 1.6L7.06 17l1.6-1.6 1.6 1.6 1.06-1.06-1.6-1.6 1.78-1.78 1.6 1.6 1.06-1.06-1.6-1.6 1.78-1.77 1.6 1.59L17 10.26l-1.6-1.6 1.6-1.6L15.94 6l-1.6 1.6-1.6-1.6-1.06 1.06 1.59 1.6-1.77 1.78-1.6-1.6L8.84 9.9l1.6 1.6Zm7.65 3C12.57 20.06 5.64 20.84 3 21c.16-2.64.94-9.56 4.69-13.31S18.36 3.16 21 3c-.16 2.64-.94 9.56-4.69 13.31ZM22 1c-.42 0-10.47.06-15.7 5.29S1 21.57 1 22a1 1 0 0 0 1 1c.42 0 10.47-.06 15.7-5.29S23 2.43 23 2a1 1 0 0 0-1-1Z" />
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

ActivityFootball.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
