import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * PersonDuplicates Icon
 */
export const PersonDuplicates = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M9 12a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 9 12Zm-7 5.25c0-2.33 4.66-3.5 7-3.5s7 1.17 7 3.5V19H2Zm7-1.5A9.76 9.76 0 0 0 4.34 17h9.32A9.76 9.76 0 0 0 9 15.75Zm1.5-7.25A1.5 1.5 0 1 0 9 10a1.5 1.5 0 0 0 1.5-1.5Zm5.5 5.31a4.19 4.19 0 0 1 2 3.44V19h4v-1.75c0-2.02-3.5-3.17-6-3.44Zm2.5-5.31A3.5 3.5 0 0 1 15 12a3.4 3.4 0 0 1-1.5-.35 5.47 5.47 0 0 0 0-6.3A3.4 3.4 0 0 1 15 5a3.5 3.5 0 0 1 3.5 3.5Z" />
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

PersonDuplicates.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
