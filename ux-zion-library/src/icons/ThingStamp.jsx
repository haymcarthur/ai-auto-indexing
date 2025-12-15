import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ThingStamp Icon
 */
export const ThingStamp = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="m17 16-3.74-6-2.61 4.17-1.25-2L7 16Zm-7.5-5A1.5 1.5 0 1 0 8 9.5 1.5 1.5 0 0 0 9.5 11Zm8.5 7H6V6h12Zm4-13V4a2 2 0 0 0-2-2h-1v2h-2V2h-2v2h-2V2h-2v2H9V2H7v2H5V2H4a2 2 0 0 0-2 2v1h2v2H2v2h2v2H2v2h2v2H2v2h2v2H2v1a2 2 0 0 0 2 2h1v-2h2v2h2v-2h2v2h2v-2h2v2h2v-2h2v2h1a2 2 0 0 0 2-2v-1h-2v-2h2v-2h-2v-2h2v-2h-2V9h2V7h-2V5Z" />
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

ThingStamp.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
