import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * HelpTip Icon
 */
export const HelpTip = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M13 0h-2v4h2ZM6 4.72 3.28 2 2 3.28 4.72 6ZM9 23h2v1h2v-1h2v-2H9Zm4.67-6.29a1 1 0 0 0-.67.94V18h-2v-.35a1 1 0 0 0-.67-.94 5 5 0 1 1 3.34 0ZM12 5a7 7 0 0 0-3 13.32V19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-.68A7 7 0 0 0 12 5ZM0 13h4v-2H0Zm20 0h4v-2h-4Zm1-9.72L19.72 2 17 4.72 18.28 6Z" />
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

HelpTip.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
