import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ControlExpand Icon
 */
export const ControlExpand = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M4.07 5.53 9.54 11 11 9.54 5.53 4.07H8.2V2H2v6.2h2.07ZM14.46 11l5.47-5.47V8.2H22V2h-6.2v2.07h2.67L13 9.54ZM8.2 19.93H5.53L11 14.46 9.54 13l-5.47 5.47V15.8H2V22h6.2Zm7.6 0V22H22v-6.2h-2.07v2.67L14.46 13 13 14.46l5.47 5.47Z" />
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

ControlExpand.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
