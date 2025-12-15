import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ThingMap Icon
 */
export const ThingMap = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M21 5a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-8 14.92-3-2.4V6.07l3 2.4v11.45ZM4 8.53l4-2.67v11.6l-4 2.67V8.53Zm16.56 10.3A1 1 0 0 0 21 18v-3h-2v2.46l-4 2.67V8a1 1 0 0 0-.38-.78l-5-4c-.18-.13-.4-.2-.62-.22a1 1 0 0 0-.58.16l-6 4A1 1 0 0 0 2 8v14a1 1 0 0 0 1 1 1 1 0 0 0 .56-.17L9 19.24l4.43 3.54A1 1 0 0 0 14 23c.2.01.4-.05.55-.18l6.01-3.99ZM20 3.05a2 2 0 0 1 2 2v.06c0 1.65-1.11 3.87-2 5.35-.89-1.46-2-3.69-2-5.35a2 2 0 0 1 1.94-2.06H20Zm0 11 .8-1.1c.13-.17 3.2-4.41 3.2-7.79a4 4 0 0 0-8 0c0 3.38 3.07 7.62 3.2 7.79l.8 1.1Z" fillRule="evenodd" />
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

ThingMap.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
