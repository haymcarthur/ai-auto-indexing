import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * HelpTestDrive Icon
 */
export const HelpTestDrive = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M16 18h2v1h-2ZM6 18h2v1H6Zm8 1h-4v-1h4Zm-5.43-6h6.86l1.8 3H6.77Zm-1.14-2L4 16.72V21h2v.5a1.5 1.5 0 0 0 3 0V21h6v.5a1.5 1.5 0 0 0 3 0V21h2v-4.28L16.57 11ZM7 7a2 2 0 1 1 2-2 2 2 0 0 1-2 2Zm3.86-3a4 4 0 1 0 0 2H13v2h2V6h2v3h2V6h2V4Z" />
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

HelpTestDrive.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
