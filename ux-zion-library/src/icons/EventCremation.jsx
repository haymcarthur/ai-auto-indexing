import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * EventCremation Icon
 */
export const EventCremation = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M12 17a2 2 0 0 1-2-2v-.13A7.34 7.34 0 0 1 11 12v1.8a1.11 1.11 0 0 0 .47.91 1 1 0 0 0 1 0l1.28-.71a1.63 1.63 0 0 1 .27.8 2 2 0 0 1-1.78 2.2H12Zm2.67-4.74a1 1 0 0 0-1.12-.15l-.55.27V9a1 1 0 0 0-1.79-.62C10.88 8.8 8 12.55 8 15a3.87 3.87 0 0 0 3.74 4H12a3.87 3.87 0 0 0 4-3.74V15a4.12 4.12 0 0 0-1.33-2.74Zm3.06 7.46a.69.69 0 0 1-.56.28H6.82a.7.7 0 0 1-.58-.3c-2.46-3.08-1-7.35 1.8-10A2.78 2.78 0 0 0 9 7.31 3.26 3.26 0 0 0 7.44 5.2c-.19-.12-1-.48-1-.66A.54.54 0 0 1 7 4h10a.54.54 0 0 1 .54.51 3.45 3.45 0 0 1-.93.67c-.78.46-1.75 1-1.88 2.12a3 3 0 0 0 1.19 2.42c2.67 2.56 4.39 6.77 1.81 10Zm-.42-11.44a2.29 2.29 0 0 1-.58-.73 3.88 3.88 0 0 1 .91-.65c.8-.47 1.91-1.12 1.91-2.36A2.57 2.57 0 0 0 17 2H7a2.54 2.54 0 0 0-2.53 2.54 1.82 1.82 0 0 0 1.1 1.89c.4.22 1.48.78 1.54 1.18 0 .1-.1.34-.44.67-3.42 3.26-5.19 8.65-2 12.64A2.72 2.72 0 0 0 6.84 22h10.34a2.7 2.7 0 0 0 2.15-1.06c3.2-3.94 1.41-9.39-2.02-12.66Z" />
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

EventCremation.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
