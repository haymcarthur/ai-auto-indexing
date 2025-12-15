import React from 'react'
import PropTypes from 'prop-types'
import { colors } from '../tokens/colors'
import MaleAvatarImg from '../assets/maleAvatar.svg'
import FemaleAvatarImg from '../assets/femaleAvatar.svg'
import AnonymousAvatarImg from '../assets/anonymousAvatar.svg'
import GrayMaleAvatarImg from '../assets/grayMaleAvatar.svg'
import GrayFemaleAvatarImg from '../assets/grayFemaleAvatar.svg'
import GrayAnonymousAvatarImg from '../assets/grayAnonymousAvatar.svg'

/**
 * Avatar
 *
 * A circular avatar component with multiple display options.
 *
 * @param {string} type - Avatar type: 'photo', 'male', 'female', 'anonymous', or 'monogram'
 * @param {string} size - Avatar size: 'xs' (24px), 'sm' (40px), 'md' (64px), 'lg' (88px), 'xl' (136px), 'xxl' (180px)
 * @param {string} photoSrc - Image source URL (required when type='photo')
 * @param {string} name - User name (required when type='monogram', used to display first initial)
 * @param {boolean} grayMode - Use grayscale version (only for male, female, anonymous types)
 * @param {string} alt - Alt text for image (defaults to type)
 */
export const Avatar = ({
  type = 'anonymous',
  size = 'md',
  photoSrc,
  name,
  grayMode = false,
  alt,
  ...rest
}) => {
  // Size configurations
  const sizeConfig = {
    xs: { dimension: '24px', fontSize: '12px' },
    sm: { dimension: '40px', fontSize: '12px' },
    md: { dimension: '64px', fontSize: '20px' },
    lg: { dimension: '88px', fontSize: '26px' },
    xl: { dimension: '136px', fontSize: '40px' },
    xxl: { dimension: '180px', fontSize: '53px' }
  }

  const { dimension, fontSize } = sizeConfig[size]

  // Base styles for all avatars
  const baseStyles = {
    width: dimension,
    height: dimension,
    minWidth: dimension,
    minHeight: dimension,
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.gray.gray05
  }

  // Get image source based on type and grayMode
  const getImageSrc = () => {
    if (type === 'photo') {
      return photoSrc
    }

    // Static imports for avatar images
    const avatarMap = {
      male: grayMode ? GrayMaleAvatarImg : MaleAvatarImg,
      female: grayMode ? GrayFemaleAvatarImg : FemaleAvatarImg,
      anonymous: grayMode ? GrayAnonymousAvatarImg : AnonymousAvatarImg
    }

    return avatarMap[type] || null
  }

  // Render monogram type
  if (type === 'monogram') {
    const initial = name ? name.charAt(0).toUpperCase() : '?'

    return (
      <div style={{ ...baseStyles, backgroundColor: colors.blue.blue60 }} {...rest}>
        <span
          style={{
            fontFamily: '"Museo Slab", serif',
            fontWeight: 500,
            fontSize: fontSize,
            color: colors.gray.gray00,
            lineHeight: 1,
            userSelect: 'none'
          }}
        >
          {initial}
        </span>
      </div>
    )
  }

  // Render image-based avatars
  const imageSrc = getImageSrc()

  return (
    <div style={baseStyles} {...rest}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={alt || type}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: colors.gray.gray10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.gray.gray40,
            fontSize: fontSize
          }}
        >
          ?
        </div>
      )}
    </div>
  )
}

Avatar.propTypes = {
  type: PropTypes.oneOf(['photo', 'male', 'female', 'anonymous', 'monogram']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  photoSrc: PropTypes.string,
  name: PropTypes.string,
  grayMode: PropTypes.bool,
  alt: PropTypes.string
}
