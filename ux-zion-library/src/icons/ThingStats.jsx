import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ThingStats Icon
 */
export const ThingStats = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M18.35 20h1.82V10h-1.82v10Zm2.72 2h-3.63c-.54 0-.9-.4-.9-1V9c0-.6.36-1 .9-1h3.63c.55 0 .91.4.91 1v12c0 .6-.36 1-.9 1ZM3.82 20h1.81v-6H3.82v6Zm2.72 2H2.91c-.55 0-.91-.4-.91-1v-8c0-.6.36-1 .9-1h3.64c.55 0 .9.4.9 1v8c0 .6-.35 1-.9 1Zm4.54-2h1.82V4h-1.82v16Zm2.73 2h-3.64c-.54 0-.9-.4-.9-1V3c0-.6.36-1 .9-1h3.64c.54 0 .9.4.9 1v18c0 .6-.36 1-.9 1Z" />
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

ThingStats.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
