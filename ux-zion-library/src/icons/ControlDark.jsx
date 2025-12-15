import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ControlDark Icon
 */
export const ControlDark = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="m5.37 7.1 1.1 2.9 1.09-2.9 2.9-1.1-2.9-1.1L6.46 2 5.37 4.9 2.47 6l2.9 1.1Zm6.34 2.15L9.46 10l2.25.75.75 2.25.75-2.25 2.25-.75-2.25-.75L12.46 7l-.75 2.25ZM12.5 20a7.95 7.95 0 0 1-5.4-2.1A10.01 10.01 0 0 0 18.4 6.6 8 8 0 0 1 12.5 20Zm4.49-16.93a1 1 0 0 0-1.35 1.34A8 8 0 0 1 4.91 15.14a1 1 0 0 0-1.34 1.35A10.01 10.01 0 1 0 17 3.07Z" />
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

ControlDark.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
