import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * NoticeInfo Icon
 */
export const NoticeInfo = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M13 15v-4a1 1 0 0 0-1-1h-2v2h1v3H9v2h6v-2Zm0-7.5A1.5 1.5 0 1 1 11.5 6 1.5 1.5 0 0 1 13 7.5ZM12 4a8 8 0 1 0 8 8 8 8 0 0 0-8-8Zm0 18a10 10 0 1 1 10-10 10 10 0 0 1-10 10Z" />
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

NoticeInfo.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
