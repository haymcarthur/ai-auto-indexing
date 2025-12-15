import React from 'react'
import PropTypes from 'prop-types'
import { colors, buttonColors } from '../tokens/colors'
import { spacing } from '../tokens/spacing'
import { uppercase } from '../tokens/typography'
import { elevation } from '../tokens/elevation'

/**
 * Button
 *
 * A button component matching Zion UI design system.
 *
 * @param {string} variant - Button color variant: 'blue' (primary), 'gray' (secondary), 'danger' (destructive)
 * @param {string} emphasis - Button style emphasis: 'high' (solid), 'medium' (outlined), 'low' (text only)
 * @param {function} onClick - Click handler
 * @param {boolean} disabled - Whether button is disabled
 * @param {node} children - Button content
 * @param {string} type - Button type attribute (button, submit, reset)
 * @param {component} iconStart - Optional icon component to display at start
 * @param {component} iconEnd - Optional icon component to display at end
 * @param {boolean} inline - Remove horizontal padding (only applies to low emphasis buttons)
 * @param {boolean} moreLess - Compact more/less button style with 4px horizontal padding and 16px height (only applies to low emphasis buttons)
 * @param {boolean} fullWidth - Make button span full width of container
 */
const Button = React.forwardRef(({
  variant = 'blue',
  emphasis = 'high',
  onClick,
  disabled = false,
  children,
  type = 'button',
  iconStart: IconStart,
  iconEnd: IconEnd,
  inline = false,
  moreLess = false,
  fullWidth = false,
  ...rest
}, ref) => {
  // Color variants matching Zion using design tokens
  const colorVariants = {
    blue: {
      solid: {
        bg: buttonColors.highBlue,
        bgHover: colors.blue.blue50,
        bgActive: colors.blue.blue70,
        text: buttonColors.highText
      },
      outlined: {
        bg: 'transparent',
        bgHover: colors.blue.blue00,
        bgActive: colors.blue.blue03,
        border: colors.blue.blue60,
        text: colors.blue.blue60
      },
      text: {
        bg: 'transparent',
        bgHover: colors.blue.blue00,
        bgActive: colors.blue.blue03,
        text: colors.blue.blue60
      }
    },
    gray: {
      solid: {
        bg: buttonColors.highGray,
        bgHover: colors.gray.gray90,
        bgActive: colors.gray.gray80,
        text: buttonColors.highText
      },
      outlined: {
        bg: 'transparent',
        bgHover: colors.gray.gray02,
        bgActive: colors.gray.gray03,
        border: colors.gray.gray100,
        text: colors.gray.gray100
      },
      text: {
        bg: 'transparent',
        bgHover: colors.gray.gray02,
        bgActive: colors.gray.gray03,
        text: colors.gray.gray100
      }
    },
    danger: {
      solid: {
        bg: buttonColors.highDanger,
        bgHover: colors.danger.danger50,
        bgActive: colors.danger.danger70,
        text: buttonColors.highText
      },
      outlined: {
        bg: 'transparent',
        bgHover: colors.danger.danger02,
        bgActive: colors.danger.danger03,
        border: colors.danger.danger60,
        text: colors.danger.danger60
      },
      text: {
        bg: 'transparent',
        bgHover: colors.danger.danger02,
        bgActive: colors.danger.danger03,
        text: colors.danger.danger60
      }
    }
  }

  const emphasisMap = {
    high: 'solid',
    medium: 'outlined',
    low: 'text'
  }

  const colorScheme = colorVariants[variant][emphasisMap[emphasis]]

  const [isHovered, setIsHovered] = React.useState(false)
  const [isActive, setIsActive] = React.useState(false)

  // Determine styles based on disabled state and emphasis
  const getBackgroundColor = () => {
    if (disabled) {
      if (emphasis === 'high') return colors.gray.gray40
      return 'transparent'
    }
    return colorScheme.bg
  }

  const getBorderStyle = () => {
    if (disabled) {
      if (emphasis === 'medium') return `1px solid ${colors.gray.gray40}`
      return 'none'
    }
    return colorScheme.border ? `1px solid ${colorScheme.border}` : 'none'
  }

  const getTextColor = () => {
    if (disabled) {
      if (emphasis === 'high') return buttonColors.highText
      return colors.gray.gray40
    }
    return colorScheme.text
  }

  // Determine padding based on inline and moreLess props
  const getPadding = () => {
    if (emphasis === 'low') {
      if (moreLess) {
        return `0 4px`
      }
      if (inline) {
        return `${spacing.nano} 0`
      }
    }
    return `${spacing.nano} ${spacing.xxs}`
  }

  // Determine height based on moreLess prop
  const getHeight = () => {
    if (moreLess && emphasis === 'low') {
      return '16px'
    }
    return '40px'
  }

  // Base styles
  const baseStyles = {
    ...uppercase,
    padding: getPadding(),
    height: getHeight(),
    borderRadius: spacing.pico,
    border: getBorderStyle(),
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease, transform 0.15s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    userSelect: 'none',
    outline: 'none',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    backgroundColor: getBackgroundColor(),
    color: getTextColor(),
    ...(fullWidth && { width: '100%' }),
    ...(emphasis === 'high' && !disabled && {
      boxShadow: elevation[1]
    })
  }

  // Interactive states
  const getInteractiveStyles = () => {
    if (disabled) return {}

    if (isActive) {
      return {
        backgroundColor: colorScheme.bgActive,
        transform: 'scale(1.05)'
      }
    }

    if (isHovered) {
      return {
        backgroundColor: colorScheme.bgHover,
        transform: 'scale(1.05)'
      }
    }

    return {}
  }

  return (
    <button
      ref={ref}
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
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
      {IconStart && <IconStart width="16px" height="16px" />}
      {children}
      {IconEnd && <IconEnd width="16px" height="16px" />}
    </button>
  )
})

Button.displayName = 'Button'

Button.propTypes = {
  variant: PropTypes.oneOf(['blue', 'gray', 'danger']),
  emphasis: PropTypes.oneOf(['high', 'medium', 'low']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  iconStart: PropTypes.elementType,
  iconEnd: PropTypes.elementType,
  inline: PropTypes.bool,
  moreLess: PropTypes.bool,
  fullWidth: PropTypes.bool
}

export { Button }
