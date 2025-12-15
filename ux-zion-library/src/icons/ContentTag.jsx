import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ContentTag Icon
 */
export const ContentTag = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="m4 9.59 10 10L19.59 14l-10-10H4ZM14 22a1 1 0 0 1-.71-.29l-11-11A1 1 0 0 1 2 10V3a1 1 0 0 1 1-1h7a1 1 0 0 1 .71.29l11 11a1 1 0 0 1 0 1.41l-7 7a1 1 0 0 1-.71.3ZM9 7a2 2 0 1 1-2-2 2 2 0 0 1 2 2Z" />
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

ContentTag.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
