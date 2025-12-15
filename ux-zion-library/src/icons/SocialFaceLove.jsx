import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * SocialFaceLove Icon
 */
export const SocialFaceLove = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M12 15.78A4 4 0 0 1 8.67 14L7 15.34a6 6 0 0 0 10 0L15.33 14A4 4 0 0 1 12 15.78ZM15 9c-.44-1.65-2-1.11-2 .16A3.1 3.1 0 0 0 15 12a3 3 0 0 0 2-2.81c0-1.27-1.53-1.81-2-.19Zm-6 3a3 3 0 0 0 2-2.82c0-1.26-1.53-1.8-2-.18-.44-1.65-2-1.11-2 .15A3.1 3.1 0 0 0 9 12Zm3 8a8 8 0 1 1 8-8 8 8 0 0 1-8 8Zm0-18a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z" />
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

SocialFaceLove.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
