import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * EventMarriage Icon
 */
export const EventMarriage = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="m16 9-1.27 1.58A5.12 5.12 0 0 1 17 14.84a5 5 0 0 1-10 0 5.15 5.15 0 0 1 2.24-4.26L8 9a7.19 7.19 0 0 0-3 5.84A7.09 7.09 0 0 0 12 22a7.09 7.09 0 0 0 7-7.16A7.19 7.19 0 0 0 16 9Zm-5.59-5h3.18l1.07 1.07L12 8.4 9.34 5.07Zm.81 6.62a1 1 0 0 0 1.41.15 1.06 1.06 0 0 0 .15-.15l4-5a1 1 0 0 0-.07-1.33l-2-2A1 1 0 0 0 14 2h-4a1.05 1.05 0 0 0-.71.29l-2 2a1 1 0 0 0-.07 1.33Z" />
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

EventMarriage.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
