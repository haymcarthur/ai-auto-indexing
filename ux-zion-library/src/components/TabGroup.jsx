import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { colors } from '../tokens/colors'
import { ArrowCaret } from '../icons'

/**
 * TabGroup
 *
 * A container for tabs with automatic scrolling when content overflows.
 * Matches Zion UI design system.
 *
 * @param {node} children - Tab components
 */
export const TabGroup = ({ children, ...rest }) => {
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(false)
  const scrollContainerRef = useRef(null)

  const checkScroll = () => {
    const container = scrollContainerRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container

    setShowLeftScroll(scrollLeft > 0)
    setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 1)
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [children])

  const scroll = (direction) => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = 200
    const newScrollLeft = direction === 'left'
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    })
  }

  const containerStyles = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.gray.gray00
  }

  const scrollContainerStyles = {
    display: 'flex',
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    width: '100%'
  }

  const scrollButtonStyles = (position) => ({
    position: 'absolute',
    [position]: 0,
    top: 0,
    bottom: 0,
    width: '40px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: position === 'left'
      ? `linear-gradient(270deg, rgba(255, 255, 255, 0.00) 0%, ${colors.gray.gray00} 52%)`
      : `linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, ${colors.gray.gray00} 52%)`,
    border: 'none',
    cursor: 'pointer',
    zIndex: 1,
    padding: 0
  })

  return (
    <>
      <style>{`
        .tab-scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div style={containerStyles} {...rest}>
        {/* Left scroll button */}
        {showLeftScroll && (
          <button
            type="button"
            onClick={() => scroll('left')}
            style={scrollButtonStyles('left')}
            aria-label="Scroll left"
          >
            <div style={{ display: 'flex', transform: 'scaleX(-1)' }}>
              <ArrowCaret size="sm" />
            </div>
          </button>
        )}

        {/* Tabs container */}
        <div
          ref={scrollContainerRef}
          className="tab-scroll-container"
          style={scrollContainerStyles}
          onScroll={checkScroll}
        >
          {children}
        </div>

        {/* Right scroll button */}
        {showRightScroll && (
          <button
            type="button"
            onClick={() => scroll('right')}
            style={scrollButtonStyles('right')}
            aria-label="Scroll right"
          >
            <ArrowCaret size="sm" />
          </button>
        )}
      </div>
    </>
  )
}

TabGroup.propTypes = {
  children: PropTypes.node
}
