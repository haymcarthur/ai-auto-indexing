import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * MediaCameraRestricted Icon
 */
export const MediaCameraRestricted = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="m21.89 17.6-3.48-6.08a.87.87 0 0 0-.3-.33.83.83 0 0 0-.88 0c-.14.1-.25.2-.34.33l-3.48 6.07a.93.93 0 0 0 .03.88c.09.13.2.23.31.3a.7.7 0 0 0 .43.13h6.94c.16 0 .3-.04.43-.12s.25-.18.33-.31a.9.9 0 0 0 .12-.44.7.7 0 0 0-.12-.43Zm-4.22.86c-.36 0-.65-.3-.65-.65s.3-.65.65-.65.65.3.65.65-.3.66-.65.66Zm.45-2.34a.18.18 0 0 1-.18.15h-.56a.16.16 0 0 1-.17-.15l-.4-3.12c0-.1.08-.2.18-.2h1.34c.1 0 .19.1.18.2l-.4 3.12Zm-7.85-7.67a3.92 3.92 0 1 0 .01 7.85 3.92 3.92 0 0 0 0-7.85Zm0 6.1a2.18 2.18 0 1 1 0-4.36 2.18 2.18 0 0 1 0 4.36Zm8.27-6.97v2.61H16.8V7.6h-2.69c-.45 0-.9-.2-1.23-.52l-1.22-1.23H8.89L7.66 7.07c-.33.33-.77.51-1.23.51H3.74v9.58h8.7v1.74h-8.7c-.96 0-1.74-.78-1.74-1.74V7.58c0-.96.78-1.74 1.74-1.74h2.7l1.22-1.23c.33-.33.76-.51 1.23-.51h2.77c.46 0 .9.18 1.22.51l1.23 1.23h2.7c.95 0 1.73.79 1.73 1.74Z" />
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

MediaCameraRestricted.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
