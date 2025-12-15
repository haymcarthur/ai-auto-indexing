import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * EventHistorical Icon
 */
export const EventHistorical = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M3 20h14V4H3Zm16 0h.59L21 18.59V8h-2Zm1 2H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3h3a1 1 0 0 1 1 1v12a1 1 0 0 1-.29.71l-2 2A1 1 0 0 1 20 22ZM14 9H5V6h9Zm-5 3H5v-2h4Zm5 0h-4v-2h4Zm-5 3H5v-2h4Zm5 0h-4v-2h4Zm-5 3H5v-2h4Zm5 0h-4v-2h4Z" />
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

EventHistorical.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
