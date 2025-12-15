import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * PersonSearch Icon
 */
export const PersonSearch = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M6 13a2.79 2.79 0 0 1 2.56-3H9a2.79 2.79 0 0 1 3 3H6Zm5-6a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm9.66 16-6.81-6.82a7.43 7.43 0 0 1-4.74 1.63c-2.27 0-4.19-.79-5.76-2.36S1 11.97 1 9.7s.78-4.18 2.35-5.75 3.5-2.36 5.76-2.36 4.18.79 5.75 2.36 2.35 3.48 2.35 5.75a7.6 7.6 0 0 1-1.62 4.74l6.82 6.82L20.66 23ZM9.11 15.81c1.7 0 3.14-.6 4.33-1.78s1.78-2.63 1.78-4.33-.6-3.14-1.78-4.33S10.8 3.59 9.1 3.59s-3.14.59-4.33 1.78S3 8 3 9.7s.59 3.14 1.78 4.33S7.4 15.8 9.1 15.8Z" />
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

PersonSearch.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
