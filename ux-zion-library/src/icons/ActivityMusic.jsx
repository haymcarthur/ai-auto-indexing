import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ActivityMusic Icon
 */
export const ActivityMusic = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M16.5 16a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5Zm-10 3A1.5 1.5 0 1 1 8 17.5 1.5 1.5 0 0 1 6.5 19ZM19.56 3.17a1 1 0 0 0-.93-.1l-10 4A1 1 0 0 0 8 8v6.35A3.4 3.4 0 0 0 6.5 14a3.5 3.5 0 1 0 3.5 3.5V8.68l8-3.2v5.87a3.4 3.4 0 0 0-1.5-.35 3.5 3.5 0 1 0 3.5 3.5V4a1 1 0 0 0-.44-.83Z" />
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

ActivityMusic.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
