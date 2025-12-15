import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ControlHighlight Icon
 */
export const ControlHighlight = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M14 21h8v-2h-8ZM2 20h5.48L9 18.58 6.26 16Zm9.4-2.95L8 13.59 17.86 5l2.08 2.19ZM22 7.12a2 2 0 0 0-.59-1.42l-2.13-2.14a2.08 2.08 0 0 0-2.79-.05L5 13.48 11.51 20l9.9-11.45A2 2 0 0 0 22 7.12Z" />
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

ControlHighlight.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
