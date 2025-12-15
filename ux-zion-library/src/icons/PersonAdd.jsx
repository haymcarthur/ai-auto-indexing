import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * PersonAdd Icon
 */
export const PersonAdd = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M17 22H2v-.94c0-3.28 3.1-5.62 7.5-5.62s7.5 2.34 7.5 5.62V22Zm-2.19-2H4.19c.63-1.64 2.73-2.56 5.31-2.56 2.58 0 4.69.92 5.31 2.56ZM9.5 14.5a3.76 3.76 0 0 1-3.75-3.75A3.76 3.76 0 0 1 9.5 7a3.76 3.76 0 0 1 3.75 3.75A3.76 3.76 0 0 1 9.5 14.5Zm0-2c-.96 0-1.75-.79-1.75-1.75S8.54 9 9.5 9s1.75.79 1.75 1.75-.79 1.75-1.75 1.75ZM22 5h-3V2h-2v3h-3v2h3v3h2V7h3V5Z" />
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

PersonAdd.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
