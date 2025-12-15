import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * SocialFaceMad Icon
 */
export const SocialFaceMad = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M12 20a8 8 0 1 1 8-8 8 8 0 0 1-8 8Zm0-18a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm-1.5 7.72L7.78 7 6.5 8.28 9.22 11Zm-4 5.57 1.4 1.52a5.55 5.55 0 0 1 7.83-.37 5.66 5.66 0 0 1 .42.43l1.38-1.51a7.39 7.39 0 0 0-10.43-.63 7.53 7.53 0 0 0-.57.56Zm11-7L16.25 7l-2.72 2.72L14.82 11Z" />
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

SocialFaceMad.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
