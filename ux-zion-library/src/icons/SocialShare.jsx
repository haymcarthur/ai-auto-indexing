import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * SocialShare Icon
 */
export const SocialShare = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M18 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM6 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM18 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm0 10a4 4 0 0 0-3 1.38l-5.09-2.54a4 4 0 0 0 0-1.68L15 8.62a3.93 3.93 0 1 0-.91-1.78L9 9.38a4 4 0 1 0-.46 5.64l.02-.02c.14-.12.28-.26.4-.4l5.09 2.54A4 4 0 1 0 18 14Z" fillRule="evenodd" />
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

SocialShare.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
