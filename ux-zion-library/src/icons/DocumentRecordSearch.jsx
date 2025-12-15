import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * DocumentRecordSearch Icon
 */
export const DocumentRecordSearch = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M16.87 19.75c-1.58 0-2.88-1.3-2.88-2.88s1.3-2.88 2.88-2.88 2.88 1.3 2.88 2.88-1.3 2.88-2.88 2.88Zm4-.26c.53-.79.81-1.71.81-2.66 0-2.65-2.19-4.84-4.84-4.84S12 14.17 12 16.83s2.19 4.84 4.84 4.84c.95 0 1.87-.28 2.66-.81L22.63 24 24 22.63l-3.13-3.14ZM13 10H7v2h6v-2Zm-1.67 10H6V4h8v4h4v2.63a6.3 6.3 0 0 1 2 .74V6.59L15.41 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h7.11a6.38 6.38 0 0 1-1.78-2ZM7 15h3v-2H7v2Z" />
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

DocumentRecordSearch.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
