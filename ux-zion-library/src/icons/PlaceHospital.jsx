import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * PlaceHospital Icon
 */
export const PlaceHospital = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M19 18h-4v2h4Zm-8-2H5v2h6Zm8-1h-4v2h4Zm-8-2H5v2h6Zm9 9h-6v-8h6ZM4 9a5 5 0 0 0 7 1 4.74 4.74 0 0 0 1-1v13H9v-2H7v2H4Zm1-4h2V3h2v2h2v2H9v2H7V7H5Zm16 7h-7V8a1 1 0 0 0-1-1h-.1a4.78 4.78 0 0 0 .1-1A5 5 0 0 0 3 6a5.56 5.56 0 0 0 .1 1H3a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V13a1 1 0 0 0-1-1Z" />
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

PlaceHospital.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
