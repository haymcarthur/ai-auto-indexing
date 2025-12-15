import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * SocialContributions Icon
 */
export const SocialContributions = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M16.5 21H6v-4.28l4.49-1.5.29.58-1.49 1.49A1 1 0 0 0 9 18v1h9ZM2 16h2v6H2Zm18.89 1.55A1 1 0 0 0 20 17h-7.59l.3-.29a1 1 0 0 0 .18-1.16l-1-2a1 1 0 0 0-1.21-.5l-4.75 1.59A1 1 0 0 0 5 14H1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1h11a1 1 0 0 0 .8-.4l3-4a1 1 0 0 0 .09-1.05ZM16 10.69a1 1 0 0 1 .55.17l2.19 1.44-1-2.25A1 1 0 0 1 18 8.89L20.27 7H18a1 1 0 0 1-.93-.63L16 3.69l-1.07 2.68A1 1 0 0 1 14 7h-2.27L14 8.89a1 1 0 0 1 .27 1.16l-1 2.25 2.19-1.44a1.14 1.14 0 0 1 .54-.17ZM21 16a1 1 0 0 1-.55-.17L16 12.89l-1.95 1.29-1-1.46-1.83-.8.86-2-3.73-3.16a1 1 0 0 1-.11-1.41A1 1 0 0 1 9 5h4.32L15.07.63a1 1 0 0 1 1.3-.56 1 1 0 0 1 .56.56L18.68 5H23a1 1 0 0 1 1 1 1 1 0 0 1-.35.75l-3.76 3.19 2 4.66a1 1 0 0 1-.51 1.32A1 1 0 0 1 21 16Z" />
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

SocialContributions.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
