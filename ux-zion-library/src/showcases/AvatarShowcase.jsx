import { Avatar } from '../components/Avatar'
import { Card } from '../components/Card'
import imageAvatar from '../assets/imageAvatar.svg'

/**
 * Avatar Showcase
 *
 * Displays the Avatar component with all its variants and sizes
 */
export const AvatarShowcase = () => {
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
          Avatar
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          Circular avatar component with photo, preset avatars, and monogram display options.
        </p>
      </div>

      {/* Size Options */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '24px'
        }}>
          Sizes
        </h2>

        <Card size="md" variant="elevated">
          <div style={{
            display: 'flex',
            gap: '32px',
            alignItems: 'flex-end',
            flexWrap: 'wrap'
          }}>
            {[
              { size: 'xs', dimension: '24px' },
              { size: 'sm', dimension: '40px' },
              { size: 'md', dimension: '64px' },
              { size: 'lg', dimension: '88px' },
              { size: 'xl', dimension: '136px' },
              { size: 'xxl', dimension: '180px' }
            ].map(({ size, dimension }) => (
              <div key={size} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Avatar type="monogram" name="User" size={size} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#111827'
                  }}>
                    {size.toUpperCase()}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    {dimension}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Monogram Type */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '24px'
        }}>
          Monogram
        </h2>

        <Card size="md" variant="elevated">
          <div style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Avatar type="monogram" name="John Smith" size="md" />
              <div style={{ fontSize: '13px', color: '#6b7280' }}>John Smith</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Avatar type="monogram" name="Sarah Johnson" size="md" />
              <div style={{ fontSize: '13px', color: '#6b7280' }}>Sarah Johnson</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Avatar type="monogram" name="Michael Brown" size="md" />
              <div style={{ fontSize: '13px', color: '#6b7280' }}>Michael Brown</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Avatar type="monogram" name="Emily Davis" size="md" />
              <div style={{ fontSize: '13px', color: '#6b7280' }}>Emily Davis</div>
            </div>
          </div>
        </Card>
      </section>

      {/* Avatar Types */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '24px'
        }}>
          Avatar Types
        </h2>

        <div style={{
          display: 'grid',
          gap: '24px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}>
          {/* Male Avatar */}
          <Card size="md" variant="outlined">
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '16px',
              color: '#111827'
            }}>
              Male Avatar
            </h3>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <Avatar type="male" size="lg" />
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Default</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <Avatar type="male" size="lg" grayMode />
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Gray Mode</div>
              </div>
            </div>
          </Card>

          {/* Female Avatar */}
          <Card size="md" variant="outlined">
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '16px',
              color: '#111827'
            }}>
              Female Avatar
            </h3>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <Avatar type="female" size="lg" />
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Default</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <Avatar type="female" size="lg" grayMode />
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Gray Mode</div>
              </div>
            </div>
          </Card>

          {/* Anonymous Avatar */}
          <Card size="md" variant="outlined">
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '16px',
              color: '#111827'
            }}>
              Anonymous Avatar
            </h3>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <Avatar type="anonymous" size="lg" />
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Default</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <Avatar type="anonymous" size="lg" grayMode />
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Gray Mode</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Photo Type */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '24px'
        }}>
          Photo Avatar
        </h2>

        <Card size="md" variant="elevated">
          <div style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Avatar
                type="photo"
                size="md"
                photoSrc={imageAvatar}
                alt="Example photo"
              />
              <div style={{ fontSize: '13px', color: '#6b7280' }}>Photo Example</div>
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280', maxWidth: '500px' }}>
              Photo avatars require a <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>photoSrc</code> prop with the image URL.
              For best results, use square images with at least 180x180px resolution.
            </div>
          </div>
        </Card>
      </section>

      {/* Properties Table */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
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
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>type</code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                'photo' | 'male' | 'female' | 'anonymous' | 'monogram'
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>'anonymous'</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Type of avatar to display
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>size</code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>'md'</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Size of avatar (24px to 180px)
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>photoSrc</code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Image URL (required when type='photo')
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>name</code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                User name (required when type='monogram')
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>grayMode</code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>boolean</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>false</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Use grayscale version (male, female, anonymous only)
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '3px' }}>alt</code>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>string</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>-</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                Alt text for image (defaults to type)
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Code Examples */}
      <section>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Code Examples
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
{`import { Avatar } from './components/Avatar'

// Monogram avatar
<Avatar
  type="monogram"
  name="John Smith"
  size="md"
/>

// Male avatar
<Avatar
  type="male"
  size="lg"
/>

// Male avatar in gray mode
<Avatar
  type="male"
  size="lg"
  grayMode
/>

// Female avatar
<Avatar
  type="female"
  size="md"
/>

// Anonymous avatar
<Avatar
  type="anonymous"
  size="sm"
/>

// Photo avatar
<Avatar
  type="photo"
  photoSrc="/path/to/photo.jpg"
  size="xl"
  alt="User profile"
/>

// Different sizes
<Avatar type="monogram" name="A" size="xs" />   // 24px
<Avatar type="monogram" name="B" size="sm" />   // 40px
<Avatar type="monogram" name="C" size="md" />   // 64px
<Avatar type="monogram" name="D" size="lg" />   // 88px
<Avatar type="monogram" name="E" size="xl" />   // 136px
<Avatar type="monogram" name="F" size="xxl" />  // 180px`}
          </pre>
        </Card>
      </section>

      {/* Note about assets */}
      <section style={{ marginTop: '48px' }}>
        <Card size="sm" variant="elevated" style={{ backgroundColor: '#fffbeb', borderColor: '#fcd34d' }}>
          <div style={{
            fontSize: '14px',
            color: '#92400e',
            lineHeight: '1.6'
          }}>
            <strong style={{ display: 'block', marginBottom: '8px' }}>Note about avatar images:</strong>
            The preset avatar types (male, female, anonymous) use static imports from the <code style={{ backgroundColor: '#fef3c7', padding: '2px 6px', borderRadius: '3px' }}>src/assets/</code> directory:
            <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
              <li>maleAvatar.svg & grayMaleAvatar.svg</li>
              <li>femaleAvatar.svg & grayFemaleAvatar.svg</li>
              <li>anonymousAvatar.svg & grayAnonymousAvatar.svg</li>
            </ul>
          </div>
        </Card>
      </section>
    </div>
  )
}
