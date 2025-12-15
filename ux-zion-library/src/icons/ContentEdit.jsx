import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ContentEdit Icon
 */
export const ContentEdit = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M19.41 4.59a2.09 2.09 0 0 1 0 2.87l-.72.72-2.87-2.87.72-.72a2.09 2.09 0 0 1 2.87 0Zm-15 15L5 17.25 6.75 19Zm10-12.89 2.86 2.86-8.56 8.6-2.87-2.87Zm6.41-3.55a4 4 0 0 0-5.66 0L3.72 14.59a1.17 1.17 0 0 0-.26.46L2 20.76a1 1 0 0 0 .26.94 1 1 0 0 0 1 .26L9 20.54a1.17 1.17 0 0 0 .46-.26L20.82 8.87a4 4 0 0 0 0-5.66Z" />
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

ContentEdit.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
