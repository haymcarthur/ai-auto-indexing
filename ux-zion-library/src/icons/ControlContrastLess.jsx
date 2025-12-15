import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ControlContrastLess Icon
 */
export const ControlContrastLess = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M2 12a10 10 0 1 1 10 10A10 10 0 0 1 2 12Zm2 0a8 8 0 0 0 7 7.93V4.07A8 8 0 0 0 4 12Zm9-7.93a8.07 8.07 0 0 1 2.87.93H13ZM18.24 7H13v1h5.92a7.65 7.65 0 0 0-.68-1ZM13 10h6.74a8.4 8.4 0 0 1 .19 1H13Zm0 9v.93a8.07 8.07 0 0 0 2.87-.93Zm5.24-2H13v-1h5.92a7.65 7.65 0 0 1-.68 1ZM13 14h6.74a8.4 8.4 0 0 0 .19-1H13Z" />
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

ControlContrastLess.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
