import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { spacing } from '../tokens/spacing'
import { IconButton } from './IconButton'
import { Button } from './Button'
import { Breadcrumb } from './Breadcrumb'
import { Header } from './Header'
import { Paragraph } from './Paragraph'
import { Arrow } from '../icons'

/**
 * FullPageOverlay
 *
 * A full-page modal overlay with header, content area, and optional footer.
 * Matches Zion UI design system.
 *
 * @param {boolean} isOpen - Whether the overlay is open
 * @param {function} close - Function to close the overlay
 * @param {boolean} hideBackButton - Hide the back/close button
 * @param {string} title - Title displayed in the header
 * @param {string} subtitle - Optional subtitle displayed below title
 * @param {array} breadcrumb - Optional breadcrumb items [{label, onClick}]
 * @param {array} iconButtons - Array of icon button configs for header right side
 * @param {array} secondaryButtons - Array of low-emphasis button configs [{label, icon, onClick}]
 * @param {object} primaryButton - Optional primary button config {label, onClick}
 * @param {node} footer - Optional footer content
 * @param {node} children - Content to display in the overlay body
 * @param {string} ariaLabel - Optional aria-label for accessibility
 */
export const FullPageOverlay = ({
  isOpen = false,
  close,
  hideBackButton = false,
  title,
  subtitle,
  breadcrumb,
  iconButtons = [],
  secondaryButtons = [],
  primaryButton,
  footer,
  children,
  'aria-label': ariaLabel
}) => {
  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e) => {
      if (e.key === 'Escape' && close) {
        close()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, close])

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel || title}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff'
      }}
    >
      {/* Header */}
      <header
        style={{
          flex: '0 0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: (breadcrumb || subtitle) ? `${spacing.xxs} ${spacing.xs}` : `0 ${spacing.xs}`,
          minHeight: '56px',
          borderBottom: '1px solid #e5e7eb',
          gap: spacing.xxs
        }}
      >
        {/* Left side: Close button + Title/Subtitle/Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xxs, flex: 1, minWidth: 0 }}>
          {/* Close button */}
          {close && !hideBackButton && (
            <IconButton
              icon={(props) => <Arrow {...props} direction="backward" />}
              label="Close"
              onClick={close}
              size="md"
            />
          )}

          {/* Title area */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Breadcrumb */}
            {breadcrumb && breadcrumb.length > 0 && (
              <div style={{ marginBottom: '2px' }}>
                <Breadcrumb items={breadcrumb} />
              </div>
            )}

            {/* Title */}
            <div style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              <Header level="h5">{title}</Header>
            </div>

            {/* Subtitle */}
            {subtitle && (
              <div style={{
                marginTop: '2px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                <Paragraph size="sm" secondary>{subtitle}</Paragraph>
              </div>
            )}
          </div>
        </div>

        {/* Right side: Icon buttons + Secondary buttons + Primary button */}
        <div style={{
          display: 'flex',
          gap: spacing.nano,
          alignItems: 'center',
          flexShrink: 0
        }}>
          {/* Icon buttons */}
          {iconButtons.map((button, index) => (
            <IconButton
              key={index}
              icon={button.icon}
              label={button.label}
              onClick={button.onClick}
              size="md"
            />
          ))}

          {/* Secondary buttons (low-emphasis with labels) */}
          {secondaryButtons.map((button, index) => (
            <Button
              key={`secondary-${index}`}
              variant="gray"
              emphasis="low"
              iconStart={button.icon}
              onClick={button.onClick}
            >
              {button.label}
            </Button>
          ))}

          {/* Primary button */}
          {primaryButton && (
            <Button
              emphasis="high"
              onClick={primaryButton.onClick}
            >
              {primaryButton.label}
            </Button>
          )}
        </div>
      </header>

      {/* Content */}
      <div
        style={{
          flex: '1 1 0',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          backgroundColor: '#ffffff'
        }}
      >
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <footer
          style={{
            flex: '0 0 auto',
            padding: spacing.xs,
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#ffffff'
          }}
        >
          {footer}
        </footer>
      )}
    </div>
  )
}

FullPageOverlay.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  hideBackButton: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  breadcrumb: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func
  })),
  iconButtons: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func
  })),
  secondaryButtons: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    icon: PropTypes.elementType,
    onClick: PropTypes.func.isRequired
  })),
  primaryButton: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }),
  footer: PropTypes.node,
  children: PropTypes.node,
  'aria-label': PropTypes.string
}

/**
 * Hook to manage overlay state
 * Matches Zion's useOverlay API
 */
export const useOverlay = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState)

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    handleClick: () => setIsOpen(!isOpen)
  }
}
