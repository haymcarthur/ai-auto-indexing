import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ControlList Icon
 */
export const ControlList = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M9 18h11v-2H9v2Zm-3.5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM9 13h11v-2H9v2Zm-3.5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM9 8h11V6H9v2Zm-3.5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" fillRule="evenodd" />
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

ControlList.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
