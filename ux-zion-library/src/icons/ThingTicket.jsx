import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ThingTicket Icon
 */
export const ThingTicket = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M14.5 11.59 12.91 10l1.59-1.59L16.08 10Zm-4 4L8.91 14l2.59-2.59L13.08 13Zm4.71-9.3a1 1 0 0 0-1.41 0l-7 7a1 1 0 0 0 0 1.41l3 3a1 1 0 0 0 1.41 0l7-7a1 1 0 0 0 0-1.41Zm5 4.6-8.82 8.81a4.32 4.32 0 0 0-3.78 0L4.8 16.89a4.19 4.19 0 0 0 0-3.78l8.81-8.81a4.32 4.32 0 0 0 3.78 0l2.81 2.81a4.19 4.19 0 0 0 0 3.78Zm2-3.18a1 1 0 0 0 0-1.41l-4-4a1 1 0 0 0-1.41 0 2.13 2.13 0 0 1-2.58 0 1 1 0 0 0-1.41 0l-10 10a1 1 0 0 0 0 1.41 2 2 0 0 1 0 2.58 1 1 0 0 0 0 1.41l4 4a1 1 0 0 0 1.41 0 2.13 2.13 0 0 1 2.58 0 1 1 0 0 0 1.41 0l10-10a1 1 0 0 0 0-1.41 2 2 0 0 1 0-2.58Z" />
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

ThingTicket.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
