import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ArrowRotate Icon
 */
export const ArrowRotate = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="m11.57 1 3.82 3.79-3.82 3.8V5.66a6.27 6.27 0 1 0 2.56 12L15.47 19a8.07 8.07 0 1 1-3.9-15.12V1Zm-.75 10.87 5.83 5.81 5.85-5.81L16.66 6l-5.84 5.87Zm5.84 3.28-3.29-3.28 3.28-3.28L20 11.84l-3.34 3.31Z" fillRule="evenodd" />
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

ArrowRotate.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
