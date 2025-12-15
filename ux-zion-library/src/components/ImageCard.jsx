import React from 'react'
import PropTypes from 'prop-types'
import { spacing } from '../tokens/spacing'

/**
 * ImageCard
 *
 * An image-only card component with no content padding.
 * Image extends edge-to-edge with size variations and visual variants.
 * Matches Zion UI design system.
 *
 * @param {string} image - Image URL
 * @param {string} size - Card size: 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'
 * @param {string} variant - Visual variant: 'elevated', 'outlined', 'none'
 * @param {string} aspectRatio - Image aspect ratio: '16:9', '4:3', '3:2', '1:1', '2:3', '3:4', '9:16'
 */
export const ImageCard = ({
  image,
  size = 'md',
  variant = 'elevated',
  aspectRatio = '16:9',
  ...rest
}) => {
  // Size configurations (border radius only, no padding)
  const sizeConfig = {
    xxs: { borderRadius: spacing.nano },
    xs: { borderRadius: spacing.nano },
    sm: { borderRadius: spacing.nano },
    md: { borderRadius: spacing.xxs },
    lg: { borderRadius: '16px' },
    xl: { borderRadius: '20px' },
    xxl: { borderRadius: '24px' }
  }

  // Variant configurations
  const variantStyles = {
    elevated: {
      boxShadow: '0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.20)',
      border: 'none'
    },
    outlined: {
      border: '1px solid #CACDCD',
      boxShadow: 'none'
    },
    none: {
      border: 'none',
      boxShadow: 'none'
    }
  }

  // Aspect ratio configurations (as percentage)
  const aspectRatios = {
    '16:9': 56.25,
    '4:3': 75,
    '3:2': 66.67,
    '1:1': 100,
    '2:3': 150,
    '3:4': 133.33,
    '9:16': 177.78
  }

  const config = sizeConfig[size]
  const variantStyle = variantStyles[variant]
  const paddingTop = aspectRatios[aspectRatio]

  // Container styles
  const containerStyles = {
    position: 'relative',
    width: '100%',
    paddingTop: `${paddingTop}%`,
    borderRadius: config.borderRadius,
    overflow: 'hidden',
    ...variantStyle
  }

  // Image styles
  const imageStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }

  return (
    <div style={containerStyles} {...rest}>
      <img src={image} alt="" style={imageStyles} />
    </div>
  )
}

ImageCard.propTypes = {
  image: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  variant: PropTypes.oneOf(['elevated', 'outlined', 'none']),
  aspectRatio: PropTypes.oneOf(['16:9', '4:3', '3:2', '1:1', '2:3', '3:4', '9:16'])
}
