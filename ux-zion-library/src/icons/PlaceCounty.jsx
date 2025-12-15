import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * PlaceCounty Icon
 */
export const PlaceCounty = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M19 10h-4V6l-2 2v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V8l-2-2Zm-2.68 11H11v-5.28a1.91 1.91 0 0 0 .72-.72H17v5.28a2.07 2.07 0 0 0-.68.72ZM9 21H3.76a2 2 0 0 0-.76-.72V15h5.32a1.91 1.91 0 0 0 .72.72Zm10-.72V13h-7.24A2 2 0 0 0 9 12.29a2 2 0 0 0-.7.7H3V7.72A1.85 1.85 0 0 0 3.76 7H9V5H3.76A2 2 0 0 0 .29 7a2 2 0 0 0 .71.72v12.56a2 2 0 0 0 2 3.49 1.92 1.92 0 0 0 .76-.77h12.56a2 2 0 1 0 3.52-1.9 2 2 0 0 0-.84-.82ZM17.78.3a1.06 1.06 0 0 0-1.48 0L10 6.53 11.52 8 17 2.51 22.56 8 24 6.53Z" />
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

PlaceCounty.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
