import { useState } from 'react'
import { TooltipOverlay, useTooltip } from '../components/TooltipOverlay'
import { Card } from '../components/Card'
import { Button } from '../components/Button'

/**
 * TooltipOverlay Showcase
 *
 * Displays the TooltipOverlay component with documentation and interactive examples
 */
export const TooltipOverlayShowcase = () => {
  const tooltip1 = useTooltip()
  const tooltip2 = useTooltip()
  const tooltip3 = useTooltip()

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
          Tooltip Overlay
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          Tooltip overlay components for displaying helpful text on hover.
          Features gray100 fill with gray00 text (Body A), 4px corner radius, 8px horizontal and 2px vertical padding.
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
                    children
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>node</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Tooltip content text
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    position
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>'top'</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Tooltip position: 'top', 'bottom', 'left', 'right'
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    visible
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>false</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Control tooltip visibility
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

        {/* Basic Tooltip */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Basic Tooltip
          </h3>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', padding: '40px' }}>
            <div style={{ position: 'relative' }}>
              <Button
                onMouseEnter={tooltip1.showTooltip}
                onMouseLeave={tooltip1.hideTooltip}
              >
                Hover me
              </Button>
              {tooltip1.isVisible && (
                <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px' }}>
                  <TooltipOverlay visible={tooltip1.isVisible}>
                    This is a tooltip
                  </TooltipOverlay>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Multiple Tooltips */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Multiple Tooltips
          </h3>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', padding: '40px' }}>
            <div style={{ position: 'relative' }}>
              <Button
                onMouseEnter={tooltip2.showTooltip}
                onMouseLeave={tooltip2.hideTooltip}
                emphasis="low"
              >
                Button 1
              </Button>
              {tooltip2.isVisible && (
                <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px' }}>
                  <TooltipOverlay visible={tooltip2.isVisible}>
                    Tooltip for Button 1
                  </TooltipOverlay>
                </div>
              )}
            </div>

            <div style={{ position: 'relative' }}>
              <Button
                onMouseEnter={tooltip3.showTooltip}
                onMouseLeave={tooltip3.hideTooltip}
                emphasis="low"
              >
                Button 2
              </Button>
              {tooltip3.isVisible && (
                <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px' }}>
                  <TooltipOverlay visible={tooltip3.isVisible}>
                    Tooltip for Button 2
                  </TooltipOverlay>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Static Examples */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Static Examples
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            <div>
              <TooltipOverlay visible={true}>
                Short tooltip
              </TooltipOverlay>
            </div>
            <div>
              <TooltipOverlay visible={true}>
                This is a longer tooltip with more text
              </TooltipOverlay>
            </div>
            <div>
              <TooltipOverlay visible={true}>
                Helpful information
              </TooltipOverlay>
            </div>
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
{`import { TooltipOverlay, useTooltip } from './components/TooltipOverlay'

function MyComponent() {
  const tooltip = useTooltip()

  return (
    <div style={{ position: 'relative' }}>
      <button
        onMouseEnter={tooltip.showTooltip}
        onMouseLeave={tooltip.hideTooltip}
      >
        Hover me
      </button>
      {tooltip.isVisible && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px'
        }}>
          <TooltipOverlay visible={tooltip.isVisible}>
            This is a tooltip
          </TooltipOverlay>
        </div>
      )}
    </div>
  )
}`}
        </pre>
      </section>
    </div>
  )
}
