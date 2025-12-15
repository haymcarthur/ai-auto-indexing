import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * EventBarBatMitzvah Icon
 */
export const EventBarBatMitzvah = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M16.75 16 18 13.93 19.22 16ZM12 20.05 10.76 18h2.46ZM4.76 16 6 13.93 7.23 16Zm0-8h2.47L6 10ZM12 3.91 13.22 6h-2.46ZM16.82 12l-2.4 4H9.56l-2.4-4 2.4-4h4.86Zm2.4-4L18 10l-1.25-2Zm2.53 8.35L19.15 12l2.69-4.49a1 1 0 0 0-.35-1.37A1 1 0 0 0 21 6h-5.45l-2.7-4.52a1 1 0 0 0-1.37-.35 1.17 1.17 0 0 0-.35.35L8.43 6H3a1 1 0 0 0-1 1 1 1 0 0 0 .15.53L4.83 12l-2.69 4.5a1 1 0 0 0 .36 1.37A1.09 1.09 0 0 0 3 18h5.43l2.7 4.52a1 1 0 0 0 1.37.35 1.17 1.17 0 0 0 .35-.35l2.7-4.52H21a1 1 0 0 0 .75-1.67Z" />
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

EventBarBatMitzvah.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
