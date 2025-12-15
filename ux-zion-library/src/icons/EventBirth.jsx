import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * EventBirth Icon
 */
export const EventBirth = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M13 10a1 1 0 1 0-1-1 1 1 0 0 0 1 1Zm0-5a3 3 0 1 1-3 3 3 3 0 0 1 3-3Zm0 8a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 9c-2.64 0-3.83-.47-5-5.24a29.8 29.8 0 0 1-.4-1.86l9.49 4.76C16.12 21.76 15 22 13 22ZM7 8a5.8 5.8 0 0 1 5.59-6H13a5.8 5.8 0 0 1 6 5.61 3.23 3.23 0 0 1 0 .44 31.39 31.39 0 0 1-.2 4.33l-6.73 2.53-4.85-2.41A30.63 30.63 0 0 1 7 8Zm10.74 9.76-3.26-1.63 4-1.49a30.67 30.67 0 0 1-.73 3.12ZM21 8a7.7 7.7 0 0 0-7.41-8H13a7.71 7.71 0 0 0-8 7.43A5.61 5.61 0 0 0 5 8a34.72 34.72 0 0 0 1 9.3c1.32 5.08 3 6.7 7 6.7s5.68-1.64 7-6.76A34.24 34.24 0 0 0 21 8Z" />
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

EventBirth.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
