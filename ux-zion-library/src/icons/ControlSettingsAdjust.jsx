import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ControlSettingsAdjust Icon
 */
export const ControlSettingsAdjust = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M18 19h-2v-4h2Zm2-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2H2v2h12v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2h2v-2h-2Zm-7-5h-2V5h2Zm2-3V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2H2v2h7v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V8h7V6Z" />
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

ControlSettingsAdjust.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
