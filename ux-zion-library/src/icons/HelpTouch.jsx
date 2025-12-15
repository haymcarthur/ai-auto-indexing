import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * HelpTouch Icon
 */
export const HelpTouch = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="m18.32 13.44-3.27-1.62a5.44 5.44 0 0 0 2.14-4.32 5.55 5.55 0 1 0-8.07 4.89v3.26l-1.86-.39h-.42a2 2 0 0 0-1.43.59L4 17.22l5.14 5.09a2.36 2.36 0 0 0 1.66.69h6.36a2 2 0 0 0 2-1.67l.84-4.71a3 3 0 0 0-1.68-3.18ZM18 16.29 17.16 21H10.8a.37.37 0 0 1-.24-.1l-3.71-3.68 4.29.89V7.5a.5.5 0 0 1 .58-.4.51.51 0 0 1 .4.4v6h1.77l3.49 1.73a1 1 0 0 1 .62 1.06ZM11.64 4a3.52 3.52 0 0 0-3.53 3.5 3.4 3.4 0 0 0 1 2.44V7.5a2.52 2.52 0 0 1 5 0v2.44a3.4 3.4 0 0 0 1-2.44A3.52 3.52 0 0 0 11.64 4Z" />
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

HelpTouch.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
