import React from 'react'
import PropTypes from 'prop-types'
import { colors, buttonColors } from '../tokens/colors'

/**
 * IconButton
 *
 * An icon-only button component matching Zion UI design system.
 *
 * @param {component} icon - Icon component to render
 * @param {object} iconProps - Additional props to pass to the icon component
 * @param {function} onClick - Click handler
 * @param {boolean} disabled - Whether button is disabled
 * @param {string} label - Accessibility label (required)
 * @param {string} title - Tooltip text (optional, defaults to label)
 * @param {string} variant - Color variant: 'blue', 'gray', 'danger'
 * @param {string} emphasis - Button emphasis: 'low' (default), 'high' (solid), 'lightHigh' (light solid)
 * @param {string} size - Button size: 'xs', 'sm', 'md', 'lg', 'xl'
 */
export const IconButton = ({
  icon: Icon,
  iconProps = {},
  onClick,
  disabled = false,
  label,
  title,
  variant = 'gray',
  emphasis = 'low',
  size = 'md',
  ...rest
}) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const [isActive, setIsActive] = React.useState(false)

  // Size configurations matching Zion
  const sizeConfig = {
    xs: { buttonSize: '24px', iconSize: '14px' },
    sm: { buttonSize: '28px', iconSize: '16px' },
    md: { buttonSize: '40px', iconSize: '24px' },
    lg: { buttonSize: '62px', iconSize: '36px' },
    xl: { buttonSize: '88px', iconSize: '52px' }
  }

  const { buttonSize, iconSize } = sizeConfig[size]

  // Color schemes by variant and emphasis using design tokens
  const colorSchemes = {
    blue: {
      low: {
        bg: 'transparent',
        bgHover: colors.blue.blue00,
        bgActive: colors.blue.blue03,
        color: colors.blue.blue60
      },
      high: {
        bg: colors.blue.blue60,
        bgHover: colors.blue.blue70,
        bgActive: colors.blue.blue80,
        color: buttonColors.highText
      },
      lightHigh: {
        bg: colors.blue.blue00,
        bgHover: colors.blue.blue03,
        bgActive: colors.blue.blue05,
        color: colors.blue.blue60
      }
    },
    gray: {
      low: {
        bg: 'transparent',
        bgHover: colors.gray.gray02,
        bgActive: colors.gray.gray03,
        color: colors.gray.gray100
      },
      high: {
        bg: colors.gray.gray100,
        bgHover: colors.gray.gray90,
        bgActive: colors.gray.gray80,
        color: buttonColors.highText
      },
      lightHigh: {
        bg: colors.gray.gray02,
        bgHover: colors.gray.gray03,
        bgActive: colors.gray.gray05,
        color: colors.gray.gray70
      }
    },
    danger: {
      low: {
        bg: 'transparent',
        bgHover: colors.danger.danger02,
        bgActive: colors.danger.danger03,
        color: colors.danger.danger60
      },
      high: {
        bg: colors.danger.danger60,
        bgHover: colors.danger.danger70,
        bgActive: colors.danger.danger80,
        color: buttonColors.highText
      },
      lightHigh: {
        bg: colors.danger.danger02,
        bgHover: colors.danger.danger03,
        bgActive: colors.danger.danger05,
        color: colors.danger.danger60
      }
    }
  }

  // When disabled, always use gray variant
  const effectiveVariant = disabled ? 'gray' : variant
  const colorScheme = colorSchemes[effectiveVariant][emphasis]

  const baseStyles = {
    width: buttonSize,
    height: buttonSize,
    minWidth: buttonSize,
    minHeight: buttonSize,
    padding: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorScheme.bg,
    border: 'none',
    borderRadius: '50%', // Fully rounded
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.15s ease, color 0.15s ease',
    color: colorScheme.color,
    userSelect: 'none',
    outline: 'none',
    flexShrink: 0
  }

  const getInteractiveStyles = () => {
    if (disabled) return {}

    if (isActive) {
      return {
        backgroundColor: colorScheme.bgActive
      }
    }

    if (isHovered) {
      return {
        backgroundColor: colorScheme.bgHover
      }
    }

    return {}
  }

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-label={label}
      title={title || label}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsActive(false)
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      style={{
        ...baseStyles,
        ...getInteractiveStyles()
      }}
      {...rest}
    >
      {Icon && <Icon width={iconSize} height={iconSize} {...iconProps} />}
    </button>
  )
}

IconButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  iconProps: PropTypes.object,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  title: PropTypes.string,
  variant: PropTypes.oneOf(['blue', 'gray', 'danger']),
  emphasis: PropTypes.oneOf(['low', 'high', 'lightHigh']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])
}
