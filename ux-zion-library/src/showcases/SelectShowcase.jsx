import { useState } from 'react'
import { Select } from '../components/Select'
import { Search, Person } from '../icons'

/**
 * Select Showcase
 *
 * Displays the Select component with all its variants and states
 */
export const SelectShowcase = () => {
  const [basicValue, setBasicValue] = useState('')
  const [largeValue, setLargeValue] = useState('')
  const [validValue, setValidValue] = useState('valid-option')
  const [warningValue, setWarningValue] = useState('warning-option')
  const [errorValue, setErrorValue] = useState('')
  const [disabledValue, setDisabledValue] = useState('option2')
  const [billboardValue, setBillboardValue] = useState('')
  const [iconValue, setIconValue] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const basicOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4']
  const objectOptions = [
    { value: 'valid-option', label: 'Valid Option' },
    { value: 'option2', label: 'Second Option' },
    { value: 'option3', label: 'Third Option' }
  ]
  const warningOptions = [
    { value: 'warning-option', label: 'This might cause issues' },
    { value: 'safe-option', label: 'Safe Option' }
  ]

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
          Select
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          Dropdown select component with labels, messages, status states, and various options.
        </p>
      </div>

      {/* Basic Examples */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '24px'
        }}>
          Basic Select
        </h2>

        <div style={{
          display: 'grid',
          gap: '24px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}>
          {/* Standard Label */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>
              Standard Label (Body A)
            </h3>
            <Select
              label="Country"
              value={basicValue}
              onChange={(e) => setBasicValue(e.target.value)}
              placeholder="Select a country"
              options={['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany']}
            />
          </div>

          {/* Large Label */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>
              Large Label (Body B)
            </h3>
            <Select
              labelLarge="Department"
              value={largeValue}
              onChange={(e) => setLargeValue(e.target.value)}
              placeholder="Choose department"
              options={['Engineering', 'Marketing', 'Sales', 'Support']}
            />
          </div>
        </div>
      </section>

      {/* Status States */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '24px'
        }}>
          Status States
        </h2>

        <div style={{
          display: 'grid',
          gap: '24px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}>
          {/* Valid */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>
              Valid State
            </h3>
            <Select
              label="Selection"
              value={validValue}
              onChange={(e) => setValidValue(e.target.value)}
              status="valid"
              message="Valid selection"
              options={objectOptions}
            />
          </div>

          {/* Warning */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>
              Warning State
            </h3>
            <Select
              label="Option"
              value={warningValue}
              onChange={(e) => setWarningValue(e.target.value)}
              status="warning"
              message="This selection requires confirmation"
              options={warningOptions}
            />
          </div>

          {/* Error */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>
              Error State
            </h3>
            <Select
              label="Required Field"
              value={errorValue}
              onChange={(e) => setErrorValue(e.target.value)}
              status="error"
              message="This field is required"
              placeholder="Please select an option"
              options={basicOptions}
            />
          </div>
        </div>
      </section>

      {/* Disabled State */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '24px'
        }}>
          Disabled State
        </h2>

        <div style={{ maxWidth: '400px' }}>
          <Select
            label="Read Only Field"
            value={disabledValue}
            onChange={(e) => setDisabledValue(e.target.value)}
            disabled
            message="This field cannot be changed"
            options={objectOptions}
          />
        </div>
      </section>

      {/* Billboard Variant */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '24px'
        }}>
          Billboard (44px height)
        </h2>

        <div style={{ maxWidth: '400px' }}>
          <Select
            labelLarge="Large Select Field"
            value={billboardValue}
            onChange={(e) => setBillboardValue(e.target.value)}
            placeholder="Larger height for emphasis"
            billboard
            options={['First Choice', 'Second Choice', 'Third Choice']}
          />
        </div>
      </section>

      {/* With Icon */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '24px'
        }}>
          Select with Icon
        </h2>

        <div style={{
          display: 'grid',
          gap: '24px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}>
          {/* Search Icon */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>
              With Search Icon
            </h3>
            <Select
              label="Search Type"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Select search type..."
              icon={Search}
              options={['Web Search', 'Image Search', 'Video Search', 'News Search']}
            />
          </div>

          {/* Person Icon */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>
              With Person Icon
            </h3>
            <Select
              label="User Role"
              value={iconValue}
              onChange={(e) => setIconValue(e.target.value)}
              placeholder="Select role"
              icon={Person}
              options={['Admin', 'Editor', 'Viewer', 'Guest']}
            />
          </div>
        </div>
      </section>

      {/* Combined Features */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '24px'
        }}>
          Combined Features
        </h2>

        <div style={{ maxWidth: '500px' }}>
          <Select
            labelLarge="Priority Level"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Select priority level..."
            icon={Search}
            billboard
            status={searchValue ? 'valid' : 'default'}
            message={searchValue ? `Selected: ${searchValue}` : 'Please select a priority level'}
            options={['Critical', 'High', 'Medium', 'Low']}
          />
        </div>
      </section>

      {/* Properties Table */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
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
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>label</code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Standard label text (Body A typography)
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>labelLarge</code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Large label text (Body B typography)
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>value</code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Select value (controlled component)
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>onChange</code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>function</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Change handler function
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>options</code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>array</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Array of strings or objects with value/label
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>message</code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Helper or error message text (Body A typography)
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>status</code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                'default' | 'valid' | 'warning' | 'error'
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>'default'</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Field status (changes colors and icon)
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>disabled</code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>false</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Disables the select field
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>billboard</code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>false</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Increases height to 44px
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>icon</code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>component</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Icon component to display on the left
              </td>
            </tr>
          </tbody>
        </table>
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
{`import { Select } from './components/Select'
import { Search } from './icons'

const [value, setValue] = useState('')

// Basic usage with string array
<Select
  label="Country"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Select a country"
  options={['USA', 'Canada', 'UK']}
/>

// With object array
<Select
  label="Role"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  options={[
    { value: 'admin', label: 'Administrator' },
    { value: 'user', label: 'User' }
  ]}
/>

// With status and icon
<Select
  label="Priority"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  icon={Search}
  status="valid"
  message="Priority level selected"
  billboard
  options={['High', 'Medium', 'Low']}
/>`}
        </pre>
      </section>
    </div>
  )
}
