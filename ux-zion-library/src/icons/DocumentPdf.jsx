import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * DocumentPdf Icon
 */
export const DocumentPdf = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M13 14a2 2 0 0 1-2 2v-4a2 2 0 0 1 2 2Zm-4-4v8h2a4 4 0 0 0 0-8H9Zm13 2v-2h-4a2 2 0 0 0-2 2v6h2v-3h3v-2h-3v-1h4ZM4 12h1a1 1 0 1 1 0 2H4v-2Zm0 4h1a3 3 0 1 0 0-6H2v8h2v-2Zm2-7V4h8v4h4v1h2V6.59L15.41 2H6a2 2 0 0 0-2 2v5h2Zm12 10v1H6v-1H4v1c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-1h-2Z" />
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

DocumentPdf.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
