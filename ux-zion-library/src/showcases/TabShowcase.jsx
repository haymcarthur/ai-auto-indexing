import { useState } from 'react'
import { Tab } from '../components/Tab'
import { TabGroup } from '../components/TabGroup'
import { Card } from '../components/Card'

/**
 * Tab Showcase
 *
 * Displays the Tab and TabGroup components with documentation and interactive examples
 */
export const TabShowcase = () => {
  const [activeTab1, setActiveTab1] = useState('home')
  const [activeTab2, setActiveTab2] = useState('profile')
  const [activeTab3, setActiveTab3] = useState('about')
  const [activeTab4, setActiveTab4] = useState('tab1')

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
          Tabs
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          Tab navigation components with automatic scrolling for overflow content.
          Height: 48px, no corner radius, gray00 fill, 4px bottom stroke when active.
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
          Tab Properties
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
                    label
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Tab label text
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    active
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>false</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Whether this tab is active
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    onClick
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>function</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Click handler
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    activeColor
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>'blue'</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Color for active indicator: 'blue', 'green', 'yellow', 'red', 'purple', 'gray'
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    width
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Optional fixed width (e.g., '120px')
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    fullWidth
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>false</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Make tab take full available width
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

        {/* Basic Tabs */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Basic Tabs (Blue)
          </h3>
          <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <TabGroup>
              <Tab
                label="Home"
                active={activeTab1 === 'home'}
                onClick={() => setActiveTab1('home')}
                activeColor="blue"
              />
              <Tab
                label="Profile"
                active={activeTab1 === 'profile'}
                onClick={() => setActiveTab1('profile')}
                activeColor="blue"
              />
              <Tab
                label="Messages"
                active={activeTab1 === 'messages'}
                onClick={() => setActiveTab1('messages')}
                activeColor="blue"
              />
              <Tab
                label="Settings"
                active={activeTab1 === 'settings'}
                onClick={() => setActiveTab1('settings')}
                activeColor="blue"
              />
            </TabGroup>
          </div>
        </div>

        {/* Color Variants */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Color Variants
          </h3>
          <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <TabGroup>
              <Tab
                label="Blue"
                active={activeTab2 === 'profile'}
                onClick={() => setActiveTab2('profile')}
                activeColor="blue"
              />
              <Tab
                label="Green"
                active={activeTab2 === 'green'}
                onClick={() => setActiveTab2('green')}
                activeColor="green"
              />
              <Tab
                label="Yellow"
                active={activeTab2 === 'yellow'}
                onClick={() => setActiveTab2('yellow')}
                activeColor="yellow"
              />
              <Tab
                label="Red"
                active={activeTab2 === 'red'}
                onClick={() => setActiveTab2('red')}
                activeColor="red"
              />
              <Tab
                label="Purple"
                active={activeTab2 === 'purple'}
                onClick={() => setActiveTab2('purple')}
                activeColor="purple"
              />
              <Tab
                label="Gray"
                active={activeTab2 === 'gray'}
                onClick={() => setActiveTab2('gray')}
                activeColor="gray"
              />
            </TabGroup>
          </div>
        </div>

        {/* Full Width Tabs */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Full Width Tabs
          </h3>
          <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <TabGroup>
              <Tab
                label="Overview"
                active={activeTab3 === 'about'}
                onClick={() => setActiveTab3('about')}
                activeColor="green"
                fullWidth
              />
              <Tab
                label="Details"
                active={activeTab3 === 'details'}
                onClick={() => setActiveTab3('details')}
                activeColor="green"
                fullWidth
              />
              <Tab
                label="History"
                active={activeTab3 === 'history'}
                onClick={() => setActiveTab3('history')}
                activeColor="green"
                fullWidth
              />
            </TabGroup>
          </div>
        </div>

        {/* Scrolling Tabs */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Scrolling Tabs (Many Tabs)
          </h3>
          <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <TabGroup>
              {[...Array(15)].map((_, i) => (
                <Tab
                  key={`tab${i + 1}`}
                  label={`Tab ${i + 1}`}
                  active={activeTab4 === `tab${i + 1}`}
                  onClick={() => setActiveTab4(`tab${i + 1}`)}
                  activeColor="purple"
                  width="120px"
                />
              ))}
            </TabGroup>
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
{`import { Tab } from './components/Tab'
import { TabGroup } from './components/TabGroup'

function MyComponent() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <TabGroup>
      <Tab
        label="Home"
        active={activeTab === 'home'}
        onClick={() => setActiveTab('home')}
        activeColor="blue"
      />
      <Tab
        label="Profile"
        active={activeTab === 'profile'}
        onClick={() => setActiveTab('profile')}
        activeColor="blue"
      />
      <Tab
        label="Settings"
        active={activeTab === 'settings'}
        onClick={() => setActiveTab('settings')}
        activeColor="blue"
      />
    </TabGroup>
  )
}`}
        </pre>
      </section>
    </div>
  )
}
