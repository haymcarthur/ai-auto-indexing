import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * HelpAnnouncement Icon
 */
export const HelpAnnouncement = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M18 13v2a2 2 0 0 1 2 2h2a4 4 0 0 0-4-4Zm4-3-.43-2L18 9l.43 2L22 10ZM8.15 11.72a13.08 13.08 0 0 0 4.15 4.1L5 19l3.15-7.28ZM15 14.67c-.76.33-3-1.48-3.56-2.08S9 9.77 9.33 9a6.54 6.54 0 0 1 3.51 2.12C14.47 12.78 15 14.2 15 14.67ZM9.33 7a2 2 0 0 0-1.5.57c-.24.24-5.61 12.71-5.75 13a1 1 0 0 0 1.34 1.34c.31-.14 12.76-5.51 13-5.75 1.47-1.48-.08-4.38-2.15-6.45C12.59 8 10.7 7 9.33 7ZM20 4.24 18.76 3 17 4.76 18.24 6 20 4.24Zm-4-1.81L14 2l-1 3.57L15 6l1-3.57ZM9 6h2a4 4 0 0 0-4-4v2a2 2 0 0 1 2 2Z" fillRule="evenodd" />
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

HelpAnnouncement.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
