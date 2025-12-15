import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ActivityTennis Icon
 */
export const ActivityTennis = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M19 21a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0-4a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm.32-13.23a6.74 6.74 0 0 0-10.19 8.78l-3 3-.74-.74-2.8 2.8a2 2 0 1 0 2.81 2.8l2.81-2.8-.67-.61 3-3a6.75 6.75 0 0 0 8.78-10.2v-.03Zm-1.06 1.06c.3.3.55.64.77 1l-1.65 1.66-1.77-1.77 1.65-1.65c.36.2.7.47 1 .76Zm-1.94 3.72-1.77 1.76-1.77-1.76 1.77-1.77 1.77 1.77Zm-.57-5.1-1.2 1.21-1.2-1.21a5.4 5.4 0 0 1 2.4 0Zm-4.91 1.38c.3-.3.64-.55 1-.76l1.65 1.65-1.77 1.77-1.65-1.65a5 5 0 0 1 .77-1.01ZM9.46 7.34l1.2 1.21-1.2 1.2a5.17 5.17 0 0 1 0-2.41Zm1.38 4.92c-.3-.3-.55-.64-.77-1l1.65-1.65 1.77 1.76L11.84 13c-.36-.2-.7-.46-1-.74Zm2.51 1.38 1.2-1.21 1.2 1.21a5.4 5.4 0 0 1-2.4 0Zm4.91-1.38c-.3.3-.64.55-1 .76l-1.65-1.65 1.77-1.76L19 11.26c-.2.36-.45.7-.74 1Zm.18-3.71 1.2-1.21c.19.8.19 1.62 0 2.41l-1.2-1.2Z" fillRule="evenodd" />
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

ActivityTennis.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
