import { IconButton } from '../components/IconButton'
import { Arrow, Info, Settings } from '../icons'

/**
 * IconButton Showcase
 *
 * Displays the IconButton component with documentation,
 * properties table, and interactive examples
 */
export const IconButtonShowcase = () => {
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
          IconButton
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          An icon-only circular button with size variants, emphasis levels, and color options.
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
                  icon
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                component
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Icon component to render (required)
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  variant
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                'blue' | 'gray' | 'danger'
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                'gray'
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Color variant of the button
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  emphasis
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                'low' | 'high' | 'lightHigh'
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                'low'
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Visual emphasis (transparent, solid, light solid)
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  size
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                'xs' | 'sm' | 'md' | 'lg' | 'xl'
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                'md'
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Button size (xs: 24px, sm: 28px, md: 40px, lg: 62px, xl: 88px)
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  label
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Accessibility label for screen readers (required)
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  onClick
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>function</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Click handler function
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  disabled
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>false</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Whether button is disabled
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  title
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                label value
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Tooltip text (defaults to label)
              </td>
            </tr>
          </tbody>
        </table>
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

        {/* Size Variants */}
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
            Size Variants
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Icon buttons come in five sizes: xs (24px), sm (28px), md (40px), lg (62px), xl (88px).
          </p>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <IconButton
              icon={Settings}
              label="Extra Small"
              size="xs"
              onClick={() => alert('XS clicked')}
            />
            <IconButton
              icon={Settings}
              label="Small"
              size="sm"
              onClick={() => alert('SM clicked')}
            />
            <IconButton
              icon={Settings}
              label="Medium"
              size="md"
              onClick={() => alert('MD clicked')}
            />
            <IconButton
              icon={Settings}
              label="Large"
              size="lg"
              onClick={() => alert('LG clicked')}
            />
            <IconButton
              icon={Settings}
              label="Extra Large"
              size="xl"
              onClick={() => alert('XL clicked')}
            />
          </div>
        </div>

        {/* Emphasis States - Blue */}
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
            Emphasis States - Blue
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Low (transparent), High (solid), and LightHigh (light solid) emphasis levels.
          </p>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <IconButton
              icon={Info}
              label="Low Emphasis"
              variant="blue"
              emphasis="low"
              onClick={() => alert('Low')}
            />
            <IconButton
              icon={Info}
              label="High Emphasis"
              variant="blue"
              emphasis="high"
              onClick={() => alert('High')}
            />
            <IconButton
              icon={Info}
              label="Light High Emphasis"
              variant="blue"
              emphasis="lightHigh"
              onClick={() => alert('LightHigh')}
            />
          </div>
        </div>

        {/* Emphasis States - Gray */}
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
            Emphasis States - Gray
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Gray variant with different emphasis levels.
          </p>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <IconButton
              icon={Settings}
              label="Low Emphasis"
              variant="gray"
              emphasis="low"
              onClick={() => alert('Low')}
            />
            <IconButton
              icon={Settings}
              label="High Emphasis"
              variant="gray"
              emphasis="high"
              onClick={() => alert('High')}
            />
            <IconButton
              icon={Settings}
              label="Light High Emphasis"
              variant="gray"
              emphasis="lightHigh"
              onClick={() => alert('LightHigh')}
            />
          </div>
        </div>

        {/* Emphasis States - Danger */}
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
            Emphasis States - Danger
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Danger variant for destructive actions.
          </p>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <IconButton
              icon={Arrow}
              label="Low Emphasis"
              variant="danger"
              emphasis="low"
              onClick={() => alert('Low')}
            />
            <IconButton
              icon={Arrow}
              label="High Emphasis"
              variant="danger"
              emphasis="high"
              onClick={() => alert('High')}
            />
            <IconButton
              icon={Arrow}
              label="Light High Emphasis"
              variant="danger"
              emphasis="lightHigh"
              onClick={() => alert('LightHigh')}
            />
          </div>
        </div>

        {/* Disabled State */}
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
            Disabled State
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Icon buttons can be disabled to prevent interaction.
          </p>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <IconButton
              icon={Info}
              label="Disabled Low"
              variant="blue"
              emphasis="low"
              disabled
            />
            <IconButton
              icon={Info}
              label="Disabled High"
              variant="blue"
              emphasis="high"
              disabled
            />
            <IconButton
              icon={Info}
              label="Disabled LightHigh"
              variant="blue"
              emphasis="lightHigh"
              disabled
            />
          </div>
        </div>

        {/* Interactive States */}
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
            Interactive States
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Icon buttons have hover and active states for visual feedback. Try hovering and clicking.
          </p>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <IconButton
              icon={Settings}
              label="Hover me"
              variant="blue"
              emphasis="low"
              onClick={() => {}}
            />
            <IconButton
              icon={Settings}
              label="Click me"
              variant="blue"
              emphasis="high"
              onClick={() => {}}
            />
            <IconButton
              icon={Settings}
              label="Try me"
              variant="blue"
              emphasis="lightHigh"
              onClick={() => {}}
            />
          </div>
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
{`import { IconButton } from './components/IconButton'
import { Settings, Info, Arrow } from './icons'

// Basic usage (default: gray, low emphasis, md size)
<IconButton
  icon={Settings}
  label="Settings"
  onClick={handleSettings}
/>

// Blue variant with high emphasis
<IconButton
  icon={Info}
  label="Information"
  variant="blue"
  emphasis="high"
  onClick={handleInfo}
/>

// Danger variant with lightHigh emphasis
<IconButton
  icon={Arrow}
  label="Delete"
  variant="danger"
  emphasis="lightHigh"
  onClick={handleDelete}
/>

// Different sizes
<IconButton icon={Settings} label="Extra Small" size="xs" />
<IconButton icon={Settings} label="Small" size="sm" />
<IconButton icon={Settings} label="Medium" size="md" />
<IconButton icon={Settings} label="Large" size="lg" />
<IconButton icon={Settings} label="Extra Large" size="xl" />

// Disabled state
<IconButton
  icon={Settings}
  label="Settings"
  disabled
/>`}
        </pre>
      </section>
    </div>
  )
}
