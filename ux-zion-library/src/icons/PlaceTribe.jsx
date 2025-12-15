import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * PlaceTribe Icon
 */
export const PlaceTribe = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M14 13.91c-2.09 2.1-3.4 2.3-4.37 2.3a3 3 0 0 1-2-.92c-1-1.08-1.2-3.44 1.87-6.52l.5-.48 1.82 1.88a1 1 0 0 0 1.07.22 1 1 0 0 0 .61-.9V6.05A47.6 47.6 0 0 1 20 4a30.4 30.4 0 0 1-6 9.91Zm7.71-11.62a1 1 0 0 0-.94-.29 27.86 27.86 0 0 0-8.27 2.5c-.58.29-.5 1-.5 1.4v1.67L11 6.5c-.35-.36-1.1-.8-1.5-.5a19.94 19.94 0 0 0-1.72 1.72c-3.8 3.8-3 7.25-1.64 9.14L3 20v3l4.78-4.78a5.24 5.24 0 0 0 2.22.28c1.19 0 3-.5 5.5-3 3.89-3.89 6.4-11.93 6.5-12.28a1 1 0 0 0-.29-.93Z" />
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

PlaceTribe.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
