import { elevation } from '../tokens/elevation'

/**
 * Elevation Showcase
 *
 * Displays the elevation tokens with visual examples and usage documentation
 */
export const ElevationShowcase = () => {
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{
          margin: 0,
          fontSize: '32px',
          fontWeight: 700,
          color: '#111827'
        }}>
          Elevation
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          Box shadow tokens for creating depth and elevation in the UI. Higher numbers indicate greater elevation from the surface.
        </p>
      </div>

      {/* Elevation Tokens Section */}
      <section style={{ marginBottom: '48px', paddingBottom: '48px', borderBottom: '2px solid #e5e7eb' }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Elevation Tokens
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6',
          marginBottom: '32px'
        }}>
          Import from <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>../tokens/elevation</code>
        </p>

        {/* Visual Examples */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px',
          marginBottom: '40px'
        }}>
          {[1, 2, 4, 8].map((level) => (
            <div key={level}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                padding: '40px',
                boxShadow: elevation[level],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '150px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#111827',
                    marginBottom: '4px'
                  }}>
                    Elevation {level}
                  </div>
                  <code style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    backgroundColor: '#f3f4f6',
                    padding: '2px 6px',
                    borderRadius: '3px'
                  }}>
                    elevation.{level}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Specifications Table */}
        <h3 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Specifications
        </h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #e5e7eb',
          fontSize: '14px',
          marginBottom: '24px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                borderBottom: '1px solid #e5e7eb',
                fontWeight: 600,
                color: '#374151',
                width: '120px'
              }}>Token</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                borderBottom: '1px solid #e5e7eb',
                fontWeight: 600,
                color: '#374151'
              }}>Box Shadow Value</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                borderBottom: '1px solid #e5e7eb',
                fontWeight: 600,
                color: '#374151',
                width: '200px'
              }}>Common Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  elevation.1
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280', fontSize: '12px', fontFamily: 'monospace' }}>
                0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.20)
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Buttons, DialogOverlay
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  elevation.2
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280', fontSize: '12px', fontFamily: 'monospace' }}>
                0 1px 5px 0 rgba(0, 0, 0, 0.20), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Cards, raised surfaces
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  elevation.4
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280', fontSize: '12px', fontFamily: 'monospace' }}>
                0 2px 4px -1px rgba(0, 0, 0, 0.20), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12)
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                InfoSheet, dropdowns
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  elevation.8
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280', fontSize: '12px', fontFamily: 'monospace' }}>
                0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 5px 5px -3px rgba(0, 0, 0, 0.20)
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                QuickGlanceOverlay, modals
              </td>
            </tr>
          </tbody>
        </table>

        {/* Usage Example */}
        <div style={{
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          padding: '24px',
          marginTop: '32px'
        }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '12px'
          }}>
            Usage Example
          </h4>
          <pre style={{
            margin: 0,
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '13px',
            lineHeight: '1.6',
            color: '#374151',
            overflowX: 'auto'
          }}>
{`import { elevation } from '../tokens/elevation'

// Apply elevation to a component
const cardStyles = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '24px',
  boxShadow: elevation[2]
}

// Use in JSX
<div style={cardStyles}>
  Card content with elevation
</div>

// Different elevation levels
<button style={{ boxShadow: elevation[1] }}>Button</button>
<div style={{ boxShadow: elevation[4] }}>InfoSheet</div>
<div style={{ boxShadow: elevation[8] }}>Modal</div>`}
          </pre>
        </div>
      </section>

      {/* Interactive Comparison */}
      <section>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Side-by-Side Comparison
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '24px'
        }}>
          Compare all elevation levels at once to see the progression of depth
        </p>
        <div style={{
          display: 'flex',
          gap: '24px',
          padding: '40px',
          backgroundColor: '#f3f4f6',
          borderRadius: '8px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {[1, 2, 4, 8].map((level) => (
            <div key={level} style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              padding: '32px 24px',
              boxShadow: elevation[level],
              minWidth: '120px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '32px',
                fontWeight: 700,
                color: '#111827',
                marginBottom: '4px'
              }}>
                {level}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#6b7280'
              }}>
                elevation.{level}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
