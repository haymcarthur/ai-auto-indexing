import { Card } from '../components/Card'
import { HeadingBlock } from '../components/HeadingBlock'
import { Paragraph } from '../components/Paragraph'

/**
 * Content Card Showcase
 *
 * Displays the Card component with documentation,
 * properties table, and interactive examples
 */
export const ContentCardShowcase = () => {
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
          Content Card
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          A container component with size variations and visual variants.
          Matches Zion UI design system.
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
                    size
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>'md'</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Card size (padding and border radius)
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    variant
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  'elevated' | 'outlined' | 'none'
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>'elevated'</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Visual variant (shadow, border, or plain)
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    children
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>node</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Card content
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      {/* Size Specifications */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Size Specifications
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
                }}>Size</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #e5e7eb',
                  fontWeight: 600,
                  color: '#374151'
                }}>Padding</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #e5e7eb',
                  fontWeight: 600,
                  color: '#374151'
                }}>Border Radius</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>xxs</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>12px</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>8px</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>xs</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>16px</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>8px</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>sm</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>26px</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>8px</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>md</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>39px</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>12px</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>lg</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>58px</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>16px</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>xl</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>86px</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>20px</td>
              </tr>
              <tr>
                <td style={{ padding: '12px' }}>xxl</td>
                <td style={{ padding: '12px', color: '#6b7280' }}>128px</td>
                <td style={{ padding: '12px', color: '#6b7280' }}>24px</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      {/* Variant Specifications */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Variant Specifications
        </h2>
        <Card size="sm" variant="elevated">
          <ul style={{
            fontSize: '14px',
            color: '#6b7280',
            lineHeight: '1.8',
            paddingLeft: '24px',
            margin: 0
          }}>
            <li><strong>elevated:</strong> Box shadow with depth (default)</li>
            <li><strong>outlined:</strong> 1px solid border (#CACDCD)</li>
            <li><strong>none:</strong> No border or shadow (plain white background)</li>
          </ul>
        </Card>
      </section>

      {/* Size Examples */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '24px'
        }}>
          Size Examples (Elevated)
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '12px'
            }}>
              XXS (12px padding, 8px radius)
            </h3>
            <Card size="xxs" variant="elevated">
              <Paragraph size="sm">Extra extra small card with minimal padding</Paragraph>
            </Card>
          </div>

          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '12px'
            }}>
              XS (16px padding, 8px radius)
            </h3>
            <Card size="xs" variant="elevated">
              <Paragraph size="sm">Extra small card with compact padding</Paragraph>
            </Card>
          </div>

          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '12px'
            }}>
              SM (26px padding, 8px radius)
            </h3>
            <Card size="sm" variant="elevated">
              <Paragraph size="sm">Small card with comfortable padding for brief content</Paragraph>
            </Card>
          </div>

          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '12px'
            }}>
              MD (39px padding, 12px radius) - Default
            </h3>
            <Card size="md" variant="elevated">
              <HeadingBlock
                heading="Medium Card"
                level="h4"
                subheading="Default size with balanced padding and radius"
              />
              <Paragraph size="sm" style={{ marginTop: '12px' }}>
                This is the default card size, perfect for most use cases with generous padding.
              </Paragraph>
            </Card>
          </div>

          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '12px'
            }}>
              LG (58px padding, 16px radius)
            </h3>
            <Card size="lg" variant="elevated">
              <HeadingBlock
                heading="Large Card"
                level="h3"
                subheading="Spacious padding for prominent content"
              />
              <Paragraph size="sm" style={{ marginTop: '12px' }}>
                Large cards provide substantial padding, making them ideal for featured content
                or sections that need extra breathing room.
              </Paragraph>
            </Card>
          </div>

          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '12px'
            }}>
              XL (86px padding, 20px radius)
            </h3>
            <Card size="xl" variant="elevated">
              <HeadingBlock
                heading="Extra Large Card"
                level="h2"
                subheading="Generous padding for hero sections"
              />
              <Paragraph size="md" style={{ marginTop: '16px' }}>
                Extra large cards offer extensive padding and larger border radius,
                perfect for hero sections or prominent page elements.
              </Paragraph>
            </Card>
          </div>

          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '12px'
            }}>
              XXL (128px padding, 24px radius)
            </h3>
            <Card size="xxl" variant="elevated">
              <HeadingBlock
                heading="Extra Extra Large Card"
                level="h2"
                subheading="Maximum padding for impactful presentations"
              />
              <Paragraph size="lg" style={{ marginTop: '20px' }}>
                The largest card size with maximum padding and radius.
                Best suited for full-page sections or dramatic focal points.
              </Paragraph>
            </Card>
          </div>
        </div>
      </section>

      {/* Variant Examples */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '24px'
        }}>
          Variant Examples (MD Size)
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '12px'
            }}>
              Elevated (Default)
            </h3>
            <Card size="md" variant="elevated">
              <HeadingBlock
                heading="Elevated Card"
                level="h4"
                subheading="With drop shadow for depth"
              />
              <Paragraph size="sm" style={{ marginTop: '12px' }}>
                The elevated variant uses a subtle box shadow to create depth and make the card
                appear to float above the page.
              </Paragraph>
            </Card>
          </div>

          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '12px'
            }}>
              Outlined
            </h3>
            <Card size="md" variant="outlined">
              <HeadingBlock
                heading="Outlined Card"
                level="h4"
                subheading="With border instead of shadow"
              />
              <Paragraph size="sm" style={{ marginTop: '12px' }}>
                The outlined variant uses a 1px border instead of a shadow, providing a cleaner,
                flatter appearance that works well in lighter designs.
              </Paragraph>
            </Card>
          </div>

          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '12px'
            }}>
              None
            </h3>
            <Card size="md" variant="none">
              <HeadingBlock
                heading="Plain Card"
                level="h4"
                subheading="No border or shadow"
              />
              <Paragraph size="sm" style={{ marginTop: '12px' }}>
                The none variant has no border or shadow, just a white background with padding.
                Useful for subtle content grouping or nested cards.
              </Paragraph>
            </Card>
          </div>
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

// Default card (MD size, elevated)
<Card>
  <h2>Card Content</h2>
  <p>Your content here</p>
</Card>

// Different sizes
<Card size="xxs">Extra extra small card</Card>
<Card size="xs">Extra small card</Card>
<Card size="sm">Small card</Card>
<Card size="md">Medium card (default)</Card>
<Card size="lg">Large card</Card>
<Card size="xl">Extra large card</Card>
<Card size="xxl">Extra extra large card</Card>

// Different variants
<Card variant="elevated">Card with shadow (default)</Card>
<Card variant="outlined">Card with border</Card>
<Card variant="none">Plain card</Card>

// Combining size and variant
<Card size="lg" variant="outlined">
  Large card with border
</Card>

// With nested components
<Card size="md" variant="elevated">
  <HeadingBlock
    heading="Card Title"
    level="h3"
    subheading="Card subtitle"
  />
  <Paragraph size="sm" style={{ marginTop: '12px' }}>
    Card content with proper typography
  </Paragraph>
</Card>`}
          </pre>
        </Card>
      </section>
    </div>
  )
}
