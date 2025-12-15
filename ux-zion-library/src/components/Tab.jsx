import React from 'react'
import PropTypes from 'prop-types'
import { colors } from '../tokens/colors'
import { body } from '../tokens/typography'

/**
 * Tab
 *
 * A tab component for navigation.
 * Matches Zion UI design system.
 *
 * @param {string} label - Tab label text
 * @param {boolean} active - Whether this tab is active
 * @param {function} onClick - Click handler
 * @param {string} activeColor - Color for active indicator: 'blue', 'green', 'yellow', 'red', 'purple', 'gray'
 * @param {string} width - Optional fixed width (e.g., '120px')
 * @param {boolean} fullWidth - Make tab take full available width
 */
export const Tab = ({
  label,
  active = false,
  onClick,
  activeColor = 'blue',
  width,
  fullWidth = false,
  ...rest
}) => {
  const [isHovered, setIsHovered] = React.useState(false)

  const activeColorMap = {
    blue: colors.blue.blue60,
    green: colors.green.green60,
    yellow: colors.yellow.yellow60,
    red: colors.danger.danger60,
    purple: colors.purple.purple60,
    gray: colors.gray.gray100
  }

  const backgroundColorMap = {
    blue: colors.blue.blue00,
    green: colors.green.green02,
    yellow: colors.yellow.yellow02,
    red: colors.danger.danger02,
    purple: colors.purple.purple02,
    gray: colors.gray.gray02
  }

  const tabStyles = {
    height: '48px',
    padding: '0 14px',
    backgroundColor: (active || isHovered) ? backgroundColorMap[activeColor] : colors.gray.gray00,
    border: 'none',
    borderBottom: active ? `4px solid ${activeColorMap[activeColor]}` : '4px solid transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...body.b,
    color: active ? activeColorMap[activeColor] : colors.gray.gray60,
    transition: 'color 0.15s ease, border-color 0.15s ease, background-color 0.15s ease',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    ...(width && { width }),
    ...(fullWidth && { flex: 1 }),
    position: 'relative'
  }

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={tabStyles}
      {...rest}
    >
      {label}
    </button>
  )
}

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  activeColor: PropTypes.oneOf(['blue', 'green', 'yellow', 'red', 'purple', 'gray']),
  width: PropTypes.string,
  fullWidth: PropTypes.bool
}
