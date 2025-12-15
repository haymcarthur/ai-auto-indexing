import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ControlView Icon
 */
export const ControlView = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="m22.31 3.2-7.27 7.26-.08 4.74-4.68.03-6.99 6.99-1.42-1.42L20.89 1.78l1.42 1.42z" />
      <path d="m22.31 3.2-7.27 7.26-.08 4.74-4.68.03-6.99 6.99-1.42-1.42L20.89 1.78l1.42 1.42z" />
      <path d="M3.56 16.34A11.85 11.85 0 0 1 1 12.39a11.87 11.87 0 0 1 13.73-7.17L13 6.94a9.81 9.81 0 0 0-9.82 5.45A9.98 9.98 0 0 0 5 14.89l-1.44 1.45Zm10.75-4.91a2.51 2.51 0 1 1-4.57 2.07 2.5 2.5 0 0 1-.15-.42l-1.5 1.5a4.5 4.5 0 1 0 6.1-6.1l-1.5 1.5c.7.23 1.33.76 1.62 1.45Zm2.45-5.54-1.53 1.55a9.9 9.9 0 0 1 5.59 4.95 9.81 9.81 0 0 1-14.33 3.8L5.06 17.6A11.82 11.82 0 0 0 23 12.4a11.9 11.9 0 0 0-6.24-6.5Z" />
      <path d="m13 6.94 1.73-1.72c.56.13 1.11.3 1.65.5.16.06.31.14.47.21l-1.58 1.52A9.82 9.82 0 0 0 13 6.94Zm-8 7.95-1.44 1.45c.48.47 1 .9 1.53 1.3l1.43-1.43c-.55-.39-1.06-.83-1.52-1.32Zm4.5-2.5a2.48 2.48 0 0 1 2.46-2.5H12c.25 0 .5.04.73.11l1.5-1.5a4.47 4.47 0 0 0-6.12 6.11l1.49-1.49c-.07-.24-.1-.48-.1-.73Z" />
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

ControlView.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
