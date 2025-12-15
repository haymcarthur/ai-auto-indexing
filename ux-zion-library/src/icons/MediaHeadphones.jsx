import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * MediaHeadphones Icon
 */
export const MediaHeadphones = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M20 20h-3v-4h3ZM7 16v4H4v-4Zm5-14A10 10 0 0 0 2 12v9a1 1 0 0 0 1 1h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H4v-2a8 8 0 0 1 16 0v2h-3a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a1 1 0 0 0 1-1v-9A10 10 0 0 0 12 2Z" />
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

MediaHeadphones.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
