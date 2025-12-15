import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * PlaceCourt Icon
 */
export const PlaceCourt = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="m4.39 19 .33-1h14.56l.33 1ZM7 9h2v7H7ZM5 6.69l7-2.62 7 2.62V7H5ZM13 16h-2V9h2Zm4 0h-2V9h2Zm5 3.68-1-3a1 1 0 0 0-1-.68h-1V9h1a1 1 0 0 0 1-1V6a1 1 0 0 0-.65-.94l-8-3a1.05 1.05 0 0 0-.7 0l-8 3A1 1 0 0 0 3 6v2a1 1 0 0 0 1 1h1v7H4a1 1 0 0 0-1 .68l-1 3a1 1 0 0 0 .14.9A1 1 0 0 0 3 21h18a1 1 0 0 0 .81-.42 1 1 0 0 0 .19-.9Z" />
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

PlaceCourt.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
