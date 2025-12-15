import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * MediaMicrophone Icon
 */
export const MediaMicrophone = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="m2.99 19.6 16.6-16.74L21 4.26 4.4 21.02z" />
      <path d="M9 10.7V6a3 3 0 0 1 5.78-1.12L13 6.67V6a1 1 0 0 0-2 0v2.69L9 10.7Zm.28 2.56A3 3 0 0 0 15 12V7.5l-2 2V12a1 1 0 0 1-2 0v-.47l-1.72 1.73Zm-2.21-.61A4.58 4.58 0 0 1 7 12H5c0 .8.14 1.58.41 2.33l1.66-1.68ZM12 17a5 5 0 0 1-4.18-2.27l-1.43 1.44A7 7 0 0 0 11 18.92V22h2v-3.08A7 7 0 0 0 19 12h-2a5 5 0 0 1-5 5Z" />
      <path d="m5.41 14.33 1.66-1.68a5 5 0 0 0 .75 2.08l-1.43 1.44a6.8 6.8 0 0 1-.98-1.84ZM9 10.7V12c0 .43.1.86.28 1.26L11 11.53V8.69L9 10.7Zm5.78-5.82L13 6.67v2.84l2-2V6c0-.38-.08-.76-.22-1.12Z" />
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

MediaMicrophone.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
