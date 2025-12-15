import { DialogOverlay, useDialog } from '../components/DialogOverlay'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Paragraph } from '../components/Paragraph'
import { TextField } from '../components/TextField'
import { useState } from 'react'

/**
 * DialogOverlay Showcase
 *
 * Displays the DialogOverlay component with documentation,
 * properties table, and interactive examples
 */
export const DialogOverlayShowcase = () => {
  const basicDialog = useDialog()
  const withSubtitleDialog = useDialog()
  const notClosableDialog = useDialog()
  const xsDialog = useDialog()
  const smDialog = useDialog()
  const mdDialog = useDialog()
  const lgDialog = useDialog()
  const xlDialog = useDialog()
  const xxlDialog = useDialog()
  const withFooterDialog = useDialog()
  const fullFeaturedDialog = useDialog()
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')

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
          DialogOverlay
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          A centered modal dialog with header, content area, and optional footer.
          Uses H5 heading with SM subtitle. Matches Zion UI design system.
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
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    isOpen
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Whether the dialog is open</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    close
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>function</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Function to close the dialog</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    title
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Dialog title (H5 heading)</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    subtitle
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Optional subtitle (SM paragraph, secondary)</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    closable
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>true</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Whether dialog can be closed with X button or ESC</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    size
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>'md'</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Dialog width</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    primaryButton
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>object</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Primary button config (high emphasis) {'{'}label, onClick{'}'}
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    secondaryButton
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>object</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Secondary button config (low emphasis) {'{'}label, onClick{'}'}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    leftButton
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>object</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Left-aligned button config (low emphasis) {'{'}label, onClick{'}'}
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    children
                  </code>
                </td>
                <td style={{ padding: '12px', color: '#6b7280' }}>node</td>
                <td style={{ padding: '12px', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', color: '#6b7280' }}>Dialog content</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      {/* Size Specifications */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Size Specifications
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
                }}>Size</th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  borderBottom: '1px solid #e5e7eb',
                  fontWeight: 600,
                  color: '#374151'
                }}>Width</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>xs</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>320px</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>sm</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>420px</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>md</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>564px</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>lg</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>700px</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>xl</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>900px</td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px' }}>xxl</td>
                <td style={{ padding: '12px', color: '#6b7280' }}>1200px</td>
              </tr>
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
          useDialog Hook
        </h2>
        <Card size="sm" variant="elevated">
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            lineHeight: '1.6',
            marginBottom: '12px'
          }}>
            Manages dialog state. Returns an object with:
          </p>
          <ul style={{
            fontSize: '14px',
            color: '#6b7280',
            lineHeight: '1.8',
            paddingLeft: '24px',
            margin: 0
          }}>
            <li><code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>isOpen</code> - boolean indicating if dialog is open</li>
            <li><code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>open()</code> - function to open the dialog</li>
            <li><code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>close()</code> - function to close the dialog</li>
            <li><code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>handleClick()</code> - function to toggle the dialog</li>
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

        {/* Basic Dialog */}
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
            Basic Dialog
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Simple dialog with title and content.
          </p>
          <Button onClick={basicDialog.open}>
            Open Basic Dialog
          </Button>

          <DialogOverlay
            {...basicDialog}
            title="Basic Dialog"
          >
            <Paragraph size="sm">
              This is a basic dialog with just a title and content.
              You can close it by clicking the X button, pressing ESC, or clicking outside.
            </Paragraph>
          </DialogOverlay>
        </div>

        {/* With Subtitle */}
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
            With Subtitle
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Dialog with a subtitle below the title.
          </p>
          <Button onClick={withSubtitleDialog.open}>
            Open With Subtitle
          </Button>

          <DialogOverlay
            {...withSubtitleDialog}
            title="Update Profile"
            subtitle="Make changes to your profile information"
          >
            <Paragraph size="sm">
              This dialog includes a subtitle that provides additional context about the dialog's purpose.
            </Paragraph>
          </DialogOverlay>
        </div>

        {/* Not Closable */}
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
            Not Closable
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Dialog that requires user action (no X button, no ESC, no click outside).
          </p>
          <Button onClick={notClosableDialog.open}>
            Open Non-Closable Dialog
          </Button>

          <DialogOverlay
            {...notClosableDialog}
            title="Unsaved Changes"
            subtitle="You have unsaved changes"
            closable={false}
            primaryButton={{
              label: 'Save',
              onClick: () => {
                alert('Saved!')
                notClosableDialog.close()
              }
            }}
            secondaryButton={{
              label: 'Discard',
              onClick: notClosableDialog.close
            }}
          >
            <Paragraph size="sm">
              This dialog cannot be closed with ESC or by clicking outside.
              You must click one of the buttons.
            </Paragraph>
          </DialogOverlay>
        </div>

        {/* Size Examples */}
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
            Dialogs in different sizes (xs, sm, md, lg, xl, xxl).
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button onClick={xsDialog.open}>XS (320px)</Button>
            <Button onClick={smDialog.open}>SM (420px)</Button>
            <Button onClick={mdDialog.open}>MD (564px)</Button>
            <Button onClick={lgDialog.open}>LG (700px)</Button>
            <Button onClick={xlDialog.open}>XL (900px)</Button>
            <Button onClick={xxlDialog.open}>XXL (1200px)</Button>
          </div>

          <DialogOverlay {...xsDialog} title="Extra Small" size="xs">
            <Paragraph size="sm">This is an extra small dialog (320px wide).</Paragraph>
          </DialogOverlay>

          <DialogOverlay {...smDialog} title="Small" size="sm">
            <Paragraph size="sm">This is a small dialog (420px wide).</Paragraph>
          </DialogOverlay>

          <DialogOverlay {...mdDialog} title="Medium" size="md">
            <Paragraph size="sm">This is a medium dialog (564px wide). This is the default size.</Paragraph>
          </DialogOverlay>

          <DialogOverlay {...lgDialog} title="Large" size="lg">
            <Paragraph size="sm">This is a large dialog (700px wide).</Paragraph>
          </DialogOverlay>

          <DialogOverlay {...xlDialog} title="Extra Large" size="xl">
            <Paragraph size="sm">This is an extra large dialog (900px wide).</Paragraph>
          </DialogOverlay>

          <DialogOverlay {...xxlDialog} title="Extra Extra Large" size="xxl">
            <Paragraph size="sm">This is an extra extra large dialog (1200px wide).</Paragraph>
          </DialogOverlay>
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
            Dialog with primary, secondary, and left-aligned buttons in footer.
          </p>
          <Button onClick={withFooterDialog.open}>
            Open With Footer
          </Button>

          <DialogOverlay
            {...withFooterDialog}
            title="Confirm Action"
            subtitle="This action cannot be undone"
            leftButton={{
              label: 'Learn More',
              onClick: () => alert('Learn more clicked')
            }}
            primaryButton={{
              label: 'Confirm',
              onClick: () => {
                alert('Confirmed!')
                withFooterDialog.close()
              }
            }}
            secondaryButton={{
              label: 'Cancel',
              onClick: withFooterDialog.close
            }}
          >
            <Paragraph size="sm">
              This dialog demonstrates the footer with three buttons:
              a left-aligned button and two right-aligned buttons
              (secondary low emphasis and primary high emphasis).
            </Paragraph>
          </DialogOverlay>
        </div>

        {/* Full Featured */}
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
            Full Featured Dialog
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Complete dialog with all features.
          </p>
          <Button onClick={fullFeaturedDialog.open}>
            Open Full Featured Dialog
          </Button>

          <DialogOverlay
            {...fullFeaturedDialog}
            title="Create New Project"
            subtitle="Set up your new project with a name and description"
            size="lg"
            leftButton={{
              label: 'Import from Template',
              onClick: () => alert('Import clicked')
            }}
            primaryButton={{
              label: 'Create Project',
              onClick: () => {
                alert('Project created!')
                fullFeaturedDialog.close()
              }
            }}
            secondaryButton={{
              label: 'Cancel',
              onClick: fullFeaturedDialog.close
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <TextField
                label="Project Name:"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name..."
              />
              <TextField
                label="Description:"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Enter project description..."
              />
            </div>
          </DialogOverlay>
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
{`import { DialogOverlay, useDialog } from '../components/DialogOverlay'
import { Button } from '../components/Button'

const MyComponent = () => {
  const dialog = useDialog()

  return (
    <>
      <Button onClick={dialog.open}>
        Open Dialog
      </Button>

      <DialogOverlay
        {...dialog}
        title="Dialog Title"
        subtitle="Optional subtitle text"
        size="md"
        closable={true}
        leftButton={{
          label: 'Action',
          onClick: () => console.log('Action')
        }}
        primaryButton={{
          label: 'Confirm',
          onClick: () => {
            console.log('Confirmed')
            dialog.close()
          }
        }}
        secondaryButton={{
          label: 'Cancel',
          onClick: dialog.close
        }}
      >
        <p>Your dialog content here</p>
      </DialogOverlay>
    </>
  )
}`}
          </pre>
        </Card>
      </section>
    </div>
  )
}
