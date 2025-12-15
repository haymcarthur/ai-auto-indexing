import { useState } from 'react'
import { Card } from '../components/Card'
import { colors } from '../tokens/colors'
import * as Icons from '../icons'

/**
 * Icon Showcase
 *
 * Displays all available icons from the icon library
 * with interactive size controls and copy functionality
 */
export const IconShowcase = () => {
  const [iconSize, setIconSize] = useState('sm')
  const [copiedIcon, setCopiedIcon] = useState(null)

  // Icon categories - dynamically generated from imported icons
  const allIcons = Object.keys(Icons)

  const iconCategories = [
    {
      name: 'Activity',
      icons: allIcons.filter(name => name.startsWith('Activity'))
    },
    {
      name: 'Arrows',
      icons: allIcons.filter(name => name.startsWith('Arrow'))
    },
    {
      name: 'Content',
      icons: allIcons.filter(name =>
        name.startsWith('Content') ||
        ['Add', 'Check', 'Copy', 'Delete', 'Download', 'Edit', 'Upload'].includes(name)
      )
    },
    {
      name: 'Control',
      icons: allIcons.filter(name => name.startsWith('Control'))
    },
    {
      name: 'Discovery',
      icons: allIcons.filter(name => name.startsWith('Discovery'))
    },
    {
      name: 'Document',
      icons: allIcons.filter(name => name.startsWith('Document'))
    },
    {
      name: 'Event',
      icons: allIcons.filter(name => name.startsWith('Event'))
    },
    {
      name: 'Help',
      icons: allIcons.filter(name => name.startsWith('Help'))
    },
    {
      name: 'Logo',
      icons: allIcons.filter(name => name.startsWith('Logo'))
    },
    {
      name: 'Media',
      icons: allIcons.filter(name => name.startsWith('Media'))
    },
    {
      name: 'Menu & Navigation',
      icons: allIcons.filter(name =>
        name.startsWith('Menu') ||
        ['Close', 'Home', 'More', 'Search', 'Menu'].includes(name)
      )
    },
    {
      name: 'Notice',
      icons: allIcons.filter(name => name.startsWith('Notice'))
    },
    {
      name: 'Person',
      icons: allIcons.filter(name => name.startsWith('Person') || name === 'Person')
    },
    {
      name: 'Place',
      icons: allIcons.filter(name => name.startsWith('Place'))
    },
    {
      name: 'Social',
      icons: allIcons.filter(name =>
        name.startsWith('Social') ||
        ['Like', 'Share'].includes(name)
      )
    },
    {
      name: 'Thing',
      icons: allIcons.filter(name =>
        name.startsWith('Thing') ||
        ['Calendar', 'Info', 'Settings'].includes(name)
      )
    },
    {
      name: 'Tree',
      icons: allIcons.filter(name => name.startsWith('Tree'))
    }
  ].filter(category => category.icons.length > 0)

  const handleCopyImport = (iconName) => {
    const importText = `import { ${iconName} } from '../icons'`
    navigator.clipboard.writeText(importText)
    setCopiedIcon(iconName)
    setTimeout(() => setCopiedIcon(null), 2000)
  }

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
          Icons
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          Complete icon library with {allIcons.length} icons from the Zion UI design system.
          All icons support size tokens (xs, sm, md, lg) and optional background colors.
        </p>
      </div>

      {/* Size Tokens */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '24px'
        }}>
          Size Tokens
        </h2>

        <div style={{
          display: 'grid',
          gap: '24px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
        }}>
          {[
            { size: 'xs', dimension: '18px', description: 'Extra Small' },
            { size: 'sm', dimension: '24px', description: 'Small (Default)' },
            { size: 'md', dimension: '36px', description: 'Medium' },
            { size: 'lg', dimension: '48px', description: 'Large' }
          ].map(({ size, dimension, description }) => (
            <Card key={size} size="sm" variant="outlined">
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                <Icons.Search size={size} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#111827',
                    marginBottom: '4px'
                  }}>
                    {size.toUpperCase()} - {dimension}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#6b7280'
                  }}>
                    {description}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Background Colors */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '24px'
        }}>
          Icons with Background Colors
        </h2>

        <div style={{
          display: 'grid',
          gap: '24px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
        }}>
          {/* Blue Backgrounds */}
          <Card size="sm" variant="outlined">
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '16px',
              color: '#111827'
            }}>
              Blue Backgrounds
            </h3>
            <div style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icons.Person size="xs" backgroundColor={colors.blue.blue00} />
              <Icons.Person size="sm" backgroundColor={colors.blue.blue20} />
              <Icons.Person size="md" backgroundColor={colors.blue.blue40} />
              <Icons.Person size="lg" backgroundColor={colors.blue.blue60} style={{ color: colors.gray.gray00 }} />
            </div>
          </Card>

          {/* Green Backgrounds */}
          <Card size="sm" variant="outlined">
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '16px',
              color: '#111827'
            }}>
              Green Backgrounds
            </h3>
            <div style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icons.ContentCheck size="xs" backgroundColor={colors.green.green00} />
              <Icons.ContentCheck size="sm" backgroundColor={colors.green.green20} />
              <Icons.ContentCheck size="md" backgroundColor={colors.green.green40} />
              <Icons.ContentCheck size="lg" backgroundColor={colors.green.green60} style={{ color: colors.gray.gray00 }} />
            </div>
          </Card>

          {/* Yellow Backgrounds */}
          <Card size="sm" variant="outlined">
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '16px',
              color: '#111827'
            }}>
              Yellow Backgrounds
            </h3>
            <div style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icons.NoticeWarning size="xs" backgroundColor={colors.yellow.yellow00} />
              <Icons.NoticeWarning size="sm" backgroundColor={colors.yellow.yellow20} />
              <Icons.NoticeWarning size="md" backgroundColor={colors.yellow.yellow40} />
              <Icons.NoticeWarning size="lg" backgroundColor={colors.yellow.yellow60} />
            </div>
          </Card>

          {/* Danger Backgrounds */}
          <Card size="sm" variant="outlined">
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '16px',
              color: '#111827'
            }}>
              Danger Backgrounds
            </h3>
            <div style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icons.NoticeImportant size="xs" backgroundColor={colors.danger.danger00} />
              <Icons.NoticeImportant size="sm" backgroundColor={colors.danger.danger20} />
              <Icons.NoticeImportant size="md" backgroundColor={colors.danger.danger40} />
              <Icons.NoticeImportant size="lg" backgroundColor={colors.danger.danger60} style={{ color: colors.gray.gray00 }} />
            </div>
          </Card>
        </div>
      </section>

      {/* Size Controls */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '24px'
        }}>
          All Icons
        </h2>
        <Card size="sm" variant="elevated" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <label style={{ fontSize: '14px', color: '#374151' }}>
              Icon Size:
            </label>
            {[
              { value: 'xs', label: 'XS (18px)' },
              { value: 'sm', label: 'SM (24px)' },
              { value: 'md', label: 'MD (36px)' },
              { value: 'lg', label: 'LG (48px)' }
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setIconSize(value)}
                style={{
                  padding: '6px 12px',
                  fontSize: '14px',
                  border: iconSize === value ? '2px solid #066F90' : '1px solid #d1d5db',
                  borderRadius: '6px',
                  backgroundColor: iconSize === value ? '#E6F4F8' : '#ffffff',
                  color: iconSize === value ? '#066F90' : '#374151',
                  cursor: 'pointer',
                  fontWeight: iconSize === value ? 600 : 400
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </Card>
      </section>

      {/* Icon Categories */}
      {iconCategories.map((category, categoryIndex) => (
        <section key={category.name} style={{ marginBottom: '48px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            {category.name}
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '16px'
          }}>
            {category.icons.map(iconName => {
              const IconComponent = Icons[iconName]
              if (!IconComponent) return null

              return (
                <Card
                  key={iconName}
                  size="xxs"
                  variant="outlined"
                  onClick={() => handleCopyImport(iconName)}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    borderColor: copiedIcon === iconName ? '#066F90' : '#CACDCD',
                    backgroundColor: copiedIcon === iconName ? '#E6F4F8' : '#ffffff'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#066F90'
                    e.currentTarget.style.backgroundColor = '#f9fafb'
                  }}
                  onMouseLeave={(e) => {
                    if (copiedIcon !== iconName) {
                      e.currentTarget.style.borderColor = '#CACDCD'
                      e.currentTarget.style.backgroundColor = '#ffffff'
                    }
                  }}
                >
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '48px',
                      color: '#202121'
                    }}>
                      <IconComponent size={iconSize} />
                    </div>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: copiedIcon === iconName ? '#066F90' : '#374151',
                      textAlign: 'center'
                    }}>
                      {copiedIcon === iconName ? 'Copied!' : iconName}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>
      ))}

      {/* Usage Documentation */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Properties
        </h2>
        <Card size="sm" variant="elevated">
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            lineHeight: '1.6',
            marginBottom: '16px'
          }}>
            All icons accept the following props:
          </p>
          <ul style={{
            fontSize: '14px',
            color: '#6b7280',
            lineHeight: '1.8',
            paddingLeft: '24px',
            margin: 0
          }}>
            <li><code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>size</code> - Size token: 'xs' (18px), 'sm' (24px), 'md' (36px), or 'lg' (48px). Default: 'sm'</li>
            <li><code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>backgroundColor</code> - Optional background color. Creates circular background with size-appropriate padding</li>
            <li><code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>style</code> - Style object (e.g., for custom colors via style.color)</li>
            <li>Any other SVG props (className, onClick, etc.)</li>
          </ul>
        </Card>
      </section>

      {/* Code Examples */}
      <section>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Code Examples
        </h2>
        <Card size="sm" variant="elevated">
          <pre style={{
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '16px',
            overflowX: 'auto',
            fontSize: '13px',
            lineHeight: '1.6',
            color: '#374151',
            margin: 0
          }}>
{`import { Add, Search, Person, Calendar } from '../icons'
import { colors } from '../tokens/colors'

// Basic usage (sm = 24px default)
<Add />

// Using size tokens
<Search size="xs" />  // 18px
<Search size="sm" />  // 24px (default)
<Search size="md" />  // 36px
<Search size="lg" />  // 48px

// With background color
<Person
  size="md"
  backgroundColor={colors.blue.blue00}
/>

// With background and custom icon color
<ContentCheck
  size="lg"
  backgroundColor={colors.green.green60}
  style={{ color: colors.gray.gray00 }}
/>

// Custom color without background
<Calendar style={{ color: colors.blue.blue60 }} />

// With IconButton component
import { IconButton } from '../components/IconButton'
import { Settings } from '../icons'

<IconButton
  icon={Settings}
  label="Settings"
  onClick={() => console.log('Settings clicked')}
/>

// In a button with text
<button>
  <Add size="xs" />
  <span>Add Item</span>
</button>

// Different colors in a row
<div style={{ display: 'flex', gap: '8px' }}>
  <Like
    size="md"
    backgroundColor={colors.danger.danger00}
  />
  <ContentCheck
    size="md"
    backgroundColor={colors.green.green00}
  />
  <Calendar
    size="md"
    backgroundColor={colors.blue.blue00}
  />
</div>`}
          </pre>
        </Card>
      </section>
    </div>
  )
}
