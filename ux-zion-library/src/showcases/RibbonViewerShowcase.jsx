import { useState } from 'react'
import { RibbonViewer } from '../components/RibbonViewer'
import { Card } from '../components/Card'

/**
 * RibbonViewer Showcase
 *
 * Displays the RibbonViewer component with documentation and interactive examples
 */
export const RibbonViewerShowcase = () => {
  const [activeIndex1, setActiveIndex1] = useState(0)
  const [activeIndex2, setActiveIndex2] = useState(2)

  // Sample images for demonstration
  const sampleImages = [
    { src: '/src/assets/records/image1.jpg', alt: 'Record 1' },
    { src: '/src/assets/records/2.jpg', alt: 'Record 2' },
    { src: '/src/assets/records/image3.jpg', alt: 'Record 3' },
    { src: '/src/assets/records/image4.jpg', alt: 'Record 4' },
    { src: '/src/assets/records/image5.jpg', alt: 'Record 5' }
  ]

  // Many images to demonstrate scrolling
  const manyImages = [
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
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{
          margin: 0,
          fontSize: '32px',
          fontWeight: 700,
          color: '#111827'
        }}>
          Ribbon Viewer
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          A horizontal thumbnail viewer component for image navigation. Features 51x51 thumbnails with gray00
          background, pico spacing, gray80 container background. Active thumbnail is 61x61 with 2px blue20 stroke,
          centered vertically, and overlaps adjacent thumbnails by 2px on each side.
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
                    activeIndex
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>number</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>0</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Index of the currently active image
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    onThumbnailClick
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>function</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Callback when thumbnail is clicked, receives index as parameter
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

        {/* Basic Usage */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Basic Usage
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            Click on thumbnails to change the active image. The active thumbnail is larger (61x61) with a blue stroke.
          </p>
          <RibbonViewer
            images={sampleImages}
            activeIndex={activeIndex1}
            onThumbnailClick={setActiveIndex1}
          />
          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '16px' }}>
            Active Image Index: <strong>{activeIndex1}</strong>
          </p>
        </div>

        {/* Scrolling Example */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            With Scrolling
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            When there are many thumbnails, scroll arrows appear to navigate through them. Click the arrows or scroll to see both left and right navigation.
          </p>
          <RibbonViewer
            images={manyImages}
            activeIndex={activeIndex2}
            onThumbnailClick={setActiveIndex2}
          />
          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '16px' }}>
            Active Image Index: <strong>{activeIndex2}</strong> - Try scrolling right to see the left arrow appear
          </p>
        </div>

        {/* Design Specs */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Design Specifications
          </h3>
          <Card size="sm" variant="elevated">
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#374151', lineHeight: '1.8' }}>
              <li>Regular thumbnails: 51x51 pixels</li>
              <li>Active thumbnail: 61x61 pixels with 2px blue20 stroke</li>
              <li>Thumbnail background: gray00 (white)</li>
              <li>Container background: gray80 (dark gray)</li>
              <li>Spacing between thumbnails: pico (4px)</li>
              <li>Container padding: pico (4px) top and bottom</li>
              <li>Active thumbnail overlaps adjacent thumbnails by 2px on each side</li>
              <li>Images use object-fit: contain to preserve aspect ratio</li>
              <li>Scroll arrows appear when content overflows</li>
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
{`import { RibbonViewer } from './components/RibbonViewer'
import { useState } from 'react'

function MyComponent() {
  const [activeIndex, setActiveIndex] = useState(0)

  const images = [
    { src: '/image1.jpg', alt: 'Image 1' },
    { src: '/image2.jpg', alt: 'Image 2' },
    { src: '/image3.jpg', alt: 'Image 3' },
    { src: '/image4.jpg', alt: 'Image 4' }
  ]

  return (
    <RibbonViewer
      images={images}
      activeIndex={activeIndex}
      onThumbnailClick={setActiveIndex}
    />
  )
}`}
        </pre>
      </section>
    </div>
  )
}
