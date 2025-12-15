import { HeadingBlock } from '../components/HeadingBlock'
import { DataBlock } from '../components/DataBlock'

/**
 * Blocks Showcase
 *
 * Displays the block components (HeadingBlock, DataBlock)
 * with documentation, properties tables, and interactive examples
 */
export const BlocksShowcase = () => {
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
          Blocks
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          Block components including HeadingBlock and DataBlock.
          Matches Zion UI design system.
        </p>
      </div>

      {/* HeadingBlock Component Section */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          HeadingBlock Component
        </h2>

        {/* HeadingBlock Properties Table */}
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
                  overline
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Optional overline text (subheading style)
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
                Header text (required)
              </td>
            </tr>
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
                Header level (determines spacing)
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  subheading
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Optional subheading text (subheading style)
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  centered
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>false</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Center align all text
              </td>
            </tr>
          </tbody>
        </table>

        {/* Specifications by Header Level */}
        <h3 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Configuration by Header Level
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
              }}>Overline Size</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                borderBottom: '1px solid #e5e7eb',
                fontWeight: 600,
                color: '#374151'
              }}>Subheading Size</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                borderBottom: '1px solid #e5e7eb',
                fontWeight: 600,
                color: '#374151'
              }}>Spacing</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>H1</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>LG (27px)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>XL (35px)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>10px</td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>H2</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>MD (21px)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>LG (27px)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>7px</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>H3</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>SM (16px)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>MD (21px)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>6px</td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>H4</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>SM (16px)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>SM (16px)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>3px</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>H5</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>XS (12px)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>SM (16px)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>2px</td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>H6</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>XS (12px)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>XS (12px)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>2px</td>
            </tr>
          </tbody>
        </table>

        {/* HeadingBlock Examples */}
        <h3 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Examples
        </h3>

        {/* Full Example - H1 */}
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
            marginBottom: '16px'
          }}>
            Full HeadingBlock with H1 (10px spacing)
          </h4>
          <HeadingBlock
            overline="Chapter One"
            heading="Welcome to the Story"
            level="h1"
            subheading="This is where our journey begins"
          />
        </div>

        {/* H2 Example */}
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
            marginBottom: '16px'
          }}>
            HeadingBlock with H2 (7px spacing)
          </h4>
          <HeadingBlock
            overline="Section"
            heading="Key Features"
            level="h2"
            subheading="Everything you need to know"
          />
        </div>

        {/* H3 Example */}
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
            marginBottom: '16px'
          }}>
            HeadingBlock with H3 (6px spacing)
          </h4>
          <HeadingBlock
            overline="Introduction"
            heading="Getting Started"
            level="h3"
            subheading="A brief overview of the basics"
          />
        </div>

        {/* H4 Example */}
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
            marginBottom: '16px'
          }}>
            HeadingBlock with H4 (3px spacing)
          </h4>
          <HeadingBlock
            overline="Tutorial"
            heading="Installation Guide"
            level="h4"
            subheading="Step by step instructions"
          />
        </div>

        {/* Without Overline */}
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
            marginBottom: '16px'
          }}>
            Without Overline
          </h4>
          <HeadingBlock
            heading="Simple Heading"
            level="h3"
            subheading="Just heading and subheading"
          />
        </div>

        {/* Without Subheading */}
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
            marginBottom: '16px'
          }}>
            Without Subheading
          </h4>
          <HeadingBlock
            overline="Label"
            heading="Just Overline and Heading"
            level="h3"
          />
        </div>

        {/* Centered Example */}
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
            marginBottom: '16px'
          }}>
            Centered Alignment
          </h4>
          <HeadingBlock
            overline="Centered"
            heading="Centered Heading Block"
            level="h2"
            subheading="All text aligned to center"
            centered
          />
        </div>
      </section>

      {/* DataBlock Component Section */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          DataBlock Component
        </h2>

        {/* DataBlock Properties Table */}
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
                  heading
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Heading text (H6 level)
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px', fontSize: '13px' }}>
                  paragraph
                </code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Paragraph text (SM size)
              </td>
            </tr>
          </tbody>
        </table>

        {/* DataBlock Specifications */}
        <h3 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Specifications
        </h3>
        <ul style={{
          fontSize: '14px',
          color: '#6b7280',
          lineHeight: '1.8',
          paddingLeft: '24px',
          marginBottom: '24px'
        }}>
          <li>Heading: H6 (Noto Sans SemiBold, 16px)</li>
          <li>Paragraph: Small size (Noto Sans Regular, 16px)</li>
          <li>Spacing: 2px between heading and paragraph</li>
        </ul>

        {/* DataBlock Examples */}
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
          <h4 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '16px'
          }}>
            Single DataBlock
          </h4>
          <DataBlock
            heading="Population"
            paragraph="8,419,000 people"
          />
        </div>

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
            marginBottom: '16px'
          }}>
            Multiple DataBlocks in a Grid
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px'
          }}>
            <DataBlock
              heading="Name"
              paragraph="John Smith"
            />
            <DataBlock
              heading="Birth Date"
              paragraph="January 15, 1950"
            />
            <DataBlock
              heading="Birth Place"
              paragraph="Glendale, California"
            />
            <DataBlock
              heading="Relation"
              paragraph="Head of Household"
            />
            <DataBlock
              heading="Race"
              paragraph="White"
            />
            <DataBlock
              heading="Occupation"
              paragraph="Mechanical Engineer"
            />
          </div>
        </div>

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
            marginBottom: '16px'
          }}>
            Vertical Stack of DataBlocks
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <DataBlock
              heading="Address"
              paragraph="1234 Main Street, Glendale, California"
            />
            <DataBlock
              heading="Household Size"
              paragraph="5 persons"
            />
            <DataBlock
              heading="Dwelling Type"
              paragraph="Single-family detached house"
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
{`import { HeadingBlock, DataBlock } from './components'

// HeadingBlock - Full example
<HeadingBlock
  overline="CHAPTER ONE"
  heading="Welcome to the Story"
  level="h1"
  subheading="This is where our journey begins"
/>

// HeadingBlock - Centered
<HeadingBlock
  heading="Centered Title"
  level="h2"
  centered
/>

// HeadingBlock - Just heading
<HeadingBlock
  heading="Simple Heading"
  level="h3"
/>

// HeadingBlock - Different spacing based on level
<HeadingBlock heading="H1 with 10px spacing" level="h1" />
<HeadingBlock heading="H2 with 7px spacing" level="h2" />
<HeadingBlock heading="H3 with 6px spacing" level="h3" />
<HeadingBlock heading="H4 with 3px spacing" level="h4" />
<HeadingBlock heading="H5 with 2px spacing" level="h5" />
<HeadingBlock heading="H6 with 2px spacing" level="h6" />

// DataBlock - Single
<DataBlock
  heading="Population"
  paragraph="8,419,000 people"
/>

// DataBlock - Multiple in grid
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
  <DataBlock heading="Name" paragraph="John Smith" />
  <DataBlock heading="Age" paragraph="42 years" />
  <DataBlock heading="City" paragraph="Glendale" />
</div>`}
        </pre>
      </section>
    </div>
  )
}
