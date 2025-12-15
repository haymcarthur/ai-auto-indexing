import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { colors, transparentColors } from '../tokens/colors'
import { elevation } from '../tokens/elevation'
import { body } from '../tokens/typography'
import { ContentCheck, NoticeWarning, NoticeImportant, MenuClose } from '../icons'
import { IconButton } from './IconButton'
import { Button } from './Button'

/**
 * StatusOverlay
 *
 * A status overlay component for displaying messages with optional actions.
 * Matches Zion UI design system.
 *
 * @param {string} message - Status message text
 * @param {string} status - Status type: 'normal', 'success', 'warning', 'error'
 * @param {boolean} dismissible - Show dismiss button
 * @param {function} onDismiss - Callback when dismiss is clicked
 * @param {string} actionLabel - Label for action button
 * @param {function} onAction - Callback when action is clicked
 * @param {boolean} longMessage - Use long message layout with action at bottom right
 */
export const StatusOverlay = ({
  message,
  status = 'normal',
  dismissible = false,
  onDismiss,
  actionLabel,
  onAction,
  longMessage = false,
  ...rest
}) => {
  const actionRef = useRef(null)

  // Status configurations
  const statusConfig = {
    normal: {
      icon: null,
      iconColor: null
    },
    success: {
      icon: ContentCheck,
      iconColor: colors.green.green30
    },
    warning: {
      icon: NoticeWarning,
      iconColor: colors.yellow.yellow30
    },
    error: {
      icon: NoticeImportant,
      iconColor: colors.danger.danger30
    }
  }

  const currentStatus = statusConfig[status]
  const StatusIcon = currentStatus.icon

  // Container styles
  const containerStyles = {
    display: 'flex',
    flexDirection: longMessage ? 'column' : 'row',
    alignItems: longMessage ? 'flex-start' : 'center',
    gap: longMessage ? '14px' : '14px',
    padding: '16px',
    borderRadius: '4px',
    backgroundColor: colors.gray.gray90,
    boxShadow: elevation[1],
    boxSizing: 'border-box',
    width: '400px',
    minHeight: '56px'
  }

  // Top row styles (icon + message + dismiss) - for long message layout
  const topRowStyles = {
    display: 'flex',
    alignItems: longMessage ? 'flex-start' : 'center',
    gap: '14px',
    flex: 1,
    width: '100%'
  }

  // Content container (icon + message)
  const contentStyles = {
    display: 'flex',
    alignItems: longMessage ? 'flex-start' : 'center',
    gap: '14px',
    flex: 1,
    minWidth: 0
  }

  // Message styles
  const messageStyles = {
    ...body.b,
    color: colors.gray.gray00,
    flex: 1,
    minWidth: 0
  }

  // Action button wrapper - bottom right for long messages
  const actionWrapperStyles = {
    flexShrink: 0,
    ...(longMessage && {
      alignSelf: 'flex-end'
    })
  }

  return (
    <div style={containerStyles} {...rest}>
      <style>{`
        .status-overlay-action button {
          padding-left: 0 !important;
          padding-right: 0 !important;
          color: ${colors.blue.blue30} !important;
        }
        .status-overlay-action button:hover {
          background-color: ${transparentColors.transparentBlue03} !important;
        }
        .status-overlay-dismiss {
          flex-shrink: 0;
        }
        .status-overlay-dismiss button {
          color: ${colors.gray.gray00} !important;
          background-color: transparent !important;
        }
        .status-overlay-dismiss button:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
      `}</style>

      {/* Top row: icon + message + dismiss (+ action if not long message) */}
      <div style={topRowStyles}>
        <div style={contentStyles}>
          {/* Status Icon */}
          {StatusIcon && (
            <div style={{ flexShrink: 0 }}>
              <StatusIcon size="sm" style={{ color: currentStatus.iconColor }} />
            </div>
          )}

          {/* Message */}
          <div style={messageStyles}>
            {message}
          </div>
        </div>

        {/* Action button - inline with message when not long message */}
        {actionLabel && !longMessage && (
          <div ref={actionRef} style={actionWrapperStyles} className="status-overlay-action">
            <Button
              emphasis="low"
              inline
              onClick={onAction}
            >
              {actionLabel}
            </Button>
          </div>
        )}

        {/* Dismiss button - always on top row */}
        {dismissible && (
          <div className="status-overlay-dismiss">
            <IconButton
              icon={MenuClose}
              size="xs"
              emphasis="low"
              variant="gray"
              onClick={onDismiss}
              aria-label="Dismiss"
            />
          </div>
        )}
      </div>

      {/* Action button - bottom right when long message */}
      {actionLabel && longMessage && (
        <div ref={actionRef} style={actionWrapperStyles} className="status-overlay-action">
          <Button
            emphasis="low"
            inline
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  )
}

StatusOverlay.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['normal', 'success', 'warning', 'error']),
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
  longMessage: PropTypes.bool
}
