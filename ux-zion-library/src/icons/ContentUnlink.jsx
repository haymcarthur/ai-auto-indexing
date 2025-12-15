import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ContentUnlink Icon
 */
export const ContentUnlink = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M18.89 7.48 22 4.4 20.59 3 3.85 19.6 5.26 21l4-4H11v-1.69l2.27-2.25H16v-2h-.73L17.34 9a3.07 3.07 0 1 1-.34 6.14h-4V17h4a4.95 4.95 0 0 0 1.89-9.54v.02ZM7 7.11h4V9H7a3.07 3.07 0 0 0-1.23 5.89l-1.4 1.39A4.94 4.94 0 0 1 7 7.11Zm2.61 4L8 12.67v-1.6l1.61.04Z" fillRule="evenodd" />
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

ContentUnlink.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
