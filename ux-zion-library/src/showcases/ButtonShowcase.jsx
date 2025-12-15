import { Button } from '../components/Button'
import { BillboardButton } from '../components/BillboardButton'
import { Arrow, Info, Settings } from '../icons'

/**
 * Button Showcase
 *
 * Displays the Button component with documentation,
 * properties table, and interactive examples
 */
export const ButtonShowcase = () => {
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
          Button
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          A button component with color variants, emphasis levels, and icon support.
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
                  variant
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                'blue' | 'gray' | 'danger'
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                'blue'
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Color variant of the button
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  emphasis
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                'high' | 'medium' | 'low'
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                'high'
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Visual emphasis level (solid, outlined, text)
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
                Click handler function
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  disabled
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>false</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Whether button is disabled
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  iconStart
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>component</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Optional icon component at the start
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  iconEnd
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>component</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Optional icon component at the end
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  type
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                'button' | 'submit' | 'reset'
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                'button'
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                HTML button type attribute
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  children
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>node</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Button content (automatically uppercase)
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  inline
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>false</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Remove horizontal padding (only for low emphasis)
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  moreLess
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>false</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Compact style with 4px horizontal padding and 16px height (only for low emphasis)
              </td>
            </tr>
          </tbody>
        </table>
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

        {/* Color Variants - High Emphasis */}
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
            Color Variants (Solid)
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            High emphasis buttons with solid backgrounds. Blue for primary actions, Gray for secondary, Danger for destructive actions.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button variant="blue" emphasis="high" onClick={() => alert('Blue clicked')}>
              Primary Action
            </Button>
            <Button variant="gray" emphasis="high" onClick={() => alert('Gray clicked')}>
              Secondary Action
            </Button>
            <Button variant="danger" emphasis="high" onClick={() => alert('Danger clicked')}>
              Delete Item
            </Button>
          </div>
        </div>

        {/* Color Variants - Medium Emphasis */}
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
            Color Variants (Outlined)
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Medium emphasis buttons with outlined borders.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button variant="blue" emphasis="medium" onClick={() => alert('Blue outlined')}>
              Primary Action
            </Button>
            <Button variant="gray" emphasis="medium" onClick={() => alert('Gray outlined')}>
              Secondary Action
            </Button>
            <Button variant="danger" emphasis="medium" onClick={() => alert('Danger outlined')}>
              Delete Item
            </Button>
          </div>
        </div>

        {/* Color Variants - Low Emphasis */}
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
            Color Variants (Text Only)
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Low emphasis buttons with text only, no border or background.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button variant="blue" emphasis="low" onClick={() => alert('Blue text')}>
              Primary Action
            </Button>
            <Button variant="gray" emphasis="low" onClick={() => alert('Gray text')}>
              Secondary Action
            </Button>
            <Button variant="danger" emphasis="low" onClick={() => alert('Danger text')}>
              Delete Item
            </Button>
          </div>
        </div>

        {/* Inline Low Emphasis */}
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
            Inline Low Emphasis
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Low emphasis buttons with inline prop remove horizontal padding for use within text.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button variant="blue" emphasis="low" inline onClick={() => alert('Inline')}>
              Inline Button
            </Button>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>
              This is text with an
              <Button variant="blue" emphasis="low" inline onClick={() => alert('Inline link')}>
                inline button
              </Button>
              inside it.
            </span>
          </div>
        </div>

        {/* More/Less Button */}
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
            More/Less Button
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Compact more/less button style with 4px horizontal padding and 16px height (only for low emphasis).
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button variant="blue" emphasis="low" moreLess onClick={() => alert('More')}>
              More
            </Button>
            <Button variant="blue" emphasis="low" moreLess onClick={() => alert('Less')}>
              Less
            </Button>
            <Button variant="gray" emphasis="low" moreLess onClick={() => alert('Show More')}>
              Show More
            </Button>
          </div>
        </div>

        {/* With Icons */}
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
            With Icons
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Buttons can have icons at the start or end position.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button variant="blue" iconStart={Arrow} onClick={() => alert('Icon start')}>
              Back
            </Button>
            <Button variant="blue" iconEnd={Arrow} onClick={() => alert('Icon end')}>
              Next
            </Button>
            <Button variant="gray" iconStart={Info} onClick={() => alert('Info')}>
              Learn More
            </Button>
            <Button variant="gray" iconStart={Settings} onClick={() => alert('Settings')}>
              Settings
            </Button>
          </div>
        </div>

        {/* Disabled State */}
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
            Disabled State
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Buttons can be disabled to prevent interaction. High emphasis uses gray40 fill, medium emphasis uses gray40 outline, and low emphasis uses gray40 text only.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button variant="blue" emphasis="high" disabled>
              Disabled Solid
            </Button>
            <Button variant="blue" emphasis="medium" disabled>
              Disabled Outlined
            </Button>
            <Button variant="blue" emphasis="low" disabled>
              Disabled Text
            </Button>
          </div>
        </div>

        {/* Interactive States */}
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
            Interactive States
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Buttons have hover and active states for visual feedback. Try hovering and clicking these buttons.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button variant="blue" emphasis="high" onClick={() => {}}>
              Hover Me
            </Button>
            <Button variant="gray" emphasis="medium" onClick={() => {}}>
              Click Me
            </Button>
            <Button variant="danger" emphasis="low" onClick={() => {}}>
              Try Me
            </Button>
          </div>
        </div>
      </section>

      {/* Billboard Button */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '24px'
        }}>
          Billboard Button
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '24px'
        }}>
          A larger 44px button variant with extended color options (gray, blue, green, yellow, red, purple)
          and an additional lightHigh emphasis level. Use Billboard buttons for prominent actions and hero sections.
        </p>

        {/* High Emphasis */}
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
            High Emphasis (Solid)
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            High emphasis buttons with solid backgrounds in all color variants.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <BillboardButton variant="gray" emphasis="high" onClick={() => {}}>
              Gray
            </BillboardButton>
            <BillboardButton variant="blue" emphasis="high" onClick={() => {}}>
              Blue
            </BillboardButton>
            <BillboardButton variant="green" emphasis="high" onClick={() => {}}>
              Green
            </BillboardButton>
            <BillboardButton variant="yellow" emphasis="high" onClick={() => {}}>
              Yellow
            </BillboardButton>
            <BillboardButton variant="red" emphasis="high" onClick={() => {}}>
              Red
            </BillboardButton>
            <BillboardButton variant="purple" emphasis="high" onClick={() => {}}>
              Purple
            </BillboardButton>
          </div>
        </div>

        {/* Light High Emphasis */}
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
            Light High Emphasis (Light Solid)
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Light high emphasis buttons with light backgrounds and darker text.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <BillboardButton variant="gray" emphasis="lightHigh" onClick={() => {}}>
              Gray
            </BillboardButton>
            <BillboardButton variant="blue" emphasis="lightHigh" onClick={() => {}}>
              Blue
            </BillboardButton>
            <BillboardButton variant="green" emphasis="lightHigh" onClick={() => {}}>
              Green
            </BillboardButton>
            <BillboardButton variant="yellow" emphasis="lightHigh" onClick={() => {}}>
              Yellow
            </BillboardButton>
            <BillboardButton variant="red" emphasis="lightHigh" onClick={() => {}}>
              Red
            </BillboardButton>
            <BillboardButton variant="purple" emphasis="lightHigh" onClick={() => {}}>
              Purple
            </BillboardButton>
          </div>
        </div>

        {/* Medium and Low Emphasis */}
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
            Medium & Low Emphasis
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Billboard buttons also support medium (outlined) and low (text-only) emphasis levels.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <BillboardButton variant="blue" emphasis="medium" onClick={() => {}}>
              Medium
            </BillboardButton>
            <BillboardButton variant="blue" emphasis="low" onClick={() => {}}>
              Low
            </BillboardButton>
          </div>
        </div>

        {/* With Icons */}
        <div style={{
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
            With Icons
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Billboard buttons support icons at start or end positions.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <BillboardButton variant="blue" emphasis="high" iconStart={Arrow} onClick={() => {}}>
              Back
            </BillboardButton>
            <BillboardButton variant="green" emphasis="lightHigh" iconEnd={Arrow} onClick={() => {}}>
              Next
            </BillboardButton>
            <BillboardButton variant="purple" emphasis="high" iconStart={Settings} onClick={() => {}}>
              Settings
            </BillboardButton>
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
{`import { Button } from './components/Button'
import { BillboardButton } from './components/BillboardButton'
import { Arrow, Info } from './icons'

// Regular Buttons (40px height)
// =============================

// Primary button (blue, solid)
<Button variant="blue" onClick={handleSubmit}>
  Submit
</Button>

// Secondary button (gray, solid)
<Button variant="gray" onClick={handleCancel}>
  Cancel
</Button>

// Danger button (red, solid)
<Button variant="danger" onClick={handleDelete}>
  Delete
</Button>

// Outlined button
<Button variant="blue" emphasis="medium" onClick={handleAction}>
  Learn More
</Button>

// Text-only button
<Button variant="blue" emphasis="low" onClick={handleAction}>
  View Details
</Button>

// Inline text-only button (no horizontal padding)
<Button variant="blue" emphasis="low" inline onClick={handleAction}>
  Learn More
</Button>

// More/Less compact button (4px horizontal padding, 16px height)
<Button variant="blue" emphasis="low" moreLess onClick={handleToggle}>
  More
</Button>

// With icon at start
<Button variant="blue" iconStart={Arrow} onClick={handleBack}>
  Back
</Button>

// With icon at end
<Button variant="blue" iconEnd={Arrow} onClick={handleNext}>
  Next
</Button>

// Disabled state
<Button variant="blue" disabled>
  Loading...
</Button>

// Billboard Buttons (44px height)
// ================================

// High emphasis with extended colors
<BillboardButton variant="blue" emphasis="high" onClick={handleAction}>
  Primary Action
</BillboardButton>

<BillboardButton variant="green" emphasis="high" onClick={handleAction}>
  Success Action
</BillboardButton>

// Light high emphasis (new emphasis level)
<BillboardButton variant="blue" emphasis="lightHigh" onClick={handleAction}>
  Light Primary
</BillboardButton>

<BillboardButton variant="purple" emphasis="lightHigh" onClick={handleAction}>
  Light Purple
</BillboardButton>

// With icons
<BillboardButton variant="blue" emphasis="high" iconStart={Arrow} onClick={handleAction}>
  Get Started
</BillboardButton>`}
        </pre>
      </section>
    </div>
  )
}
