import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ThingHandwriting Icon
 */
export const ThingHandwriting = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M20 20H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h11.62l-1.37 2H4v12h16v-5l2-2v7a2 2 0 0 1-2 2ZM17.37 4.7l.99 3.73-2.52-1.42c-.88 1.86-.66 3.18-.11 4.05l-1.87 3.84 2.2-1.1 1.31-1.86c1.1.11 2.63-.55 3.95-2.85C22.96 6.13 22.85.65 22.85.65s-3.4 1.75-5.48 4.06Zm-8 6c-.28-.67-1.32-.67-1.6 0-.38.66-1.14 1.98-1.99 2.07v2.17c1.23 0 2.17-1.04 2.84-1.89.94 1.42 2.07 2.17 3.77 1.9l.95-1.9c-1.7.38-3.3-.94-3.97-2.36Z" />
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

ThingHandwriting.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
