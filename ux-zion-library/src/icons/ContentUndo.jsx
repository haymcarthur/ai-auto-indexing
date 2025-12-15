import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ContentUndo Icon
 */
export const ContentUndo = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M5 17h7.59l-2.2-2.2a1 1 0 0 1-.28-.89A6 6 0 0 1 16 9h.66a7 7 0 0 0-9.02 1.52 1 1 0 0 1-1.4.12l-.07-.06L5 9.41v7.6Zm10 2H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1.72-.7l2.14 2.14A9 9 0 0 1 22 15a1 1 0 0 1-2 0 4 4 0 0 0-7.8-1.22l3.51 3.51A1 1 0 0 1 15 19Z" fillRule="evenodd" />
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

ContentUndo.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
