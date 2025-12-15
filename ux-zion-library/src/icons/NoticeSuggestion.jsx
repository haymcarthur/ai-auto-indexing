import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * NoticeSuggestion Icon
 */
export const NoticeSuggestion = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M6 6h11.59l1 1-1 1H6Zm12 8v2H6.41l-1-1 1-1Zm0-4a1 1 0 0 0 .71-.29l2-2a1 1 0 0 0 0-1.41l-2-2A1 1 0 0 0 18 4h-5V2h-2v2H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6v2H6a1 1 0 0 0-.71.29l-2 2a1 1 0 0 0 0 1.41l2 2A1 1 0 0 0 6 18h5v4h2v-4h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-6v-2Z" />
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

NoticeSuggestion.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
