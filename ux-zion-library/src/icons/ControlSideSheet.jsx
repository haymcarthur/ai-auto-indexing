import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ControlSideSheet Icon
 */
export const ControlSideSheet = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M22 3a1 1 0 0 0-1-1l1 1Zm-1-1H3c-.54.04-.96.46-1 1v18c.04.54.46.96 1 1h18c.54-.04.96-.46 1-1V3a1.08 1.08 0 0 0-1-1Zm-6 13h-2v2h2v3H4v-3h2v-2H4V4h11v11Zm5 5h-3V4h3v16ZM8 15h3v2H8v-2Z" />
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

ControlSideSheet.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
