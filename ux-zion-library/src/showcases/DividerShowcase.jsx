import { Divider } from '../components/Divider'
import { Card } from '../components/Card'

/**
 * Divider Showcase
 *
 * Displays the Divider component with documentation and interactive examples
 */
export const DividerShowcase = () => {
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
          Divider
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          A simple divider line component for separating content. Features a 1px line in transparentGray10.
          Optionally supports centered labels with paragraph.xs typography in transparentGray80 with 16px spacing.
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
                    orientation
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  'horizontal' | 'vertical'
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  'horizontal'
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Orientation of the divider line
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    label
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  string
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  -
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Optional label text to display in the divider
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

        {/* Horizontal Divider */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Horizontal Divider (Default)
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            A horizontal line for separating content vertically.
          </p>
          <Card size="sm" variant="elevated">
            <div style={{ padding: '16px' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#374151' }}>
                Content above divider
              </p>
            </div>
            <Divider />
            <div style={{ padding: '16px' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#374151' }}>
                Content below divider
              </p>
            </div>
          </Card>
        </div>

        {/* Vertical Divider */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Vertical Divider
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            A vertical line for separating content horizontally.
          </p>
          <Card size="sm" variant="elevated">
            <div style={{ display: 'flex', alignItems: 'center', height: '100px' }}>
              <div style={{ flex: 1, padding: '16px' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#374151' }}>
                  Content on left
                </p>
              </div>
              <Divider orientation="vertical" />
              <div style={{ flex: 1, padding: '16px' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#374151' }}>
                  Content on right
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Divider with Label */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Divider with Label
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            A horizontal divider with a centered label. Uses paragraph.xs typography with transparentGray80 color and 16px spacing.
          </p>
          <Card size="sm" variant="elevated">
            <div style={{ padding: '16px' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#374151' }}>
                Content above divider
              </p>
            </div>
            <Divider label="OR" />
            <div style={{ padding: '16px' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#374151' }}>
                Content below divider
              </p>
            </div>
          </Card>
        </div>

        {/* Vertical Divider with Label */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Vertical Divider with Label
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            A vertical divider with a centered label.
          </p>
          <Card size="sm" variant="elevated">
            <div style={{ display: 'flex', alignItems: 'center', height: '150px' }}>
              <div style={{ flex: 1, padding: '16px' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#374151' }}>
                  Content on left
                </p>
              </div>
              <Divider orientation="vertical" label="OR" />
              <div style={{ flex: 1, padding: '16px' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#374151' }}>
                  Content on right
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Multiple Sections */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Multiple Sections with Labels
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            Using labeled dividers to separate multiple sections.
          </p>
          <Card size="sm" variant="elevated">
            <div style={{ padding: '16px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600, color: '#111827' }}>
                Personal Information
              </h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                First section content
              </p>
            </div>
            <Divider label="Contact Details" />
            <div style={{ padding: '16px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600, color: '#111827' }}>
                Email and Phone
              </h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                Second section content
              </p>
            </div>
            <Divider label="Address" />
            <div style={{ padding: '16px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600, color: '#111827' }}>
                Location Details
              </h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                Third section content
              </p>
            </div>
          </Card>
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
              <li>Thickness: 1px</li>
              <li>Color: transparentGray10</li>
              <li>Horizontal: Full width</li>
              <li>Vertical: Full height of container</li>
              <li>No margin by default</li>
              <li>Label typography: paragraph.xs</li>
              <li>Label color: transparentGray80</li>
              <li>Label spacing: 16px gap between label and divider lines</li>
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
{`import { Divider } from './components/Divider'

function MyComponent() {
  return (
    <div>
      {/* Simple divider */}
      <div>Content above</div>
      <Divider />
      <div>Content below</div>

      {/* Divider with label */}
      <div>Content above</div>
      <Divider label="OR" />
      <div>Content below</div>

      {/* Vertical divider with label */}
      <div style={{ display: 'flex' }}>
        <div>Left content</div>
        <Divider orientation="vertical" label="OR" />
        <div>Right content</div>
      </div>
    </div>
  )
}`}
        </pre>
      </section>
    </div>
  )
}
