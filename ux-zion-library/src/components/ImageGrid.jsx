import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { colors, transparentColors } from '../tokens/colors'
import { body } from '../tokens/typography'

/**
 * Thumbnail component - memoized to prevent unnecessary re-renders
 */
const Thumbnail = memo(({ image, index, isActive, showItemNumber, onClick }) => {
  const thumbnailContainerStyles = {
    position: 'relative',
    width: '100%',
    paddingTop: '100%', // 1:1 aspect ratio
    backgroundColor: colors.gray.gray03,
    cursor: 'pointer',
    overflow: 'hidden',
    border: isActive ? `7px solid ${colors.blue.blue20}` : 'none',
    boxSizing: 'border-box'
  }

  const imageStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    display: 'block'
  }

  const itemNumberStyles = {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: transparentColors.transparentGray80,
    color: colors.gray.gray00,
    paddingTop: '4px',
    paddingBottom: '4px',
    paddingLeft: '6px',
    paddingRight: '6px',
    borderTopLeftRadius: '2px',
    borderTopRightRadius: '2px',
    ...body.a
  }

  return (
    <div style={thumbnailContainerStyles} onClick={onClick}>
      <img
        src={image.src}
        alt={image.alt || `Thumbnail ${index + 1}`}
        style={imageStyles}
        loading="lazy"
      />
      {showItemNumber && (
        <div style={itemNumberStyles}>
          {index + 1}
        </div>
      )}
    </div>
  )
}, (prevProps, nextProps) => {
  // Only re-render if isActive changes, image changes, or showItemNumber changes
  return prevProps.isActive === nextProps.isActive &&
         prevProps.image.src === nextProps.image.src &&
         prevProps.showItemNumber === nextProps.showItemNumber
})

Thumbnail.displayName = 'Thumbnail'

Thumbnail.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  showItemNumber: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

/**
 * ImageGrid
 *
 * A grid layout for displaying image thumbnails with equal aspect ratios.
 * Matches Zion UI design system.
 *
 * @param {array} images - Array of image objects with src and alt properties
 * @param {number} activeIndex - Index of the currently active/selected image
 * @param {function} onThumbnailClick - Callback when thumbnail is clicked
 * @param {number} columnsPerRow - Number of thumbnails per row
 * @param {boolean} showItemNumbers - Whether to display item numbers on thumbnails
 */
export const ImageGrid = ({
  images = [],
  activeIndex = 0,
  onThumbnailClick,
  columnsPerRow = 5,
  showItemNumbers = false,
  ...rest
}) => {
  // Grid container styles
  const gridContainerStyles = {
    width: '100%',
    height: '100%'
  }

  // Grid layout styles
  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columnsPerRow}, 1fr)`,
    gap: '16px',
    width: '100%',
    paddingBottom: '16px'
  }

  // Memoize click handler to prevent recreation on each render
  const handleThumbnailClick = useCallback((index) => {
    if (onThumbnailClick) {
      onThumbnailClick(index)
    }
  }, [onThumbnailClick])

  return (
    <div style={gridContainerStyles} {...rest}>
      <div style={gridStyles}>
        {images.map((image, index) => (
          <Thumbnail
            key={`${image.src}-${index}`}
            image={image}
            index={index}
            isActive={index === activeIndex}
            showItemNumber={showItemNumbers}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  )
}

ImageGrid.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string
    })
  ).isRequired,
  activeIndex: PropTypes.number,
  onThumbnailClick: PropTypes.func,
  columnsPerRow: PropTypes.number,
  showItemNumbers: PropTypes.bool
}
