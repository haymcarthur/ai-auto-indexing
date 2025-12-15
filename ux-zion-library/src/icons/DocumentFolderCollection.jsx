import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * DocumentFolderCollection Icon
 */
export const DocumentFolderCollection = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M8.5 14h10l-3.4-4.5-2.3 3-1.6-2L8.5 14ZM4 21c-.5 0-1-.2-1.4-.6S2 19.5 2 19V7h2v12h15v2H4Zm3-3c-.6 0-1-.2-1.4-.6S5 16.5 5 16V5c0-.5.2-1 .6-1.4C6 3.2 6.4 3 7 3h5l2 2h6c.5 0 1 .2 1.4.6s.6.8.6 1.4v9c0 .6-.2 1-.6 1.4s-.9.6-1.4.6H7Zm0-2h13V7h-6.8l-2-2H7v11Z" />
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

DocumentFolderCollection.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
