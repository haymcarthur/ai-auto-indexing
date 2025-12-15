import { Header } from '../components/Header'
import { Subheading } from '../components/Subheading'
import { Paragraph } from '../components/Paragraph'
import { colors, transparentColors } from '../tokens/colors'
import { body, bold, display, paragraph, paragraphDense, uppercase, text } from '../tokens/typography'

/**
 * Typography Showcase
 *
 * Displays the typography components (Header, Subheading, Paragraph)
 * with documentation, properties tables, and interactive examples
 */
export const TypographyShowcase = () => {
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
          Typography
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          Typography components and tokens including headers (H1-H6), subheading, paragraphs, and design tokens.
          Matches Zion UI design system.
        </p>
      </div>

      {/* Typography Tokens Section */}
      <section style={{ marginBottom: '48px', paddingBottom: '48px', borderBottom: '2px solid #e5e7eb' }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Typography Tokens
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6',
          marginBottom: '32px'
        }}>
          Centralized typography tokens for consistent text styling across all components.
          Import from <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>../tokens/typography</code>
        </p>

        {/* Body Tokens */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '12px'
          }}>
            Body (Heading Base)
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Noto Sans Regular, 130% line height
          </p>
          <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            {['a', 'b', 'c', 'd', 'e'].map((key) => (
              <div key={key} style={{
                padding: '16px',
                borderBottom: key !== 'e' ? '1px solid #e5e7eb' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '24px'
              }}>
                <div style={{ minWidth: '120px' }}>
                  <code style={{
                    backgroundColor: '#f3f4f6',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: 600
                  }}>
                    body.{key}
                  </code>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    ...body[key],
                    color: colors.gray.gray100
                  }}>
                    The quick brown fox jumps over the lazy dog
                  </div>
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  minWidth: '100px',
                  textAlign: 'right'
                }}>
                  {body[key].fontSize} / 130%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bold Tokens */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '12px'
          }}>
            Bold (Bold Heading Base)
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Noto Sans SemiBold, 120% line height
          </p>
          <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            {['b', 'c', 'd', 'e', 'f', 'g', 'h'].map((key, index) => (
              <div key={key} style={{
                padding: '16px',
                borderBottom: index !== 6 ? '1px solid #e5e7eb' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '24px'
              }}>
                <div style={{ minWidth: '120px' }}>
                  <code style={{
                    backgroundColor: '#f3f4f6',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: 600
                  }}>
                    bold.{key}
                  </code>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    ...bold[key],
                    color: colors.gray.gray100
                  }}>
                    The quick brown fox
                  </div>
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  minWidth: '100px',
                  textAlign: 'right'
                }}>
                  {bold[key].fontSize} / 120%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Display Tokens */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '12px'
          }}>
            Display (Display Heading Base)
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Museo Slab GWebM 500, 108% line height
          </p>
          <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            {['f', 'g', 'h'].map((key, index) => (
              <div key={key} style={{
                padding: '16px',
                borderBottom: index !== 2 ? '1px solid #e5e7eb' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '24px'
              }}>
                <div style={{ minWidth: '120px' }}>
                  <code style={{
                    backgroundColor: '#f3f4f6',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: 600
                  }}>
                    display.{key}
                  </code>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    ...display[key],
                    color: colors.gray.gray100
                  }}>
                    The quick brown fox
                  </div>
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  minWidth: '100px',
                  textAlign: 'right'
                }}>
                  {display[key].fontSize} / 108%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Paragraph Tokens */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '12px'
          }}>
            Paragraph
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Noto Sans Regular, 150% line height (not dense)
          </p>
          <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            {['xs', 'sm', 'md', 'lg', 'xl'].map((key, index) => (
              <div key={key} style={{
                padding: '16px',
                borderBottom: index !== 4 ? '1px solid #e5e7eb' : 'none',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '24px'
              }}>
                <div style={{ minWidth: '120px', paddingTop: '4px' }}>
                  <code style={{
                    backgroundColor: '#f3f4f6',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: 600
                  }}>
                    paragraph.{key}
                  </code>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    ...paragraph[key],
                    color: colors.gray.gray100,
                    marginBottom: '8px'
                  }}>
                    Primary: The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet.
                  </div>
                  <div style={{
                    ...paragraph[key],
                    color: transparentColors.transparentGray80
                  }}>
                    Secondary: The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet.
                  </div>
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  minWidth: '100px',
                  textAlign: 'right',
                  paddingTop: '4px'
                }}>
                  {paragraph[key].fontSize} / 150%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Paragraph Dense Tokens */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '12px'
          }}>
            Paragraph Dense
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Noto Sans Regular, 130% line height (dense)
          </p>
          <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            {['xs', 'sm', 'md', 'lg', 'xl'].map((key, index) => (
              <div key={key} style={{
                padding: '16px',
                borderBottom: index !== 4 ? '1px solid #e5e7eb' : 'none',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '24px'
              }}>
                <div style={{ minWidth: '140px', paddingTop: '4px' }}>
                  <code style={{
                    backgroundColor: '#f3f4f6',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: 600
                  }}>
                    paragraphDense.{key}
                  </code>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    ...paragraphDense[key],
                    color: colors.gray.gray100,
                    marginBottom: '8px'
                  }}>
                    Primary: The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet.
                  </div>
                  <div style={{
                    ...paragraphDense[key],
                    color: transparentColors.transparentGray80
                  }}>
                    Secondary: The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet.
                  </div>
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  minWidth: '100px',
                  textAlign: 'right',
                  paddingTop: '4px'
                }}>
                  {paragraphDense[key].fontSize} / 130%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Uppercase Token */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '12px'
          }}>
            Uppercase (Button Typography)
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Noto Sans Regular, 130% line height, all caps, 0.5px letter spacing
          </p>
          <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ minWidth: '120px' }}>
                <code style={{
                  backgroundColor: '#f3f4f6',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: 600
                }}>
                  uppercase
                </code>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  ...uppercase,
                  color: colors.gray.gray100
                }}>
                  Button Text Example
                </div>
              </div>
              <div style={{
                fontSize: '12px',
                color: '#6b7280',
                minWidth: '100px',
                textAlign: 'right'
              }}>
                16px / 130%
              </div>
            </div>
          </div>

          {/* Text */}
          <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '16px',
            marginTop: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ minWidth: '120px' }}>
                <code style={{
                  backgroundColor: '#f3f4f6',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: 600
                }}>
                  text
                </code>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  ...text,
                  color: colors.gray.gray100
                }}>
                  Link Text Example
                </div>
              </div>
              <div style={{
                fontSize: '12px',
                color: '#6b7280',
                minWidth: '100px',
                textAlign: 'right'
              }}>
                16px / 130%
              </div>
            </div>
          </div>
        </div>

        {/* Usage Example */}
        <div style={{
          backgroundColor: colors.gray.gray02,
          borderRadius: '8px',
          padding: '24px',
          marginTop: '32px'
        }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '12px'
          }}>
            Usage Example
          </h4>
          <pre style={{
            margin: 0,
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '13px',
            lineHeight: '1.6',
            color: '#374151',
            overflowX: 'auto'
          }}>
{`import { body, bold, display, paragraph, paragraphDense, uppercase, text } from '../tokens/typography'

// Apply body typography
<div style={{ ...body.c }}>Body C text</div>

// Apply bold typography
<h4 style={{ ...bold.d }}>Bold D heading</h4>

// Apply display typography
<h1 style={{ ...display.h }}>Display H heading</h1>

// Apply paragraph typography
<p style={{ ...paragraph.sm }}>Paragraph text</p>

// Apply dense paragraph typography
<p style={{ ...paragraphDense.md }}>Dense paragraph</p>

// Apply uppercase (button) typography
<button style={{ ...uppercase }}>Button Text</button>

// Apply text (link/action) typography
<a style={{ ...text }}>Link Text</a>`}
          </pre>
        </div>
      </section>

      {/* Header Component Section */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Header Component
        </h2>

        {/* Header Properties Table */}
        <h3 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px',
          marginTop: '24px'
        }}>
          Properties
        </h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #e5e7eb',
          fontSize: '14px',
          marginBottom: '24px'
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
                  level
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>'h1'</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Header level (determines font, size, weight)
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
                Header content
              </td>
            </tr>
          </tbody>
        </table>

        {/* Header Specifications */}
        <h3 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Header Specifications
        </h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #e5e7eb',
          fontSize: '14px',
          marginBottom: '24px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                borderBottom: '1px solid #e5e7eb',
                fontWeight: 600,
                color: '#374151'
              }}>Level</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                borderBottom: '1px solid #e5e7eb',
                fontWeight: 600,
                color: '#374151'
              }}>Font</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                borderBottom: '1px solid #e5e7eb',
                fontWeight: 600,
                color: '#374151'
              }}>Weight</th>
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
              }}>Color</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>H1</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Museo Slab GWebM</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>500</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>77px</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>colors.gray.gray100</td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>H2</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Museo Slab GWebM</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>500</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>60px</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>colors.gray.gray100</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>H3</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Museo Slab GWebM</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>500</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>46px</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>colors.gray.gray100</td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>H4</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Noto Sans</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>SemiBold (600)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>27px</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>colors.gray.gray100</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>H5</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Noto Sans</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>SemiBold (600)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>21px</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>colors.gray.gray100</td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>H6</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Noto Sans</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>SemiBold (600)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>16px</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>colors.gray.gray100</td>
            </tr>
          </tbody>
        </table>

        {/* Header Examples */}
        <h3 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Examples
        </h3>
        <div style={{
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <Header level="h1">H1 Heading - Museo Slab 77px</Header>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <Header level="h2">H2 Heading - Museo Slab 60px</Header>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <Header level="h3">H3 Heading - Museo Slab 46px</Header>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <Header level="h4">H4 Heading - Noto Sans SemiBold 27px</Header>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <Header level="h5">H5 Heading - Noto Sans SemiBold 21px</Header>
          </div>
          <div>
            <Header level="h6">H6 Heading - Noto Sans SemiBold 16px</Header>
          </div>
        </div>
      </section>

      {/* Subheading Component Section */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Subheading Component
        </h2>

        {/* Subheading Properties Table */}
        <h3 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px',
          marginTop: '24px'
        }}>
          Properties
        </h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #e5e7eb',
          fontSize: '14px',
          marginBottom: '24px'
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
                  size
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                'xl' | 'lg' | 'md' | 'sm' | 'xs'
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>'xs'</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Subheading size
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
                Subheading content
              </td>
            </tr>
          </tbody>
        </table>

        {/* Subheading Specifications */}
        <h3 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Size Specifications
        </h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #e5e7eb',
          fontSize: '14px',
          marginBottom: '24px'
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
              }}>Font</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                borderBottom: '1px solid #e5e7eb',
                fontWeight: 600,
                color: '#374151'
              }}>Weight</th>
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
              }}>Color</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>xl</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Noto Sans</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Regular (400)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>35px</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>transparentColors.transparentGray80</td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>lg</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Noto Sans</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Regular (400)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>27px</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>transparentColors.transparentGray80</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>md</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Noto Sans</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Regular (400)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>21px</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>transparentColors.transparentGray80</td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>sm</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Noto Sans</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Regular (400)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>16px</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>transparentColors.transparentGray80</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>xs</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Noto Sans</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Regular (400)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>12px</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>transparentColors.transparentGray80</td>
            </tr>
          </tbody>
        </table>

        {/* Subheading Examples */}
        <h3 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Examples
        </h3>
        <div style={{
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <Subheading size="xl">XL Subheading - 35px</Subheading>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <Subheading size="lg">LG Subheading - 27px</Subheading>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <Subheading size="md">MD Subheading - 21px</Subheading>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <Subheading size="sm">SM Subheading - 16px</Subheading>
          </div>
          <div>
            <Subheading size="xs">XS Subheading - 12px (default)</Subheading>
          </div>
        </div>
      </section>

      {/* Paragraph Component Section */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Paragraph Component
        </h2>

        {/* Paragraph Properties Table */}
        <h3 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px',
          marginTop: '24px'
        }}>
          Properties
        </h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #e5e7eb',
          fontSize: '14px',
          marginBottom: '24px'
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
                  size
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                'xs' | 'sm' | 'md' | 'lg' | 'xl'
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>'sm'</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Paragraph size (determines font size)
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  secondary
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>false</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Use secondary color (73.7% opacity)
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
                Use dense line height (130% instead of 150%)
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
                Paragraph content
              </td>
            </tr>
          </tbody>
        </table>

        {/* Paragraph Size Specifications */}
        <h3 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Size Specifications
        </h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #e5e7eb',
          fontSize: '14px',
          marginBottom: '24px'
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
              }}>Font</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                borderBottom: '1px solid #e5e7eb',
                fontWeight: 600,
                color: '#374151'
              }}>Weight</th>
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
              }}>Primary Color</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                borderBottom: '1px solid #e5e7eb',
                fontWeight: 600,
                color: '#374151'
              }}>Secondary Color</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>xs</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Noto Sans</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Regular (400)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>12px</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>colors.gray.gray100</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>transparentColors.transparentGray80</td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>sm</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Noto Sans</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Regular (400)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>16px</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>colors.gray.gray100</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>transparentColors.transparentGray80</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>md</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Noto Sans</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Regular (400)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>21px</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>colors.gray.gray100</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>transparentColors.transparentGray80</td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>lg</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Noto Sans</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Regular (400)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>27px</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>colors.gray.gray100</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>transparentColors.transparentGray80</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>xl</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Noto Sans</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>Regular (400)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>35px</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>colors.gray.gray100</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>transparentColors.transparentGray80</td>
            </tr>
          </tbody>
        </table>

        <ul style={{
          fontSize: '14px',
          color: '#6b7280',
          lineHeight: '1.8',
          paddingLeft: '24px',
          marginBottom: '24px'
        }}>
          <li>Normal line height: 150%</li>
          <li>Dense line height: 130%</li>
        </ul>

        {/* Paragraph Examples */}
        <h3 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Examples
        </h3>

        {/* Size Examples */}
        <div style={{
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '12px'
          }}>
            Size Variants
          </h4>
          <div style={{ marginBottom: '16px' }}>
            <Paragraph size="xs">XS - This is extra small paragraph text at 12px</Paragraph>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <Paragraph size="sm">SM - This is small paragraph text at 16px (default size)</Paragraph>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <Paragraph size="md">MD - This is medium paragraph text at 21px</Paragraph>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <Paragraph size="lg">LG - This is large paragraph text at 27px</Paragraph>
          </div>
          <div>
            <Paragraph size="xl">XL - This is extra large paragraph text at 35px</Paragraph>
          </div>
        </div>

        {/* Secondary Color Examples */}
        <div style={{
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '12px'
          }}>
            Primary vs Secondary Color
          </h4>
          <div style={{ marginBottom: '16px' }}>
            <Paragraph size="sm">Primary color - This text uses the primary color #202121</Paragraph>
          </div>
          <div>
            <Paragraph size="sm" secondary>Secondary color - This text uses #000305 at 73.7% opacity</Paragraph>
          </div>
        </div>

        {/* Line Height Examples */}
        <div style={{
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '12px'
          }}>
            Normal vs Dense Line Height
          </h4>
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>Normal (150%):</p>
            <Paragraph size="sm">
              This is a multi-line paragraph with normal line height (150%). The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit. This shows how text flows with standard spacing between lines.
            </Paragraph>
          </div>
          <div>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>Dense (130%):</p>
            <Paragraph size="sm" dense>
              This is a multi-line paragraph with dense line height (130%). The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit. This shows how text flows with tighter spacing between lines.
            </Paragraph>
          </div>
        </div>

        {/* Combined Examples */}
        <div style={{
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '12px'
          }}>
            Combined Properties
          </h4>
          <div style={{ marginBottom: '16px' }}>
            <Paragraph size="md" secondary dense>
              MD size + secondary color + dense line height - This demonstrates combining multiple properties.
            </Paragraph>
          </div>
          <div>
            <Paragraph size="lg" secondary>
              LG size + secondary color + normal line height - Another combination example.
            </Paragraph>
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
{`import { Header, Subheading, Paragraph } from './components'

// Headers
<Header level="h1">Main Title</Header>
<Header level="h2">Section Title</Header>
<Header level="h3">Subsection Title</Header>
<Header level="h4">Small Header</Header>
<Header level="h5">Smaller Header</Header>
<Header level="h6">Smallest Header</Header>

// Subheading - Sizes
<Subheading size="xl">Extra large subheading</Subheading>
<Subheading size="lg">Large subheading</Subheading>
<Subheading size="md">Medium subheading</Subheading>
<Subheading size="sm">Small subheading</Subheading>
<Subheading size="xs">Extra small subheading (default)</Subheading>

// Paragraphs - Sizes
<Paragraph size="xs">Extra small paragraph</Paragraph>
<Paragraph size="sm">Small paragraph (default)</Paragraph>
<Paragraph size="md">Medium paragraph</Paragraph>
<Paragraph size="lg">Large paragraph</Paragraph>
<Paragraph size="xl">Extra large paragraph</Paragraph>

// Paragraphs - Secondary color
<Paragraph secondary>Secondary color text</Paragraph>
<Paragraph size="md" secondary>MD size with secondary color</Paragraph>

// Paragraphs - Dense line height
<Paragraph dense>Dense line height paragraph</Paragraph>
<Paragraph size="lg" dense>Large with dense spacing</Paragraph>

// Combined properties
<Paragraph size="md" secondary dense>
  Medium size, secondary color, dense line height
</Paragraph>`}
        </pre>
      </section>
    </div>
  )
}
