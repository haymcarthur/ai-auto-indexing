import React from 'react'
import PropTypes from 'prop-types'
import { colors } from '../tokens/colors'
import { elevation } from '../tokens/elevation'
import { body } from '../tokens/typography'

/**
 * PageControl
 *
 * A page/item counter control with label, input field, and total count.
 * Matches Zion UI design system.
 *
 * @param {string} label - Label text (e.g., "Image", "Page")
 * @param {number} currentValue - Current page/item number
 * @param {number} totalValue - Total number of pages/items
 * @param {function} onChange - Callback when value changes
 * @param {boolean} disabled - Whether the control is disabled
 */
export const PageControl = ({
  label = 'Image',
  currentValue = 1,
  totalValue = 1,
  onChange,
  disabled = false,
  ...rest
}) => {
  const [value, setValue] = React.useState(currentValue)
  const [isFocused, setIsFocused] = React.useState(false)

  React.useEffect(() => {
    setValue(currentValue)
  }, [currentValue])

  const containerStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    height: '36px',
    padding: '0 4px',
    borderRadius: '4px',
    backgroundColor: colors.gray.gray00,
    boxShadow: elevation[2]
  }

  const labelStyles = {
    ...body.b,
    color: disabled ? colors.gray.gray40 : colors.gray.gray100,
    whiteSpace: 'nowrap'
  }

  const inputStyles = {
    ...body.b,
    height: '29px',
    width: '50px',
    textAlign: 'center',
    border: isFocused && !disabled
      ? `2px solid ${colors.blue.blue50}`
      : `1px solid ${colors.gray.gray10}`,
    borderRadius: '4px',
    backgroundColor: disabled ? colors.gray.gray02 : colors.gray.gray00,
    color: disabled ? colors.gray.gray40 : colors.gray.gray100,
    outline: 'none',
    transition: 'border-color 0.15s ease',
    // Remove number input spinners
    MozAppearance: 'textfield',
    WebkitAppearance: 'none',
    appearance: 'none'
  }

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10)
    if (!isNaN(newValue) && newValue >= 1 && newValue <= totalValue) {
      setValue(newValue)
      if (onChange) {
        onChange(newValue)
      }
    }
  }

  const handleBlur = () => {
    // Reset to current value if invalid
    if (value < 1 || value > totalValue || isNaN(value)) {
      setValue(currentValue)
    }
    setIsFocused(false)
  }

  const handleFocus = (e) => {
    if (!disabled) {
      setIsFocused(true)
      e.target.select()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur()
    }
  }

  return (
    <>
      <style>{`
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
      <div style={containerStyles} {...rest}>
        <span style={labelStyles}>{label}</span>
        <input
          type="number"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          min={1}
          max={totalValue}
          style={inputStyles}
        />
        <span style={labelStyles}>of {totalValue}</span>
      </div>
    </>
  )
}

PageControl.propTypes = {
  label: PropTypes.string,
  currentValue: PropTypes.number,
  totalValue: PropTypes.number,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
}
