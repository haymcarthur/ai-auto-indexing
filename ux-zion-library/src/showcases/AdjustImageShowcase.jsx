import { useState, useRef } from 'react'
import { AdjustImage } from '../components/AdjustImage'
import { Button } from '../components/Button'
import { Card } from '../components/Card'

/**
 * AdjustImage Showcase
 *
 * Displays the AdjustImage component with documentation and interactive examples
 */
export const AdjustImageShowcase = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [brightness, setBrightness] = useState(0)
  const [contrast, setContrast] = useState(0)
  const [invertColors, setInvertColors] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [maintainZoom, setMaintainZoom] = useState(true)
  const buttonRef = useRef(null)

  const handleReset = () => {
    setBrightness(0)
    setContrast(0)
    setInvertColors(false)
    setRotation(0)
    setMaintainZoom(true)
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{
          margin: 0,
          fontSize: '32px',
          fontWeight: 700,
          color: '#111827'
        }}>
          Adjust Image
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          A composite component (QuickGlanceOverlay) for adjusting image settings including brightness,
          contrast, color inversion, rotation, and zoom maintenance.
        </p>
      </div>

      {/* Interactive Example */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Interactive Example
        </h2>
        <Card size="sm" variant="elevated" style={{ marginBottom: '24px' }}>
          <div style={{ padding: '24px' }}>
            <Button
              ref={buttonRef}
              emphasis="high"
              variant="blue"
              onClick={() => setIsOpen(true)}
            >
              Open Adjust Image
            </Button>

            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>
                Current Settings:
              </h3>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#374151', lineHeight: '1.8' }}>
                <li>Brightness: {brightness}</li>
                <li>Contrast: {contrast}</li>
                <li>Invert Colors: {invertColors ? 'On' : 'Off'}</li>
                <li>Rotation: {rotation}°</li>
                <li>Maintain Zoom: {maintainZoom ? 'On' : 'Off'}</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Features */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Features
        </h2>
        <Card size="sm" variant="elevated">
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#374151', lineHeight: '1.8' }}>
            <li>Brightness control with slider (-100 to 100)</li>
            <li>Contrast control with slider (-100 to 100)</li>
            <li>Color inversion toggle</li>
            <li>Image rotation (left and right by 90°)</li>
            <li>Zoom maintenance toggle (persist zoom across images)</li>
            <li>Reset button to restore default settings</li>
            <li>Settings apply to all images in a viewer session</li>
            <li>Settings persist until reset or page refresh</li>
            <li>Closes on click outside or button press</li>
          </ul>
        </Card>
      </section>

      {/* Usage */}
      <section>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Code Example
        </h2>
        <pre style={{
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '16px',
          overflowX: 'auto',
          fontSize: '13px',
          lineHeight: '1.6',
          color: '#374151'
        }}>
{`import { AdjustImage } from './components/AdjustImage'
import { useState, useRef } from 'react'

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const [brightness, setBrightness] = useState(0)
  const [contrast, setContrast] = useState(0)
  const [invertColors, setInvertColors] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [maintainZoom, setMaintainZoom] = useState(true)
  const buttonRef = useRef(null)

  const handleReset = () => {
    setBrightness(0)
    setContrast(0)
    setInvertColors(false)
    setRotation(0)
    setMaintainZoom(true)
  }

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(true)}
      >
        Open Settings
      </button>

      <AdjustImage
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        anchorRef={buttonRef}
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
        onReset={handleReset}
      />
    </>
  )
}`}
        </pre>
      </section>

      {/* AdjustImage Overlay */}
      <AdjustImage
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        anchorRef={buttonRef}
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
        onReset={handleReset}
      />
    </div>
  )
}
