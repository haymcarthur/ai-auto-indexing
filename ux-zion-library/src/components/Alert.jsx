import React from 'react'
import PropTypes from 'prop-types'
import { colors, transparentColors } from '../tokens/colors'
import { elevation } from '../tokens/elevation'
import { body } from '../tokens/typography'
import { NoticeWarning, HelpTip, ContentCheck, NoticeImportant, MenuClose } from '../icons'
import { IconButton } from './IconButton'

/**
 * Alert
 *
 * An alert component for displaying important messages with different statuses.
 * Matches Zion UI design system.
 *
 * @param {node} children - Alert content text
 * @param {string} status - Alert status: 'warning', 'help', 'success', 'error'
 * @param {boolean} outline - Add 1px stroke border
 * @param {boolean} dismissible - Show dismiss button
 * @param {function} onDismiss - Callback when dismiss button is clicked
 * @param {boolean} dense - Use dense spacing and smaller elements
 */
export const Alert = ({
  children,
  status = 'help',
  outline = false,
  dismissible = false,
  onDismiss,
  dense = false,
  ...rest
}) => {
  // Status configurations
  const statusConfig = {
    warning: {
      icon: NoticeWarning,
      iconColor: colors.yellow.yellow50,
      backgroundColor: colors.yellow.yellow02,
      textColor: colors.yellow.yellow60
    },
    help: {
      icon: HelpTip,
      iconColor: colors.blue.blue50,
      backgroundColor: colors.blue.blue00,
      textColor: colors.blue.blue70
    },
    success: {
      icon: ContentCheck,
      iconColor: colors.green.green50,
      backgroundColor: colors.green.green02,
      textColor: colors.green.green70
    },
    error: {
      icon: NoticeImportant,
      iconColor: colors.danger.danger50,
      backgroundColor: colors.danger.danger02,
      textColor: colors.danger.danger70
    }
  }

  const currentStatus = statusConfig[status]
  const StatusIcon = currentStatus.icon

  // Container styles
  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: dense ? '8px' : '12px',
    padding: dense ? '12px' : '16px 12px',
    borderRadius: '8px',
    backgroundColor: colors.gray.gray00,
    boxShadow: outline ? 'none' : elevation[1],
    border: outline ? `1px solid ${transparentColors.transparentGray10}` : 'none',
    boxSizing: 'border-box'
  }

  // Text styles
  const textStyles = {
    ...(dense ? body.a : body.b),
    color: currentStatus.textColor,
    flex: 1
  }

  // Dismiss button container
  const dismissButtonStyles = {
    flexShrink: 0,
    marginLeft: 'auto'
  }

  return (
    <div style={containerStyles} {...rest}>
      {/* Icon */}
      <div style={{ flexShrink: 0 }}>
        <StatusIcon
          size={dense ? 'xs' : 'sm'}
          backgroundColor={currentStatus.backgroundColor}
          style={{ color: currentStatus.iconColor }}
        />
      </div>

      {/* Text content */}
      <div style={textStyles}>
        {children}
      </div>

      {/* Dismiss button */}
      {dismissible && (
        <div style={dismissButtonStyles}>
          <IconButton
            icon={MenuClose}
            size={dense ? 'xs' : 'sm'}
            emphasis="low"
            onClick={onDismiss}
            aria-label="Dismiss alert"
          />
        </div>
      )}
    </div>
  )
}

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  status: PropTypes.oneOf(['warning', 'help', 'success', 'error']),
  outline: PropTypes.bool,
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
  dense: PropTypes.bool
}
