import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * PlaceStore Icon
 */
export const PlaceStore = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M7 18h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Zm13 2h-2v-6a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v6H4v-8h16Zm-6-5h2v5h-2ZM5.1 4H7l-2 6H3ZM13 4h2l2 6h-4Zm-6 6 2-6h2v6Zm14 0h-2l-2-6h2Zm2.94.65-3-8A1 1 0 0 0 20 2H4a1 1 0 0 0-.94.65l-3 8a1 1 0 0 0 .59 1.29A1.07 1.07 0 0 0 1 12h1v9a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-9h1a1 1 0 0 0 1-1 .7.7 0 0 0-.06-.35Z" />
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

PlaceStore.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
