import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ContentMoveDown Icon
 */
export const ContentMoveDown = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="m8 21-1.4-1.4L8.2 18c-1.8-.2-3.2-1-4.4-2.3S2 12.8 2 11c0-2 .7-3.6 2-5s3-2 5-2h3v2H9c-1.4 0-2.6.5-3.5 1.5S4 9.6 4 11c0 1.2.4 2.3 1.2 3.2.8.9 1.7 1.5 2.9 1.7l-1.5-1.5L8 13l4 4-4 4Zm6-1v-7h8v7h-8Zm0-9V4h8v7h-8Zm2-2h4V6h-4v3Z" />
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

ContentMoveDown.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
