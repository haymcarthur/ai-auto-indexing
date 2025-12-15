import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * PersonSpouse Icon
 */
export const PersonSpouse = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M9 13.01c-4.71 0-8 2.47-8 6v1h8v-2H3.16c.6-1.8 2.83-3 5.84-3a10.5 10.5 0 0 1 1.67.13 6.97 6.97 0 0 1 2.14-1.5A10.99 10.99 0 0 0 9 13.01Zm9.28 1.83h-.01a9.82 9.82 0 0 0-2.54 0h-.01c-2.86.52-4.72 2.25-4.72 5.17h12c0-2.91-1.78-4.75-4.72-5.17Zm1.67-4.37a3 3 0 1 0-4 3.34 2.82 2.82 0 0 0 2.1 0 2.98 2.98 0 0 0 1.9-3.34ZM9 6a2 2 0 1 1-1.41.59A2 2 0 0 1 9 6Zm0-2a4 4 0 1 0 2.83 1.17A4 4 0 0 0 9 4Z" />
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

PersonSpouse.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
