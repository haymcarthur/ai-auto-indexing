import { useState, useRef, useEffect } from 'react';

/**
 * DocumentHighlightOverlay Component
 *
 * Simplified read-only highlight overlay for AI name selection
 * Adapted from Highlights test ImageHighlightOverlay
 *
 * Key differences:
 * - No editing, resizing, or creating highlights
 * - Read-only: click triggers selection only
 * - Yellow highlights for AI branding
 * - All highlights visible on hover
 * - Header highlight is non-selectable
 * - Uses same transform as image for perfect synchronization
 */
export const DocumentHighlightOverlay = ({
  highlights,
  onHighlightClick,
  isActive,
  zoomLevel = 1,
  panOffset = { x: 0, y: 0 },
  imageSize = { width: 2000, height: 2618 },
  isDragging = false,
  imageRef
}) => {
  const [hoveredHighlightId, setHoveredHighlightId] = useState(null);
  const [displaySize, setDisplaySize] = useState({ width: imageSize.width, height: imageSize.height });
  const overlayRef = useRef(null);

  // Calculate actual displayed size of image (after objectFit: contain, before transform)
  useEffect(() => {
    if (isActive && imageRef?.current) {
      const updateDisplaySize = () => {
        const img = imageRef.current;
        if (!img) return;

        const container = img.parentElement;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;

        // Calculate display size using objectFit: contain logic
        const imageAspect = imageSize.width / imageSize.height;
        const containerAspect = containerWidth / containerHeight;

        let displayWidth, displayHeight;
        if (imageAspect > containerAspect) {
          // Image is wider - fit to width
          displayWidth = containerWidth;
          displayHeight = containerWidth / imageAspect;
        } else {
          // Image is taller - fit to height
          displayHeight = containerHeight;
          displayWidth = containerHeight * imageAspect;
        }

        setDisplaySize({ width: displayWidth, height: displayHeight });
      };

      // Update immediately
      updateDisplaySize();

      // Update on window resize (for InfoSheet open/close)
      window.addEventListener('resize', updateDisplaySize);
      return () => window.removeEventListener('resize', updateDisplaySize);
    }
  }, [isActive, imageRef, imageSize]);

  // Don't render overlay if not active
  if (!isActive) {
    return null;
  }

  // Handle highlight click
  const handleHighlightClick = (e, highlight) => {
    e.stopPropagation();

    // Don't allow clicking on non-selectable highlights (like header)
    if (!highlight.selectable) {
      return;
    }

    // Call the click handler with the highlight ID
    if (onHighlightClick) {
      onHighlightClick(highlight.id);
    }
  };

  // Handle mouse enter on highlight
  const handleHighlightMouseEnter = (highlightId) => {
    setHoveredHighlightId(highlightId);
  };

  // Handle mouse leave on highlight
  const handleHighlightMouseLeave = () => {
    setHoveredHighlightId(null);
  };

  // Calculate scale factor from natural image size to displayed size
  const scaleX = displaySize.width / imageSize.width;
  const scaleY = displaySize.height / imageSize.height;

  return (
    <div
      ref={overlayRef}
      className="absolute pointer-events-none"
      style={{
        // Use same transform as image for perfect synchronization
        transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
        transformOrigin: 'center center',
        transition: isDragging ? 'none' : 'transform 0.1s ease',
        // Position at container center with DISPLAYED image dimensions (not natural)
        width: `${displaySize.width}px`,
        height: `${displaySize.height}px`,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: `-${displaySize.width / 2}px`,
        marginTop: `-${displaySize.height / 2}px`
      }}
    >
      {/* Render all highlights */}
      {highlights && highlights.map((highlight) => {
        const isHovered = hoveredHighlightId === highlight.id;
        const isNonSelectable = !highlight.selectable;

        // Scale coordinates from natural to displayed size
        const left = highlight.x * scaleX;
        const top = highlight.y * scaleY;
        const width = highlight.width * scaleX;
        const height = highlight.height * scaleY;

        // Determine colors and opacity based on state
        let borderColor, bgColor, opacity, cursor;

        if (isNonSelectable) {
          // Header highlight - gray, non-clickable
          borderColor = 'border-gray-400';
          bgColor = 'bg-gray-400';
          opacity = isHovered ? 'opacity-20' : 'opacity-10';
          cursor = 'default';
        } else if (isHovered) {
          // Hovering over a selectable highlight - yellow, more visible
          borderColor = 'border-yellow-400';
          bgColor = 'bg-yellow-400';
          opacity = 'opacity-40';
          cursor = 'pointer';
        } else {
          // Default state - yellow, slightly visible so users know where to hover
          borderColor = 'border-yellow-400';
          bgColor = 'bg-yellow-400';
          opacity = 'opacity-15';
          cursor = 'pointer';
        }

        return (
          <div
            key={`${highlight.id}-${highlight.x}-${highlight.y}`}
            className={`absolute border-2 ${borderColor} ${bgColor} transition-opacity ${opacity}`}
            style={{
              left: `${left}px`,
              top: `${top}px`,
              width: `${width}px`,
              height: `${height}px`,
              cursor: cursor,
              pointerEvents: 'auto'
            }}
            onClick={(e) => handleHighlightClick(e, highlight)}
            onMouseEnter={() => handleHighlightMouseEnter(highlight.id)}
            onMouseLeave={handleHighlightMouseLeave}
          />
        );
      })}
    </div>
  );
};
