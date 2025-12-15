import { Breadcrumb } from '../components/Breadcrumb'

/**
 * Breadcrumb Showcase
 *
 * Displays the Breadcrumb component with documentation,
 * properties table, and interactive examples
 */
export const BreadcrumbShowcase = () => {
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
          Breadcrumb
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          A breadcrumb navigation component for showing the current page's location.
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
                  items
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                array
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Array of breadcrumb items: [{'{'}label, onClick{'}'}]
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: '16px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '8px'
          }}>
            Item Object
          </h3>
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
                }}>Property</th>
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
                }}>Required</th>
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
                    label
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Yes</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Display text for the breadcrumb item
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    onClick
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>function</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>No</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Optional click handler (not used for last/active item)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Specifications */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Specifications
        </h2>
        <ul style={{
          fontSize: '14px',
          color: '#6b7280',
          lineHeight: '1.8',
          paddingLeft: '24px',
          marginBottom: '24px'
        }}>
          <li>Typography: XS paragraph (Noto Sans, 12px, Regular)</li>
          <li>Color: #202121</li>
          <li>Separator: › (single right-pointing angle quotation mark)</li>
          <li>Separator spacing: 3px from left item, 12px from right item</li>
          <li>Past items: Underlined and clickable (if onClick provided)</li>
          <li>Active item (last): Not underlined, not clickable</li>
          <li>Hover: Slight opacity change on clickable items</li>
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

        {/* Basic Example */}
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
            Basic Breadcrumb
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Simple breadcrumb with clickable past items.
          </p>
          <Breadcrumb
            items={[
              { label: 'Home', onClick: () => alert('Navigate to Home') },
              { label: 'Documents', onClick: () => alert('Navigate to Documents') },
              { label: 'Current Page' }
            ]}
          />
        </div>

        {/* Two Levels */}
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
            Two Levels
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Breadcrumb with two levels.
          </p>
          <Breadcrumb
            items={[
              { label: 'Home', onClick: () => alert('Navigate to Home') },
              { label: 'Current Page' }
            ]}
          />
        </div>

        {/* Deep Navigation */}
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
            Deep Navigation
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Breadcrumb with multiple levels showing deep navigation.
          </p>
          <Breadcrumb
            items={[
              { label: 'Home', onClick: () => alert('Navigate to Home') },
              { label: 'Census Records', onClick: () => alert('Navigate to Census Records') },
              { label: '1950 Census', onClick: () => alert('Navigate to 1950 Census') },
              { label: 'California', onClick: () => alert('Navigate to California') },
              { label: 'Glendale', onClick: () => alert('Navigate to Glendale') },
              { label: 'Record Details' }
            ]}
          />
        </div>

        {/* Census Example */}
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
            Census Navigation Example
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Real-world example for census record navigation.
          </p>
          <Breadcrumb
            items={[
              { label: 'Home', onClick: () => alert('Navigate to Home') },
              { label: 'Census', onClick: () => alert('Navigate to Census') },
              { label: '1950 US Census', onClick: () => alert('Navigate to 1950 US Census') },
              { label: 'John Smith' }
            ]}
          />
        </div>

        {/* Without Click Handlers */}
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
            Without Click Handlers
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Breadcrumb items without onClick handlers are still underlined but not clickable.
          </p>
          <Breadcrumb
            items={[
              { label: 'Home' },
              { label: 'Documents' },
              { label: 'Current Page' }
            ]}
          />
        </div>

        {/* Single Item */}
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
            Single Item (Root Level)
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Breadcrumb with only one item (no separator).
          </p>
          <Breadcrumb
            items={[
              { label: 'Home' }
            ]}
          />
        </div>

        {/* Long Labels */}
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
            Long Labels
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Breadcrumb with longer text labels.
          </p>
          <Breadcrumb
            items={[
              { label: 'United States Census Bureau', onClick: () => alert('Navigate to Census Bureau') },
              { label: 'Historical Census Records', onClick: () => alert('Navigate to Historical') },
              { label: 'Nineteen Fifty United States Federal Census', onClick: () => alert('Navigate to 1950 Census') },
              { label: 'Detailed Individual Record Information' }
            ]}
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
{`import { Breadcrumb } from './components/Breadcrumb'

// Basic breadcrumb with clickable items
<Breadcrumb
  items={[
    { label: 'Home', onClick: () => navigate('/') },
    { label: 'Documents', onClick: () => navigate('/documents') },
    { label: 'Current Page' }
  ]}
/>

// Two levels
<Breadcrumb
  items={[
    { label: 'Home', onClick: () => navigate('/') },
    { label: 'Current Page' }
  ]}
/>

// Deep navigation
<Breadcrumb
  items={[
    { label: 'Home', onClick: () => navigate('/') },
    { label: 'Census Records', onClick: () => navigate('/census') },
    { label: '1950 Census', onClick: () => navigate('/census/1950') },
    { label: 'California', onClick: () => navigate('/census/1950/california') },
    { label: 'Record Details' }
  ]}
/>

// Without click handlers (static)
<Breadcrumb
  items={[
    { label: 'Home' },
    { label: 'Documents' },
    { label: 'Current Page' }
  ]}
/>

// Single item (root level)
<Breadcrumb
  items={[
    { label: 'Home' }
  ]}
/>`}
        </pre>
      </section>
    </div>
  )
}
