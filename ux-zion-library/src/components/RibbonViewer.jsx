import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { colors, buttonColors } from '../tokens/colors'
import { spacing } from '../tokens/spacing'
import { ArrowCaret } from '../icons'

/**
 * RibbonViewer
 *
 * A horizontal thumbnail viewer with scrolling capability.
 * Matches Zion UI design system.
 *
 * @param {array} images - Array of image objects with src and alt properties
 * @param {number} activeIndex - Index of the currently active image
 * @param {function} onThumbnailClick - Callback when thumbnail is clicked
 */
export const RibbonViewer = ({
  images = [],
  activeIndex = 0,
  onThumbnailClick,
  ...rest
}) => {
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
    // Delay check to ensure content is rendered
    const timer = setTimeout(() => {
      checkScroll()
    }, 100)

    window.addEventListener('resize', checkScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', checkScroll)
    }
  }, [images])

  // Also check on mount and when activeIndex changes
  useEffect(() => {
    checkScroll()
  }, [activeIndex])

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

  // Container styles
  const containerStyles = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.gray.gray80,
    padding: `${spacing.pico} 0`
  }

  // Scroll container styles
  const scrollContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.pico,
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    width: '100%',
    padding: `0 ${spacing.pico}`
  }

  // Scroll button styles
  const scrollButtonStyles = (position) => ({
    position: 'absolute',
    [position]: 0,
    top: 0,
    bottom: 0,
    width: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: position === 'left'
      ? `linear-gradient(270deg, rgba(255, 255, 255, 0.00) 0%, ${colors.gray.gray00} 100%)`
      : `linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, ${colors.gray.gray00} 100%)`,
    border: 'none',
    cursor: 'pointer',
    zIndex: 10,
    padding: 0
  })

  // Thumbnail wrapper styles
  const thumbnailWrapperStyles = (index) => {
    const isActive = index === activeIndex
    return {
      flexShrink: 0,
      width: isActive ? '61px' : '51px',
      height: isActive ? '61px' : '51px',
      backgroundColor: colors.gray.gray00,
      border: isActive ? `2px solid ${colors.blue.blue20}` : 'none',
      boxSizing: 'border-box',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      // Active thumbnail overlaps adjacent thumbnails by 2px on both sides
      marginLeft: isActive && index > 0 ? '-2px' : '0',
      marginRight: isActive && index < images.length - 1 ? '-2px' : '0',
      zIndex: isActive ? 2 : 1,
      position: 'relative'
    }
  }

  // Image styles
  const imageStyles = {
    maxWidth: '100%',
    maxHeight: '100%',
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    display: 'block'
  }

  return (
    <>
      <style>{`
        .ribbon-scroll-container::-webkit-scrollbar {
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
              <ArrowCaret size="sm" style={{ color: buttonColors.highBlue }} />
            </div>
          </button>
        )}

        {/* Thumbnails container */}
        <div
          ref={scrollContainerRef}
          className="ribbon-scroll-container"
          style={scrollContainerStyles}
          onScroll={checkScroll}
        >
          {images.map((image, index) => (
            <div
              key={index}
              style={thumbnailWrapperStyles(index)}
              onClick={() => onThumbnailClick && onThumbnailClick(index)}
            >
              <img
                src={image.src}
                alt={image.alt || `Thumbnail ${index + 1}`}
                style={imageStyles}
              />
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        {showRightScroll && (
          <button
            type="button"
            onClick={() => scroll('right')}
            style={scrollButtonStyles('right')}
            aria-label="Scroll right"
          >
            <ArrowCaret size="sm" style={{ color: buttonColors.highBlue }} />
          </button>
        )}
      </div>
    </>
  )
}

RibbonViewer.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string
    })
  ).isRequired,
  activeIndex: PropTypes.number,
  onThumbnailClick: PropTypes.func
}
