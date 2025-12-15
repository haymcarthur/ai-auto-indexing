import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { colors } from '../tokens/colors'
import { RibbonViewer } from './RibbonViewer'
import { ImageGrid } from './ImageGrid'
import { ZoomControl } from './ZoomControl'
import { CustomControl } from './CustomControl'
import { PageControl } from './PageControl'
import { IconButton } from './IconButton'
import { AdjustImage } from './AdjustImage'
import {
  ControlTarget,
  ControlSettingsAdjust,
  ContentDownload,
  ControlGrid,
  Arrow
} from '../icons'

/**
 * ImageViewer
 *
 * A comprehensive image viewer with zoom, pan, navigation, and control features.
 * Matches Zion UI design system.
 *
 * @param {array} images - Array of image objects with src and alt properties
 * @param {number} initialIndex - Starting image index
 * @param {function} onImageChange - Callback when image changes
 */
export const ImageViewer = ({
  images = [],
  initialIndex = 0,
  onImageChange,
  ...rest
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showLeftNav, setShowLeftNav] = useState(false)
  const [showRightNav, setShowRightNav] = useState(false)
  const [lastTouchDistance, setLastTouchDistance] = useState(0)
  const [isGridView, setIsGridView] = useState(false)
  const [gridColumns, setGridColumns] = useState(5)
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const settingsButtonRef = useRef(null)

  // Image adjustment states
  const [isAdjustImageOpen, setIsAdjustImageOpen] = useState(false)
  const [brightness, setBrightness] = useState(0)
  const [contrast, setContrast] = useState(0)
  const [invertColors, setInvertColors] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [maintainZoom, setMaintainZoom] = useState(true)

  // Column sequence for zoom out in grid view
  const columnSequence = [1, 2, 3, 4, 5, 6, 7, 9, 11, 13, 16, 19, 23, 25]

  // Update current index when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  // Handle mouse move for navigation button visibility
  const handleMouseMove = (e) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const width = rect.width
    const leftThird = width / 3
    const rightThird = (width * 2) / 3

    setMousePosition({ x, y: e.clientY - rect.top })

    // Show left nav if in left third and not first image
    setShowLeftNav(x < leftThird && currentIndex > 0)

    // Show right nav if in right third and not last image
    setShowRightNav(x > rightThird && currentIndex < images.length - 1)
  }

  const handleMouseLeave = () => {
    setShowLeftNav(false)
    setShowRightNav(false)
  }

  // Navigation handlers
  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      if (!maintainZoom) {
        setZoomLevel(1)
        setPanOffset({ x: 0, y: 0 })
      }
      if (onImageChange) onImageChange(newIndex)
    }
  }

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      if (!maintainZoom) {
        setZoomLevel(1)
        setPanOffset({ x: 0, y: 0 })
      }
      if (onImageChange) onImageChange(newIndex)
    }
  }

  // Zoom handlers
  const handleZoomIn = () => {
    if (isGridView) {
      // In grid view, decrease columns (fewer columns = larger thumbnails)
      const currentIdx = columnSequence.indexOf(gridColumns)
      if (currentIdx > 0) {
        setGridColumns(columnSequence[currentIdx - 1])
      }
    } else {
      setZoomLevel(prev => Math.min(prev + 0.25, 5))
    }
  }

  const handleZoomOut = () => {
    if (isGridView) {
      // In grid view, increase columns (more columns = smaller thumbnails)
      const currentIdx = columnSequence.indexOf(gridColumns)
      if (currentIdx < columnSequence.length - 1) {
        setGridColumns(columnSequence[currentIdx + 1])
      }
    } else {
      setZoomLevel(prev => Math.max(prev - 0.25, 0.25))
    }
  }

  const handleResetView = () => {
    setZoomLevel(1)
    setPanOffset({ x: 0, y: 0 })
  }

  // Toggle grid view
  const handleToggleGrid = () => {
    setIsGridView(prev => !prev)
    if (!isGridView) {
      // Entering grid view, reset grid columns to default
      setGridColumns(5)
    }
  }

  // Handle grid thumbnail click - return to single image view
  const handleGridThumbnailClick = (index) => {
    setCurrentIndex(index)
    setIsGridView(false)
    setZoomLevel(1)
    setPanOffset({ x: 0, y: 0 })
    if (onImageChange) onImageChange(index)
  }

  // Adjust image handlers
  const handleToggleAdjustImage = () => {
    setIsAdjustImageOpen(prev => !prev)
  }

  const handleResetAdjustments = () => {
    setBrightness(0)
    setContrast(0)
    setInvertColors(false)
    setRotation(0)
    setMaintainZoom(true)
  }

  // Wheel zoom handler
  const handleWheel = (e) => {
    e.preventDefault()

    if (!containerRef.current || !imageRef.current) return

    const container = containerRef.current.getBoundingClientRect()
    const image = imageRef.current.getBoundingClientRect()

    // Mouse position relative to container
    const mouseX = e.clientX - container.left
    const mouseY = e.clientY - container.top

    // Mouse position relative to image center
    const imageCenterX = image.left + image.width / 2 - container.left
    const imageCenterY = image.top + image.height / 2 - container.top

    const offsetX = mouseX - imageCenterX
    const offsetY = mouseY - imageCenterY

    // Zoom delta (smaller increments for smooth zooming)
    const delta = e.deltaY > 0 ? -0.02 : 0.02
    const newZoom = Math.min(Math.max(zoomLevel + delta, 0.25), 5)

    if (newZoom !== zoomLevel) {
      // Calculate new pan offset to zoom towards mouse position
      const zoomRatio = newZoom / zoomLevel
      setPanOffset(prev => ({
        x: prev.x + offsetX * (1 - zoomRatio),
        y: prev.y + offsetY * (1 - zoomRatio)
      }))
      setZoomLevel(newZoom)
    }
  }

  // Touch handlers for pinch zoom
  const getTouchDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault()
      setLastTouchDistance(getTouchDistance(e.touches))
    }
  }

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && lastTouchDistance > 0) {
      e.preventDefault()

      const currentDistance = getTouchDistance(e.touches)
      const delta = (currentDistance - lastTouchDistance) * 0.005
      const newZoom = Math.min(Math.max(zoomLevel + delta, 0.25), 5)

      if (newZoom !== zoomLevel) {
        setZoomLevel(newZoom)
        setLastTouchDistance(currentDistance)
      }
    }
  }

  const handleTouchEnd = () => {
    setLastTouchDistance(0)
  }

  // Mouse drag handlers for panning
  const handleMouseDown = (e) => {
    if (zoomLevel > 1 && e.button === 0) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y })
      e.preventDefault()
    }
  }

  // Add global mouse listeners for dragging
  useEffect(() => {
    const handleMove = (e) => {
      if (isDragging) {
        setPanOffset({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        })
      }
    }

    const handleUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener('mouseup', handleUp)
      window.addEventListener('mousemove', handleMove)
      return () => {
        window.removeEventListener('mouseup', handleUp)
        window.removeEventListener('mousemove', handleMove)
      }
    }
  }, [isDragging, dragStart])

  // Download handler
  const handleDownload = () => {
    const currentImage = images[currentIndex]
    if (!currentImage) return

    // Create a temporary link and trigger download
    const link = document.createElement('a')
    link.href = currentImage.src
    link.download = currentImage.alt || `image-${currentIndex + 1}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Page control handler
  const handlePageChange = (newValue) => {
    const newIndex = newValue - 1 // Convert 1-based to 0-based
    setCurrentIndex(newIndex)
    setZoomLevel(1)
    setPanOffset({ x: 0, y: 0 })
    if (onImageChange) onImageChange(newIndex)
  }

  // Thumbnail click handler
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index)
    setZoomLevel(1)
    setPanOffset({ x: 0, y: 0 })
    if (onImageChange) onImageChange(index)
  }

  const currentImage = images[currentIndex]

  // Wrapper container styles
  const wrapperStyles = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: rest.style?.flex || '1 1 0',
    height: rest.style?.height || undefined,
    minHeight: 0,
    overflow: 'hidden'
  }

  // Main container styles (image viewing area)
  const containerStyles = {
    position: 'relative',
    width: '100%',
    flex: '1 1 0',
    minHeight: 0,
    backgroundColor: colors.gray.gray05,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto'
  }

  // Grid container wrapper styles
  const gridWrapperStyles = {
    width: '100%',
    height: '100%',
    padding: '16px',
    boxSizing: 'border-box',
    overflowY: 'auto',
    overflowX: 'hidden',
    msOverflowStyle: 'none', // IE and Edge
    scrollbarWidth: 'none', // Firefox
    WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
  }

  // Calculate CSS filters
  const brightnessValue = 1 + (brightness / 100) // -100 to 100 becomes 0 to 2
  const contrastValue = 1 + (contrast / 100) // -100 to 100 becomes 0 to 2
  const invertValue = invertColors ? 1 : 0
  const filterString = `brightness(${brightnessValue}) contrast(${contrastValue}) invert(${invertValue})`

  // Image styles
  const imageStyles = {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel}) rotate(${rotation}deg)`,
    transition: isDragging ? 'none' : 'transform 0.1s ease',
    cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
    userSelect: 'none',
    filter: filterString
  }

  // Top controls container
  const topControlsStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    pointerEvents: 'none',
    zIndex: 10
  }

  // Controls group styles
  const controlsGroupStyles = {
    display: 'flex',
    gap: '8px',
    pointerEvents: 'auto'
  }

  // Navigation button styles
  const navButtonStyles = (position) => ({
    position: 'absolute',
    [position]: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 9,
    opacity: position === 'left' ? (showLeftNav ? 1 : 0) : (showRightNav ? 1 : 0),
    transition: 'opacity 0.2s ease',
    pointerEvents: position === 'left' ? (showLeftNav ? 'auto' : 'none') : (showRightNav ? 'auto' : 'none')
  })

  return (
    <div style={wrapperStyles} {...rest}>
      {/* Hide scrollbar for webkit browsers */}
      <style>
        {`
          .image-viewer-grid-wrapper::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div
        ref={containerRef}
        style={containerStyles}
        onMouseMove={!isGridView ? handleMouseMove : undefined}
        onMouseLeave={!isGridView ? handleMouseLeave : undefined}
        onWheel={!isGridView ? handleWheel : undefined}
        onTouchStart={!isGridView ? handleTouchStart : undefined}
        onTouchMove={!isGridView ? handleTouchMove : undefined}
        onTouchEnd={!isGridView ? handleTouchEnd : undefined}
      >
        {/* Grid view */}
        {isGridView ? (
          <div style={gridWrapperStyles} className="image-viewer-grid-wrapper">
            <ImageGrid
              images={images}
              activeIndex={currentIndex}
              onThumbnailClick={handleGridThumbnailClick}
              columnsPerRow={gridColumns}
              showItemNumbers={true}
            />
          </div>
        ) : (
          <>
            {/* Single image view */}
            {currentImage && (
              <img
                ref={imageRef}
                src={currentImage.src}
                alt={currentImage.alt || `Image ${currentIndex + 1}`}
                style={imageStyles}
                onMouseDown={handleMouseDown}
                draggable={false}
              />
            )}
          </>
        )}

        {/* Top controls */}
        <div style={topControlsStyles}>
          {/* Left side - Page control (only in single image view) or empty spacer */}
          {!isGridView ? (
            <div style={controlsGroupStyles}>
              <PageControl
                label="Image"
                currentValue={currentIndex + 1}
                totalValue={images.length}
                onChange={handlePageChange}
              />
            </div>
          ) : (
            <div style={controlsGroupStyles}></div>
          )}

          {/* Right side - Control buttons */}
          <div style={controlsGroupStyles}>
            {/* Show different controls based on view mode */}
            {!isGridView && (
              <>
                {/* Grid view button */}
                <CustomControl
                  icon={ControlGrid}
                  onClick={handleToggleGrid}
                  label="Grid view"
                />

                {/* Download button */}
                <CustomControl
                  icon={ContentDownload}
                  onClick={handleDownload}
                  label="Download image"
                />

                {/* Settings button */}
                <CustomControl
                  ref={settingsButtonRef}
                  icon={ControlSettingsAdjust}
                  onClick={handleToggleAdjustImage}
                  label="Image settings"
                />

                {/* Reset view button - only shows if zoomed */}
                {zoomLevel !== 1 && (
                  <CustomControl
                    icon={ControlTarget}
                    onClick={handleResetView}
                    label="Reset view"
                  />
                )}
              </>
            )}

            {/* Zoom control - always visible, behavior changes based on view mode */}
            <ZoomControl
              onZoomOut={handleZoomOut}
              onZoomIn={handleZoomIn}
            />
          </div>
        </div>

        {/* Navigation buttons - only in single image view */}
        {!isGridView && (
          <>
            {/* Left navigation button */}
            <div style={navButtonStyles('left')}>
              <IconButton
                icon={Arrow}
                iconProps={{ direction: 'backward' }}
                size="md"
                emphasis="high"
                variant="blue"
                onClick={handlePrevious}
                label="Previous image"
              />
            </div>

            {/* Right navigation button */}
            <div style={navButtonStyles('right')}>
              <IconButton
                icon={Arrow}
                iconProps={{ direction: 'forward' }}
                size="md"
                emphasis="high"
                variant="blue"
                onClick={handleNext}
                label="Next image"
              />
            </div>
          </>
        )}
      </div>

      {/* Bottom ribbon viewer - only in single image view */}
      {!isGridView && (
        <div style={{ flex: '0 0 auto' }}>
          <RibbonViewer
            images={images}
            activeIndex={currentIndex}
            onThumbnailClick={handleThumbnailClick}
          />
        </div>
      )}

      {/* Adjust Image overlay */}
      <AdjustImage
        isOpen={isAdjustImageOpen}
        onClose={() => setIsAdjustImageOpen(false)}
        anchorRef={settingsButtonRef}
        brightness={brightness}
        contrast={contrast}
        invertColors={invertColors}
        rotation={rotation}
        maintainZoom={maintainZoom}
        onBrightnessChange={setBrightness}
        onContrastChange={setContrast}
        onInvertColorsChange={setInvertColors}
        onRotationChange={setRotation}
        onMaintainZoomChange={setMaintainZoom}
        onReset={handleResetAdjustments}
      />
    </div>
  )
}

ImageViewer.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string
    })
  ).isRequired,
  initialIndex: PropTypes.number,
  onImageChange: PropTypes.func
}
