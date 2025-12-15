import { useState } from 'react'
import { TextField } from '../components/TextField'
import { Search, Person } from '../icons'

/**
 * TextField Showcase
 *
 * Displays the TextField component with all its variants and states
 */
export const TextFieldShowcase = () => {
  const [basicValue, setBasicValue] = useState('')
  const [largeValue, setLargeValue] = useState('')
  const [validValue, setValidValue] = useState('valid@email.com')
  const [warningValue, setWarningValue] = useState('warning@example')
  const [errorValue, setErrorValue] = useState('error')
  const [disabledValue, setDisabledValue] = useState('Disabled field')
  const [billboardValue, setBillboardValue] = useState('')
  const [clearableValue, setClearableValue] = useState('Clear me')
  const [iconValue, setIconValue] = useState('')
  const [searchValue, setSearchValue] = useState('')

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
          TextField
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          Text input field component with labels, messages, status states, and various options.
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
          Basic TextField
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
            <TextField
              label="Email Address"
              value={basicValue}
              onChange={(e) => setBasicValue(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          {/* Large Label */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>
              Large Label (Body B)
            </h3>
            <TextField
              labelLarge="Full Name"
              value={largeValue}
              onChange={(e) => setLargeValue(e.target.value)}
              placeholder="John Doe"
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
            <TextField
              label="Email"
              value={validValue}
              onChange={(e) => setValidValue(e.target.value)}
              status="valid"
              message="Email address is valid"
            />
          </div>

          {/* Warning */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>
              Warning State
            </h3>
            <TextField
              label="Email"
              value={warningValue}
              onChange={(e) => setWarningValue(e.target.value)}
              status="warning"
              message="Email domain might be incorrect"
            />
          </div>

          {/* Error */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>
              Error State
            </h3>
            <TextField
              label="Username"
              value={errorValue}
              onChange={(e) => setErrorValue(e.target.value)}
              status="error"
              message="Username must be at least 6 characters"
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
          <TextField
            label="Read Only Field"
            value={disabledValue}
            onChange={(e) => setDisabledValue(e.target.value)}
            disabled
            message="This field cannot be edited"
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
          <TextField
            labelLarge="Large Input Field"
            value={billboardValue}
            onChange={(e) => setBillboardValue(e.target.value)}
            placeholder="Larger height for emphasis"
            billboard
          />
        </div>
      </section>

      {/* Clearable */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '24px'
        }}>
          Clearable TextField
        </h2>

        <div style={{ maxWidth: '400px' }}>
          <TextField
            label="Clearable Input"
            value={clearableValue}
            onChange={(e) => setClearableValue(e.target.value)}
            placeholder="Type something..."
            clearable
            message="Click the X icon to clear"
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
          TextField with Icon
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
            <TextField
              label="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search..."
              icon={Search}
              clearable
            />
          </div>

          {/* Person Icon */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>
              With Person Icon
            </h3>
            <TextField
              label="Username"
              value={iconValue}
              onChange={(e) => setIconValue(e.target.value)}
              placeholder="Enter username"
              icon={Person}
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
          <TextField
            labelLarge="Advanced Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search with all features..."
            icon={Search}
            clearable
            billboard
            status={searchValue.length > 0 ? 'valid' : 'default'}
            message={searchValue.length > 0 ? `Found results for "${searchValue}"` : 'Start typing to search'}
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
                Input value (controlled component)
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
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>message</code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Helper or error message text (Body A typography)
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
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
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>disabled</code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>false</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Disables the input field
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>billboard</code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>false</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Increases height to 44px
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>clearable</code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>false</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Shows clear button (18px MenuClose icon)
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
{`import { TextField } from './components/TextField'
import { Search } from './icons'

const [value, setValue] = useState('')

// Basic usage
<TextField
  label="Email Address"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Enter your email"
/>

// With status and message
<TextField
  label="Email"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  status="valid"
  message="Email address is valid"
/>

// With icon and clearable
<TextField
  label="Search"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  icon={Search}
  clearable
  billboard
/>`}
        </pre>
      </section>
    </div>
  )
}
