import { useState } from 'react'
import { Radio } from '../components/Radio'

/**
 * Radio Showcase
 *
 * Displays the Radio component with documentation,
 * properties table, and interactive examples
 */
export const RadioShowcase = () => {
  const [selected1, setSelected1] = useState('option1')
  const [selected2, setSelected2] = useState('medium')
  const [selected3, setSelected3] = useState('email')

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
          Radio
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          A radio button component for selecting a single option from a group.
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
                  selected
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>false</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Whether the radio is selected
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
                Whether the radio is disabled
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
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  value
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Value for the radio button
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  name
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Name for radio group
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

        {/* Basic Radio Group */}
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
            Basic Radio Group
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            A group of radio buttons where only one can be selected at a time.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Radio
              name="group1"
              value="option1"
              selected={selected1 === 'option1'}
              onChange={setSelected1}
              label="Option 1"
            />
            <Radio
              name="group1"
              value="option2"
              selected={selected1 === 'option2'}
              onChange={setSelected1}
              label="Option 2"
            />
            <Radio
              name="group1"
              value="option3"
              selected={selected1 === 'option3'}
              onChange={setSelected1}
              label="Option 3"
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
            Radio buttons can be used without labels.
          </p>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Radio selected={false} onChange={() => {}} />
            <Radio selected={true} onChange={() => {}} />
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
            Radio buttons can be disabled to prevent interaction.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Radio
              selected={false}
              disabled={true}
              label="Disabled unselected"
            />
            <Radio
              selected={true}
              disabled={true}
              label="Disabled selected"
            />
          </div>
        </div>

        {/* Size Selection Example */}
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
            Size Selection
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Select a size option.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Radio
              name="size"
              value="small"
              selected={selected2 === 'small'}
              onChange={setSelected2}
              label="Small"
            />
            <Radio
              name="size"
              value="medium"
              selected={selected2 === 'medium'}
              onChange={setSelected2}
              label="Medium"
            />
            <Radio
              name="size"
              value="large"
              selected={selected2 === 'large'}
              onChange={setSelected2}
              label="Large"
            />
            <Radio
              name="size"
              value="xlarge"
              selected={selected2 === 'xlarge'}
              onChange={setSelected2}
              label="Extra Large"
            />
          </div>
        </div>

        {/* Notification Preferences Example */}
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
            Notification Preferences
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Choose your preferred notification method.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Radio
              name="notifications"
              value="email"
              selected={selected3 === 'email'}
              onChange={setSelected3}
              label="Email notifications"
            />
            <Radio
              name="notifications"
              value="sms"
              selected={selected3 === 'sms'}
              onChange={setSelected3}
              label="SMS notifications"
            />
            <Radio
              name="notifications"
              value="push"
              selected={selected3 === 'push'}
              onChange={setSelected3}
              label="Push notifications"
            />
            <Radio
              name="notifications"
              value="none"
              selected={selected3 === 'none'}
              onChange={setSelected3}
              label="No notifications"
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
            Overview of all radio button states.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            maxWidth: '400px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>Unselected</div>
              <Radio selected={false} onChange={() => {}} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>Selected</div>
              <Radio selected={true} onChange={() => {}} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>Disabled Unselected</div>
              <Radio selected={false} disabled={true} onChange={() => {}} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>Disabled Selected</div>
              <Radio selected={true} disabled={true} onChange={() => {}} />
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
{`import { Radio } from './components/Radio'
import { useState } from 'react'

const [selected, setSelected] = useState('option1')

// Radio group
<Radio
  name="options"
  value="option1"
  selected={selected === 'option1'}
  onChange={setSelected}
  label="Option 1"
/>
<Radio
  name="options"
  value="option2"
  selected={selected === 'option2'}
  onChange={setSelected}
  label="Option 2"
/>

// Without label
<Radio
  selected={selected === 'option1'}
  onChange={() => setSelected('option1')}
/>

// Disabled radio
<Radio
  selected={true}
  disabled={true}
  label="Cannot change"
/>`}
        </pre>
      </section>
    </div>
  )
}
