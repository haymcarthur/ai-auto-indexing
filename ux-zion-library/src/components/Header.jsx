import React from 'react'
import PropTypes from 'prop-types'
import { colors } from '../tokens/colors'
import { display, bold, body } from '../tokens/typography'

/**
 * Header
 *
 * Semantic header component (H1-H6) matching Zion UI design system.
 *
 * @param {string} level - Header level: 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
 * @param {node} children - Header content
 */
export const Header = ({ level = 'h1', children, style, supplementary = false, ...rest }) => {
  const Tag = level

  // Typography configurations for each header level using design tokens
  const headerStyles = {
    h1: { ...display.h, color: colors.gray.gray100 },
    h2: { ...display.g, color: colors.gray.gray100 },
    h3: { ...display.f, color: colors.gray.gray100 },
    h4: { ...bold.d, color: colors.gray.gray100 },
    h5: { ...bold.c, color: colors.gray.gray100 },
    h6: { ...bold.b, color: colors.gray.gray100 }
  }

  // Apply supplementary styling if specified
  const baseStyles = {
    margin: 0,
    ...headerStyles[level],
    ...(supplementary && level === 'h5' && { ...body.c, color: colors.gray.gray100 }),
    ...(supplementary && level !== 'h5' && { color: colors.gray.gray60 })
  }

  // Merge with any additional styles passed in
  const mergedStyles = {
    ...baseStyles,
    ...style
  }

  return (
    <Tag style={mergedStyles} {...rest}>
      {children}
    </Tag>
  )
}

Header.propTypes = {
  level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  children: PropTypes.node
}
