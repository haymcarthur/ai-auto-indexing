import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * EventCourt Icon
 */
export const EventCourt = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M3 21h4v1H3Zm6-1a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2H0v2h10v-2H9Zm4.13-14.5 2.63 2.62-3.64 3.64-2.63-2.63Zm-2 9.3-4.68-4.65.55-.6 4.66 4.66Zm3-12.35L18.8 7.1l-.59.6L13.55 3ZM22.56 20 24 18.56l-7.91-7.9 1.1-1.11.3.3a1 1 0 0 0 1.41 0l2-2a1 1 0 0 0 0-1.41L14.87.3a1 1 0 0 0-1.41 0l-2 2a1 1 0 0 0 0 1.41l.3.3-3.7 3.69-.3-.3a1 1 0 0 0-1.41 0l-2 2a1 1 0 0 0 0 1.41l6 6.18a1 1 0 0 0 .71.29 1 1 0 0 0 .72-.29l2-2a1 1 0 0 0 0-1.41l-.3-.3 1.11-1.1Z" />
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

EventCourt.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
