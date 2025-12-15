import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * SocialLike Icon
 */
export const SocialLike = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M18.17 19h-7L7 17.32V12h1a1 1 0 0 0 .92-.61L11.66 5H13v4a1 1 0 0 0 1 1h5.8ZM5 19H3v-8h2ZM21.77 8.36A1 1 0 0 0 21 8h-6V4a1 1 0 0 0-1-1h-3a1 1 0 0 0-.92.61L7.34 10H7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-.52l3.63 1.45A.94.94 0 0 0 11 21h8a1 1 0 0 0 1-.82l2-11a1 1 0 0 0-.23-.82Z" />
      <path d="m20.79 10.18-1.63 9a1 1 0 0 1-1 .82h-7a.94.94 0 0 1-.37-.07l-1.19-.48a1 1 0 0 1-.6-.93v-9.8l1.76-4.11a1 1 0 0 1 .9-.61H13a1 1 0 0 1 1 1v4h5.8a1 1 0 0 1 1 1 1.09 1.09 0 0 1-.01.18ZM7.42 9.59A2 2 0 0 0 6 9H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-8a2 2 0 0 0-.58-1.41Z" />
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

SocialLike.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
