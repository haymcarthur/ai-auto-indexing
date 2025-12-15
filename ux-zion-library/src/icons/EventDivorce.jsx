import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * EventDivorce Icon
 */
export const EventDivorce = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M13.59 4h-3.18L9.34 5.07 12 8.4l2.66-3.33L13.59 4Zm-.81 6.62a1 1 0 0 1-1.4.15h-.01c-.06-.04-.1-.1-.15-.15l-4-5a1 1 0 0 1 .07-1.33l2-2A1 1 0 0 1 10 2h4c.27 0 .52.1.71.29l2 2a1 1 0 0 1 .07 1.33l-4 5ZM5.44 23l2.38-2.38A7.13 7.13 0 0 0 19 14.79a7.17 7.17 0 0 0-1.11-4.15L21 7.44 19.56 6 4 21.56 5.44 23Zm10.85-10.85-7 7a5.1 5.1 0 0 0 7.64-4.41 5 5 0 0 0-.64-2.59ZM5.49 17A6.75 6.75 0 0 1 7.8 9L9 10.48a4.87 4.87 0 0 0-2 5L5.49 17Z" fillRule="evenodd" />
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

EventDivorce.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
