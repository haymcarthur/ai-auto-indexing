import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * EventNobility Icon
 */
export const EventNobility = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M19 20H5v-1h14ZM8.55 13.88a1 1 0 0 0 1.31-.39L12 9.92l2.14 3.57a1 1 0 0 0 1.31.39l4.05-2L18.22 17H5.78L4.5 11.84Zm13.07-4.69a1 1 0 0 0-1.07-.11l-5.17 2.59-2.52-4.22a1 1 0 0 0-1.37-.35 1.17 1.17 0 0 0-.35.35l-2.52 4.22-5.17-2.59a1 1 0 0 0-1.36.39 1 1 0 0 0-.09.75l1.79 7.16A2 2 0 0 0 3 19v1a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1a2 2 0 0 0-.82-1.61L22 10.22a1 1 0 0 0-.38-1.03ZM14 4a2 2 0 1 1-2-2 2 2 0 0 1 2 2Z" />
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

EventNobility.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
