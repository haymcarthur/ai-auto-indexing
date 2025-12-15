import React from 'react'
import PropTypes from 'prop-types'
import { spacing } from '../tokens/spacing'

/**
 * Card
 *
 * A container component with size variations and visual variants.
 * Matches Zion UI design system.
 *
 * @param {string} size - Card size: 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'
 * @param {string} variant - Visual variant: 'elevated', 'outlined', 'none'
 * @param {string} image - Optional image URL
 * @param {string} imagePosition - Image position: 'top', 'bottom', 'left', 'right', 'middle'
 * @param {string} imageAspectRatio - Image aspect ratio: '16:9', '4:3', '3:2', '1:1', '2:3', '3:4', '9:16'
 * @param {boolean} removeOppositeMargin - Remove margin on opposite side of image
 * @param {node} children - Card content
 */
export const Card = ({
  size = 'md',
  variant = 'elevated',
  image,
  imagePosition = 'top',
  imageAspectRatio = '16:9',
  removeOppositeMargin = false,
  children,
  ...rest
}) => {
  // Size configurations (padding and border radius)
  const sizeConfig = {
    xxs: { padding: spacing.xxs, borderRadius: spacing.nano },
    xs: { padding: spacing.xs, borderRadius: spacing.nano },
    sm: { padding: spacing.sm, borderRadius: spacing.nano },
    md: { padding: spacing.md, borderRadius: spacing.xxs },
    lg: { padding: spacing.lg, borderRadius: '16px' },
    xl: { padding: spacing.xl, borderRadius: '20px' },
    xxl: { padding: spacing.xxl, borderRadius: '24px' }
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
  const paddingTop = aspectRatios[imageAspectRatio]

  // Base card styles
  const cardStyles = {
    backgroundColor: '#FFFFFF',
    borderRadius: config.borderRadius,
    overflow: 'hidden',
    ...variantStyle
  }

  // Content padding based on image position and removeOppositeMargin
  const getContentPadding = () => {
    const padding = config.padding

    if (!image) {
      return padding
    }

    switch (imagePosition) {
      case 'top':
        return removeOppositeMargin ? `0 ${padding} ${padding} ${padding}` : padding
      case 'bottom':
        return removeOppositeMargin ? `${padding} ${padding} 0 ${padding}` : padding
      case 'left':
        return removeOppositeMargin ? `${padding} ${padding} ${padding} 0` : padding
      case 'right':
        return removeOppositeMargin ? `${padding} 0 ${padding} ${padding}` : padding
      case 'middle':
        return removeOppositeMargin ? '0' : padding
      default:
        return padding
    }
  }

  // If no image, render simple card
  if (!image) {
    return (
      <div style={{ ...cardStyles, padding: config.padding }} {...rest}>
        {children}
      </div>
    )
  }

  // Image styles
  const imageWrapperStyles = {
    position: 'relative',
    width: '100%',
    paddingTop: `${paddingTop}%`,
    overflow: 'hidden',
    flexShrink: 0
  }

  const imageStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }

  const contentStyles = {
    padding: getContentPadding(),
    flex: imagePosition === 'middle' ? 'none' : '1'
  }

  // Layout for top/bottom images
  if (imagePosition === 'top' || imagePosition === 'bottom') {
    return (
      <div style={{ ...cardStyles, display: 'flex', flexDirection: 'column' }} {...rest}>
        {imagePosition === 'top' && (
          <div style={imageWrapperStyles}>
            <img src={image} alt="" style={imageStyles} />
          </div>
        )}
        <div style={contentStyles}>
          {children}
        </div>
        {imagePosition === 'bottom' && (
          <div style={imageWrapperStyles}>
            <img src={image} alt="" style={imageStyles} />
          </div>
        )}
      </div>
    )
  }

  // Layout for left/right images
  if (imagePosition === 'left' || imagePosition === 'right') {
    const imageContainerStyles = {
      ...imageWrapperStyles,
      width: '50%', // Can be adjusted as needed
      paddingTop: 0,
      height: 'auto',
      minHeight: '200px'
    }

    const imageStylesHorizontal = {
      ...imageStyles,
      position: 'static',
      height: '100%'
    }

    return (
      <div style={{ ...cardStyles, display: 'flex', flexDirection: 'row' }} {...rest}>
        {imagePosition === 'left' && (
          <div style={imageContainerStyles}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <img src={image} alt="" style={imageStylesHorizontal} />
            </div>
          </div>
        )}
        <div style={{ ...contentStyles, flex: 1 }}>
          {children}
        </div>
        {imagePosition === 'right' && (
          <div style={imageContainerStyles}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <img src={image} alt="" style={imageStylesHorizontal} />
            </div>
          </div>
        )}
      </div>
    )
  }

  // Layout for middle image
  if (imagePosition === 'middle') {
    return (
      <div style={{ ...cardStyles, display: 'flex', flexDirection: 'column' }} {...rest}>
        <div style={contentStyles}>
          {children}
        </div>
        <div style={imageWrapperStyles}>
          <img src={image} alt="" style={imageStyles} />
        </div>
      </div>
    )
  }

  return (
    <div style={{ ...cardStyles, padding: config.padding }} {...rest}>
      {children}
    </div>
  )
}

Card.propTypes = {
  size: PropTypes.oneOf(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  variant: PropTypes.oneOf(['elevated', 'outlined', 'none']),
  image: PropTypes.string,
  imagePosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'middle']),
  imageAspectRatio: PropTypes.oneOf(['16:9', '4:3', '3:2', '1:1', '2:3', '3:4', '9:16']),
  removeOppositeMargin: PropTypes.bool,
  children: PropTypes.node
}
