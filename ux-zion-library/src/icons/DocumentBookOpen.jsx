import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * DocumentBookOpen Icon
 */
export const DocumentBookOpen = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="m11 18.59-.29-.3A1 1 0 0 0 10 18H4V7h5.59L11 8.41ZM21 5h-1v13h-6a1 1 0 0 0-.71.29l-.29.3V8.41l1-1V5a1 1 0 0 0-.71.29L12 6.59l-1.29-1.3A1 1 0 0 0 10 5H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6.59l1.7 1.71a1 1 0 0 0 1.41 0L14.41 20H21a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Zm-2 8-2-2-2 2V3h4Zm-9-3H7V8h3Zm0 3H5v-2h5Zm0 3H5v-2h5Z" />
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

DocumentBookOpen.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
