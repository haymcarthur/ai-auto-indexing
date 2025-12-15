import { FullPageOverlay, useOverlay } from './FullPageOverlay'
import { Button, Row } from '@fs/zion-ui'
import { NoticeInfo } from '@fs/zion-icon'

/**
 * Example usage of FullPageOverlay
 * This demonstrates how to use the component with the same API as Zion
 */
export const FullPageOverlayExample = () => {
  const overlay = useOverlay()

  // Action buttons configuration
  const actions = [
    {
      label: 'Cancel',
      onClick: overlay.close
    },
    {
      label: 'Info',
      Icon: NoticeInfo,
      onClick: () => alert('Info clicked')
    }
  ]

  // Footer content
  const footer = (
    <Row alignX="end" gap={2}>
      <Button emphasis="high" onClick={() => {
        alert('Submitted!')
        overlay.close()
      }}>
        Submit
      </Button>
      <Button onClick={overlay.close}>
        Cancel
      </Button>
    </Row>
  )

  return (
    <>
      <Button onClick={overlay.handleClick}>
        Open Full Page Overlay
      </Button>

      <FullPageOverlay
        {...overlay}
        title="Example Overlay"
        actions={actions}
        footer={footer}
      >
        <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
          <h2>Content Goes Here</h2>
          <p>This is an example of a full-page overlay that matches Zion's design.</p>
          <p>It supports:</p>
          <ul>
            <li>Header with title and actions</li>
            <li>Scrollable content area</li>
            <li>Optional footer</li>
            <li>ESC key to close</li>
            <li>Body scroll lock when open</li>
          </ul>
        </div>
      </FullPageOverlay>
    </>
  )
}
