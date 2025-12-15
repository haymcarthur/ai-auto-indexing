import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ActivityBasketball Icon
 */
export const ActivityBasketball = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M17 11a5.46 5.46 0 0 1 1.63-3A6.25 6.25 0 0 1 20 11Zm-4 2h1.92A9.29 9.29 0 0 0 17 18a7.27 7.27 0 0 1-4 2Zm-3.92 0H11v7a7.27 7.27 0 0 1-4-2 9.43 9.43 0 0 0 2.08-5ZM11 11H9.08A9.29 9.29 0 0 0 7 6a7.27 7.27 0 0 1 4-2Zm2 0V4a7.27 7.27 0 0 1 4 2 9.29 9.29 0 0 0-2.08 5ZM5.37 8A5.46 5.46 0 0 1 7 11H4a6.25 6.25 0 0 1 1.37-3ZM4 13h3a5.66 5.66 0 0 1-1.63 3A6.25 6.25 0 0 1 4 13Zm14.63 3A5.46 5.46 0 0 1 17 13h3a6.25 6.25 0 0 1-1.37 3ZM12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z" />
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

ActivityBasketball.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
