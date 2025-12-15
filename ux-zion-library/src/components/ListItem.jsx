import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { spacing } from '../tokens/spacing'
import { Paragraph } from './Paragraph'
import { Avatar } from './Avatar'

/**
 * ListItem
 *
 * A clickable list item with optional start/end elements and text block.
 * Matches Zion UI design system.
 *
 * @param {node} startElement - Optional start element (icon, image, checkbox)
 * @param {object} avatar - Optional avatar configuration { type, name, photoSrc, grayMode }
 * @param {string} overline - Optional overline text (xs paragraph, secondary color)
 * @param {string} heading - Heading text (sm paragraph, primary color)
 * @param {string} subheading - Optional subheading text (xs paragraph, secondary color)
 * @param {node} endIcon - Optional end icon (vertically centered)
 * @param {string} metaText - Optional meta text instead of icon (xs paragraph, top aligned)
 * @param {function} onClick - Click handler for the entire list item
 * @param {boolean} dense - Use dense padding (2px instead of 12px)
 * @param {boolean} fullWidth - Extend hover background edge-to-edge (useful in menus with padding)
 * @param {boolean} isFirst - Whether this is the first item in a list (adds top corner radius)
 * @param {boolean} isLast - Whether this is the last item in a list (adds bottom corner radius)
 */
export const ListItem = ({
  startElement,
  avatar,
  overline,
  heading,
  subheading,
  endIcon,
  metaText,
  onClick,
  onMouseDown,
  dense = false,
  fullWidth = false,
  isFirst = false,
  isLast = false,
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false)

  // Calculate border radius based on position
  const getBorderRadius = () => {
    if (!fullWidth) return spacing.pico
    if (isFirst && isLast) return '8px' // Single item
    if (isFirst) return '8px 8px 0 0' // First item: top corners rounded
    if (isLast) return '0 0 8px 8px' // Last item: bottom corners rounded
    return 0 // Middle items: no radius
  }

  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: fullWidth
      ? `${dense ? '2px' : spacing.xxs} 16px`
      : `${dense ? '2px' : spacing.xxs} 0`,
    marginLeft: fullWidth ? '-16px' : 0,
    marginRight: fullWidth ? '-16px' : 0,
    borderRadius: getBorderRadius(),
    backgroundColor: isHovered ? 'rgba(0, 15, 15, 0.133)' : 'transparent',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'background-color 0.15s ease',
    gap: spacing.xs
  }

  const textBlockStyles = {
    flex: 1,
    minWidth: 0, // Allow text to truncate if needed
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  }

  const endElementStyles = {
    display: 'flex',
    alignItems: metaText ? 'flex-start' : 'center',
    flexShrink: 0
  }

  // Determine what to render as start element
  const renderStartElement = () => {
    if (avatar) {
      return <Avatar size="sm" {...avatar} />
    }
    return startElement
  }

  const actualStartElement = renderStartElement()

  return (
    <div
      style={containerStyles}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      {/* Start element */}
      {actualStartElement && (
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {actualStartElement}
        </div>
      )}

      {/* Text block */}
      <div style={textBlockStyles}>
        {overline && (
          <Paragraph size="xs" secondary>
            {overline}
          </Paragraph>
        )}

        <Paragraph size="sm">
          {heading}
        </Paragraph>

        {subheading && (
          <Paragraph size="xs" secondary>
            {subheading}
          </Paragraph>
        )}
      </div>

      {/* End element (icon or meta text) */}
      {(endIcon || metaText) && (
        <div style={endElementStyles}>
          {metaText ? (
            <Paragraph size="xs">
              {metaText}
            </Paragraph>
          ) : (
            endIcon
          )}
        </div>
      )}
    </div>
  )
}

ListItem.propTypes = {
  startElement: PropTypes.node,
  avatar: PropTypes.shape({
    type: PropTypes.oneOf(['photo', 'male', 'female', 'anonymous', 'monogram']),
    name: PropTypes.string,
    photoSrc: PropTypes.string,
    grayMode: PropTypes.bool,
    alt: PropTypes.string
  }),
  overline: PropTypes.string,
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  endIcon: PropTypes.node,
  metaText: PropTypes.string,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  dense: PropTypes.bool,
  fullWidth: PropTypes.bool,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool
}
