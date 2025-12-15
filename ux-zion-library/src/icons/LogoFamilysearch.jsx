import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * LogoFamilysearch Icon
 */
export const LogoFamilysearch = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M15 11h5V6h-5Zm4-1h-3V7h3ZM6 8h3V5H6Zm2.18-.82H6.82V5.82h1.36ZM10 6h4V2h-4Zm3.14-.86h-2.28V2.86h2.28ZM13.77 17H17v-5h-5v5h1.1a3.31 3.31 0 0 1-1.89 1.65 9.85 9.85 0 0 1 1-7.65H14V7h-4v4h.94a10.74 10.74 0 0 0-1.63 4.29A3.6 3.6 0 0 1 8 14h1V9H4v5h3.3a5.49 5.49 0 0 0 1.91 2.52v.32a10.72 10.72 0 0 0 2.7 7.16h3a10 10 0 0 1-3.28-4.15A5.22 5.22 0 0 0 13.77 17ZM13 13h3v3h-3Zm-2-5h2v2h-2Zm-6 2h3v3H5Zm13 5h3v-3h-3Zm2.1-.9h-1.2v-1.2h1.2Z" />
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

LogoFamilysearch.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
