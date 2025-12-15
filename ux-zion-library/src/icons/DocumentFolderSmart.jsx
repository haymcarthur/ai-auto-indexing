import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * DocumentFolderSmart Icon
 */
export const DocumentFolderSmart = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M22 12v6c0 .53-.21 1.04-.59 1.41-.37.38-.88.59-1.41.59H4c-.53 0-1.04-.21-1.41-.59A1.97 1.97 0 0 1 2 18V6c0-.53.21-1.04.59-1.41C2.96 4.21 3.47 4 4 4h6l2 2h1v2h-1.83l-2-2H4v12h16v-6h2Zm-2-2.12c-.02-.04-.06-.06-.1-.08l-2.55-.95a.22.22 0 0 1-.14-.14L16.95 8l-.69-1.84c-.04-.1-.14-.16-.23-.16s-.19.06-.23.16L15.11 8l-.26.71a.24.24 0 0 1-.14.14L13 9.49l-.84.31a.25.25 0 0 0 0 .46l.84.31 1.71.64c.06.02.12.07.14.14l.24.65.71 1.9c.08.21.38.21.46 0l.71-1.9.24-.65a.2.2 0 0 1 .14-.14l2.55-.95c.04-.02.08-.04.1-.08a.22.22 0 0 0 0-.3Zm1.8-5.67-1.34-.49a.32.32 0 0 1-.18-.18l-.49-1.34a.3.3 0 0 0-.58 0l-.49 1.34a.32.32 0 0 1-.18.18l-1.34.49a.3.3 0 0 0 0 .58l1.34.49c.08.03.15.1.18.18l.2.54.29.8c.1.27.48.27.58 0l.29-.79.2-.55c.03-.08.1-.15.18-.18l1.34-.49a.3.3 0 0 0 0-.58Z" />
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

DocumentFolderSmart.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
