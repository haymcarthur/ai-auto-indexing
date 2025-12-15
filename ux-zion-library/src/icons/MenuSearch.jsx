import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * MenuSearch Icon
 */
export const MenuSearch = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="m20.44 21.6-7-7a6.65 6.65 0 0 1-4.22 1.45c-2.02 0-3.73-.7-5.12-2.1S2 10.86 2 8.84s.7-3.73 2.1-5.12 3.1-2.1 5.12-2.1 3.73.7 5.13 2.1 2.1 3.1 2.1 5.12A6.78 6.78 0 0 1 15 13.05l7 7-1.56 1.56ZM9.22 14.34c1.53 0 2.83-.53 3.9-1.6s1.6-2.37 1.6-3.9-.53-2.83-1.6-3.9-2.37-1.6-3.9-1.6-2.82.54-3.9 1.6-1.6 2.37-1.6 3.9.54 2.83 1.6 3.9 2.37 1.6 3.9 1.6Z" />
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

MenuSearch.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
