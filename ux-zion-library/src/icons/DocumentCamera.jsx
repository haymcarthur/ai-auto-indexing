import React from 'react'
import PropTypes from 'prop-types'
import { iconSizes, iconBackgroundPadding } from '../tokens/iconSizes'

/**
 * DocumentCamera Icon
 */
export const DocumentCamera = ({ size = 'sm', backgroundColor, ...props }) => {
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
      <path fillRule="evenodd" d="M12 16.22a1.78 1.78 0 1 1 0-3.55 1.78 1.78 0 0 1 0 3.55Zm3.56-4.44h-.34a.89.89 0 0 1-.8-.5l-.4-.8a.89.89 0 0 0-.8-.48h-2.45a.89.89 0 0 0-.8.49l-.39.8a.9.9 0 0 1-.8.49h-.34c-.49 0-.88.4-.88.89v4.44c0 .5.4.89.88.89h7.12c.49 0 .88-.4.88-.89v-4.44c0-.5-.4-.9-.88-.9ZM6 20V4h8v4h4v12H6Zm9.41-18H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V6.59L15.41 2Z" />
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

DocumentCamera.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  backgroundColor: PropTypes.string
}
