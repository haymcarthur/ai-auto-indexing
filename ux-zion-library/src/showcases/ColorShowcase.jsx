import { colors, transparentColors, buttonColors, chipColors } from '../tokens/colors'
import { Card } from '../components/Card'
import { Header } from '../components/Header'
import { Paragraph } from '../components/Paragraph'

/**
 * Color Showcase
 *
 * Displays all color tokens from the design system
 */
export const ColorShowcase = () => {
  const colorGroups = [
    { name: 'Gray', colors: colors.gray },
    { name: 'Blue', colors: colors.blue },
    { name: 'Green', colors: colors.green },
    { name: 'Yellow', colors: colors.yellow },
    { name: 'Red', colors: colors.red },
    { name: 'Danger', colors: colors.danger },
    { name: 'Purple', colors: colors.purple }
  ]

  const ColorSwatch = ({ name, value }) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      minWidth: '120px'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        backgroundColor: value,
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.1)'
      }} />
      <div style={{ textAlign: 'center' }}>
        <Paragraph size="xs" style={{ fontWeight: 600, marginBottom: '2px' }}>
          {name}
        </Paragraph>
        <Paragraph size="xs" secondary style={{ fontFamily: 'monospace' }}>
          {value.toUpperCase()}
        </Paragraph>
      </div>
    </div>
  )

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
          Color Tokens
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          Design system color tokens matching Zion UI specifications.
          All components use these centralized color values for consistency.
        </p>
      </div>

      {/* Color Groups */}
      {colorGroups.map((group) => (
        <section key={group.name} style={{ marginBottom: '48px' }}>
          <Header level="h3" style={{ marginBottom: '24px' }}>
            {group.name}
          </Header>
          <Card size="md" variant="elevated">
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              justifyContent: 'flex-start'
            }}>
              {Object.entries(group.colors).map(([key, value]) => (
                <ColorSwatch key={key} name={key} value={value} />
              ))}
            </div>
          </Card>
        </section>
      ))}

      {/* Button Colors */}
      <section style={{ marginBottom: '48px' }}>
        <Header level="h3" style={{ marginBottom: '24px' }}>
          Button Colors
        </Header>
        <Card size="md" variant="elevated">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            justifyContent: 'flex-start'
          }}>
            {Object.entries(buttonColors).map(([key, value]) => (
              <ColorSwatch key={key} name={key} value={value} />
            ))}
          </div>
        </Card>
      </section>

      {/* Transparent Colors */}
      <section style={{ marginBottom: '48px' }}>
        <Header level="h3" style={{ marginBottom: '24px' }}>
          Transparent Colors
        </Header>
        <Card size="md" variant="elevated">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            justifyContent: 'flex-start'
          }}>
            {Object.entries(transparentColors).map(([key, value]) => (
              <div key={key} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                minWidth: '120px'
              }}>
                {/* Show transparent color over white and dark backgrounds */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  {/* Over white background */}
                  <div style={{
                    width: '80px',
                    height: '38px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px 8px 0 0',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderBottom: 'none',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: value,
                      borderRadius: '8px 8px 0 0'
                    }} />
                  </div>
                  {/* Over dark background */}
                  <div style={{
                    width: '80px',
                    height: '38px',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '0 0 8px 8px',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderTop: 'none',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: value,
                      borderRadius: '0 0 8px 8px'
                    }} />
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Paragraph size="xs" style={{ fontWeight: 600, marginBottom: '2px' }}>
                    {key}
                  </Paragraph>
                  <Paragraph size="xs" secondary style={{ fontFamily: 'monospace', fontSize: '11px' }}>
                    {value}
                  </Paragraph>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
            <Paragraph size="xs" secondary>
              Transparent colors are shown over both white (top) and dark (bottom) backgrounds to demonstrate opacity.
            </Paragraph>
          </div>
        </Card>
      </section>

      {/* Chip Colors */}
      <section style={{ marginBottom: '48px' }}>
        <Header level="h3" style={{ marginBottom: '24px' }}>
          Chip Colors
        </Header>
        <Card size="md" variant="elevated">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            justifyContent: 'flex-start'
          }}>
            {Object.entries(chipColors).map(([key, value]) => (
              <ColorSwatch key={key} name={key} value={value} />
            ))}
          </div>
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
            <Paragraph size="xs" secondary>
              Chip colors are used for selected states in action chips, choice chips, and input chips.
            </Paragraph>
          </div>
        </Card>
      </section>

      {/* Usage Example */}
      <section style={{ marginBottom: '48px' }}>
        <Header level="h3" style={{ marginBottom: '16px' }}>
          Usage Example
        </Header>
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
{`import { colors, transparentColors, buttonColors } from '../tokens/colors'

// Use solid colors in component styles
const styles = {
  backgroundColor: colors.blue.blue60,
  color: colors.gray.gray00,
  border: \`1px solid \${colors.gray.gray10}\`
}

// Use transparent colors for overlays, shadows, etc.
const overlayStyles = {
  backgroundColor: transparentColors.transparentGray80,
  color: colors.gray.gray00
}

// Use button colors for high emphasis buttons
const buttonStyles = {
  backgroundColor: buttonColors.highBlue,
  color: colors.gray.gray00
}

// Available color groups:
// - colors.gray (gray00 - gray100)
// - colors.blue (blue00 - blue90)
// - colors.green (green02 - green90)
// - colors.yellow (yellow02 - yellow90)
// - colors.red (red02 - red90)
// - colors.danger (danger02 - danger90)
// - colors.purple (purple02 - purple90)
// - buttonColors.highBlue, highDanger, highGray
// - transparentColors.transparentGray02
// - transparentColors.transparentGray03
// - transparentColors.transparentGray10
// - transparentColors.transparentGray40
// - transparentColors.transparentGray80`}
          </pre>
        </Card>
      </section>

      {/* Color Scale Info */}
      <section>
        <Header level="h3" style={{ marginBottom: '16px' }}>
          Color Scale
        </Header>
        <Card size="sm" variant="elevated">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Paragraph>
              Each color group uses a numeric scale to indicate lightness:
            </Paragraph>
            <ul style={{
              fontSize: '14px',
              color: colors.gray.gray100,
              lineHeight: '1.8',
              paddingLeft: '24px',
              margin: 0
            }}>
              <li><strong>00-05</strong>: Very light tints, ideal for backgrounds</li>
              <li><strong>10-30</strong>: Light to medium shades, good for hover states</li>
              <li><strong>40-60</strong>: Medium to bold shades, primary colors</li>
              <li><strong>70-90</strong>: Dark shades, for active states and emphasis</li>
              <li><strong>100</strong>: Darkest shade (gray only)</li>
            </ul>
            <Paragraph style={{ marginTop: '8px' }}>
              Lower numbers are lighter, higher numbers are darker.
              This consistent scale makes it easy to find the right shade for any use case.
            </Paragraph>
          </div>
        </Card>
      </section>
    </div>
  )
}
