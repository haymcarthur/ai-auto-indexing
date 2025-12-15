import React from 'react'
import PropTypes from 'prop-types'
import { transparentColors } from '../tokens/colors'
import { body } from '../tokens/typography'

/**
 * Subheading
 *
 * Subheading text component with size variants matching Zion UI design system.
 * Uses body typography tokens (130% line height).
 *
 * @param {string} size - Subheading size: 'xl', 'lg', 'md', 'sm', 'xs'
 * @param {node} children - Subheading content
 */
export const Subheading = ({ size = 'xs', children, ...rest }) => {
  // Map size to body tokens (e is xl, d is lg, c is md, b is sm, a is xs)
  const sizeMap = {
    xl: body.e,
    lg: body.d,
    md: body.c,
    sm: body.b,
    xs: body.a
  }

  const styles = {
    margin: 0,
    ...sizeMap[size],
    color: transparentColors.transparentGray80 // Secondary text color
  }

  return (
    <p style={styles} {...rest}>
      {children}
    </p>
  )
}

Subheading.propTypes = {
  size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
  children: PropTypes.node
}
