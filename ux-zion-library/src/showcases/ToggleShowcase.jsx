import { useState } from 'react'
import { Toggle } from '../components/Toggle'

/**
 * Toggle Showcase
 *
 * Displays the Toggle component with documentation,
 * properties table, and interactive examples
 */
export const ToggleShowcase = () => {
  const [toggle1, setToggle1] = useState(false)
  const [toggle2, setToggle2] = useState(true)
  const [toggle3, setToggle3] = useState(false)
  const [toggle4, setToggle4] = useState(true)
  const [toggle5, setToggle5] = useState(false)

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
          Toggle
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          A toggle switch component for enabling/disabling options.
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
                  checked
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>false</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Whether the toggle is on (checked)
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  disabled
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>false</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Whether the toggle is disabled
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  onChange
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>function</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Change handler function
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  label
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Optional label text
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

        {/* Basic Toggle */}
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
            Basic Toggle
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Toggle switches with off and on states.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Toggle
              checked={toggle1}
              onChange={setToggle1}
              label="Toggle me off/on"
            />
            <Toggle
              checked={toggle2}
              onChange={setToggle2}
              label="Currently enabled"
            />
          </div>
        </div>

        {/* Without Labels */}
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
            Without Labels
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Toggles can be used without labels.
          </p>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Toggle checked={false} onChange={() => {}} />
            <Toggle checked={true} onChange={() => {}} />
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
            Toggles can be disabled to prevent interaction.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Toggle
              checked={false}
              disabled={true}
              label="Disabled off"
            />
            <Toggle
              checked={true}
              disabled={true}
              label="Disabled on"
            />
          </div>
        </div>

        {/* Settings Example */}
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
            Settings Example
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Common use case for toggles in settings interfaces.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Toggle
              checked={toggle3}
              onChange={setToggle3}
              label="Enable notifications"
            />
            <Toggle
              checked={toggle4}
              onChange={setToggle4}
              label="Auto-save changes"
            />
            <Toggle
              checked={toggle5}
              onChange={setToggle5}
              label="Dark mode"
            />
          </div>
        </div>

        {/* All States */}
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
            All States
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Overview of all toggle states.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            maxWidth: '400px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>Off</div>
              <Toggle checked={false} onChange={() => {}} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>On</div>
              <Toggle checked={true} onChange={() => {}} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>Disabled Off</div>
              <Toggle checked={false} disabled={true} onChange={() => {}} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>Disabled On</div>
              <Toggle checked={true} disabled={true} onChange={() => {}} />
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
{`import { Toggle } from './components/Toggle'
import { useState } from 'react'

const [isEnabled, setIsEnabled] = useState(false)

// Basic toggle
<Toggle
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Enable feature"
/>

// Without label
<Toggle
  checked={isEnabled}
  onChange={setIsEnabled}
/>

// Disabled toggle
<Toggle
  checked={true}
  disabled={true}
  label="Cannot change"
/>`}
        </pre>
      </section>
    </div>
  )
}
