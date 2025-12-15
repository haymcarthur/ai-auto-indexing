import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ThingCalculator Icon
 */
export const ThingCalculator = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M6 20V10h12v10H6ZM18 4v4H6V4h12Zm0-2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Zm-7 10a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm3.5 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm-6.9 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm3.4 3a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm3.5 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm-6.9 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm3.4 3a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm3.5 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm-6.9 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM16 7h1V5h-1v2Zm-3 0h2V5h-2v2Z" />
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

ThingCalculator.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
