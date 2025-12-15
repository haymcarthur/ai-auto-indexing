import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * Notice Icon
 */
export const Notice = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M.9 20.26 20.58.58 22 2 2.32 21.68z" />
      <path d="M7.71 13.57 3.28 18H3v-2.72l.68-.23c1.14-.38 2-1.34 2.24-2.52L8 10.45v1.39c0 .59-.1 1.17-.29 1.73ZM15 6.32l1.38-1.42a6.41 6.41 0 0 0-1.61-1.22l-1.53 1.53A4 4 0 0 1 15 6.32Z" />
      <path d="M5.92 12.53c.05-.23.08-.46.08-.69V9a6 6 0 0 1 8.77-5.32l-1.53 1.53A4 4 0 0 0 8 9v1.45l-2.08 2.08Zm8.2 7.85A4 4 0 0 0 15.5 19h-7a4.09 4.09 0 0 0 5.62 1.38Zm6.2-5.33A3.37 3.37 0 0 1 18 11.84V9a6 6 0 0 0-1.62-4.1L15 6.32A4 4 0 0 1 16 9v2.84c0 1.62.74 3.15 2 4.16H6a5.3 5.3 0 0 0 1.71-2.43L3.28 18H21v-2.72l-.68-.23Z" />
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

Notice.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
