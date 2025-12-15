import { QuickGlanceOverlay, useQuickGlance } from '../components/QuickGlanceOverlay'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Paragraph } from '../components/Paragraph'
import { DataBlock } from '../components/DataBlock'
import { Header } from '../components/Header'
import { colors } from '../tokens/colors'
import { body } from '../tokens/typography'

/**
 * QuickGlanceOverlay Showcase
 *
 * Displays the QuickGlanceOverlay component with documentation,
 * properties table, and interactive examples
 */
export const QuickGlanceOverlayShowcase = () => {
  const bottomOverlay = useQuickGlance()
  const topOverlay = useQuickGlance()
  const leftOverlay = useQuickGlance()
  const rightOverlay = useQuickGlance()
  const smallOverlay = useQuickGlance()
  const largeOverlay = useQuickGlance()
  const dataOverlay = useQuickGlance()
  const richContentOverlay = useQuickGlance()

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
          QuickGlanceOverlay
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          A popover overlay that can be anchored to any element on the page.
          No header or footer, just flexible content. Matches Zion UI design system.
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
                    isOpen
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Whether the overlay is open</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    close
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>function</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Function to close the overlay</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    anchorRef
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>ref</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Ref to the element to anchor to</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    position
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  'top' | 'bottom' | 'left' | 'right'
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>'bottom'</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Position relative to anchor</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    offset
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>number</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>8</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Distance from anchor in pixels</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    width
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>'auto'</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Optional width (e.g., '200px')</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    maxWidth
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>'none'</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Optional max-width</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    children
                  </code>
                </td>
                <td style={{ padding: '12px', color: '#6b7280' }}>node</td>
                <td style={{ padding: '12px', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', color: '#6b7280' }}>Overlay content</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      {/* Hook Documentation */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          useQuickGlance Hook
        </h2>
        <Card size="sm" variant="elevated">
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            lineHeight: '1.6',
            marginBottom: '12px'
          }}>
            Manages overlay state and provides an anchor ref. Returns an object with:
          </p>
          <ul style={{
            fontSize: '14px',
            color: '#6b7280',
            lineHeight: '1.8',
            paddingLeft: '24px',
            margin: 0
          }}>
            <li><code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>isOpen</code> - boolean indicating if overlay is open</li>
            <li><code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>open()</code> - function to open the overlay</li>
            <li><code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>close()</code> - function to close the overlay</li>
            <li><code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>handleClick()</code> - function to toggle the overlay</li>
            <li><code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>anchorRef</code> - ref to attach to the anchor element</li>
          </ul>
        </Card>
      </section>

      {/* Examples */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '24px'
        }}>
          Examples
        </h2>

        {/* Position Examples */}
        <div style={{
          marginBottom: '32px',
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '12px'
          }}>
            Position Variants
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '24px'
          }}>
            Overlay can be positioned on any side of the anchor element.
          </p>

          <div style={{
            display: 'flex',
            gap: '100px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '40px'
          }}>
            <div>
              <Button ref={topOverlay.anchorRef} onClick={topOverlay.handleClick}>
                Top Position
              </Button>
              <QuickGlanceOverlay {...topOverlay} position="top">
                <Paragraph size="sm">Positioned above the button</Paragraph>
              </QuickGlanceOverlay>
            </div>

            <div>
              <Button ref={bottomOverlay.anchorRef} onClick={bottomOverlay.handleClick}>
                Bottom Position
              </Button>
              <QuickGlanceOverlay {...bottomOverlay} position="bottom">
                <Paragraph size="sm">Positioned below the button</Paragraph>
              </QuickGlanceOverlay>
            </div>

            <div>
              <Button ref={leftOverlay.anchorRef} onClick={leftOverlay.handleClick}>
                Left Position
              </Button>
              <QuickGlanceOverlay {...leftOverlay} position="left">
                <Paragraph size="sm">Positioned to the left</Paragraph>
              </QuickGlanceOverlay>
            </div>

            <div>
              <Button ref={rightOverlay.anchorRef} onClick={rightOverlay.handleClick}>
                Right Position
              </Button>
              <QuickGlanceOverlay {...rightOverlay} position="right">
                <Paragraph size="sm">Positioned to the right</Paragraph>
              </QuickGlanceOverlay>
            </div>
          </div>
        </div>

        {/* Size Examples */}
        <div style={{
          marginBottom: '32px',
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '12px'
          }}>
            Custom Sizes
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Overlay can be any size - it adapts to its content or you can set explicit dimensions.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <Button ref={smallOverlay.anchorRef} onClick={smallOverlay.handleClick}>
                Small Overlay
              </Button>
              <QuickGlanceOverlay {...smallOverlay} width="150px">
                <Paragraph size="sm">Small content</Paragraph>
              </QuickGlanceOverlay>
            </div>

            <div>
              <Button ref={largeOverlay.anchorRef} onClick={largeOverlay.handleClick}>
                Large Overlay
              </Button>
              <QuickGlanceOverlay {...largeOverlay} width="400px">
                <div>
                  <Paragraph size="sm" style={{ marginBottom: '8px' }}>
                    This is a larger overlay with more content. It can contain multiple
                    paragraphs and other elements.
                  </Paragraph>
                  <Paragraph size="sm">
                    The overlay will automatically position itself to stay within the viewport.
                  </Paragraph>
                </div>
              </QuickGlanceOverlay>
            </div>
          </div>
        </div>

        {/* Data Display Example */}
        <div style={{
          marginBottom: '32px',
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '12px'
          }}>
            Data Display
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Perfect for displaying quick information when hovering or clicking on elements.
          </p>

          <Button ref={dataOverlay.anchorRef} onClick={dataOverlay.handleClick}>
            View User Info
          </Button>
          <QuickGlanceOverlay {...dataOverlay} width="250px">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <DataBlock heading="Name" paragraph="John Smith" />
              <DataBlock heading="Email" paragraph="john@example.com" />
              <DataBlock heading="Status" paragraph="Active" />
              <DataBlock heading="Last Login" paragraph="2 hours ago" />
            </div>
          </QuickGlanceOverlay>
        </div>

        {/* Rich Content Example */}
        <div style={{
          marginBottom: '32px',
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '12px'
          }}>
            Rich Content
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Overlay can contain any content including images, forms, or interactive elements.
          </p>

          <Button ref={richContentOverlay.anchorRef} onClick={richContentOverlay.handleClick}>
            Open Rich Content
          </Button>
          <QuickGlanceOverlay {...richContentOverlay} width="320px">
            <div>
              <div style={{
                width: '100%',
                height: '100px',
                backgroundColor: colors.blue.blue00,
                borderRadius: '6px',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.blue.blue60,
                ...body.b
              }}>
                Image Placeholder
              </div>
              <Header level="h4" style={{ marginBottom: '8px' }}>
                Featured Product
              </Header>
              <Paragraph size="sm" style={{ marginBottom: '12px' }}>
                This overlay can contain rich content like images, headings, and action buttons.
              </Paragraph>
              <div style={{ width: '100%' }}>
                <Button size="sm" variant="blue" emphasis="high">
                  Learn More
                </Button>
              </div>
            </div>
          </QuickGlanceOverlay>
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
{`import { QuickGlanceOverlay, useQuickGlance } from '../components/QuickGlanceOverlay'
import { Button } from '../components/Button'

const MyComponent = () => {
  const overlay = useQuickGlance()

  return (
    <>
      <Button
        ref={overlay.anchorRef}
        onClick={overlay.handleClick}
      >
        Show Info
      </Button>

      <QuickGlanceOverlay
        {...overlay}
        position="bottom"
        offset={8}
        width="200px"
      >
        <p>Your content here</p>
      </QuickGlanceOverlay>
    </>
  )
}

// With multiple overlays
const MultipleOverlays = () => {
  const overlay1 = useQuickGlance()
  const overlay2 = useQuickGlance()

  return (
    <>
      <Button ref={overlay1.anchorRef} onClick={overlay1.open}>
        Button 1
      </Button>
      <QuickGlanceOverlay {...overlay1} position="top">
        Content 1
      </QuickGlanceOverlay>

      <Button ref={overlay2.anchorRef} onClick={overlay2.open}>
        Button 2
      </Button>
      <QuickGlanceOverlay {...overlay2} position="right">
        Content 2
      </QuickGlanceOverlay>
    </>
  )
}`}
          </pre>
        </Card>
      </section>
    </div>
  )
}
