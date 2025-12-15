import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * SocialStar Icon
 */
export const SocialStar = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M12 16a1 1 0 0 1 .56.16l3.73 2.5-1.29-4.4a1 1 0 0 1 .25-1l3.3-3.3H15a1 1 0 0 1-.9-.55L12 5.2 9.9 9.42A1 1 0 0 1 9 10H5.41l3.3 3.3a1 1 0 0 1 .25 1l-1.25 4.35 3.73-2.5A1 1 0 0 1 12 16Zm6 6a1 1 0 0 1-.56-.17L12 18.19l-5.44 3.64a1 1 0 0 1-1.4-.18 1 1 0 0 1-.16-.93l1.84-6.45-4.55-4.59A1 1 0 0 1 3 8h5.38l2.72-5.49a1 1 0 0 1 1.34-.46 1 1 0 0 1 .46.46L15.62 8H21a1 1 0 0 1 1 1 1 1 0 0 1-.3.72l-4.58 4.58L19 20.72a1 1 0 0 1-.61 1.28h-.07a.86.86 0 0 1-.32 0Z" />
      <path d="m12 18 6 3-1.5-7 4.7-5s-5.51.1-5.73 0S12 2.5 12 2.5L8.5 9h-6l5 5L6 21Z" />
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

SocialStar.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
