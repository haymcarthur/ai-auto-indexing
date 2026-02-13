import React from 'react'
import PropTypes from 'prop-types'
import { colors, buttonColors } from '../tokens/colors'
import { spacing } from '../tokens/spacing'
import { uppercase } from '../tokens/typography'
import { elevation } from '../tokens/elevation'

/**
 * BillboardButton
 *
 * A larger billboard button component matching Zion UI design system.
 *
 * @param {string} variant - Button color variant: 'gray', 'blue', 'green', 'yellow', 'red', 'purple'
 * @param {string} emphasis - Button style emphasis: 'high' (solid), 'lightHigh' (light solid), 'medium' (outlined), 'low' (text only)
 * @param {function} onClick - Click handler
 * @param {boolean} disabled - Whether button is disabled
 * @param {node} children - Button content
 * @param {string} type - Button type attribute (button, submit, reset)
 * @param {component} iconStart - Optional icon component to display at start
 * @param {component} iconEnd - Optional icon component to display at end
 * @param {boolean} inline - Remove horizontal padding (only applies to low emphasis buttons)
 * @param {boolean} moreLess - Compact more/less button style with 4px horizontal padding and 16px height (only applies to low emphasis buttons)
 * @param {boolean} fullWidth - Make button take full width of container
 */
const BillboardButton = React.forwardRef(({
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
    gray: {
      solid: {
        bg: buttonColors.highGray,
        bgHover: colors.gray.gray90,
        bgActive: colors.gray.gray80,
        text: buttonColors.highText
      },
      lightSolid: {
        bg: buttonColors.lightHighGray,
        bgHover: colors.gray.gray03,
        bgActive: colors.gray.gray05,
        text: colors.gray.gray100
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
    blue: {
      solid: {
        bg: buttonColors.highBlue,
        bgHover: colors.blue.blue50,
        bgActive: colors.blue.blue70,
        text: buttonColors.highText
      },
      lightSolid: {
        bg: colors.blue.blue05,
        bgHover: colors.blue.blue10,
        bgActive: colors.blue.blue20,
        text: colors.blue.blue90
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
    green: {
      solid: {
        bg: buttonColors.highGreen,
        bgHover: colors.green.green50,
        bgActive: colors.green.green70,
        text: buttonColors.highText
      },
      lightSolid: {
        bg: colors.green.green05,
        bgHover: colors.green.green10,
        bgActive: colors.green.green20,
        text: colors.green.green90
      },
      outlined: {
        bg: 'transparent',
        bgHover: colors.green.green02,
        bgActive: colors.green.green03,
        border: colors.green.green60,
        text: colors.green.green60
      },
      text: {
        bg: 'transparent',
        bgHover: colors.green.green02,
        bgActive: colors.green.green03,
        text: colors.green.green60
      }
    },
    yellow: {
      solid: {
        bg: buttonColors.highYellow,
        bgHover: colors.yellow.yellow50,
        bgActive: colors.yellow.yellow70,
        text: buttonColors.highText
      },
      lightSolid: {
        bg: colors.yellow.yellow05,
        bgHover: colors.yellow.yellow10,
        bgActive: colors.yellow.yellow20,
        text: colors.yellow.yellow90
      },
      outlined: {
        bg: 'transparent',
        bgHover: colors.yellow.yellow02,
        bgActive: colors.yellow.yellow03,
        border: colors.yellow.yellow60,
        text: colors.yellow.yellow60
      },
      text: {
        bg: 'transparent',
        bgHover: colors.yellow.yellow02,
        bgActive: colors.yellow.yellow03,
        text: colors.yellow.yellow60
      }
    },
    red: {
      solid: {
        bg: buttonColors.highRed,
        bgHover: colors.red.red50,
        bgActive: colors.red.red70,
        text: buttonColors.highText
      },
      lightSolid: {
        bg: colors.red.red05,
        bgHover: colors.red.red10,
        bgActive: colors.red.red20,
        text: colors.red.red90
      },
      outlined: {
        bg: 'transparent',
        bgHover: colors.red.red02,
        bgActive: colors.red.red03,
        border: colors.red.red60,
        text: colors.red.red60
      },
      text: {
        bg: 'transparent',
        bgHover: colors.red.red02,
        bgActive: colors.red.red03,
        text: colors.red.red60
      }
    },
    purple: {
      solid: {
        bg: buttonColors.highPurple,
        bgHover: colors.purple.purple50,
        bgActive: colors.purple.purple70,
        text: buttonColors.highText
      },
      lightSolid: {
        bg: colors.purple.purple05,
        bgHover: colors.purple.purple10,
        bgActive: colors.purple.purple20,
        text: colors.purple.purple90
      },
      outlined: {
        bg: 'transparent',
        bgHover: colors.purple.purple02,
        bgActive: colors.purple.purple03,
        border: colors.purple.purple60,
        text: colors.purple.purple60
      },
      text: {
        bg: 'transparent',
        bgHover: colors.purple.purple02,
        bgActive: colors.purple.purple03,
        text: colors.purple.purple60
      }
    }
  }

  const emphasisMap = {
    high: 'solid',
    lightHigh: 'lightSolid',
    medium: 'outlined',
    low: 'text'
  }

  const colorScheme = colorVariants[variant][emphasisMap[emphasis]]

  const [isHovered, setIsHovered] = React.useState(false)
  const [isActive, setIsActive] = React.useState(false)

  // Determine styles based on disabled state and emphasis
  const getBackgroundColor = () => {
    if (disabled) {
      if (emphasis === 'high' || emphasis === 'lightHigh') return colors.gray.gray40
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
      if (emphasis === 'high' || emphasis === 'lightHigh') return buttonColors.highText
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
    return '44px'
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
    display: fullWidth ? 'flex' : 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    userSelect: 'none',
    outline: 'none',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    backgroundColor: getBackgroundColor(),
    color: getTextColor(),
    ...(fullWidth && { width: '100%' }),
    ...((emphasis === 'high' || emphasis === 'lightHigh') && !disabled && {
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

BillboardButton.displayName = 'BillboardButton'

BillboardButton.propTypes = {
  variant: PropTypes.oneOf(['gray', 'blue', 'green', 'yellow', 'red', 'purple']),
  emphasis: PropTypes.oneOf(['high', 'lightHigh', 'medium', 'low']),
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

export { BillboardButton }
