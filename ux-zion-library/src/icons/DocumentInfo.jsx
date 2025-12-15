import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * DocumentInfo Icon
 */
export const DocumentInfo = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M7 13h3v-2H7v2Zm0-3h5V8H7v2Zm10 12a5 5 0 1 1 .01-10.01A5 5 0 0 1 17 22m0-12a7 7 0 1 0 .02 14.02A7 7 0 0 0 17 10m1 6.7h-2v3.8h2v-3.8Zm.1-2.2c0 .6-.5 1.1-1.1 1.1s-1.1-.5-1.1-1.1.5-1.1 1.1-1.1 1.1.5 1.1 1.1ZM10.77 22H6a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h9.41L20 6.59v3a7.97 7.97 0 0 0-2-.52V8h-4V4H6v16h3.59c.3.73.7 1.4 1.18 2Z" />
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

DocumentInfo.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
