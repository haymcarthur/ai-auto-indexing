import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * MenuSettings Icon
 */
export const MenuSettings = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M19.33 12a8.4 8.4 0 0 1-.07 1l2.06 1.65a.53.53 0 0 1 .12.64l-2 3.46A.48.48 0 0 1 19 19a.49.49 0 0 1-.17 0l-2.43-1a7.73 7.73 0 0 1-1.65 1l-.38 2.65A.49.49 0 0 1 14 22h-3.95a.49.49 0 0 1-.48-.42l-.37-2.65a7.13 7.13 0 0 1-1.65-1L5.12 19A.24.24 0 0 1 5 19a.48.48 0 0 1-.43-.25l-2-3.48a.51.51 0 0 1 .11-.64L4.75 13a8.4 8.4 0 0 1-.07-1 8.4 8.4 0 0 1 .07-1L2.68 9.37a.49.49 0 0 1-.11-.64l1.95-3.46A.48.48 0 0 1 4.94 5h.18l2.43 1A7.49 7.49 0 0 1 9.2 5l.37-2.65a.48.48 0 0 1 .48-.35H14a.48.48 0 0 1 .47.42l.38 2.65a7.13 7.13 0 0 1 1.65 1l2.43-1a.43.43 0 0 1 .16 0 .46.46 0 0 1 .43.25l2 3.46a.53.53 0 0 1-.12.64L19.26 11a8.4 8.4 0 0 1 .07 1Zm-2 0v-.73l-.13-1.13.87-.7 1-.85-.68-1.21-1.24.51-1 .43-.89-.7A5.59 5.59 0 0 0 14 6.91l-1-.43L12.68 4h-1.36l-.2 1.35L11 6.48l-1 .43a5.56 5.56 0 0 0-1.22.73l-.88.68-1-.42-1.32-.51-.69 1.21L6 9.44l.87.7-.14 1.13v1.47l.14 1.13-.87.7-1.06.84.69 1.21 1.24-.51 1-.43.89.7a5.2 5.2 0 0 0 1.2.71l1 .43.36 2.48h1.37l.19-1.35.12-1.13 1-.43a5.56 5.56 0 0 0 1.22-.73l.88-.68 1 .42 1.24.51.66-1.21-1-.84-.87-.7.13-1.13a1.83 1.83 0 0 0 .14-.73ZM12 8a4 4 0 1 0 3.91 4.09V12A4 4 0 0 0 12 8Zm-1.95 4a2 2 0 1 0 2-2H12a2 2 0 0 0-1.95 2Z" />
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

MenuSettings.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
