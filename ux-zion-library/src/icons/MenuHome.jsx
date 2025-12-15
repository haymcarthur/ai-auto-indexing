import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * MenuHome Icon
 */
export const MenuHome = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M18 12a1 1 0 0 0-1 1v7h-2v-4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v4H7v-7a1 1 0 0 0-1-1h-.59L12 5.41 18.59 12Zm-2-6h1v1.59l-1-1Zm5.71 6.29L19 9.59V5a1 1 0 0 0-1-1h-3a1 1 0 0 0-.93.66l-1.36-1.37a1 1 0 0 0-1.41 0l-9 9A1 1 0 0 0 3 14h2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-3h2v3a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-6h2a1 1 0 0 0 1-1 1 1 0 0 0-.29-.71Z" />
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

MenuHome.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
