import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * SocialChat Icon
 */
export const SocialChat = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M3 19v-4H1.5A1.5 1.5 0 0 1 0 13.5v-11A1.5 1.5 0 0 1 1.5 1h13A1.5 1.5 0 0 1 16 2.5V7h-2V3H2v10h3v2l2.67-2H9v2h-.67Zm10-2h3.33L19 19v-2h3v-6h-9Zm8 6-5.33-4H12.5a1.5 1.5 0 0 1-1.5-1.5v-7A1.5 1.5 0 0 1 12.5 9h10a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5H21Z" />
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

SocialChat.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
