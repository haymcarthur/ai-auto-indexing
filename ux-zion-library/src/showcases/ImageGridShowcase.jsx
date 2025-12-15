import { useState } from 'react'
import { ImageGrid } from '../components/ImageGrid'
import { Card } from '../components/Card'

// Define images outside component to prevent recreation on each render
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
  { src: '/src/assets/records/image10.jpg', alt: 'Record 10' }
]

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

/**
 * ImageGrid Showcase
 *
 * Displays the ImageGrid component with documentation and interactive examples
 */
export const ImageGridShowcase = () => {
  const [activeIndex1, setActiveIndex1] = useState(0)
  const [activeIndex2, setActiveIndex2] = useState(0)

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
          Image Grid
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          A grid layout component for displaying image thumbnails with equal aspect ratios. Features 5 columns
          per row by default, square thumbnails with gray03 background, images set to fill (cover), 16px padding
          around the grid and between thumbnails.
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
                  Index of the currently active/selected image
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
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    columnsPerRow
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>number</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>5</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Number of thumbnails per row
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

        {/* Default Grid (5 columns) */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Default Grid (5 Columns)
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            Click on thumbnails to select. The active thumbnail has a blue border.
          </p>
          <ImageGrid
            images={sampleImages}
            activeIndex={activeIndex1}
            onThumbnailClick={setActiveIndex1}
          />
          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '16px' }}>
            Selected Image: <strong>{activeIndex1 + 1} of {sampleImages.length}</strong>
          </p>
        </div>

        {/* Many Images */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Multiple Rows
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            Grid automatically wraps to multiple rows with many images.
          </p>
          <ImageGrid
            images={manyImages}
            activeIndex={activeIndex2}
            onThumbnailClick={setActiveIndex2}
          />
          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '16px' }}>
            Selected Image: <strong>{activeIndex2 + 1} of {manyImages.length}</strong>
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
              <li>Default: 5 thumbnails per row</li>
              <li>Thumbnails: Square aspect ratio (1:1)</li>
              <li>Images: object-fit cover to fill thumbnails</li>
              <li>Background: gray03 for each thumbnail</li>
              <li>Container padding: 16px on all sides</li>
              <li>Gap between thumbnails: 16px</li>
              <li>Active thumbnail: 2px blue20 border</li>
              <li>No background fill on grid container</li>
              <li>Responsive: Thumbnails scale with container width</li>
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
{`import { ImageGrid } from './components/ImageGrid'
import { useState } from 'react'

function MyComponent() {
  const [activeIndex, setActiveIndex] = useState(0)

  const images = [
    { src: '/image1.jpg', alt: 'Image 1' },
    { src: '/image2.jpg', alt: 'Image 2' },
    { src: '/image3.jpg', alt: 'Image 3' },
    { src: '/image4.jpg', alt: 'Image 4' },
    { src: '/image5.jpg', alt: 'Image 5' }
  ]

  return (
    <ImageGrid
      images={images}
      activeIndex={activeIndex}
      onThumbnailClick={setActiveIndex}
      columnsPerRow={5}
    />
  )
}`}
        </pre>
      </section>
    </div>
  )
}
