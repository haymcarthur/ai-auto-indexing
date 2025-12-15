import React from 'react'
import PropTypes from 'prop-types'
import { colors } from '../tokens/colors'
import { elevation } from '../tokens/elevation'
import { body } from '../tokens/typography'

/**
 * CustomControl
 *
 * A single button control with flexible icon and text layout options.
 * Matches Zion UI design system.
 *
 * @param {ReactComponent} icon - Icon component (for icon-only mode)
 * @param {ReactComponent} iconStart - Icon at start position
 * @param {ReactComponent} iconEnd - Icon at end position
 * @param {string} children - Button text
 * @param {function} onClick - Click handler
 * @param {boolean} disabled - Whether the control is disabled
 */
export const CustomControl = React.forwardRef(({
  icon,
  iconStart,
  iconEnd,
  children,
  onClick,
  disabled = false,
  ...rest
}, ref) => {
  const [isHovered, setIsHovered] = React.useState(false)

  // Determine if icon-only mode
  const isIconOnly = icon && !children

  const containerStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: children ? '8px' : '0',
    height: '36px',
    width: isIconOnly ? '36px' : 'auto',
    paddingLeft: isIconOnly ? '0' : '6px',
    paddingRight: isIconOnly ? '0' : '6px',
    borderRadius: '4px',
    backgroundColor: isHovered && !disabled ? colors.gray.gray02 : colors.gray.gray00,
    boxShadow: isHovered && !disabled ? elevation[4] : elevation[2],
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'background-color 0.15s ease, box-shadow 0.15s ease',
    ...body.b,
    color: colors.gray.gray100
  }

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
    }
  }

  const renderIcon = (IconComponent) => {
    if (!IconComponent) return null
    return <IconComponent size="sm" color={colors.gray.gray100} />
  }

  return (
    <button
      ref={ref}
      style={containerStyles}
      onClick={handleClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      {isIconOnly && renderIcon(icon)}
      {!isIconOnly && (
        <>
          {iconStart && renderIcon(iconStart)}
          {children && <span>{children}</span>}
          {iconEnd && renderIcon(iconEnd)}
        </>
      )}
    </button>
  )
})

CustomControl.displayName = 'CustomControl'

CustomControl.propTypes = {
  icon: PropTypes.elementType,
  iconStart: PropTypes.elementType,
  iconEnd: PropTypes.elementType,
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}
