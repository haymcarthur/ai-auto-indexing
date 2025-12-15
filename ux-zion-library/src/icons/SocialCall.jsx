import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * SocialCall Icon
 */
export const SocialCall = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M12 10v2h2a2 2 0 0 0-2-2Zm6 2h-2a4 4 0 0 0-4-4V6a6 6 0 0 1 6 6ZM4 5v5a10 10 0 0 0 10 10h5v-4h-4v1a1 1 0 0 1-1 1 7.9 7.9 0 0 1-8-7.8V10a1 1 0 0 1 .29-.72A1 1 0 0 1 7 9h1V5Zm15 17h-5A12 12 0 0 1 2 10V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-1.91 2A5.9 5.9 0 0 0 13 15.92 2 2 0 0 1 15 14h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2Zm3-10h-2a8 8 0 0 0-8-8V2a10 10 0 0 1 10 10Z" />
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

SocialCall.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
