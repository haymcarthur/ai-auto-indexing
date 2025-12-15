import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * DocumentSmart Icon
 */
export const DocumentSmart = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M16 15v2H8v-2h8Zm-8-4v2h6v-2H8Zm10-1v10H6V4h7V2H6c-.53 0-1.04.21-1.41.59C4.21 2.96 4 3.47 4 4v16c0 .53.21 1.04.59 1.41.37.38.88.59 1.41.59h12c.53 0 1.04-.21 1.41-.59.38-.37.59-.88.59-1.41V10h-2Zm4.9-7.2-1.09-.41a.23.23 0 0 1-.15-.14l-.4-1.09a.25.25 0 0 0-.46 0l-.32.84-.09.25a.2.2 0 0 1-.14.14l-1.09.41a.25.25 0 0 0 0 .46l1.09.4c.07.03.12.08.14.15l.41 1.09c.04.09.12.15.2.16.1.01.22-.04.26-.16l.4-1.09a.28.28 0 0 1 .15-.15l1.09-.4a.25.25 0 0 0 0-.46Zm-3 3-1.1-.41-1.45-.54a.22.22 0 0 1-.14-.14l-.54-1.45-.41-1.1c-.04-.1-.14-.16-.23-.16s-.19.06-.23.16l-.06.17-.89 2.38a.24.24 0 0 1-.14.14l-.71.26-1 .38-.84.31a.25.25 0 0 0 0 .46l.84.31 1 .38.71.26c.06.02.12.07.14.14l.24.65.71 1.9c.02.04.04.08.08.1.08.08.22.08.3 0 .04-.02.06-.06.08-.1l.71-1.9.24-.65a.2.2 0 0 1 .14-.14l2.38-.89.17-.06a.25.25 0 0 0 0-.46Z" />
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

DocumentSmart.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
