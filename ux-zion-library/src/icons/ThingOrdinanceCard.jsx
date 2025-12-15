import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ThingOrdinanceCard Icon
 */
export const ThingOrdinanceCard = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M2.84 18.22h18.33V5.78H2.83v12.44ZM2.84 4h18.33c1 0 1.83.8 1.83 1.78v12.44A1.8 1.8 0 0 1 21.17 20H2.83A1.8 1.8 0 0 1 1 18.22V5.78C1 4.8 1.82 4 2.83 4Zm8.24 3.56h8.25v1.77h-8.25V7.56Zm0 3.55h7.34v1.78h-7.34V11.1Zm0 3.56h4.59v1.77h-4.59v-1.77Zm-1.7 1.77H4.8V7.56h4.58v8.89Zm-2.75-1.77h.92V9.33h-.92v5.34Z" />
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

ThingOrdinanceCard.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
