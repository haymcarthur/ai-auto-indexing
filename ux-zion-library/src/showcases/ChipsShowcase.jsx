import { useState } from 'react'
import { FilterChip } from '../components/FilterChip'
import { ActionChip } from '../components/ActionChip'
import { BillboardActionChip } from '../components/BillboardActionChip'
import { ChoiceChip } from '../components/ChoiceChip'
import { InputChip } from '../components/InputChip'
import { Info, SocialStar, Person } from '../icons'

/**
 * Chips Showcase
 *
 * Displays all 5 chip component types with their variants
 */
export const ChipsShowcase = () => {
  const [filterSelected, setFilterSelected] = useState(false)
  const [actionSelected, setActionSelected] = useState(false)
  const [billboardSelected, setBillboardSelected] = useState(false)
  const [choiceSelected, setChoiceSelected] = useState(false)
  const [inputSelected, setInputSelected] = useState(false)
  const [inputChips, setInputChips] = useState(['Tag 1', 'Tag 2', 'Tag 3'])

  const removeInputChip = (index) => {
    setInputChips(inputChips.filter((_, i) => i !== index))
  }

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
          Chips
        </h1>
        <p style={{
          marginTop: '8px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          Compact elements for actions, selections, and filtering.
        </p>
      </div>

      {/* FilterChip */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Filter Chip
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '24px'
        }}>
          Non-clickable chips for filtering content. Used to display active filters.
        </p>

        <div style={{
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <FilterChip label="Default" />
            <FilterChip label="Selected" selected />
            <FilterChip label="Disabled" disabled />
            <FilterChip
              label="Interactive Example"
              selected={filterSelected}
              onClick={() => setFilterSelected(!filterSelected)}
            />
          </div>
        </div>

        <div style={{
          fontSize: '13px',
          color: '#6b7280',
          backgroundColor: '#f9fafb',
          padding: '12px',
          borderRadius: '6px'
        }}>
          <strong>Props:</strong> label (string), selected (boolean), disabled (boolean)
        </div>
      </section>

      {/* ActionChip */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Action Chip
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '24px'
        }}>
          Clickable chips for actions with 5 color variants.
        </p>

        <div style={{
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 600 }}>Color Variants</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <ActionChip label="Blue" variant="blue" onClick={() => alert('Blue clicked')} />
            <ActionChip label="Green" variant="green" onClick={() => alert('Green clicked')} />
            <ActionChip label="Yellow" variant="yellow" onClick={() => alert('Yellow clicked')} />
            <ActionChip label="Red" variant="red" onClick={() => alert('Red clicked')} />
            <ActionChip label="Purple" variant="purple" onClick={() => alert('Purple clicked')} />
          </div>

          <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 600 }}>Selected States</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <ActionChip label="Blue Selected" variant="blue" selected />
            <ActionChip label="Green Selected" variant="green" selected />
            <ActionChip label="Yellow Selected" variant="yellow" selected />
            <ActionChip label="Red Selected" variant="red" selected />
            <ActionChip label="Purple Selected" variant="purple" selected />
          </div>

          <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 600 }}>Inline Mode</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <ActionChip label="Inline" variant="blue" inline onClick={() => {}} />
            <ActionChip label="Inline Selected" variant="green" inline selected />
          </div>

          <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 600 }}>Low Emphasis</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <ActionChip label="Low Emphasis" variant="blue" lowEmphasis onClick={() => {}} />
            <ActionChip label="Low Selected" variant="blue" lowEmphasis selected />
          </div>

          <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 600 }}>Disabled</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <ActionChip label="Disabled" variant="blue" disabled />
          </div>
        </div>

        <div style={{
          fontSize: '13px',
          color: '#6b7280',
          backgroundColor: '#f9fafb',
          padding: '12px',
          borderRadius: '6px'
        }}>
          <strong>Props:</strong> label (string), variant ('blue' | 'green' | 'yellow' | 'red' | 'purple'), selected (boolean), disabled (boolean), inline (boolean), lowEmphasis (boolean), onClick (function)
        </div>
      </section>

      {/* BillboardActionChip */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Billboard Action Chip
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '24px'
        }}>
          Larger action chips with optional icon or avatar. Uses Body C (24px) text.
        </p>

        <div style={{
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 600 }}>Basic</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <BillboardActionChip label="Billboard Chip" variant="blue" onClick={() => {}} />
            <BillboardActionChip label="Selected" variant="green" selected />
          </div>

          <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 600 }}>With Icon</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <BillboardActionChip
              label="With Icon"
              variant="blue"
              startIcon={<SocialStar size="sm" />}
              onClick={() => {}}
            />
            <BillboardActionChip
              label="Icon Selected"
              variant="purple"
              startIcon={<Info size="sm" />}
              selected
            />
          </div>

          <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 600 }}>With Avatar</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <BillboardActionChip
              label="With Avatar"
              variant="blue"
              avatar={{ type: 'male' }}
              onClick={() => {}}
            />
            <BillboardActionChip
              label="Avatar Selected"
              variant="green"
              avatar={{ type: 'female' }}
              selected
            />
          </div>
        </div>

        <div style={{
          fontSize: '13px',
          color: '#6b7280',
          backgroundColor: '#f9fafb',
          padding: '12px',
          borderRadius: '6px'
        }}>
          <strong>Props:</strong> label (string), variant ('blue' | 'green' | 'yellow' | 'red' | 'purple'), selected (boolean), disabled (boolean), inline (boolean), lowEmphasis (boolean), startIcon (node), avatar (object), onClick (function)
        </div>
      </section>

      {/* ChoiceChip */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Choice Chip
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '24px'
        }}>
          Chips for making selections with optional icon or avatar.
        </p>

        <div style={{
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 600 }}>Basic</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <ChoiceChip label="Choice 1" onClick={() => {}} />
            <ChoiceChip label="Choice 2" selected onClick={() => {}} />
            <ChoiceChip label="Disabled" disabled />
          </div>

          <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 600 }}>With Icon</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <ChoiceChip
              label="With Icon"
              startIcon={<Person size="sm" />}
              onClick={() => {}}
            />
            <ChoiceChip
              label="Icon Selected"
              startIcon={<SocialStar size="sm" />}
              selected
              onClick={() => {}}
            />
          </div>

          <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 600 }}>With Avatar</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <ChoiceChip
              label="User 1"
              avatar={{ type: 'male' }}
              onClick={() => {}}
            />
            <ChoiceChip
              label="User 2"
              avatar={{ type: 'female' }}
              selected
              onClick={() => {}}
            />
          </div>
        </div>

        <div style={{
          fontSize: '13px',
          color: '#6b7280',
          backgroundColor: '#f9fafb',
          padding: '12px',
          borderRadius: '6px'
        }}>
          <strong>Props:</strong> label (string), selected (boolean), disabled (boolean), startIcon (node), avatar (object), onClick (function)
        </div>
      </section>

      {/* InputChip */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px'
        }}>
          Input Chip
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '24px'
        }}>
          Chips for input with remove functionality and optional start icon.
        </p>

        <div style={{
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 600 }}>Basic</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <InputChip label="Removable Tag" onRemove={() => alert('Remove clicked')} />
            <InputChip label="Selected Tag" selected onRemove={() => alert('Remove clicked')} />
          </div>

          <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 600 }}>With Icon</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <InputChip
              label="Tag with Icon"
              startIcon={<SocialStar size="sm" />}
              onRemove={() => alert('Remove clicked')}
            />
            <InputChip
              label="Selected with Icon"
              startIcon={<Info size="sm" />}
              selected
              onRemove={() => alert('Remove clicked')}
            />
          </div>

          <h3 style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 600 }}>Interactive Example</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {inputChips.map((chip, index) => (
              <InputChip
                key={index}
                label={chip}
                onRemove={() => removeInputChip(index)}
                onClick={() => alert(`Clicked ${chip}`)}
              />
            ))}
          </div>
        </div>

        <div style={{
          fontSize: '13px',
          color: '#6b7280',
          backgroundColor: '#f9fafb',
          padding: '12px',
          borderRadius: '6px'
        }}>
          <strong>Props:</strong> label (string), selected (boolean), startIcon (node), onRemove (function - required), onClick (function)
        </div>
      </section>
    </div>
  )
}
