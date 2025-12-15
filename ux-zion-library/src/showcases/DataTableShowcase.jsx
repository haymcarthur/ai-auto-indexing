import { DataTable } from '../components/DataTable'
import { Button } from '../components/Button'
import { IconButton } from '../components/IconButton'
import { Card } from '../components/Card'
import { ContentDownload } from '../icons'
import { bold } from '../tokens/typography'

/**
 * DataTable Showcase
 *
 * Displays the DataTable component with documentation and interactive examples
 */
export const DataTableShowcase = () => {
  // Example 1: Simple text data
  const simpleColumns = [
    { header: 'Name', key: 'name' },
    { header: 'Email', key: 'email' },
    { header: 'Role', key: 'role' }
  ]

  const simpleData = [
    { name: 'John Smith', email: 'john.smith@example.com', role: 'Administrator' },
    { name: 'Jane Doe', email: 'jane.doe@example.com', role: 'Editor' },
    { name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'Viewer' }
  ]

  // Example 2: Mixed content with components
  const mixedColumns = [
    { header: 'Document', key: 'document' },
    { header: 'Status', key: 'status' },
    { header: 'Actions', key: 'actions' }
  ]

  const mixedData = [
    {
      document: 'Project Proposal.pdf',
      status: (
        <span style={{ ...bold.c, color: '#059669' }}>Complete</span>
      ),
      actions: (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button emphasis="low" variant="blue" inline>View</Button>
          <IconButton icon={ContentDownload} emphasis="low" variant="blue" size="sm" />
        </div>
      )
    },
    {
      document: 'Design Mockups.sketch',
      status: (
        <span style={{ ...bold.c, color: '#F59E0B' }}>In Progress</span>
      ),
      actions: (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button emphasis="low" variant="blue" inline>View</Button>
          <IconButton icon={ContentDownload} emphasis="low" variant="blue" size="sm" />
        </div>
      )
    },
    {
      document: 'User Research.docx',
      status: (
        <span style={{ ...bold.c, color: '#6B7280' }}>Pending</span>
      ),
      actions: (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button emphasis="low" variant="blue" inline>View</Button>
          <IconButton icon={ContentDownload} emphasis="low" variant="blue" size="sm" />
        </div>
      )
    }
  ]

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
          Data Table
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          A flexible table component for displaying data in rows and columns with support for
          custom components and content.
        </p>
      </div>

      {/* Simple Text Example */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Simple Text Data
        </h2>
        <Card size="sm" variant="elevated" style={{ marginBottom: '24px' }}>
          <div style={{ padding: '24px' }}>
            <DataTable columns={simpleColumns} data={simpleData} />
          </div>
        </Card>
      </section>

      {/* Mixed Content Example */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Mixed Content with Components
        </h2>
        <Card size="sm" variant="elevated" style={{ marginBottom: '24px' }}>
          <div style={{ padding: '24px' }}>
            <DataTable columns={mixedColumns} data={mixedData} />
          </div>
        </Card>
      </section>

      {/* Features */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Features
        </h2>
        <Card size="sm" variant="elevated">
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#374151', lineHeight: '1.8' }}>
            <li>Headers use Bold C typography (heading base/.Bold C)</li>
            <li>Default cell content uses paragraph.sm typography</li>
            <li>No vertical lines between columns</li>
            <li>Divider separates headers from data rows</li>
            <li>26px spacing between rows</li>
            <li>58px spacing between columns</li>
            <li>Compatible with custom components (buttons, icons, etc.)</li>
            <li>Flexible cell rendering with custom renderer function</li>
            <li>React elements can be passed directly as cell values</li>
          </ul>
        </Card>
      </section>

      {/* Usage */}
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
{`import { DataTable } from './components/DataTable'
import { Button } from './components/Button'

function MyComponent() {
  const columns = [
    { header: 'Name', key: 'name' },
    { header: 'Email', key: 'email' },
    { header: 'Actions', key: 'actions' }
  ]

  const data = [
    {
      name: 'John Smith',
      email: 'john.smith@example.com',
      actions: <Button emphasis="low" variant="blue">Edit</Button>
    },
    {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      actions: <Button emphasis="low" variant="blue">Edit</Button>
    }
  ]

  return <DataTable columns={columns} data={data} />
}`}
        </pre>
      </section>
    </div>
  )
}
