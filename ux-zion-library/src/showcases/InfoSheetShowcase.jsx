import { InfoSheet, useInfoSheet } from '../components/InfoSheet'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Paragraph } from '../components/Paragraph'
import { DataBlock } from '../components/DataBlock'

/**
 * InfoSheet Showcase
 *
 * Displays the InfoSheet component with documentation,
 * properties table, and interactive examples
 */
export const InfoSheetShowcase = () => {
  const basicSheet = useInfoSheet()
  const panelSheet = useInfoSheet()
  const dockableSheet = useInfoSheet()
  const smallSheet = useInfoSheet()
  const mediumSheet = useInfoSheet()
  const largeSheet = useInfoSheet()
  const fullWidthSheet = useInfoSheet()
  const notElevatedSheet = useInfoSheet()
  const withFooterSheet = useInfoSheet()
  const richContentSheet = useInfoSheet()

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
          InfoSheet
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          A sheet that appears on the right side of the screen with header, content, and optional footer.
          Can be docked to the bottom and supports various sizes. Matches Zion UI design system.
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
        <Card size="sm" variant="elevated">
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
              {[
                { name: 'title', type: 'string', default: '-', desc: 'Sheet title (H6)' },
                { name: 'subtitle', type: 'string', default: '-', desc: 'Optional subtitle (XS paragraph, secondary)' },
                { name: 'panel', type: 'boolean', default: 'false', desc: 'Whether this is a panel with back button' },
                { name: 'onBack', type: 'function', default: '-', desc: 'Function to call when back button is clicked' },
                { name: 'closable', type: 'boolean', default: 'true', desc: 'Whether the sheet can be closed' },
                { name: 'close', type: 'function', default: '-', desc: 'Function to close the sheet' },
                { name: 'dockable', type: 'boolean', default: 'false', desc: 'Whether sheet can be docked to bottom' },
                { name: 'isDocked', type: 'boolean', default: 'false', desc: 'Whether sheet is currently docked' },
                { name: 'onDockToggle', type: 'function', default: '-', desc: 'Function to toggle dock state' },
                { name: 'size', type: "'sm' | 'md' | 'lg' | 'fullWidth'", default: "'md'", desc: 'Sheet width' },
                { name: 'elevated', type: 'boolean', default: 'true', desc: 'Whether sheet has drop shadow' },
                { name: 'primaryButton', type: 'object', default: '-', desc: 'Primary button config {label, onClick}' },
                { name: 'secondaryButton', type: 'object', default: '-', desc: 'Secondary button config {label, onClick}' },
                { name: 'children', type: 'node', default: '-', desc: 'Sheet content' }
              ].map((prop, index) => (
                <tr key={prop.name} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                    <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                      {prop.name}
                    </code>
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>{prop.type}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>{prop.default}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>{prop.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>

      {/* Hook Documentation */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          useInfoSheet Hook
        </h2>
        <Card size="sm" variant="elevated">
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            lineHeight: '1.6',
            marginBottom: '12px'
          }}>
            Manages info sheet state including dock state. Returns an object with:
          </p>
          <ul style={{
            fontSize: '14px',
            color: '#6b7280',
            lineHeight: '1.8',
            paddingLeft: '24px',
            margin: 0
          }}>
            <li><code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>isOpen</code> - boolean indicating if sheet is open</li>
            <li><code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>open()</code> - function to open the sheet</li>
            <li><code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>close()</code> - function to close the sheet</li>
            <li><code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>handleClick()</code> - function to toggle the sheet</li>
            <li><code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>isDocked</code> - boolean indicating if sheet is docked to bottom</li>
            <li><code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>toggleDock()</code> - function to toggle dock state</li>
          </ul>
        </Card>
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

        {/* Basic Info Sheet */}
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
            Basic Info Sheet
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            A simple info sheet with title, subtitle, and closable functionality.
          </p>

          <Button onClick={basicSheet.open}>Open Basic Sheet</Button>
          {basicSheet.isOpen && (
            <InfoSheet
              title="Basic Info Sheet"
              subtitle="This is a subtitle"
              close={basicSheet.close}
            >
              <Paragraph>
                This is a basic info sheet with some content. It appears on the right side
                of the screen and can be closed using the X button.
              </Paragraph>
            </InfoSheet>
          )}
        </div>

        {/* Panel Info Sheet */}
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
            Panel Info Sheet
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            A panel-style sheet with a back button instead of close.
          </p>

          <Button onClick={panelSheet.open}>Open Panel Sheet</Button>
          {panelSheet.isOpen && (
            <InfoSheet
              title="Panel Info Sheet"
              subtitle="Use back button to navigate"
              panel
              onBack={panelSheet.close}
              closable={false}
            >
              <Paragraph>
                This is a panel info sheet with a back button. It's useful for navigation
                flows where the user should go back rather than close.
              </Paragraph>
            </InfoSheet>
          )}
        </div>

        {/* Dockable Sheet */}
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
            Dockable Info Sheet
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            A sheet that can be toggled between side and bottom positions.
          </p>

          <Button onClick={dockableSheet.open}>Open Dockable Sheet</Button>
          {dockableSheet.isOpen && (
            <InfoSheet
              title="Dockable Sheet"
              subtitle="Toggle between side and bottom"
              close={dockableSheet.close}
              dockable
              isDocked={dockableSheet.isDocked}
              onDockToggle={dockableSheet.toggleDock}
            >
              <Paragraph>
                Click the dock icon to toggle between side sheet and bottom sheet.
                The fullWidth option is automatically applied when docked to bottom.
              </Paragraph>
            </InfoSheet>
          )}
        </div>

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
            Info sheets come in three sizes: small (300px), medium (360px), and large (440px).
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button onClick={smallSheet.open}>Small (300px)</Button>
            <Button onClick={mediumSheet.open}>Medium (360px)</Button>
            <Button onClick={largeSheet.open}>Large (440px)</Button>
            <Button onClick={fullWidthSheet.open}>Full Width</Button>
          </div>

          {smallSheet.isOpen && (
            <InfoSheet
              title="Small Sheet"
              subtitle="300px wide"
              close={smallSheet.close}
              size="sm"
            >
              <Paragraph>This is a small info sheet (300px wide).</Paragraph>
            </InfoSheet>
          )}

          {mediumSheet.isOpen && (
            <InfoSheet
              title="Medium Sheet"
              subtitle="360px wide"
              close={mediumSheet.close}
              size="md"
            >
              <Paragraph>This is a medium info sheet (360px wide). This is the default size.</Paragraph>
            </InfoSheet>
          )}

          {largeSheet.isOpen && (
            <InfoSheet
              title="Large Sheet"
              subtitle="440px wide"
              close={largeSheet.close}
              size="lg"
            >
              <Paragraph>This is a large info sheet (440px wide).</Paragraph>
            </InfoSheet>
          )}

          {fullWidthSheet.isOpen && (
            <InfoSheet
              title="Full Width Sheet"
              subtitle="Spans entire bottom"
              close={fullWidthSheet.close}
              size="fullWidth"
            >
              <Paragraph>This is a full width sheet that spans the entire bottom of the screen.</Paragraph>
            </InfoSheet>
          )}
        </div>

        {/* Not Elevated */}
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
            Not Elevated
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            When not elevated, the sheet has a left border instead of a drop shadow.
          </p>

          <Button onClick={notElevatedSheet.open}>Open Non-Elevated Sheet</Button>
          {notElevatedSheet.isOpen && (
            <InfoSheet
              title="Non-Elevated Sheet"
              subtitle="With border instead of shadow"
              close={notElevatedSheet.close}
              elevated={false}
            >
              <Paragraph>
                This sheet is not elevated and has a left border instead of a drop shadow.
              </Paragraph>
            </InfoSheet>
          )}
        </div>

        {/* With Footer Buttons */}
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
            With Footer Buttons
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Info sheet with action buttons in the footer.
          </p>

          <Button onClick={withFooterSheet.open}>Open Sheet with Footer</Button>
          {withFooterSheet.isOpen && (
            <InfoSheet
              title="Confirm Action"
              subtitle="Please review before proceeding"
              close={withFooterSheet.close}
              primaryButton={{
                label: 'Confirm',
                onClick: () => {
                  alert('Confirmed!')
                  withFooterSheet.close()
                }
              }}
              secondaryButton={{
                label: 'Cancel',
                onClick: withFooterSheet.close
              }}
            >
              <Paragraph style={{ marginBottom: '16px' }}>
                Are you sure you want to proceed with this action? This cannot be undone.
              </Paragraph>
              <Paragraph>
                Click "Confirm" to continue or "Cancel" to go back.
              </Paragraph>
            </InfoSheet>
          )}
        </div>

        {/* Rich Content */}
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
            Rich Content
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Info sheet can contain any content including data blocks, images, and forms.
          </p>

          <Button onClick={richContentSheet.open}>Open Rich Content Sheet</Button>
          {richContentSheet.isOpen && (
            <InfoSheet
              title="User Details"
              subtitle="View and manage user information"
              close={richContentSheet.close}
              size="lg"
              primaryButton={{
                label: 'Save Changes',
                onClick: () => {
                  alert('Changes saved!')
                  richContentSheet.close()
                }
              }}
              secondaryButton={{
                label: 'Cancel',
                onClick: richContentSheet.close
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <DataBlock heading="Full Name" paragraph="John Smith" />
                <DataBlock heading="Email" paragraph="john.smith@example.com" />
                <DataBlock heading="Role" paragraph="Administrator" />
                <DataBlock heading="Department" paragraph="Engineering" />
                <DataBlock heading="Location" paragraph="San Francisco, CA" />
                <DataBlock heading="Joined" paragraph="January 15, 2023" />
                <DataBlock heading="Last Active" paragraph="2 hours ago" />

                <div style={{
                  marginTop: '8px',
                  padding: '12px',
                  backgroundColor: '#F9FAFB',
                  borderRadius: '6px'
                }}>
                  <Paragraph size="sm" style={{ fontWeight: 600, marginBottom: '4px' }}>
                    About
                  </Paragraph>
                  <Paragraph size="sm" secondary>
                    John is a senior software engineer with over 10 years of experience in web development.
                    He specializes in React, Node.js, and cloud architecture.
                  </Paragraph>
                </div>
              </div>
            </InfoSheet>
          )}
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
{`import { InfoSheet, useInfoSheet } from '../components/InfoSheet'
import { Button } from '../components/Button'

const MyComponent = () => {
  const sheet = useInfoSheet()

  return (
    <>
      <Button onClick={sheet.open}>
        Open Info Sheet
      </Button>

      {sheet.isOpen && (
        <InfoSheet
          title="My Info Sheet"
          subtitle="Optional subtitle"
          close={sheet.close}
          size="md"
          elevated
          primaryButton={{
            label: 'Save',
            onClick: () => console.log('Saved!')
          }}
          secondaryButton={{
            label: 'Cancel',
            onClick: sheet.close
          }}
        >
          <p>Your content here</p>
        </InfoSheet>
      )}
    </>
  )
}

// Dockable example
const DockableExample = () => {
  const sheet = useInfoSheet()

  return (
    <>
      <Button onClick={sheet.open}>Open</Button>

      {sheet.isOpen && (
        <InfoSheet
          title="Dockable Sheet"
          close={sheet.close}
          dockable
          isDocked={sheet.isDocked}
          onDockToggle={sheet.toggleDock}
        >
          <p>Toggle between side and bottom</p>
        </InfoSheet>
      )}
    </>
  )
}`}
          </pre>
        </Card>
      </section>
    </div>
  )
}
