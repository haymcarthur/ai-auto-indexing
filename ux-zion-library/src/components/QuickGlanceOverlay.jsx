import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { colors } from '../tokens/colors'
import { spacing } from '../tokens/spacing'
import { elevation } from '../tokens/elevation'

/**
 * QuickGlanceOverlay
 *
 * A popover overlay that can be anchored to any element on the page.
 * Matches Zion UI design system.
 *
 * @param {boolean} isOpen - Whether the overlay is open
 * @param {function} close - Function to close the overlay
 * @param {ref} anchorRef - Ref to the element to anchor to
 * @param {string} position - Position relative to anchor: 'top', 'bottom', 'left', 'right'
 * @param {number} offset - Distance from anchor element in pixels (default: 8)
 * @param {string} width - Optional width (e.g., '200px', 'auto')
 * @param {string} maxWidth - Optional max-width
 * @param {node} children - Overlay content
 */
export const QuickGlanceOverlay = ({
  isOpen,
  close,
  anchorRef,
  position = 'bottom',
  offset = 8,
  width,
  maxWidth,
  children,
  // Destructure these to prevent them from being spread to DOM
  open,
  handleClick,
  ...rest
}) => {
  const overlayRef = useRef(null)
  const [overlayStyle, setOverlayStyle] = useState({})

  // Update position when opened or window resizes
  useEffect(() => {
    if (!isOpen || !anchorRef?.current || !overlayRef.current) return

    const updatePosition = () => {
      const anchorRect = anchorRef.current.getBoundingClientRect()
      const overlayRect = overlayRef.current.getBoundingClientRect()

      let top = 0
      let left = 0

      switch (position) {
        case 'bottom':
          top = anchorRect.bottom + offset
          left = anchorRect.left + (anchorRect.width / 2) - (overlayRect.width / 2)
          break
        case 'bottom-right':
          top = anchorRect.bottom + offset
          left = anchorRect.right - overlayRect.width
          break
        case 'top':
          top = anchorRect.top - overlayRect.height - offset
          left = anchorRect.left + (anchorRect.width / 2) - (overlayRect.width / 2)
          break
        case 'right':
          top = anchorRect.top + (anchorRect.height / 2) - (overlayRect.height / 2)
          left = anchorRect.right + offset
          break
        case 'left':
          top = anchorRect.top + (anchorRect.height / 2) - (overlayRect.height / 2)
          left = anchorRect.left - overlayRect.width - offset
          break
        default:
          break
      }

      // Keep within viewport bounds
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      if (left < 8) left = 8
      if (left + overlayRect.width > viewportWidth - 8) {
        left = viewportWidth - overlayRect.width - 8
      }
      if (top < 8) top = 8
      if (top + overlayRect.height > viewportHeight - 8) {
        top = viewportHeight - overlayRect.height - 8
      }

      setOverlayStyle({
        top: `${top}px`,
        left: `${left}px`
      })
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [isOpen, anchorRef, position, offset])

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        close()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, close])

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(e.target) &&
        anchorRef?.current &&
        !anchorRef.current.contains(e.target)
      ) {
        close()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, close, anchorRef])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        backgroundColor: colors.gray.gray00,
        borderRadius: spacing.nano,
        boxShadow: elevation[8],
        padding: spacing.xxs,
        zIndex: 1000,
        width: width || 'auto',
        maxWidth: maxWidth || 'none',
        ...overlayStyle
      }}
      {...rest}
    >
      {children}
    </div>
  )
}

QuickGlanceOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  anchorRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'bottom-right', 'left', 'right']),
  offset: PropTypes.number,
  width: PropTypes.string,
  maxWidth: PropTypes.string,
  children: PropTypes.node
}

/**
 * useQuickGlance Hook
 *
 * Manages quick glance overlay state
 * Returns { isOpen, open, close, handleClick, anchorRef }
 */
export const useQuickGlance = () => {
  const [isOpen, setIsOpen] = useState(false)
  const anchorRef = useRef(null)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const handleClick = () => setIsOpen(!isOpen)

  return {
    isOpen,
    open,
    close,
    handleClick,
    anchorRef
  }
}
