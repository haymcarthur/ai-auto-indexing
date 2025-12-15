import { useState } from 'react'
import { ImageViewer } from '../components/ImageViewer'
import { Card } from '../components/Card'

/**
 * ImageViewer Showcase
 *
 * Displays the ImageViewer component with documentation and interactive examples
 */
export const ImageViewerShowcase = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Sample images using the records
  const sampleImages = [
    { src: '/src/assets/records/image1.jpg', alt: 'Record 1' },
    { src: '/src/assets/records/2.jpg', alt: 'Record 2' },
    { src: '/src/assets/records/image3.jpg', alt: 'Record 3' },
    { src: '/src/assets/records/image4.jpg', alt: 'Record 4' },
    { src: '/src/assets/records/image5.jpg', alt: 'Record 5' },
    { src: '/src/assets/records/image6.jpg', alt: 'Record 6' },
    { src: '/src/assets/records/image7.jpg', alt: 'Record 7' },
    { src: '/src/assets/records/image8.jpg', alt: 'Record 8' },
    { src: '/src/assets/records/image9.jpg', alt: 'Record 9' },
    { src: '/src/assets/records/image10.jpg', alt: 'Record 10' },
    { src: '/src/assets/records/image11.jpg', alt: 'Record 11' },
    { src: '/src/assets/records/image12.jpg', alt: 'Record 12' },
    { src: '/src/assets/records/image13.jpg', alt: 'Record 13' },
    { src: '/src/assets/records/image14.jpg', alt: 'Record 14' },
    { src: '/src/assets/records/image15.jpg', alt: 'Record 15' },
    { src: '/src/assets/records/image16.jpg', alt: 'Record 16' },
    { src: '/src/assets/records/image17.jpg', alt: 'Record 17' },
    { src: '/src/assets/records/image18.jpg', alt: 'Record 18' },
    { src: '/src/assets/records/image19.jpg', alt: 'Record 19' },
    { src: '/src/assets/records/image20.jpg', alt: 'Record 20' }
  ]

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
          Image Viewer
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          A comprehensive image viewer component with zoom, pan, navigation controls, and thumbnail ribbon.
          Features gray05 background, overlay controls with 16px padding, zoom controls, page navigation,
          hover-triggered navigation buttons, and integrated ribbon viewer at the bottom.
        </p>
      </div>

      {/* Properties Table */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Properties
        </h2>
        <Card size="sm" variant="elevated" style={{ marginBottom: '24px' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #e5e7eb',
                  fontWeight: 600,
                  color: '#374151'
                }}>Name</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #e5e7eb',
                  fontWeight: 600,
                  color: '#374151'
                }}>Type</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #e5e7eb',
                  fontWeight: 600,
                  color: '#374151'
                }}>Default</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #e5e7eb',
                  fontWeight: 600,
                  color: '#374151'
                }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    images
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>array</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>[]</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Array of image objects with src and alt properties
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    initialIndex
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>number</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>0</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Starting image index
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    onImageChange
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>function</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Callback when image changes, receives new index as parameter
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      {/* Examples */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Examples
        </h2>

        {/* Full Image Viewer */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Full Image Viewer
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            Use zoom controls to zoom in/out. Hover over left or right thirds to see navigation buttons.
            Click thumbnails in the ribbon to switch images. The reset view button appears when zoomed.
          </p>
          <ImageViewer
            images={sampleImages}
            initialIndex={currentImageIndex}
            onImageChange={setCurrentImageIndex}
          />
          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '16px' }}>
            Current Image: <strong>{currentImageIndex + 1} of {sampleImages.length}</strong>
          </p>
        </div>

        {/* Features List */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Features
          </h3>
          <Card size="sm" variant="elevated">
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#374151', lineHeight: '1.8' }}>
              <li><strong>Zoom Controls:</strong> Zoom in/out buttons in top right</li>
              <li><strong>Reset View:</strong> Target button appears when zoomed to reset to fit view</li>
              <li><strong>Page Control:</strong> Navigate images with page counter in top left</li>
              <li><strong>Navigation Buttons:</strong> MD high emphasis blue IconButtons appear on hover</li>
              <li><strong>Previous button:</strong> Shows when hovering over left 1/3 of viewer</li>
              <li><strong>Next button:</strong> Shows when hovering over right 1/3 of viewer</li>
              <li><strong>Download:</strong> Download current image button</li>
              <li><strong>Settings:</strong> Image settings button (placeholder for future features)</li>
              <li><strong>Grid View:</strong> Switch to grid view button (placeholder for future features)</li>
              <li><strong>Ribbon Viewer:</strong> Thumbnail strip at bottom for quick navigation</li>
              <li><strong>Gray05 Background:</strong> Light gray background for image contrast</li>
              <li><strong>Fit to Area:</strong> Images automatically fit within viewer area</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Code Example */}
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
{`import { ImageViewer } from './components/ImageViewer'
import { useState } from 'react'

function MyComponent() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = [
    { src: '/image1.jpg', alt: 'Image 1' },
    { src: '/image2.jpg', alt: 'Image 2' },
    { src: '/image3.jpg', alt: 'Image 3' },
    { src: '/image4.jpg', alt: 'Image 4' }
  ]

  return (
    <ImageViewer
      images={images}
      initialIndex={currentIndex}
      onImageChange={setCurrentIndex}
    />
  )
}`}
        </pre>
      </section>
    </div>
  )
}
