import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ThingRecipe Icon
 */
export const ThingRecipe = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M15 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-2.11 6.91-1.6 1.64L12.71 18 14 16.67 15.29 18l1.42-1.45-1.6-1.64c1.13-.65 1.89-2.28 1.89-4.3C17 8 15.71 6 14 6s-3 2-3 4.61c0 2.02.76 3.65 1.89 4.3ZM19 20H7v-1h1v-2H7v-2h1v-2H7v-2h1V9H7V7h1V5H7V4h12v16Zm1-18H6a1 1 0 0 0-1 1v2H3v2h2v2H3v2h2v2H3v2h2v2H3v2h2v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" fillRule="evenodd" />
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

ThingRecipe.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
