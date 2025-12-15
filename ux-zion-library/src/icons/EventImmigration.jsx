import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * EventImmigration Icon
 */
export const EventImmigration = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M12.5 3.05a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM4 23 6.8 8.57 5 9.29v3.48H3V8l5.05-2.19c.97-.42 2.1-.05 2.65.86l1 1.64a4.9 4.9 0 0 0 4.3 2.41v2a7.27 7.27 0 0 1-5.5-2.56l-.6 3.07 2.1 2.1V23h-2v-6.14l-2.1-2L6.1 23H4Zm15-10v10h2V1h-2v10a1 1 0 0 0 0 2Z" fillRule="evenodd" />
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

EventImmigration.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
