import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { colors } from '../tokens/colors'
import { spacing } from '../tokens/spacing'
import { elevation } from '../tokens/elevation'
import { Header } from './Header'
import { Paragraph } from './Paragraph'
import { IconButton } from './IconButton'
import { Button } from './Button'
import { Row } from './Row'
import { MenuClose } from '../icons'

/**
 * DialogOverlay
 *
 * A centered modal dialog with header, content, and optional footer.
 * Matches Zion UI design system.
 *
 * @param {boolean} isOpen - Whether the dialog is open
 * @param {function} close - Function to close the dialog
 * @param {string} title - Dialog title (H5)
 * @param {string} subtitle - Optional subtitle (SM paragraph, secondary)
 * @param {boolean} closable - Whether the dialog can be closed with X button (default: true)
 * @param {string} size - Dialog width: 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'
 * @param {object} primaryButton - Primary button config {label, onClick}
 * @param {object} secondaryButton - Secondary button config {label, onClick}
 * @param {object} leftButton - Left-aligned button config {label, onClick}
 * @param {node} children - Dialog content
 * @param {string} aria-label - Optional aria-label for accessibility
 */
export const DialogOverlay = ({
  isOpen,
  close,
  title,
  subtitle,
  closable = true,
  size = 'md',
  primaryButton,
  secondaryButton,
  leftButton,
  children,
  'aria-label': ariaLabel,
  // Destructure these to prevent them from being spread to DOM
  open,
  handleClick,
  anchorRef,
  ...rest
}) => {
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e) => {
      if (e.key === 'Escape' && closable) {
        close()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, close, closable])

  if (!isOpen) return null

  // Size configurations (width)
  const sizeConfig = {
    xs: '320px',
    sm: '420px',
    md: '564px',
    lg: '700px',
    xl: '900px',
    xxl: '1200px'
  }

  const dialogWidth = sizeConfig[size]

  const showFooter = primaryButton || secondaryButton || leftButton

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: spacing.sm
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && closable) {
          close()
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel || title}
      {...rest}
    >
      <div
        style={{
          backgroundColor: colors.gray.gray00,
          borderRadius: '8px',
          boxShadow: elevation[1],
          width: '100%',
          maxWidth: dialogWidth,
          maxHeight: 'calc(100vh - 48px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: `${spacing.xxs} ${spacing.sm}`,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: spacing.xs,
            flexShrink: 0
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <Header level="h5">{title}</Header>
            {subtitle && (
              <div style={{ marginTop: '4px' }}>
                <Paragraph size="sm" secondary>
                  {subtitle}
                </Paragraph>
              </div>
            )}
          </div>
          {closable && (
            <IconButton
              icon={MenuClose}
              label="Close"
              onClick={close}
              variant="gray"
              emphasis="low"
              size="sm"
            />
          )}
        </div>

        {/* Content */}
        <div
          style={{
            padding: `${spacing.xs} ${spacing.sm}`,
            flex: 1,
            overflowY: 'auto'
          }}
        >
          {children}
        </div>

        {/* Footer */}
        {showFooter && (
          <div
            style={{
              padding: `${spacing.xxs} ${spacing.sm}`,
              flexShrink: 0
            }}
          >
            <Row alignX="space-between" alignY="center">
              <div>
                {leftButton && (
                  <Button
                    variant="blue"
                    emphasis="low"
                    onClick={leftButton.onClick}
                  >
                    {leftButton.label}
                  </Button>
                )}
              </div>
              <Row gap={2}>
                {secondaryButton && (
                  <Button
                    variant={secondaryButton.variant || "blue"}
                    emphasis={secondaryButton.emphasis || "low"}
                    onClick={secondaryButton.onClick}
                  >
                    {secondaryButton.label}
                  </Button>
                )}
                {primaryButton && (
                  <Button
                    variant={primaryButton.variant || "blue"}
                    emphasis={primaryButton.emphasis || "high"}
                    onClick={primaryButton.onClick}
                  >
                    {primaryButton.label}
                  </Button>
                )}
              </Row>
            </Row>
          </div>
        )}
      </div>
    </div>
  )
}

DialogOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  closable: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  primaryButton: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }),
  secondaryButton: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }),
  leftButton: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }),
  children: PropTypes.node,
  'aria-label': PropTypes.string
}

/**
 * useDialog Hook
 *
 * Manages dialog state
 * Returns { isOpen, open, close, handleClick }
 */
export const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const handleClick = () => setIsOpen(!isOpen)

  return {
    isOpen,
    open,
    close,
    handleClick
  }
}
