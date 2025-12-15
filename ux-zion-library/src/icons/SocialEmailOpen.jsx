import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * SocialEmailOpen Icon
 */
export const SocialEmailOpen = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M4 20v-7l4.7 3.06h6.6l4.7-3v7Zm7.38-14.84a1.09 1.09 0 0 1 1.2 0l6.8 6-4.68 3H9.3l-4.68-3Zm2.49-1.53a3.08 3.08 0 0 0-3.79 0L2 10.81V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-9.19Z" />
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

SocialEmailOpen.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
