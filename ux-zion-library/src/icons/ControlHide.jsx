import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ControlHide Icon
 */
export const ControlHide = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M3.41 22.41 2 21 21 2l1.41 1.41-3.69 3.69A11.89 11.89 0 0 1 23 12.5a11.84 11.84 0 0 1-15.37 6.64L7 18.87l-3.59 3.54ZM12 18c-1.2 0-2.4-.22-3.52-.65l2-2a3.5 3.5 0 0 0 4.87-4.87l1.94-1.94a9.89 9.89 0 0 1 3.53 4A9.82 9.82 0 0 1 12 18Zm1-11h-1a9.81 9.81 0 0 0-8.82 5.5A9.56 9.56 0 0 0 5 15l-1.44 1.44A11.8 11.8 0 0 1 1 12.5a11.8 11.8 0 0 1 13.69-7.2L13 7Z" fillRule="evenodd" />
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

ControlHide.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
