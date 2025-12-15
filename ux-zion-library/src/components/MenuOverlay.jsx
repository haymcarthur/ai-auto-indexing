import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { colors } from '../tokens/colors'
import { elevation } from '../tokens/elevation'

/**
 * MenuOverlay
 *
 * A popover menu overlay that can be anchored to any element.
 * Contains list items with no vertical padding and horizontal padding of 16px.
 * Matches Zion UI design system.
 *
 * @param {boolean} isOpen - Whether the overlay is open
 * @param {function} close - Function to close the overlay
 * @param {ref} anchorRef - Ref to the element to anchor to
 * @param {string} position - Position relative to anchor: 'top', 'bottom', 'left', 'right'
 * @param {string} align - Horizontal alignment: 'start', 'center', 'end' (default: 'center')
 * @param {number} offset - Distance from anchor element in pixels (default: 8)
 * @param {string} width - Optional width (e.g., '200px', 'auto')
 * @param {string} maxWidth - Optional max-width
 * @param {node} children - Menu content (typically ListItem components)
 */
export const MenuOverlay = ({
  isOpen,
  close,
  anchorRef,
  position = 'bottom',
  align = 'center',
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
      if (!anchorRef?.current || !overlayRef.current) return

      const anchorRect = anchorRef.current.getBoundingClientRect()
      const overlayRect = overlayRef.current.getBoundingClientRect()

      let top = 0
      let left = 0

      // Calculate horizontal alignment
      const getHorizontalAlignment = () => {
        switch (align) {
          case 'start':
            return anchorRect.left
          case 'end':
            return anchorRect.right - overlayRect.width
          case 'center':
          default:
            return anchorRect.left + (anchorRect.width / 2) - (overlayRect.width / 2)
        }
      }

      switch (position) {
        case 'bottom':
          top = anchorRect.bottom + offset
          left = getHorizontalAlignment()
          break
        case 'top':
          top = anchorRect.top - overlayRect.height - offset
          left = getHorizontalAlignment()
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

    // Use requestAnimationFrame to continuously update position while open
    let animationFrameId
    const continuousUpdate = () => {
      updatePosition()
      animationFrameId = requestAnimationFrame(continuousUpdate)
    }
    animationFrameId = requestAnimationFrame(continuousUpdate)

    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [isOpen, anchorRef, position, align, offset])

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
        borderRadius: '8px',
        boxShadow: elevation[4],
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: '16px',
        paddingRight: '16px',
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

MenuOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  anchorRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  align: PropTypes.oneOf(['start', 'center', 'end']),
  offset: PropTypes.number,
  width: PropTypes.string,
  maxWidth: PropTypes.string,
  children: PropTypes.node
}

/**
 * useMenuOverlay Hook
 *
 * Manages menu overlay state
 * Returns { isOpen, open, close, handleClick, anchorRef }
 */
export const useMenuOverlay = () => {
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
