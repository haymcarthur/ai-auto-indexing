import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * SocialFaceHappy Icon
 */
export const SocialFaceHappy = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M12 15.78A4 4 0 0 1 8.67 14L7 15.34a6 6 0 0 0 10 0L15.33 14A4 4 0 0 1 12 15.78ZM15.5 8 13 10.63 14.31 12l1.19-1.26L16.69 12 18 10.63Zm-7 2.74L9.69 12 11 10.63 8.5 8 6 10.63 7.31 12ZM12 20a8 8 0 1 1 8-8 8 8 0 0 1-8 8Zm0-18a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z" />
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

SocialFaceHappy.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
