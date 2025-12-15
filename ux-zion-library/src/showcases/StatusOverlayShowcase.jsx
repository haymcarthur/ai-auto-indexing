import { useState } from 'react'
import { StatusOverlay } from '../components/StatusOverlay'
import { Card } from '../components/Card'

/**
 * StatusOverlay Showcase
 *
 * Displays the StatusOverlay component with documentation and interactive examples
 */
export const StatusOverlayShowcase = () => {
  const [showOverlay1, setShowOverlay1] = useState(true)
  const [showOverlay2, setShowOverlay2] = useState(true)
  const [showOverlay3, setShowOverlay3] = useState(true)

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
          Status Overlay
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          Status overlay components for displaying messages with optional actions and dismiss functionality.
          Features 400px width, gray90 fill with gray00 text, elevation-1, 4px corner radius. By default, all elements
          (icon, text, action, dismiss) are centered vertically on one row. With longMessage prop, icon/text/dismiss
          align to the top and action button appears at the bottom right.
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
                    message
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Status message text
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    status
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>'normal'</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Status type: 'normal', 'success', 'warning', 'error'
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    dismissible
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>false</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Show dismiss button
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    onDismiss
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>function</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Callback when dismiss is clicked
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    actionLabel
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Label for action button
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    onAction
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>function</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Callback when action is clicked
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    longMessage
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>false</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Use long message layout with action at bottom right
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

        {/* Status Variants */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Status Variants
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <StatusOverlay
              status="normal"
              message="This is a normal status message without an icon."
            />
            <StatusOverlay
              status="success"
              message="Your changes have been saved successfully."
            />
            <StatusOverlay
              status="warning"
              message="Please review your information before continuing."
            />
            <StatusOverlay
              status="error"
              message="There was an error processing your request."
            />
          </div>
        </div>

        {/* With Dismiss */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            With Dismiss
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {showOverlay1 && (
              <StatusOverlay
                status="success"
                message="Item added to your collection."
                dismissible
                onDismiss={() => setShowOverlay1(false)}
              />
            )}
            {!showOverlay1 && (
              <button
                onClick={() => setShowOverlay1(true)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#0969da',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Show Overlay
              </button>
            )}
          </div>
        </div>

        {/* With Action */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            With Action
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <StatusOverlay
              status="success"
              message="New record created successfully."
              actionLabel="View"
              onAction={() => alert('Navigating to view...')}
            />
            <StatusOverlay
              status="warning"
              message="Changes pending review."
              actionLabel="Review"
              onAction={() => alert('Opening review...')}
            />
          </div>
        </div>

        {/* With Action and Dismiss */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            With Action and Dismiss
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {showOverlay2 && (
              <StatusOverlay
                status="success"
                message="Export completed."
                actionLabel="Download"
                onAction={() => alert('Downloading...')}
                dismissible
                onDismiss={() => setShowOverlay2(false)}
              />
            )}
            {!showOverlay2 && (
              <button
                onClick={() => setShowOverlay2(true)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#0969da',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Show Overlay
              </button>
            )}
          </div>
        </div>

        {/* Long Message */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Long Message
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            When longMessage prop is true, icon, text, and dismiss align to the top, and the action button appears at the bottom right.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {showOverlay3 && (
              <StatusOverlay
                status="warning"
                message="This is a much longer status message that demonstrates how the layout adapts when the text content is too long to fit on a single line with the action buttons. The buttons will wrap to the next line and stay right-aligned."
                actionLabel="Learn More"
                onAction={() => alert('Opening documentation...')}
                dismissible
                onDismiss={() => setShowOverlay3(false)}
                longMessage
              />
            )}
            {!showOverlay3 && (
              <button
                onClick={() => setShowOverlay3(true)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#0969da',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Show Overlay
              </button>
            )}
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
{`import { StatusOverlay } from './components/StatusOverlay'

function MyComponent() {
  const [showOverlay, setShowOverlay] = useState(true)

  return (
    <>
      {/* Basic status overlay */}
      <StatusOverlay
        status="success"
        message="Operation completed successfully."
      />

      {/* With action and dismiss */}
      {showOverlay && (
        <StatusOverlay
          status="warning"
          message="Changes pending review."
          actionLabel="Review"
          onAction={() => console.log('Review clicked')}
          dismissible
          onDismiss={() => setShowOverlay(false)}
        />
      )}
    </>
  )
}`}
        </pre>
      </section>
    </div>
  )
}
