import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * NoticeProtected Icon
 */
export const NoticeProtected = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M18 14a3.16 3.16 0 0 1-.8 1.79L8.53 7.1A12.63 12.63 0 0 0 12 4.5a10.8 10.8 0 0 0 6 3.41Zm-6 5.87c-2.5-1.4-6-4-6-5.87V7.91a3 3 0 0 0 .43-.09l9.37 9.39a23.72 23.72 0 0 1-3.8 2.65ZM19 6c-3.44 0-6.17-3.57-6.2-3.6a1 1 0 0 0-1.4-.2 1 1 0 0 0-.2.2S8.44 6 5 6a1 1 0 0 0-1 1v7c0 3.81 6.76 7.49 7.53 7.89a1 1 0 0 0 .94 0C13.24 21.48 20 17.8 20 14V7a1 1 0 0 0-1-1Z" />
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

NoticeProtected.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
