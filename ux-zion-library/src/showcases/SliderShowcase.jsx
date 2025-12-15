import { useState } from 'react'
import { Slider } from '../components/Slider'
import { Card } from '../components/Card'

/**
 * Slider Showcase
 *
 * Displays the Slider component with documentation and interactive examples
 */
export const SliderShowcase = () => {
  const [value1, setValue1] = useState(50)
  const [value2, setValue2] = useState(25)
  const [value3, setValue3] = useState(0)

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
          Slider
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          A slider component with a draggable handle. Features a 1px gray40 track line with a circular
          handle (15px blue80 with elevation 1). When hovered or active, the handle becomes 18px blue60
          with elevation 2.
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
                    min
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>number</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>0</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Minimum value
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    max
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>number</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>100</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Maximum value
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    value
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>number</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>50</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Current value
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    onChange
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>function</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Callback when value changes, receives new value as parameter
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    step
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>number</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>1</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Step increment for value changes
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

        {/* Basic Slider */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Basic Slider
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            A basic slider with default range (0-100) and step of 1.
          </p>
          <div style={{ padding: '24px' }}>
            <Slider
              value={value1}
              onChange={setValue1}
            />
            <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '16px' }}>
              Current Value: <strong>{value1}</strong>
            </p>
          </div>
        </div>

        {/* Custom Range */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Custom Range (0-50)
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            A slider with a custom min and max range.
          </p>
          <div style={{ padding: '24px' }}>
            <Slider
              min={0}
              max={50}
              value={value2}
              onChange={setValue2}
            />
            <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '16px' }}>
              Current Value: <strong>{value2}</strong>
            </p>
          </div>
        </div>

        {/* Custom Step */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Custom Step (10)
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            A slider that increments by 10.
          </p>
          <div style={{ padding: '24px' }}>
            <Slider
              min={0}
              max={100}
              step={10}
              value={value3}
              onChange={setValue3}
            />
            <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '16px' }}>
              Current Value: <strong>{value3}</strong>
            </p>
          </div>
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
              <li>Track: 1px line in gray40</li>
              <li>Handle (default): 15px circle in blue80 with elevation 1</li>
              <li>Handle (hover/active): 18px circle in blue60 with elevation 2</li>
              <li>Cursor: pointer</li>
              <li>Smooth transitions between states (0.2s ease)</li>
              <li>Can drag handle or click track to set value</li>
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
{`import { Slider } from './components/Slider'
import { useState } from 'react'

function MyComponent() {
  const [value, setValue] = useState(50)

  return (
    <div>
      <Slider
        min={0}
        max={100}
        value={value}
        onChange={setValue}
        step={1}
      />
      <p>Current Value: {value}</p>
    </div>
  )
}`}
        </pre>
      </section>
    </div>
  )
}
