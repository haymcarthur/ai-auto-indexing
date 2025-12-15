import { MenuOverlay, useMenuOverlay } from '../components/MenuOverlay'
import { ListItem } from '../components/ListItem'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Settings, Home, Person, HelpAnnouncement, Info } from '../icons'

/**
 * MenuOverlay Showcase
 *
 * Displays the MenuOverlay component with documentation and interactive examples
 */
export const MenuOverlayShowcase = () => {
  const bottomMenu = useMenuOverlay()
  const topMenu = useMenuOverlay()
  const leftMenu = useMenuOverlay()
  const rightMenu = useMenuOverlay()

  const handleMenuItemClick = (item) => {
    console.log('Menu item clicked:', item)
    // Close all menus when an item is clicked
    bottomMenu.close()
    topMenu.close()
    leftMenu.close()
    rightMenu.close()
  }

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
          MenuOverlay
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          A popover menu overlay anchored to elements, populated with list items.
          No vertical padding, 16px horizontal padding, 8px corner radius, gray00 fill, elevation-4.
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
                    isOpen
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Whether the overlay is open
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    close
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>function</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Function to close the overlay
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    anchorRef
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>ref</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Ref to the element to anchor to
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    position
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>'bottom'</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Position: 'top', 'bottom', 'left', 'right'
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    offset
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>number</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>8</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Distance from anchor in pixels
                </td>
              </tr>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    width
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>'auto'</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Optional width (e.g., '200px')
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                    children
                  </code>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>node</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                  Menu content (typically ListItem components)
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
        <div style={{
          padding: '48px 24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: '#f9fafb'
        }}>
          <div style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {/* Bottom Position */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#6b7280' }}>Bottom (default)</span>
              <Button
                ref={bottomMenu.anchorRef}
                onClick={bottomMenu.handleClick}
                variant="blue"
              >
                Open Menu
              </Button>
              <MenuOverlay
                isOpen={bottomMenu.isOpen}
                close={bottomMenu.close}
                anchorRef={bottomMenu.anchorRef}
                position="bottom"
                width="240px"
              >
                <ListItem
                  startElement={<Home size="sm" />}
                  heading="Home"
                  onClick={() => handleMenuItemClick('home')}
                  fullWidth
                  isFirst
                />
                <ListItem
                  startElement={<Person size="sm" />}
                  heading="Profile"
                  onClick={() => handleMenuItemClick('profile')}
                  fullWidth
                />
                <ListItem
                  startElement={<Settings size="sm" />}
                  heading="Settings"
                  onClick={() => handleMenuItemClick('settings')}
                  fullWidth
                />
                <ListItem
                  startElement={<HelpAnnouncement size="sm" />}
                  heading="Notifications"
                  onClick={() => handleMenuItemClick('notifications')}
                  fullWidth
                />
                <ListItem
                  startElement={<Info size="sm" />}
                  heading="About"
                  onClick={() => handleMenuItemClick('about')}
                  fullWidth
                  isLast
                />
              </MenuOverlay>
            </div>

            {/* Top Position */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#6b7280' }}>Top</span>
              <Button
                ref={topMenu.anchorRef}
                onClick={topMenu.handleClick}
                variant="gray"
              >
                Open Menu
              </Button>
              <MenuOverlay
                isOpen={topMenu.isOpen}
                close={topMenu.close}
                anchorRef={topMenu.anchorRef}
                position="top"
                width="240px"
              >
                <ListItem
                  startElement={<Home size="sm" />}
                  heading="Home"
                  onClick={() => handleMenuItemClick('home')}
                  fullWidth
                  isFirst
                />
                <ListItem
                  startElement={<Person size="sm" />}
                  heading="Profile"
                  onClick={() => handleMenuItemClick('profile')}
                  fullWidth
                />
                <ListItem
                  startElement={<Settings size="sm" />}
                  heading="Settings"
                  onClick={() => handleMenuItemClick('settings')}
                  fullWidth
                  isLast
                />
              </MenuOverlay>
            </div>

            {/* Left Position */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#6b7280' }}>Left</span>
              <Button
                ref={leftMenu.anchorRef}
                onClick={leftMenu.handleClick}
                variant="blue"
                emphasis="medium"
              >
                Open Menu
              </Button>
              <MenuOverlay
                isOpen={leftMenu.isOpen}
                close={leftMenu.close}
                anchorRef={leftMenu.anchorRef}
                position="left"
                width="240px"
              >
                <ListItem
                  startElement={<Home size="sm" />}
                  heading="Home"
                  onClick={() => handleMenuItemClick('home')}
                  fullWidth
                  isFirst
                />
                <ListItem
                  startElement={<Person size="sm" />}
                  heading="Profile"
                  onClick={() => handleMenuItemClick('profile')}
                  fullWidth
                  isLast
                />
              </MenuOverlay>
            </div>

            {/* Right Position */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#6b7280' }}>Right</span>
              <Button
                ref={rightMenu.anchorRef}
                onClick={rightMenu.handleClick}
                variant="gray"
                emphasis="medium"
              >
                Open Menu
              </Button>
              <MenuOverlay
                isOpen={rightMenu.isOpen}
                close={rightMenu.close}
                anchorRef={rightMenu.anchorRef}
                position="right"
                width="240px"
              >
                <ListItem
                  startElement={<Home size="sm" />}
                  heading="Home"
                  onClick={() => handleMenuItemClick('home')}
                  fullWidth
                  isFirst
                />
                <ListItem
                  startElement={<Person size="sm" />}
                  heading="Profile"
                  onClick={() => handleMenuItemClick('profile')}
                  fullWidth
                  isLast
                />
              </MenuOverlay>
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
{`import { MenuOverlay, useMenuOverlay } from './components/MenuOverlay'
import { ListItem } from './components/ListItem'
import { Button } from './components/Button'
import { Home, Person, Settings } from './icons'

function MyComponent() {
  const menu = useMenuOverlay()

  return (
    <>
      <Button
        ref={menu.anchorRef}
        onClick={menu.handleClick}
      >
        Open Menu
      </Button>

      <MenuOverlay
        isOpen={menu.isOpen}
        close={menu.close}
        anchorRef={menu.anchorRef}
        position="bottom"
        width="240px"
      >
        <ListItem
          startElement={<Home size="sm" />}
          heading="Home"
          onClick={() => {
            console.log('Home clicked')
            menu.close()
          }}
        />
        <ListItem
          startElement={<Person size="sm" />}
          heading="Profile"
          onClick={() => {
            console.log('Profile clicked')
            menu.close()
          }}
        />
        <ListItem
          startElement={<Settings size="sm" />}
          heading="Settings"
          onClick={() => {
            console.log('Settings clicked')
            menu.close()
          }}
        />
      </MenuOverlay>
    </>
  )
}`}
        </pre>
      </section>
    </div>
  )
}
