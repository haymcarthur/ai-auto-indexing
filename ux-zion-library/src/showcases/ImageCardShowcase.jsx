import { ImageCard } from '../components/ImageCard'
import { Card } from '../components/Card'

/**
 * Image Card Showcase
 *
 * Displays the ImageCard component (image-only, edge-to-edge)
 * with various sizes, variants, and aspect ratios
 */
export const ImageCardShowcase = () => {
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
          Image Card
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          Image-only cards that display images edge-to-edge with no content padding.
          Perfect for image galleries and visual content.
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
                    image
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>required</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Image URL
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
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
                  Card size (controls border radius)
                </td>
              </tr>
              <tr>
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
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    aspectRatio
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
            </tbody>
          </table>
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
          Size Examples
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '16px'
        }}>
          Different sizes control the border radius. All sizes use 16:9 aspect ratio.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '8px'
            }}>
              XXS (8px radius)
            </h3>
            <ImageCard
              image="https://placehold.co/800x450/4A90E2/FFFFFF/png?text=XXS"
              size="xxs"
              aspectRatio="16:9"
            />
          </div>

          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '8px'
            }}>
              XS (8px radius)
            </h3>
            <ImageCard
              image="https://placehold.co/800x450/7B68EE/FFFFFF/png?text=XS"
              size="xs"
              aspectRatio="16:9"
            />
          </div>

          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '8px'
            }}>
              SM (8px radius)
            </h3>
            <ImageCard
              image="https://placehold.co/800x450/50C878/FFFFFF/png?text=SM"
              size="sm"
              aspectRatio="16:9"
            />
          </div>

          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '8px'
            }}>
              MD (12px radius) - Default
            </h3>
            <ImageCard
              image="https://placehold.co/800x450/FF6B6B/FFFFFF/png?text=MD"
              size="md"
              aspectRatio="16:9"
            />
          </div>

          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '8px'
            }}>
              LG (16px radius)
            </h3>
            <ImageCard
              image="https://placehold.co/800x450/FFA500/FFFFFF/png?text=LG"
              size="lg"
              aspectRatio="16:9"
            />
          </div>

          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '8px'
            }}>
              XL (20px radius)
            </h3>
            <ImageCard
              image="https://placehold.co/800x450/9B59B6/FFFFFF/png?text=XL"
              size="xl"
              aspectRatio="16:9"
            />
          </div>

          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '8px'
            }}>
              XXL (24px radius)
            </h3>
            <ImageCard
              image="https://placehold.co/800x450/E74C3C/FFFFFF/png?text=XXL"
              size="xxl"
              aspectRatio="16:9"
            />
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
          Variant Examples
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '8px'
            }}>
              Elevated (Default)
            </h3>
            <ImageCard
              image="https://placehold.co/800x450/3498DB/FFFFFF/png?text=Elevated"
              size="md"
              variant="elevated"
              aspectRatio="16:9"
            />
          </div>

          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '8px'
            }}>
              Outlined
            </h3>
            <ImageCard
              image="https://placehold.co/800x450/2ECC71/FFFFFF/png?text=Outlined"
              size="md"
              variant="outlined"
              aspectRatio="16:9"
            />
          </div>

          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '8px'
            }}>
              None
            </h3>
            <ImageCard
              image="https://placehold.co/800x450/F39C12/FFFFFF/png?text=None"
              size="md"
              variant="none"
              aspectRatio="16:9"
            />
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
          Aspect Ratio Examples
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '8px'
            }}>
              16:9 - Widescreen
            </h3>
            <ImageCard
              image="https://placehold.co/800x450/E74C3C/FFFFFF/png?text=16:9"
              size="sm"
              aspectRatio="16:9"
            />
          </div>

          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '8px'
            }}>
              4:3 - Standard
            </h3>
            <ImageCard
              image="https://placehold.co/800x600/3498DB/FFFFFF/png?text=4:3"
              size="sm"
              aspectRatio="4:3"
            />
          </div>

          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '8px'
            }}>
              3:2 - Classic
            </h3>
            <ImageCard
              image="https://placehold.co/800x533/2ECC71/FFFFFF/png?text=3:2"
              size="sm"
              aspectRatio="3:2"
            />
          </div>

          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '8px'
            }}>
              1:1 - Square
            </h3>
            <ImageCard
              image="https://placehold.co/800x800/F39C12/FFFFFF/png?text=1:1"
              size="sm"
              aspectRatio="1:1"
            />
          </div>

          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '8px'
            }}>
              2:3 - Portrait
            </h3>
            <ImageCard
              image="https://placehold.co/600x900/9B59B6/FFFFFF/png?text=2:3"
              size="sm"
              aspectRatio="2:3"
            />
          </div>

          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '8px'
            }}>
              3:4 - Tall
            </h3>
            <ImageCard
              image="https://placehold.co/600x800/1ABC9C/FFFFFF/png?text=3:4"
              size="sm"
              aspectRatio="3:4"
            />
          </div>

          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '8px'
            }}>
              9:16 - Vertical
            </h3>
            <ImageCard
              image="https://placehold.co/450x800/34495E/FFFFFF/png?text=9:16"
              size="sm"
              aspectRatio="9:16"
            />
          </div>
        </div>
      </section>

      {/* Gallery Example */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '24px'
        }}>
          Gallery Example
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '16px'
        }}>
          Image cards are perfect for creating image galleries.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <ImageCard
            image="https://placehold.co/600x400/FF6B6B/FFFFFF/png?text=1"
            size="xs"
            aspectRatio="3:2"
          />
          <ImageCard
            image="https://placehold.co/600x400/4ECDC4/FFFFFF/png?text=2"
            size="xs"
            aspectRatio="3:2"
          />
          <ImageCard
            image="https://placehold.co/600x400/45B7D1/FFFFFF/png?text=3"
            size="xs"
            aspectRatio="3:2"
          />
          <ImageCard
            image="https://placehold.co/600x400/96CEB4/FFFFFF/png?text=4"
            size="xs"
            aspectRatio="3:2"
          />
          <ImageCard
            image="https://placehold.co/600x400/FFEAA7/FFFFFF/png?text=5"
            size="xs"
            aspectRatio="3:2"
          />
          <ImageCard
            image="https://placehold.co/600x400/DFE6E9/000000/png?text=6"
            size="xs"
            aspectRatio="3:2"
          />
          <ImageCard
            image="https://placehold.co/600x400/74B9FF/FFFFFF/png?text=7"
            size="xs"
            aspectRatio="3:2"
          />
          <ImageCard
            image="https://placehold.co/600x400/A29BFE/FFFFFF/png?text=8"
            size="xs"
            aspectRatio="3:2"
          />
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
{`import { ImageCard } from './components/ImageCard'

// Basic image card
<ImageCard
  image="path/to/image.jpg"
  size="md"
  variant="elevated"
  aspectRatio="16:9"
/>

// Different sizes
<ImageCard image="image.jpg" size="xxs" />
<ImageCard image="image.jpg" size="xs" />
<ImageCard image="image.jpg" size="sm" />
<ImageCard image="image.jpg" size="md" />
<ImageCard image="image.jpg" size="lg" />
<ImageCard image="image.jpg" size="xl" />
<ImageCard image="image.jpg" size="xxl" />

// Different variants
<ImageCard image="image.jpg" variant="elevated" />
<ImageCard image="image.jpg" variant="outlined" />
<ImageCard image="image.jpg" variant="none" />

// Different aspect ratios
<ImageCard image="image.jpg" aspectRatio="16:9" />
<ImageCard image="image.jpg" aspectRatio="4:3" />
<ImageCard image="image.jpg" aspectRatio="3:2" />
<ImageCard image="image.jpg" aspectRatio="1:1" />
<ImageCard image="image.jpg" aspectRatio="2:3" />
<ImageCard image="image.jpg" aspectRatio="3:4" />
<ImageCard image="image.jpg" aspectRatio="9:16" />

// Gallery grid
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
  <ImageCard image="image1.jpg" size="xs" aspectRatio="3:2" />
  <ImageCard image="image2.jpg" size="xs" aspectRatio="3:2" />
  <ImageCard image="image3.jpg" size="xs" aspectRatio="3:2" />
  <ImageCard image="image4.jpg" size="xs" aspectRatio="3:2" />
</div>`}
          </pre>
        </Card>
      </section>
    </div>
  )
}
