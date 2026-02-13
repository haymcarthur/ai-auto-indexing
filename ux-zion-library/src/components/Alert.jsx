import React from 'react'
import PropTypes from 'prop-types'
import { colors, transparentColors } from '../tokens/colors'
import { elevation } from '../tokens/elevation'
import { body } from '../tokens/typography'
import { spacing } from '../tokens/spacing'
import { NoticeWarning, HelpTip, ContentCheck, NoticeImportant, MenuClose, HelpAi } from '../icons'
import { IconButton } from './IconButton'
import { Button } from './Button'

/**
 * Alert
 *
 * An alert component for displaying important messages with different statuses.
 * Matches Zion UI design system.
 *
 * @param {node} children - Alert content text
 * @param {string} status - Alert status: 'warning', 'help', 'success', 'error', 'ai'
 * @param {boolean} outline - Add 1px stroke border
 * @param {boolean} dismissible - Show dismiss button
 * @param {function} onDismiss - Callback when dismiss button is clicked
 * @param {boolean} dense - Use dense spacing and smaller elements
 * @param {string} buttonLabel - Optional button text
 * @param {function} onButtonClick - Callback when button is clicked
 * @param {string} buttonEmphasis - Button emphasis level: 'low', 'medium', 'high'
 */
export const Alert = ({
  children,
  status = 'help',
  outline = false,
  dismissible = false,
  onDismiss,
  dense = false,
  buttonLabel,
  onButtonClick,
  buttonEmphasis = 'low',
  ...rest
}) => {
  // Status configurations
  const statusConfig = {
    warning: {
      icon: NoticeWarning,
      iconColor: colors.yellow.yellow50,
      backgroundColor: colors.yellow.yellow02,
      textColor: colors.yellow.yellow60,
      borderColor: colors.yellow.yellow50
    },
    help: {
      icon: HelpTip,
      iconColor: colors.blue.blue50,
      backgroundColor: colors.blue.blue00,
      textColor: colors.blue.blue70,
      borderColor: colors.blue.blue50
    },
    success: {
      icon: ContentCheck,
      iconColor: colors.green.green50,
      backgroundColor: colors.green.green02,
      textColor: colors.green.green70,
      borderColor: colors.green.green50
    },
    error: {
      icon: NoticeImportant,
      iconColor: colors.danger.danger50,
      backgroundColor: colors.danger.danger02,
      textColor: colors.danger.danger70,
      borderColor: colors.danger.danger50
    },
    ai: {
      icon: HelpAi,
      iconColor: colors.purple.purple50,
      backgroundColor: colors.purple.purple02,
      textColor: colors.purple.purple70,
      borderColor: colors.purple.purple50
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
    border: outline ? `1px solid ${currentStatus.borderColor || transparentColors.transparentGray10}` : 'none',
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
        {/* Optional button */}
        {buttonLabel && (
          <div style={{ marginTop: spacing.pico }}>
            <Button
              variant="gray"
              emphasis={buttonEmphasis}
              size="sm"
              inline
              dense
              onClick={onButtonClick}
            >
              {buttonLabel}
            </Button>
          </div>
        )}
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
  status: PropTypes.oneOf(['warning', 'help', 'success', 'error', 'ai']),
  outline: PropTypes.bool,
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
  dense: PropTypes.bool,
  buttonLabel: PropTypes.string,
  onButtonClick: PropTypes.func,
  buttonEmphasis: PropTypes.oneOf(['low', 'medium', 'high'])
}
