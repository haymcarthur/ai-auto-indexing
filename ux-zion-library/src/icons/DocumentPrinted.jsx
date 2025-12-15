import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * DocumentPrinted Icon
 */
export const DocumentPrinted = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M9 12h6v-2H9Zm0-4h6V6H9Zm11-2h-2V5a1 1 0 0 1 2 0Zm-4 12a2 2 0 1 1-2-2 1 1 0 0 0 0-2H8V5a1 1 0 0 1 1-1h7.18A2.85 2.85 0 0 0 16 5Zm-5.46 2H6a2 2 0 0 1 0-4h4.54a4 4 0 0 0 0 4ZM19 2H9a3 3 0 0 0-3 3v9a4 4 0 0 0 0 8h8a4 4 0 0 0 4-4V8h3a1 1 0 0 0 1-1V5a3 3 0 0 0-3-3Z" />
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

DocumentPrinted.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
