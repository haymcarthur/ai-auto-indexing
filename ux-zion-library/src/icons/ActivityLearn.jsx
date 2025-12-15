import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * ActivityLearn Icon
 */
export const ActivityLearn = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M15.85 2.87A4.15 4.15 0 0 0 18 1.32c-.91-.33-1.9-.4-2.85-.19-.87.27-1.62.81-2.15 1.55.91.33 1.9.4 2.85.19ZM20 20H6v-1h14v1ZM4 16h13v1H4v-1Zm5.26-7.27c0-.8-.3-1.58-.82-2.18.2-.2.43-.4.67-.55.51.26.98.6 1.39 1a1 1 0 0 0 1.35 0c.4-.4.87-.74 1.38-1a3.8 3.8 0 1 1-4.17 6.35c-.41-.26-.77-.6-1.06-1a3.3 3.3 0 0 0 1.26-2.62ZM21 17h-2v-2a1 1 0 0 0-1-1h-3.69A6 6 0 0 0 14 3.8a1.6 1.6 0 0 0-.77-.2 3.5 3.5 0 0 0-1.91.82L12 1H9.94l.72 3.4a3.48 3.48 0 0 0-1.89-.8c-.27 0-.53.07-.77.2a6.11 6.11 0 0 0-2.08 2 1 1 0 0 0 .34 1.4A1.49 1.49 0 0 1 6 9.9a1 1 0 0 0-.59 1.28A6 6 0 0 0 7.69 14H3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Z" />
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

ActivityLearn.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
