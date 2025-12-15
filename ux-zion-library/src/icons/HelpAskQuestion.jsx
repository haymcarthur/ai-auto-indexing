import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * HelpAskQuestion Icon
 */
export const HelpAskQuestion = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M21 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM2 9v9h3v2l2.67-2H15V9H2Zm1 15v-4H2a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8.33L3 24ZM21 9h-2V6h1a2 2 0 1 0-2-2h-2a4 4 0 1 1 5 3.87V9Z" fillRule="evenodd" />
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

HelpAskQuestion.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
