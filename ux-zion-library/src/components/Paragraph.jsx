import React from 'react'
import PropTypes from 'prop-types'
import { colors, transparentColors } from '../tokens/colors'
import { paragraph, paragraphDense } from '../tokens/typography'

/**
 * Paragraph
 *
 * Paragraph text component with size variants matching Zion UI design system.
 *
 * @param {string} size - Paragraph size: 'xs', 'sm', 'md', 'lg', 'xl'
 * @param {boolean} secondary - Use secondary color (73.7% opacity)
 * @param {boolean} dense - Use dense line height (130% instead of 150%)
 * @param {node} children - Paragraph content
 */
export const Paragraph = ({
  size = 'sm',
  secondary = false,
  dense = false,
  children,
  ...rest
}) => {
  // Get typography tokens based on dense prop
  const typographyToken = dense ? paragraphDense[size] : paragraph[size]

  const styles = {
    margin: 0,
    ...typographyToken,
    color: secondary ? transparentColors.transparentGray80 : colors.gray.gray100
  }

  return (
    <p style={styles} {...rest}>
      {children}
    </p>
  )
}

Paragraph.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  secondary: PropTypes.bool,
  dense: PropTypes.bool,
  children: PropTypes.node
}
