import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ControlSplit Icon
 */
export const ControlSplit = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M13 23h-2V1h2v22ZM3 19V5c0-1.1.9-2 2-2h4v2H5v14h4v2H5a2 2 0 0 1-2-2ZM19 9h2V7h-2v2Zm-4 12h2v-2h-2v2Zm4-18v2h2a2 2 0 0 0-2-2Zm0 14h2v-2h-2v2ZM17 5h-2V3h2v2Zm2 8h2v-2h-2v2Zm2 6a2 2 0 0 1-2 2v-2h2Z" fillRule="evenodd" />
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

ControlSplit.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
