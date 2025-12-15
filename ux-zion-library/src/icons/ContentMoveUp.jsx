import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ContentMoveUp Icon
 */
export const ContentMoveUp = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M9 20c-1.9 0-3.6-.7-5-2-1.4-1.4-2-3-2-5 0-1.8.6-3.3 1.8-4.7C4.9 7 6.4 6.2 8.2 6L6.6 4.4 8 3l4 4-4 4-1.4-1.4 1.5-1.5c-1.2.2-2.2.8-2.9 1.7-.8.9-1.2 2-1.2 3.2 0 1.4.5 2.6 1.5 3.5S7.6 18 9 18h3v2H9Zm5-9V4h8v7h-8Zm0 9v-7h8v7h-8Zm2-2h4v-3h-4v3Z" />
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

ContentMoveUp.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
