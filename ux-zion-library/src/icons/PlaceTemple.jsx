import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * PlaceTemple Icon
 */
export const PlaceTemple = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="m20.27 11.29-1.39-.4L18.29 5h-.8l-.24 5.43-.76-.22v-.39a.8.8 0 0 0-.81-.81h-1.19V4.89c0-.49-.4-.88-.88-.88h-.82l-.4-4h-.8l-.4 4h-.82c-.49 0-.88.4-.88.88v4.12H8.3a.8.8 0 0 0-.81.81v.39l-.76.22L6.49 5h-.8l-.59 5.89-1.39.4a1 1 0 0 0-.73.96v7.44c0 .72.58 1.31 1.31 1.31h15.39a1.3 1.3 0 0 0 1.31-1.31v-7.44a1 1 0 0 0-.73-.96ZM7.5 19H5v-5.99l2.5-.72V19ZM11 5.5h2V9h-2V5.5ZM15 19H9v-8h6v8Zm4 0h-2.5v-6.71l2.5.72V19Z" />
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

PlaceTemple.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
