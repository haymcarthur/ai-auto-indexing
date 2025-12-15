import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * DocumentBasic Icon
 */
export const DocumentBasic = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M8 17h8v-2H8Zm6-6H8v2h6Zm4 9H6V4h8v4h4ZM15.41 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6.59Z" />
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

DocumentBasic.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
