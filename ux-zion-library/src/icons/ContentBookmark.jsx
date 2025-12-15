import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ContentBookmark Icon
 */
export const ContentBookmark = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M6.31 22.15A.85.85 0 0 1 5 21.44V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17.44a.86.86 0 0 1-.85.85 1.07 1.07 0 0 1-.46-.14L12 18.5ZM17 19.34V4H7v15.34l5-3.22Z" />
      <path d="m12 17.31-6 3.87V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17.19Z" />
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

ContentBookmark.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
