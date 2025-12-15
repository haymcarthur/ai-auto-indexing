import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * PlaceSuggestion Icon
 */
export const PlaceSuggestion = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M18.4 7.12c0 .88-.72 1.6-1.6 1.6s-1.6-.72-1.6-1.6a1.6 1.6 0 1 1 3.2 0Zm-6.16 2.02a2.85 2.85 0 0 1 2 .01 5.5 5.5 0 0 1-.51-1.95 3.06 3.06 0 1 1 6.12 0c0 .6-.32 2.27-2.63 5.81h2.53c1.48-2.46 2.24-4.41 2.24-5.81a5.2 5.2 0 1 0-10.01 2.02l.25-.08h.01Zm9.84 6.36c.2.4.1.8-.1 1.1l-2.99 3.99c-.2.2-.5.4-.8.4H7.96c-.08.56-.55 1-1.13 1H3.15c-.64 0-1.16-.52-1.16-1.16v-7.68c0-.64.52-1.16 1.16-1.16h3.68c.47 0 .88.29 1.06.7l5.02-1.67c.5-.2 1 .1 1.2.5l1 1.99c.2.4.1.9-.2 1.2l-.3.3h6.58c.4 0 .7.2.9.5l-.01-.01ZM6 14H4v6h2v-6Zm13.19 3.01h-7.7V15.3l1.52-1.51-.29-.59L8 14.77V19h9.7l1.49-1.99Z" />
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

PlaceSuggestion.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
