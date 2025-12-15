import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * DocumentRecordPerson Icon
 */
export const DocumentRecordPerson = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path d="M18.5 18c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5Zm0 1C16 19 14 21.2 14 24h9c0-2.8-2-5-4.5-5ZM9 16h5v-2H9v2Zm-1-3h7v-2H8v2Zm5.14 7H6V4h8v4h4v3.05c.17-.02.33-.05.5-.05.53 0 1.03.1 1.5.27V6.59L15.41 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h6.27c.2-.72.49-1.4.87-2Z" />
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

DocumentRecordPerson.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
