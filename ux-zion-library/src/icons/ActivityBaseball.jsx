import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ActivityBaseball Icon
 */
export const ActivityBaseball = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M18 19a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0-4a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm.61-8.65L8.13 15 8 14.87l8.47-10.38c.34-.37.83-.55 1.33-.49.65.08 1.15.6 1.2 1.26.04.4-.1.8-.39 1.09ZM21 5a3.32 3.32 0 0 0-2.9-3A3.55 3.55 0 0 0 15 3.15L5.91 14.23a1 1 0 0 0 .09 1.3l.06.06L4.66 17a1 1 0 0 0-1.37 0 1 1 0 0 0 0 1.37l1.38 1.38a1 1 0 0 0 1.74-1 1 1 0 0 0-.41-.4L7.44 17a.9.9 0 0 0 1.23 0L20 7.75A3.32 3.32 0 0 0 21 5Z" fillRule="evenodd" />
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

ActivityBaseball.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
