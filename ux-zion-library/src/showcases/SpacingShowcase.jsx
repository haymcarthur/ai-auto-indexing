import React from 'react'
import { spacing, spacingValues } from '../tokens/spacing'
import { colors } from '../tokens/colors'
import { Header } from '../components/Header'
import { Paragraph } from '../components/Paragraph'

export const SpacingShowcase = () => {
  const spacingItems = [
    { name: 'xxl', value: spacing.xxl, numeric: spacingValues.xxl },
    { name: 'xl', value: spacing.xl, numeric: spacingValues.xl },
    { name: 'lg', value: spacing.lg, numeric: spacingValues.lg },
    { name: 'md', value: spacing.md, numeric: spacingValues.md },
    { name: 'sm', value: spacing.sm, numeric: spacingValues.sm },
    { name: 'xs', value: spacing.xs, numeric: spacingValues.xs },
    { name: 'xxs', value: spacing.xxs, numeric: spacingValues.xxs },
    { name: 'nano', value: spacing.nano, numeric: spacingValues.nano },
    { name: 'pico', value: spacing.pico, numeric: spacingValues.pico }
  ]

  return (
    <div style={{ padding: '40px', maxWidth: '1200px' }}>
      <Header level="h3">Spacing Tokens</Header>
      <div style={{ marginTop: '8px', marginBottom: '40px' }}>
        <Paragraph size="md" secondary>
          Centralized spacing tokens for consistent padding, margin, gap, and other spacing values.
        </Paragraph>
      </div>

      <div style={{ marginTop: '32px' }}>
        <Header level="h5">Spacing Scale</Header>
        <div style={{ marginTop: '16px', marginBottom: '32px' }}>
          <Paragraph size="sm" secondary>
            Use these tokens for all spacing values in your components.
          </Paragraph>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          {spacingItems.map(item => (
            <div
              key={item.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                padding: '16px',
                backgroundColor: colors.gray.gray00,
                border: `1px solid ${colors.gray.gray05}`,
                borderRadius: '8px'
              }}
            >
              {/* Token name and value */}
              <div style={{ minWidth: '200px' }}>
                <div style={{
                  fontFamily: '"Noto Sans", monospace',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: colors.gray.gray100,
                  marginBottom: '4px'
                }}>
                  spacing.{item.name}
                </div>
                <div style={{
                  fontFamily: 'Monaco, Courier, monospace',
                  fontSize: '13px',
                  color: colors.gray.gray60
                }}>
                  {item.value} ({item.numeric}px)
                </div>
              </div>

              {/* Visual representation */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: item.value,
                    height: '40px',
                    backgroundColor: colors.blue.blue60,
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.gray.gray00,
                    fontSize: '12px',
                    fontWeight: 500
                  }}
                >
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '48px' }}>
        <Header level="h5">Usage Examples</Header>
        <div style={{ marginTop: '16px', marginBottom: '24px' }}>
          <Paragraph size="sm" secondary>
            Import and use spacing tokens in your components:
          </Paragraph>
        </div>

        <div style={{
          backgroundColor: colors.gray.gray02,
          borderRadius: '8px',
          padding: '24px',
          fontFamily: 'Monaco, Courier, monospace',
          fontSize: '13px',
          lineHeight: '1.6',
          color: colors.gray.gray100,
          overflowX: 'auto'
        }}>
          <div style={{ color: colors.gray.gray60 }}>// Import spacing tokens</div>
          <div style={{ marginBottom: '16px' }}>
            <span style={{ color: colors.purple.purple60 }}>import</span>
            {' { spacing } '}
            <span style={{ color: colors.purple.purple60 }}>from</span>
            {' '}
            <span style={{ color: colors.green.green70 }}>'../tokens/spacing'</span>
          </div>

          <div style={{ color: colors.gray.gray60 }}>// Use in component styles</div>
          <div>
            <span style={{ color: colors.purple.purple60 }}>const</span>
            {' styles = {'}
          </div>
          <div style={{ paddingLeft: '20px' }}>
            padding: spacing.xs, <span style={{ color: colors.gray.gray60 }}>// 16px</span>
          </div>
          <div style={{ paddingLeft: '20px' }}>
            gap: spacing.nano, <span style={{ color: colors.gray.gray60 }}>// 8px</span>
          </div>
          <div style={{ paddingLeft: '20px' }}>
            borderRadius: spacing.pico <span style={{ color: colors.gray.gray60 }}>// 4px</span>
          </div>
          <div>{'}'}</div>
        </div>
      </div>

      <div style={{ marginTop: '48px' }}>
        <Header level="h5">Common Use Cases</Header>
        <div style={{ marginTop: '16px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            {[
              { token: 'pico (4px)', use: 'Border radius, small gaps' },
              { token: 'nano (8px)', use: 'Icon gaps, small padding' },
              { token: 'xxs (12px)', use: 'Compact padding, list items' },
              { token: 'xs (16px)', use: 'Standard padding, gaps' },
              { token: 'sm (26px)', use: 'Card padding, section spacing' },
              { token: 'md (39px)', use: 'Large card padding' },
              { token: 'lg (58px)', use: 'Page section spacing' },
              { token: 'xl (86px)', use: 'Major section dividers' },
              { token: 'xxl (128px)', use: 'Hero sections, page margins' }
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  padding: '16px',
                  backgroundColor: colors.gray.gray00,
                  border: `1px solid ${colors.gray.gray05}`,
                  borderRadius: '8px'
                }}
              >
                <div style={{
                  fontFamily: 'Monaco, Courier, monospace',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: colors.blue.blue60,
                  marginBottom: '8px'
                }}>
                  {item.token}
                </div>
                <Paragraph size="xs" secondary>
                  {item.use}
                </Paragraph>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
