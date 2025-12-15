import React from 'react'
import PropTypes from 'prop-types'
import { QuickGlanceOverlay } from './QuickGlanceOverlay'
import { Button } from './Button'
import { Toggle } from './Toggle'
import { Slider } from './Slider'
import { Divider } from './Divider'
import { body } from '../tokens/typography'
import { headingBlocks } from '../tokens/typography'
import {
  ControlBrightnessLess,
  ControlBrightnessMore,
  ControlContrastLess,
  ControlContrastMore,
  ArrowRotate
} from '../icons'

// Wrapper for mirrored ArrowRotate icon
const ArrowRotateLeft = (props) => (
  <div style={{ transform: 'scaleX(-1)' }}>
    <ArrowRotate {...props} />
  </div>
)

/**
 * AdjustImage
 *
 * A quick glance overlay for adjusting image settings like brightness, contrast, rotation, and inversion.
 * Matches Zion UI design system.
 *
 * @param {boolean} isOpen - Whether the overlay is open
 * @param {function} onClose - Callback when overlay is closed
 * @param {ref} anchorRef - Reference to the element to anchor to
 * @param {number} brightness - Brightness value (-100 to 100)
 * @param {number} contrast - Contrast value (-100 to 100)
 * @param {boolean} invertColors - Whether colors are inverted
 * @param {number} rotation - Rotation angle (0, 90, 180, 270)
 * @param {boolean} maintainZoom - Whether to maintain zoom across images
 * @param {function} onBrightnessChange - Callback when brightness changes
 * @param {function} onContrastChange - Callback when contrast changes
 * @param {function} onInvertColorsChange - Callback when invert colors changes
 * @param {function} onRotationChange - Callback when rotation changes
 * @param {function} onMaintainZoomChange - Callback when maintain zoom changes
 * @param {function} onReset - Callback when reset is clicked
 */
export const AdjustImage = ({
  isOpen = false,
  onClose,
  anchorRef,
  brightness = 0,
  contrast = 0,
  invertColors = false,
  rotation = 0,
  maintainZoom = true,
  onBrightnessChange,
  onContrastChange,
  onInvertColorsChange,
  onRotationChange,
  onMaintainZoomChange,
  onReset,
  ...rest
}) => {

  const handleRotateLeft = () => {
    const newRotation = (rotation - 90 + 360) % 360
    if (onRotationChange) onRotationChange(newRotation)
  }

  const handleRotateRight = () => {
    const newRotation = (rotation + 90) % 360
    if (onRotationChange) onRotationChange(newRotation)
  }

  // Container styles
  const headerContainerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  }

  const h5Styles = {
    ...headingBlocks.h5.display,
    margin: 0
  }

  const sectionContainerStyles = {
    marginBottom: '24px'
  }

  const h6Styles = {
    ...headingBlocks.h6.supplemental,
    margin: '0 0 12px 0'
  }

  const controlRowStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  }

  const sliderWrapperStyles = {
    flex: 1
  }

  const toggleContainerStyles = {
    marginBottom: '24px'
  }

  const toggleLabelStyles = {
    ...body.b,
    margin: 0
  }

  const buttonRowStyles = {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    width: '100%',
    alignItems: 'stretch'
  }

  const buttonWrapperStyles = {
    flex: 1,
    display: 'flex'
  }

  const resetContainerStyles = {
    marginBottom: 0
  }

  return (
    <QuickGlanceOverlay
      isOpen={isOpen}
      close={onClose}
      anchorRef={anchorRef}
      position="bottom-right"
      {...rest}
    >
      <div style={{ width: '415px' }}>
        {/* Header */}
        <div style={headerContainerStyles}>
          <h5 style={h5Styles}>Adjust Image</h5>
          <Button
            emphasis="low"
            variant="blue"
            onClick={() => console.log('Keyboard shortcuts clicked')}
          >
            Keyboard Shortcuts
          </Button>
        </div>

        {/* Brightness */}
        <div style={sectionContainerStyles}>
          <h6 style={h6Styles}>Brightness</h6>
          <div style={controlRowStyles}>
            <ControlBrightnessLess width="20px" height="20px" />
            <div style={sliderWrapperStyles}>
              <Slider
                min={-100}
                max={100}
                value={brightness}
                onChange={onBrightnessChange}
                step={1}
              />
            </div>
            <ControlBrightnessMore width="20px" height="20px" />
          </div>
        </div>

        {/* Contrast */}
        <div style={sectionContainerStyles}>
          <h6 style={h6Styles}>Contrast</h6>
          <div style={controlRowStyles}>
            <ControlContrastLess width="20px" height="20px" />
            <div style={sliderWrapperStyles}>
              <Slider
                min={-100}
                max={100}
                value={contrast}
                onChange={onContrastChange}
                step={1}
              />
            </div>
            <ControlContrastMore width="20px" height="20px" />
          </div>
        </div>

        {/* Invert Colors */}
        <div style={toggleContainerStyles}>
          <Toggle
            label="Invert Image Colors"
            checked={invertColors}
            onChange={onInvertColorsChange}
            labelStyle={toggleLabelStyles}
          />
        </div>

        {/* Image Rotation Divider */}
        <div style={sectionContainerStyles}>
          <Divider label="Image Rotation" />
        </div>

        {/* Rotation Buttons */}
        <div style={buttonRowStyles}>
          <div style={buttonWrapperStyles}>
            <Button
              emphasis="low"
              variant="blue"
              iconStart={ArrowRotateLeft}
              onClick={handleRotateLeft}
              inline
            >
              Rotate Image Left
            </Button>
          </div>
          <div style={buttonWrapperStyles}>
            <Button
              emphasis="low"
              variant="blue"
              iconStart={ArrowRotate}
              onClick={handleRotateRight}
              inline
            >
              Rotate Image Right
            </Button>
          </div>
        </div>

        {/* Zoom Level Divider */}
        <div style={sectionContainerStyles}>
          <Divider label="Zoom Level" />
        </div>

        {/* Maintain Zoom */}
        <div style={toggleContainerStyles}>
          <Toggle
            label="Maintain Image Zoom"
            checked={maintainZoom}
            onChange={onMaintainZoomChange}
            labelStyle={toggleLabelStyles}
          />
        </div>

        {/* Reset Button */}
        <div style={resetContainerStyles}>
          <div style={{ width: '100%' }}>
            <Button
              emphasis="medium"
              variant="blue"
              onClick={onReset}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </QuickGlanceOverlay>
  )
}

AdjustImage.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  anchorRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  brightness: PropTypes.number,
  contrast: PropTypes.number,
  invertColors: PropTypes.bool,
  rotation: PropTypes.number,
  maintainZoom: PropTypes.bool,
  onBrightnessChange: PropTypes.func,
  onContrastChange: PropTypes.func,
  onInvertColorsChange: PropTypes.func,
  onRotationChange: PropTypes.func,
  onMaintainZoomChange: PropTypes.func,
  onReset: PropTypes.func
}
