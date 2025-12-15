import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * MediaVolume Icon
 */
export const MediaVolume = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M18 11a3 3 0 0 0-3-3v2a1 1 0 0 1 0 2v2a3 3 0 0 0 3-3Zm-3-7v2a5 5 0 0 1 0 10v2a7 7 0 1 0 0-14Z" fillRule="evenodd" />
      <path d="M2.94 19.62 19.58 2.98l1.41 1.41L4.35 21.03z" />
      <path fillRule="evenodd" d="M2 14v-4c0-1.1.9-2 2-2h2.48l3.11-4.42A2 2 0 0 1 13 5v2.53l-2 2V5l-3.48 5H4v4h2.53l-2 2H4a2 2 0 0 1-2-2Zm9-1.64V19l-2.72-3.92-1.44 1.44 2.64 3.76c.37.46.93.72 1.52.72a2 2 0 0 0 2-2v-8.64l-2 2Z" />
      <path d="m8.28 15.08-1.44 1.44-.36-.52H4.53l2-2h1l.75 1.08ZM13 7.53l-2 2v2.83l2-2V7.53Z" fillRule="evenodd" />
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

MediaVolume.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
