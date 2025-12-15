import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * EventBurial Icon
 */
export const EventBurial = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M4 21c0-1.22 3.12-3 8-3s8 1.78 8 3H4ZM6 7c0-.13.18-3 6-3s6 3 6 3.09V17a18.3 18.3 0 0 0-12 0V7Zm14 10.94V7.09S19.91 2 12 2 4 6.8 4 7v10.91A3.84 3.84 0 0 0 2 21v1a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-1a3.78 3.78 0 0 0-2-3.06ZM16 9H8V7h8v2Zm-1 3H9v-2h6v2Z" />
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

EventBurial.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
