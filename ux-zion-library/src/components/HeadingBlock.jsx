import React from 'react'
import PropTypes from 'prop-types'
import { colors, transparentColors } from '../tokens/colors'
import { headingBlocks } from '../tokens/typography'

/**
 * HeadingBlock
 *
 * A block component combining overline, header, and subheading with
 * spacing and sizes based on header level. Matches Zion UI design system.
 *
 * @param {string} overline - Optional overline text
 * @param {string} heading - Header text (required)
 * @param {string} level - Header level: 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
 * @param {string} subheading - Optional subheading text
 * @param {boolean} centered - Center align all text (default: false)
 * @param {boolean} supplemental - Use supplemental typography instead of display for heading (default: false)
 */
export const HeadingBlock = ({
  overline,
  heading,
  level = 'h1',
  subheading,
  centered = false,
  supplemental = false,
  ...rest
}) => {
  const Tag = level
  const config = headingBlocks[level]

  // Choose between display and supplemental typography for heading
  const headingTypography = supplemental ? config.supplemental : config.display

  // Spacing between elements
  const levelSpacing = {
    h1: 10,
    h2: 7,
    h3: 6,
    h4: 2,
    h5: 1,
    h6: 1
  }

  const containerStyles = {
    textAlign: centered ? 'center' : 'left'
  }

  return (
    <div style={containerStyles} {...rest}>
      {overline && (
        <p style={{
          margin: 0,
          marginBottom: `${levelSpacing[level]}px`,
          ...config.overline,
          color: transparentColors.transparentGray80
        }}>
          {overline}
        </p>
      )}

      <Tag style={{
        margin: 0,
        marginBottom: subheading ? `${levelSpacing[level]}px` : 0,
        ...headingTypography,
        color: colors.gray.gray100
      }}>
        {heading}
      </Tag>

      {subheading && (
        <p style={{
          margin: 0,
          ...config.subheading,
          color: transparentColors.transparentGray80
        }}>
          {subheading}
        </p>
      )}
    </div>
  )
}

HeadingBlock.propTypes = {
  overline: PropTypes.string,
  heading: PropTypes.string.isRequired,
  level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  subheading: PropTypes.string,
  centered: PropTypes.bool,
  supplemental: PropTypes.bool
}
