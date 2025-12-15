import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * MediaFilm Icon
 */
export const MediaFilm = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M11.52 2.48a9.53 9.53 0 0 0 0 19.04 9.32 9.32 0 0 0 5.58-1.81 9.53 9.53 0 0 0-5.58-17.23Zm0 17.23a7.71 7.71 0 1 1 .01-15.43 7.71 7.71 0 0 1 0 15.43Zm-3.17-8.62a1.36 1.36 0 1 1-2.72 0 1.36 1.36 0 0 1 2.72 0Zm1.81 4.54a1.36 1.36 0 1 1-2.71 0 1.36 1.36 0 0 1 2.71 0Zm5.44 0a1.36 1.36 0 1 1-2.71 0 1.36 1.36 0 0 1 2.71 0ZM12.88 12a1.36 1.36 0 1 1-2.71 0 1.36 1.36 0 0 1 2.71 0Zm4.54-.9a1.36 1.36 0 1 1-2.72 0 1.36 1.36 0 0 1 2.72 0Zm-4.54-3.63a1.36 1.36 0 1 1-2.71 0 1.36 1.36 0 0 1 2.71 0Zm9.07 12.24v1.81h-6.18a10.3 10.3 0 0 0 2.77-1.81h3.41Z" />
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

MediaFilm.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
