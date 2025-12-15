import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * SocialFaceSad Icon
 */
export const SocialFaceSad = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M11.85 13a7.49 7.49 0 0 0-5.47 2.42l1.37 1.52a5.55 5.55 0 0 1 7.83-.37A5.66 5.66 0 0 1 16 17l1.38-1.51A7.49 7.49 0 0 0 11.85 13ZM17 8h-4v2h4Zm-6 0H7v2h4Zm1 12a8 8 0 1 1 8-8 8 8 0 0 1-8 8Zm0-18a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z" />
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

SocialFaceSad.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
