import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * NoticeQuestion Icon
 */
export const NoticeQuestion = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M13 17a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0-2h-2v-3h1a2 2 0 1 0-2-2H8a4 4 0 1 1 5 3.87V15ZM12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 18a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z" fillRule="evenodd" />
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

NoticeQuestion.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
