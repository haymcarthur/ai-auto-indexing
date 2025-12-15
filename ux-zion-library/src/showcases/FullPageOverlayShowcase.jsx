import { FullPageOverlay, useOverlay } from '../components/FullPageOverlay'
import { Button } from '../components/Button'
import { Row } from '../components/Row'
import { TextField } from '../components/TextField'
import { Info, Settings } from '../icons'
import { useState } from 'react'

/**
 * FullPageOverlay Showcase
 *
 * Displays the FullPageOverlay component with documentation,
 * properties table, and interactive examples
 */
export const FullPageOverlayShowcase = () => {
  const basicOverlay = useOverlay()
  const withSubtitleOverlay = useOverlay()
  const withBreadcrumbOverlay = useOverlay()
  const withIconButtonsOverlay = useOverlay()
  const withPrimaryButtonOverlay = useOverlay()
  const fullExampleOverlay = useOverlay()
  const [name, setName] = useState('')

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
          FullPageOverlay
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          A full-page modal overlay with header, content area, and optional footer.
          Uses Breadcrumb component, H5 heading, and SM paragraph for subtitle.
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
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #e5e7eb',
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
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>false</td>
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
                  title
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Title displayed as H5 in the header</td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  subtitle
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Optional subtitle (SM paragraph, secondary) below title</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  breadcrumb
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>array</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Optional breadcrumb items (uses Breadcrumb component) [{'{'}label, onClick{'}'}]
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  iconButtons
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>array</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>[]</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Array of icon button configs for header right side
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  primaryButton
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>object</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Optional primary button config {'{'}label, onClick{'}'}
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  footer
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>node</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Optional footer content</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  children
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>node</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Content to display in the overlay body</td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  aria-label
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Optional aria-label for accessibility</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Hook Documentation */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          useOverlay Hook
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          lineHeight: '1.6',
          marginBottom: '12px'
        }}>
          Manages overlay state. Returns an object with:
        </p>
        <ul style={{
          fontSize: '14px',
          color: '#6b7280',
          lineHeight: '1.8',
          paddingLeft: '24px'
        }}>
          <li><code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>isOpen</code> - boolean indicating if overlay is open</li>
          <li><code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>open()</code> - function to open the overlay</li>
          <li><code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>close()</code> - function to close the overlay</li>
          <li><code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>handleClick()</code> - function to toggle the overlay</li>
        </ul>
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

        {/* Example 1: Basic */}
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
            Basic Usage
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Minimal overlay with title and close button.
          </p>
          <Button onClick={basicOverlay.open}>
            Open Basic Overlay
          </Button>

          <FullPageOverlay
            {...basicOverlay}
            title="Basic Overlay"
          >
            <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
              <p>This is a basic full-page overlay with just a title and close button.</p>
              <p>Click the back arrow to close or press ESC.</p>
            </div>
          </FullPageOverlay>
        </div>

        {/* Example 2: With Subtitle */}
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
            With Subtitle
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Overlay with a subtitle below the title.
          </p>
          <Button onClick={withSubtitleOverlay.open}>
            Open With Subtitle
          </Button>

          <FullPageOverlay
            {...withSubtitleOverlay}
            title="Document Details"
            subtitle="1950 US Census Record"
          >
            <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
              <p>This overlay includes a subtitle that provides additional context.</p>
            </div>
          </FullPageOverlay>
        </div>

        {/* Example 3: With Breadcrumb */}
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
            With Breadcrumb
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Overlay with breadcrumb navigation above the title.
          </p>
          <Button onClick={withBreadcrumbOverlay.open}>
            Open With Breadcrumb
          </Button>

          <FullPageOverlay
            {...withBreadcrumbOverlay}
            title="Record Details"
            breadcrumb={[
              { label: 'Home', onClick: () => alert('Home clicked') },
              { label: 'Census Records', onClick: () => alert('Census clicked') },
              { label: 'Details' }
            ]}
          >
            <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
              <p>This overlay has a breadcrumb trail showing the navigation hierarchy.</p>
              <p>Breadcrumb items can be clickable links.</p>
            </div>
          </FullPageOverlay>
        </div>

        {/* Example 4: With Icon Buttons */}
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
            With Icon Buttons
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Overlay with icon buttons in the header (far right).
          </p>
          <Button onClick={withIconButtonsOverlay.open}>
            Open With Icon Buttons
          </Button>

          <FullPageOverlay
            {...withIconButtonsOverlay}
            title="Image Viewer"
            iconButtons={[
              {
                icon: Info,
                label: 'Info',
                onClick: () => alert('Info clicked!')
              },
              {
                icon: Settings,
                label: 'Settings',
                onClick: () => alert('Settings clicked!')
              }
            ]}
          >
            <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
              <p>This overlay has icon buttons on the far right of the header.</p>
              <p>Try clicking the Info and Settings icons in the header.</p>
            </div>
          </FullPageOverlay>
        </div>

        {/* Example 5: With Primary Button */}
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
            With Primary Button
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Overlay with a primary action button in the header.
          </p>
          <Button onClick={withPrimaryButtonOverlay.open}>
            Open With Primary Button
          </Button>

          <FullPageOverlay
            {...withPrimaryButtonOverlay}
            title="Edit Document"
            primaryButton={{
              label: 'Save',
              onClick: () => {
                alert('Saved!')
                withPrimaryButtonOverlay.close()
              }
            }}
          >
            <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
              <p>This overlay has a primary "Save" button in the header.</p>
              <p>Primary actions can be placed in the header for quick access.</p>
            </div>
          </FullPageOverlay>
        </div>

        {/* Example 6: Full Example */}
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
            Full Example
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Complete overlay with all features: breadcrumb, subtitle, icon buttons, primary button, and footer.
          </p>
          <Button onClick={fullExampleOverlay.open}>
            Open Full Example
          </Button>

          <FullPageOverlay
            {...fullExampleOverlay}
            title="Document Editor"
            subtitle="1950 US Census - Glendale"
            breadcrumb={[
              { label: 'Home', onClick: () => alert('Home') },
              { label: 'Documents', onClick: () => alert('Documents') },
              { label: 'Editor' }
            ]}
            iconButtons={[
              {
                icon: Info,
                label: 'Info',
                onClick: () => alert('Info')
              },
              {
                icon: Settings,
                label: 'Settings',
                onClick: () => alert('Settings')
              }
            ]}
            primaryButton={{
              label: 'Save',
              onClick: () => {
                alert('Form Submitted!')
                fullExampleOverlay.close()
              }
            }}
            footer={
              <Row alignX="end" gap={2}>
                <Button variant="blue" emphasis="low" onClick={fullExampleOverlay.close}>
                  Cancel
                </Button>
                <Button variant="blue" onClick={() => {
                  alert('Form Submitted!')
                  fullExampleOverlay.close()
                }}>
                  Submit
                </Button>
              </Row>
            }
          >
            <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
              <h2 style={{ marginTop: 0 }}>Complete Example</h2>
              <p>This demonstrates a complete overlay with all features:</p>
              <ul>
                <li>Close button (back arrow)</li>
                <li>Breadcrumb navigation</li>
                <li>Title and subtitle</li>
                <li>Icon buttons (Info, Settings)</li>
                <li>Primary button (Save)</li>
                <li>Footer with action buttons</li>
                <li>ESC key to close</li>
                <li>Body scroll lock</li>
              </ul>
              <div style={{ marginTop: '24px' }}>
                <TextField
                  label="Name:"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                />
              </div>
            </div>
          </FullPageOverlay>
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
{`import { FullPageOverlay, useOverlay } from './components/FullPageOverlay'
import { Button, Row } from './components'
import { Info, Settings } from './icons'

const MyComponent = () => {
  const overlay = useOverlay()

  return (
    <>
      <Button onClick={overlay.open}>
        Open Overlay
      </Button>

      <FullPageOverlay
        {...overlay}
        title="My Overlay"
        subtitle="Optional subtitle"
        breadcrumb={[
          { label: 'Home', onClick: () => {} },
          { label: 'Details' }
        ]}
        iconButtons={[
          { icon: Info, label: 'Info', onClick: () => {} },
          { icon: Settings, label: 'Settings', onClick: () => {} }
        ]}
        primaryButton={{
          label: 'Save',
          onClick: overlay.close
        }}
        footer={
          <Row alignX="end" gap={2}>
            <Button variant="blue" onClick={overlay.close}>
              Submit
            </Button>
            <Button variant="gray" onClick={overlay.close}>
              Cancel
            </Button>
          </Row>
        }
      >
        <div style={{ padding: '24px' }}>
          Your content here
        </div>
      </FullPageOverlay>
    </>
  )
}`}
        </pre>
      </section>
    </div>
  )
}
