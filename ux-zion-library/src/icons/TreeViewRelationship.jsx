import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * TreeViewRelationship Icon
 */
export const TreeViewRelationship = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M6 23a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h2v-2a3 3 0 0 1 3-3h3a1 1 0 0 0 1-1V8h-2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2v2a3 3 0 0 1-3 3h-3a1 1 0 0 0-1 1v2h2a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H6ZM18 3h-4v3h4V3Zm-7 15H7v3h4v-3Z" fillRule="evenodd" />
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

TreeViewRelationship.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
