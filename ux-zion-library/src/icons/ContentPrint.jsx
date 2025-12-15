import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ContentPrint Icon
 */
export const ContentPrint = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M7 4h10v3h2V2H5v5h2V4Zm13 14h-1v-2H5v2H4v-7a1 1 0 0 1 1-1v2h14v-2a1 1 0 0 1 1 1v7Zm-3 3H7v-3h10v3Zm5-10a3 3 0 0 0-3-3h-2v2H7V8H5a3 3 0 0 0-3 3v9h3v3h14v-3h3v-9Zm-5 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
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

ContentPrint.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
