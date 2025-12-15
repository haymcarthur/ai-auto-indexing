import { Card } from '../components/Card'
import { HeadingBlock } from '../components/HeadingBlock'
import { Paragraph } from '../components/Paragraph'

/**
 * Combo Card Showcase
 *
 * Displays the Card component with images,
 * demonstrating various image positions, aspect ratios, and styling options
 */
export const ComboCardShowcase = () => {
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f5f5f5' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{
          margin: 0,
          fontSize: '32px',
          fontWeight: 700,
          color: '#111827'
        }}>
          Combo Card
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          Cards with image support, featuring flexible positioning and aspect ratios.
          Images extend to the edges of the card with no padding.
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
          Image Properties
        </h2>
        <Card size="sm" variant="elevated">
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
                    image
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Image URL
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    imagePosition
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  'top' | 'bottom' | 'left' | 'right' | 'middle'
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>'top'</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Position of the image within the card
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    imageAspectRatio
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  '16:9' | '4:3' | '3:2' | '1:1' | '2:3' | '3:4' | '9:16'
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>'16:9'</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Aspect ratio for the image
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    removeOppositeMargin
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>false</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Remove content margin on opposite side of image
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      {/* Image Position Examples */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '24px'
        }}>
          Image Positions
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Top Position */}
          <div>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
              Image on top (16:9 aspect ratio)
            </p>
            <Card
              size="md"
              variant="elevated"
              image="https://placehold.co/800x450/4A90E2/FFFFFF/png?text=Top+Image"
              imagePosition="top"
              imageAspectRatio="16:9"
            >
              <HeadingBlock
                heading="Card with Top Image"
                level="h4"
                subheading="Image extends to edges of card"
              />
              <Paragraph size="sm" style={{ marginTop: '12px' }}>
                The image is positioned at the top of the card with no padding,
                extending to the edges. Content below maintains normal padding.
              </Paragraph>
            </Card>
          </div>

          {/* Bottom Position */}
          <div>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
              Image on bottom (4:3 aspect ratio)
            </p>
            <Card
              size="md"
              variant="elevated"
              image="https://placehold.co/800x600/7B68EE/FFFFFF/png?text=Bottom+Image"
              imagePosition="bottom"
              imageAspectRatio="4:3"
            >
              <HeadingBlock
                heading="Card with Bottom Image"
                level="h4"
                subheading="Content appears above the image"
              />
              <Paragraph size="sm" style={{ marginTop: '12px' }}>
                When the image is at the bottom, content appears above it with
                standard padding all around.
              </Paragraph>
            </Card>
          </div>

          {/* Left Position */}
          <div>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
              Image on left
            </p>
            <Card
              size="md"
              variant="elevated"
              image="https://placehold.co/600x400/50C878/FFFFFF/png?text=Left+Image"
              imagePosition="left"
            >
              <HeadingBlock
                heading="Card with Left Image"
                level="h4"
                subheading="Side-by-side layout"
              />
              <Paragraph size="sm" style={{ marginTop: '12px' }}>
                Left-positioned images create a side-by-side layout. The image
                takes up 50% of the card width, with content on the right.
              </Paragraph>
            </Card>
          </div>

          {/* Right Position */}
          <div>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
              Image on right
            </p>
            <Card
              size="md"
              variant="elevated"
              image="https://placehold.co/600x400/FF6B6B/FFFFFF/png?text=Right+Image"
              imagePosition="right"
            >
              <HeadingBlock
                heading="Card with Right Image"
                level="h4"
                subheading="Content on the left side"
              />
              <Paragraph size="sm" style={{ marginTop: '12px' }}>
                Right-positioned images place content on the left and the image
                on the right, taking up 50% of the card width.
              </Paragraph>
            </Card>
          </div>

          {/* Middle Position */}
          <div>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
              Image in middle (1:1 aspect ratio)
            </p>
            <Card
              size="md"
              variant="elevated"
              image="https://placehold.co/800x800/FFA500/FFFFFF/png?text=Middle+Image"
              imagePosition="middle"
              imageAspectRatio="1:1"
            >
              <HeadingBlock
                heading="Card with Middle Image"
                level="h4"
                subheading="Content wraps around the image"
              />
              <Paragraph size="sm" style={{ marginTop: '12px' }}>
                Middle positioning places the image between content sections,
                useful for breaking up long content blocks.
              </Paragraph>
            </Card>
          </div>
        </div>
      </section>

      {/* Remove Opposite Margin Examples */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '24px'
        }}>
          Remove Opposite Margin
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* With Margin */}
          <div>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
              With margin (default)
            </p>
            <Card
              size="sm"
              variant="outlined"
              image="https://placehold.co/800x450/9B59B6/FFFFFF/png?text=Top+Image"
              imagePosition="top"
              imageAspectRatio="16:9"
              removeOppositeMargin={false}
            >
              <HeadingBlock
                heading="Standard Padding"
                level="h5"
              />
              <Paragraph size="sm" style={{ marginTop: '8px' }}>
                Full padding on all sides of content
              </Paragraph>
            </Card>
          </div>

          {/* Without Margin */}
          <div>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
              Remove opposite margin
            </p>
            <Card
              size="sm"
              variant="outlined"
              image="https://placehold.co/800x450/9B59B6/FFFFFF/png?text=Top+Image"
              imagePosition="top"
              imageAspectRatio="16:9"
              removeOppositeMargin={true}
            >
              <HeadingBlock
                heading="No Top Padding"
                level="h5"
              />
              <Paragraph size="sm" style={{ marginTop: '8px' }}>
                Content flows directly from image
              </Paragraph>
            </Card>
          </div>
        </div>
      </section>

      {/* Aspect Ratio Examples */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '24px'
        }}>
          Image Aspect Ratios
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <Card
            size="xs"
            variant="elevated"
            image="https://placehold.co/800x450/E74C3C/FFFFFF/png?text=16:9"
            imagePosition="top"
            imageAspectRatio="16:9"
          >
            <Paragraph size="sm">16:9 - Widescreen</Paragraph>
          </Card>

          <Card
            size="xs"
            variant="elevated"
            image="https://placehold.co/800x600/3498DB/FFFFFF/png?text=4:3"
            imagePosition="top"
            imageAspectRatio="4:3"
          >
            <Paragraph size="sm">4:3 - Standard</Paragraph>
          </Card>

          <Card
            size="xs"
            variant="elevated"
            image="https://placehold.co/800x533/2ECC71/FFFFFF/png?text=3:2"
            imagePosition="top"
            imageAspectRatio="3:2"
          >
            <Paragraph size="sm">3:2 - Classic</Paragraph>
          </Card>

          <Card
            size="xs"
            variant="elevated"
            image="https://placehold.co/800x800/F39C12/FFFFFF/png?text=1:1"
            imagePosition="top"
            imageAspectRatio="1:1"
          >
            <Paragraph size="sm">1:1 - Square</Paragraph>
          </Card>

          <Card
            size="xs"
            variant="elevated"
            image="https://placehold.co/600x900/9B59B6/FFFFFF/png?text=2:3"
            imagePosition="top"
            imageAspectRatio="2:3"
          >
            <Paragraph size="sm">2:3 - Portrait</Paragraph>
          </Card>

          <Card
            size="xs"
            variant="elevated"
            image="https://placehold.co/600x800/1ABC9C/FFFFFF/png?text=3:4"
            imagePosition="top"
            imageAspectRatio="3:4"
          >
            <Paragraph size="sm">3:4 - Tall</Paragraph>
          </Card>
        </div>
      </section>

      {/* Variant Examples with Images */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '24px'
        }}>
          Variants with Images
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <Card
            size="sm"
            variant="elevated"
            image="https://placehold.co/800x450/34495E/FFFFFF/png?text=Elevated"
            imagePosition="top"
            imageAspectRatio="16:9"
          >
            <Paragraph size="sm">Elevated with shadow</Paragraph>
          </Card>

          <Card
            size="sm"
            variant="outlined"
            image="https://placehold.co/800x450/34495E/FFFFFF/png?text=Outlined"
            imagePosition="top"
            imageAspectRatio="16:9"
          >
            <Paragraph size="sm">Outlined with border</Paragraph>
          </Card>

          <Card
            size="sm"
            variant="none"
            image="https://placehold.co/800x450/34495E/FFFFFF/png?text=None"
            imagePosition="top"
            imageAspectRatio="16:9"
          >
            <Paragraph size="sm">Plain with no styling</Paragraph>
          </Card>
        </div>
      </section>

      {/* Code Examples */}
      <section>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Code Examples
        </h2>
        <Card size="sm" variant="elevated">
          <pre style={{
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '16px',
            overflowX: 'auto',
            fontSize: '13px',
            lineHeight: '1.6',
            color: '#374151',
            margin: 0
          }}>
{`import { Card } from './components/Card'

// Basic image card
<Card
  size="md"
  variant="elevated"
  image="path/to/image.jpg"
  imagePosition="top"
  imageAspectRatio="16:9"
>
  <h3>Card with Top Image</h3>
  <p>Content below the image</p>
</Card>

// Different image positions
<Card image="image.jpg" imagePosition="top">Top</Card>
<Card image="image.jpg" imagePosition="bottom">Bottom</Card>
<Card image="image.jpg" imagePosition="left">Left</Card>
<Card image="image.jpg" imagePosition="right">Right</Card>
<Card image="image.jpg" imagePosition="middle">Middle</Card>

// Different aspect ratios
<Card image="image.jpg" imageAspectRatio="16:9">Widescreen</Card>
<Card image="image.jpg" imageAspectRatio="4:3">Standard</Card>
<Card image="image.jpg" imageAspectRatio="1:1">Square</Card>
<Card image="image.jpg" imageAspectRatio="2:3">Portrait</Card>
<Card image="image.jpg" imageAspectRatio="3:4">Tall</Card>
<Card image="image.jpg" imageAspectRatio="9:16">Vertical</Card>

// Remove opposite margin (content flows from image)
<Card
  image="image.jpg"
  imagePosition="top"
  removeOppositeMargin={true}
>
  <h3>Content flows directly from image</h3>
  <p>No top padding on content</p>
</Card>

// Combine with all card options
<Card
  size="lg"
  variant="outlined"
  image="image.jpg"
  imagePosition="left"
  imageAspectRatio="4:3"
  removeOppositeMargin={false}
>
  <HeadingBlock
    heading="Full Featured Image Card"
    level="h3"
    subheading="All options combined"
  />
  <Paragraph>Your content here</Paragraph>
</Card>`}
          </pre>
        </Card>
      </section>
    </div>
  )
}
