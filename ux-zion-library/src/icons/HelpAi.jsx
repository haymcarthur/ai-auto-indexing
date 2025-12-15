import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * HelpAi Icon
 */
export const HelpAi = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M16.23 18.37a.25.25 0 0 1-.46 0L14.15 14a.25.25 0 0 0-.15-.15l-4.37-1.62a.25.25 0 0 1 0-.47l4.37-1.6a.25.25 0 0 0 .15-.15l1.62-4.37a.25.25 0 0 1 .47 0l1.6 4.36c.03.07.08.12.15.15l4.37 1.62c.21.08.21.38 0 .46L18 13.85a.25.25 0 0 0-.15.15l-1.62 4.37Zm-9-7a.25.25 0 0 1-.47 0L5.7 8.46a.25.25 0 0 0-.15-.15l-2.9-1.08a.25.25 0 0 1 0-.47l2.9-1.07a.25.25 0 0 0 .15-.15l1.07-2.9a.25.25 0 0 1 .47 0l1.08 2.9c.03.07.08.12.15.15l2.9 1.07c.22.09.22.4 0 .47l-2.9 1.08a.25.25 0 0 0-.15.15l-1.08 2.9Zm1 9a.25.25 0 0 1-.47 0l-.8-2.18a.25.25 0 0 0-.15-.15l-2.18-.8a.25.25 0 0 1 0-.48l2.18-.8a.25.25 0 0 0 .15-.15l.8-2.18a.25.25 0 0 1 .47 0l.81 2.18c.03.07.08.12.15.15l2.18.8c.21.09.21.4 0 .47l-2.18.81a.25.25 0 0 0-.15.15l-.8 2.18Z" />
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

HelpAi.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
