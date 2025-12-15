import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * EventDeath Icon
 */
export const EventDeath = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M15.73 6.52a2.21 2.21 0 0 0-.91 1.85A5.22 5.22 0 0 0 16 11.51l.5-.51a1.8 1.8 0 0 1 2.5-.17 1.78 1.78 0 0 1 .37.45l.52.88H20a9 9 0 0 0 1.15-3.78 2.21 2.21 0 0 0-.91-1.85 4.12 4.12 0 0 0-4.54 0ZM23 8.37A10.61 10.61 0 0 1 21.65 13a1.88 1.88 0 0 1-3.28.11l-.52-.87-.46.52a1.82 1.82 0 0 1-2.57.15 1.93 1.93 0 0 1-.27-.3A7.07 7.07 0 0 1 13 8.37 4.06 4.06 0 0 1 14.65 5a4.82 4.82 0 0 1 1.07-.58 2.26 2.26 0 0 0-.26-.42 2.15 2.15 0 0 0-2-1 2.15 2.15 0 0 0-2 1A3.46 3.46 0 0 0 11 5.83V15h1.75a4.8 4.8 0 0 1 3.91 1.42 5 5 0 0 1 0 6.83l-.72.75L11 18.68V24H9v-5.27L4.06 24l-.72-.75a5 5 0 0 1 0-6.83A4.8 4.8 0 0 1 7.25 15H9V5.83a5.72 5.72 0 0 1 .86-2.95A4.18 4.18 0 0 1 13.5 1a4.18 4.18 0 0 1 3.64 1.88A5.22 5.22 0 0 1 17.67 4H18a5.64 5.64 0 0 1 3.35 1A4.06 4.06 0 0 1 23 8.37Zm-7.76 9.54a2.84 2.84 0 0 1 .58 2.94l-3.49-3.74c1.2-.02 2.12-.03 2.91.8Zm-10.48 0c.78-.82 1.68-.82 2.91-.8l-3.48 3.74a2.81 2.81 0 0 1 .57-2.94Z" />
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

EventDeath.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
