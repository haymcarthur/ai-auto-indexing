import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * EventOccupation Icon
 */
export const EventOccupation = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="m4.15 20 .72-5H9v1a1 1 0 0 0 .55.9l2 1a1.09 1.09 0 0 0 .9 0l2-1A1 1 0 0 0 15 16v-1h4.13l.72 5ZM13 13v2.38l-1 .5-1-.5V13ZM4 9a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4h-5v-1a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1H4Zm8-5a2 2 0 0 1 2 2h-4a2 2 0 0 1 2-2Zm10 10V9a3 3 0 0 0-3-3h-3a4 4 0 0 0-8 0H5a3 3 0 0 0-3 3v5a1 1 0 0 0 .85 1l-.7 4.9A1.85 1.85 0 0 0 3.71 22 1.41 1.41 0 0 0 4 22h16a1.85 1.85 0 0 0 1.87-1.83 1.5 1.5 0 0 0 0-.3l-.7-4.9A1 1 0 0 0 22 14Z" />
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

EventOccupation.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
