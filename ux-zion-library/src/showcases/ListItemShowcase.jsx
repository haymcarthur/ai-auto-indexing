import { ListItem } from '../components/ListItem'
import { Info, Settings, Arrow } from '../icons'
import imageAvatar from '../assets/imageAvatar.svg'

/**
 * ListItem Showcase
 *
 * Displays the ListItem component with documentation,
 * properties table, and interactive examples
 */
export const ListItemShowcase = () => {
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
          ListItem
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          A clickable list item component with optional start/end elements and text block.
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
                  startElement
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>node</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Optional start element (icon, image, checkbox)
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  avatar
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>object</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Avatar configuration (type, name, photoSrc, grayMode). Renders as sm size. Takes priority over startElement.
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  overline
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Optional overline text (xs, secondary)
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  heading
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Heading text (sm, primary) - required
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  subheading
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Optional subheading text (xs, secondary)
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  endIcon
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>node</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Optional end icon (vertically centered)
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  metaText
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Optional meta text instead of icon (xs, top aligned)
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  onClick
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>function</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Click handler for the entire list item
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  dense
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>false</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Use dense padding (2px vs 12px top/bottom)
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Specifications */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Specifications
        </h2>
        <ul style={{
          fontSize: '14px',
          color: '#6b7280',
          lineHeight: '1.8',
          paddingLeft: '24px',
          marginBottom: '24px'
        }}>
          <li>Overline: XS paragraph, #000305 73.7% opacity</li>
          <li>Heading: SM paragraph, #202121</li>
          <li>Subheading: XS paragraph, #000305 73.7% opacity</li>
          <li>Spacing between text elements: 2px</li>
          <li>Gap from start element to text: 16px</li>
          <li>Gap from text to end element: 16px</li>
          <li>Padding (normal): 12px top/bottom</li>
          <li>Padding (dense): 2px top/bottom</li>
          <li>Hover background: #000F0F 13.3% opacity</li>
          <li>Border radius: 4px</li>
          <li>Alignment: All elements vertically centered (except meta text which is top aligned)</li>
        </ul>
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

        {/* Basic Example */}
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
            Basic ListItem
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Simple list item with just heading text.
          </p>
          <ListItem
            heading="Basic List Item"
            onClick={() => alert('Item clicked!')}
          />
        </div>

        {/* Full Example */}
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
            Full ListItem with All Text Elements
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            List item with overline, heading, and subheading.
          </p>
          <ListItem
            overline="Overline Text"
            heading="Main Heading Text"
            subheading="Subheading with additional details"
            onClick={() => alert('Item clicked!')}
          />
        </div>

        {/* With Start Icon */}
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
            With Start Icon
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            List item with an icon at the start.
          </p>
          <ListItem
            startElement={<Info width="24px" height="24px" />}
            overline="Information"
            heading="List Item with Icon"
            subheading="This item has an icon at the start"
            onClick={() => alert('Item clicked!')}
          />
        </div>

        {/* With End Icon */}
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
            With End Icon
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            List item with an arrow icon at the end.
          </p>
          <ListItem
            heading="Clickable Item"
            subheading="Click to navigate"
            endIcon={<Arrow width="20px" height="20px" direction="forward" />}
            onClick={() => alert('Navigating...')}
          />
        </div>

        {/* With Meta Text */}
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
            With Meta Text
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            List item with meta text (top aligned) instead of an icon.
          </p>
          <ListItem
            overline="Document"
            heading="1950 US Census"
            subheading="Glendale, California"
            metaText="2 days ago"
            onClick={() => alert('Item clicked!')}
          />
        </div>

        {/* Full with Start and End */}
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
            Complete Example
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            List item with start icon, all text elements, and end icon.
          </p>
          <ListItem
            startElement={<Settings width="24px" height="24px" />}
            overline="Settings"
            heading="Account Settings"
            subheading="Manage your account preferences"
            endIcon={<Arrow width="20px" height="20px" direction="forward" />}
            onClick={() => alert('Opening settings...')}
          />
        </div>

        {/* Dense Mode */}
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
            Dense Mode
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            List items with reduced padding (2px vs 12px).
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ListItem
              heading="Dense Item 1"
              subheading="Compact spacing"
              endIcon={<Arrow width="20px" height="20px" direction="forward" />}
              dense
              onClick={() => alert('Item 1')}
            />
            <ListItem
              heading="Dense Item 2"
              subheading="Compact spacing"
              endIcon={<Arrow width="20px" height="20px" direction="forward" />}
              dense
              onClick={() => alert('Item 2')}
            />
            <ListItem
              heading="Dense Item 3"
              subheading="Compact spacing"
              endIcon={<Arrow width="20px" height="20px" direction="forward" />}
              dense
              onClick={() => alert('Item 3')}
            />
          </div>
        </div>

        {/* List of Items */}
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
            Multiple List Items
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Stack multiple list items to create a list.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ListItem
              startElement={<Info width="24px" height="24px" />}
              overline="Record"
              heading="John Smith"
              subheading="Age 42, Mechanical Engineer"
              metaText="Line 1"
              onClick={() => alert('John Smith')}
            />
            <ListItem
              startElement={<Info width="24px" height="24px" />}
              overline="Record"
              heading="Mary Johnson"
              subheading="Age 38, School Teacher"
              metaText="Line 2"
              onClick={() => alert('Mary Johnson')}
            />
            <ListItem
              startElement={<Info width="24px" height="24px" />}
              overline="Record"
              heading="Robert Williams"
              subheading="Age 55, Factory Worker"
              metaText="Line 3"
              onClick={() => alert('Robert Williams')}
            />
            <ListItem
              startElement={<Info width="24px" height="24px" />}
              overline="Record"
              heading="Susan Brown"
              subheading="Age 29, Nurse"
              metaText="Line 4"
              onClick={() => alert('Susan Brown')}
            />
          </div>
        </div>

        {/* With Checkbox */}
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
            With Checkbox
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            List items with checkboxes as start elements.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ListItem
              startElement={
                <input type="checkbox" style={{ width: '20px', height: '20px' }} />
              }
              heading="Task 1: Review census data"
              subheading="Due tomorrow"
              onClick={() => {}}
            />
            <ListItem
              startElement={
                <input type="checkbox" style={{ width: '20px', height: '20px' }} defaultChecked />
              }
              heading="Task 2: Update records"
              subheading="Completed"
              onClick={() => {}}
            />
            <ListItem
              startElement={
                <input type="checkbox" style={{ width: '20px', height: '20px' }} />
              }
              heading="Task 3: Export to PDF"
              subheading="Pending"
              onClick={() => {}}
            />
          </div>
        </div>

        {/* With Avatar */}
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
            With Avatar
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            List items with avatar as the start element. The avatar prop automatically renders at sm size.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ListItem
              avatar={{ type: 'monogram', name: 'John Smith' }}
              overline="User"
              heading="John Smith"
              subheading="Software Engineer"
              onClick={() => alert('John Smith')}
            />
            <ListItem
              avatar={{ type: 'monogram', name: 'Sarah Johnson' }}
              overline="User"
              heading="Sarah Johnson"
              subheading="Product Manager"
              onClick={() => alert('Sarah Johnson')}
            />
            <ListItem
              avatar={{ type: 'male' }}
              overline="Profile"
              heading="User Profile"
              subheading="View account details"
              endIcon={<Arrow width="20px" height="20px" direction="forward" />}
              onClick={() => alert('Profile')}
            />
            <ListItem
              avatar={{ type: 'female', grayMode: true }}
              overline="Inactive"
              heading="Inactive User"
              subheading="Account disabled"
              onClick={() => alert('Inactive')}
            />
            <ListItem
              avatar={{ type: 'photo', photoSrc: imageAvatar }}
              heading="User with Photo"
              subheading="Custom profile image"
              metaText="Online"
              onClick={() => alert('Photo user')}
            />
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Code Examples
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
{`import { ListItem } from './components/ListItem'
import { Info, Settings, Arrow } from './icons'

// Basic list item
<ListItem
  heading="Basic List Item"
  onClick={() => alert('Clicked!')}
/>

// Full list item with all text
<ListItem
  overline="Overline Text"
  heading="Main Heading Text"
  subheading="Subheading with details"
  onClick={() => alert('Clicked!')}
/>

// With start icon
<ListItem
  startElement={<Info width="24px" height="24px" />}
  heading="List Item with Icon"
  subheading="Has icon at start"
  onClick={() => alert('Clicked!')}
/>

// With end icon
<ListItem
  heading="Clickable Item"
  subheading="Click to navigate"
  endIcon={<Arrow width="20px" height="20px" direction="forward" />}
  onClick={() => alert('Navigate')}
/>

// With meta text (instead of icon)
<ListItem
  overline="Document"
  heading="1950 US Census"
  subheading="Glendale, California"
  metaText="2 days ago"
  onClick={() => alert('Clicked!')}
/>

// Complete example
<ListItem
  startElement={<Settings width="24px" height="24px" />}
  overline="Settings"
  heading="Account Settings"
  subheading="Manage preferences"
  endIcon={<Arrow width="20px" height="20px" />}
  onClick={() => alert('Open settings')}
/>

// Dense mode (reduced padding)
<ListItem
  heading="Dense Item"
  subheading="Compact spacing"
  dense
  onClick={() => alert('Clicked!')}
/>

// With checkbox
<ListItem
  startElement={<input type="checkbox" style={{ width: '20px', height: '20px' }} />}
  heading="Task item"
  subheading="Click to toggle"
  onClick={() => {}}
/>

// With avatar (monogram)
<ListItem
  avatar={{ type: 'monogram', name: 'John Smith' }}
  heading="John Smith"
  subheading="Software Engineer"
  onClick={() => alert('Clicked!')}
/>

// With avatar (preset type)
<ListItem
  avatar={{ type: 'male' }}
  heading="User Profile"
  subheading="View details"
  onClick={() => alert('Profile')}
/>

// With avatar (gray mode)
<ListItem
  avatar={{ type: 'female', grayMode: true }}
  heading="Inactive User"
  subheading="Account disabled"
  onClick={() => alert('Inactive')}
/>

// With avatar (photo)
<ListItem
  avatar={{ type: 'photo', photoSrc: '/path/to/photo.jpg' }}
  heading="User with Photo"
  subheading="Custom profile"
  metaText="Online"
  onClick={() => alert('Photo user')}
/>`}
        </pre>
      </section>
    </div>
  )
}
