import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ActivityScience Icon
 */
export const ActivityScience = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M12 10a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm7.84 9.84a.88.88 0 0 1-.59.16c-1.08 0-3-.86-5.25-2.48A32.5 32.5 0 0 0 17.52 14a19.2 19.2 0 0 1 1.68 2.69c1.01 2 .86 2.93.64 3.15ZM4.75 20a.88.88 0 0 1-.59-.16c-.22-.22-.36-1.15.63-3.15A20.25 20.25 0 0 1 6.48 14 32.5 32.5 0 0 0 10 17.52C7.76 19.14 5.83 20 4.75 20ZM4.17 4.16A.88.88 0 0 1 4.76 4c1.08 0 3 .86 5.24 2.48A34.4 34.4 0 0 0 6.48 10C4.23 6.93 3.67 4.66 4.17 4.16ZM16 12a32.17 32.17 0 0 1-4 4 35.57 35.57 0 0 1-4-4 33.4 33.4 0 0 1 4-4 32.32 32.32 0 0 1 4 4Zm3.24-8a.88.88 0 0 1 .59.16c.5.5-.06 2.77-2.31 5.84A34.4 34.4 0 0 0 14 6.48C16.23 4.86 18.16 4 19.24 4Zm1.7 11.57A22.21 22.21 0 0 0 18.67 12c2.81-3.72 4.33-7.48 2.57-9.24a2.76 2.76 0 0 0-2-.76C17.36 2 14.75 3.24 12 5.33 9.25 3.24 6.64 2 4.81 2a2.8 2.8 0 0 0-2 .76C1 4.52 2.52 8.28 5.33 12a22.21 22.21 0 0 0-2.27 3.57c-1.65 3.29-1.07 4.9-.3 5.67a2.78 2.78 0 0 0 2.05.76c1.83 0 4.44-1.24 7.19-3.33 2.75 2.09 5.36 3.33 7.19 3.33a2.76 2.76 0 0 0 2-.76c.81-.77 1.4-2.38-.25-5.67Z" />
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

ActivityScience.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
