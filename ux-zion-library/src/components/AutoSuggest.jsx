import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { MenuOverlay, useMenuOverlay } from './MenuOverlay';
import { ListItem } from './ListItem';
import { Close } from '../icons';
import { colors, transparentColors } from '../tokens/colors';
import { body } from '../tokens/typography';

/**
 * AutoSuggest
 *
 * A select component that looks like TextField but opens a MenuOverlay with ListItems.
 * Matches Zion UI design system.
 */
export const AutoSuggest = ({
  label,
  labelLarge,
  message,
  value,
  onChange,
  placeholder = 'Select...',
  status = 'default',
  disabled = false,
  billboard = false,
  options = [],
  clearable = false,
  allowCreate = false,
  createLabel = 'Create',
  ...rest
}) => {
  const menu = useMenuOverlay();
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Status configurations
  const statusConfig = {
    default: {
      labelColor: colors.gray.gray100,
      strokeColor: colors.gray.gray40,
      messageColor: colors.gray.gray100,
      icon: null
    },
    valid: {
      labelColor: colors.gray.gray100,
      strokeColor: colors.green.green50,
      messageColor: colors.green.green90,
      icon: null
    },
    warning: {
      labelColor: colors.gray.gray100,
      strokeColor: colors.yellow.yellow50,
      messageColor: colors.yellow.yellow90,
      icon: null
    },
    error: {
      labelColor: colors.gray.gray100,
      strokeColor: colors.red.red50,
      messageColor: colors.red.red90,
      icon: null
    }
  };

  const currentStatus = statusConfig[status];

  // Filter options based on input
  const filteredOptions = inputValue
    ? options.filter(opt => {
        const label = typeof opt === 'string' ? opt : opt.label;
        return label.toLowerCase().includes(inputValue.toLowerCase());
      })
    : options;

  // Show create option if allowCreate and input doesn't match
  const showCreate = allowCreate &&
    inputValue.trim() !== '' &&
    !filteredOptions.some(opt => {
      const label = typeof opt === 'string' ? opt : opt.label;
      return label.toLowerCase() === inputValue.toLowerCase();
    });

  const allOptions = showCreate
    ? [{ value: inputValue, label: inputValue, isCreate: true }, ...filteredOptions]
    : filteredOptions;

  // Get display value
  const displayValue = inputValue || value || '';

  // Handle clear
  const handleClear = (e) => {
    e.stopPropagation();
    setInputValue('');
    onChange?.('');
  };

  // Handle option select
  const handleSelect = (option) => {
    const selectedValue = typeof option === 'string' ? option : option.value;
    const selectedLabel = typeof option === 'string' ? option : option.label;

    console.log('[AutoSuggest handleSelect] option:', option);
    console.log('[AutoSuggest handleSelect] calling onChange with:', selectedValue);

    setInputValue('');
    onChange?.(selectedValue);
    menu.close();
  };

  // Handle input change (for filtering)
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (!menu.isOpen) {
      menu.handleClick();
    }
  };

  // Label styles
  const labelStyles = {
    ...body.a,
    color: disabled ? transparentColors.transparentGray40 : currentStatus.labelColor,
    marginBottom: '4px',
    display: 'block'
  };

  const labelLargeStyles = {
    ...body.b,
    color: disabled ? transparentColors.transparentGray40 : currentStatus.labelColor,
    marginBottom: '4px',
    display: 'block'
  };

  // Input container styles
  const inputContainerStyles = {
    position: 'relative',
    width: '100%'
  };

  // Input styles
  const inputStyles = {
    ...body.b,
    width: '100%',
    height: billboard ? '44px' : '40px',
    padding: '8px 12px',
    paddingRight: clearable && value && isFocused ? '36px' : '12px',
    borderRadius: '4px',
    border: (isFocused || menu.isOpen) && !disabled
      ? `2px solid ${colors.blue.blue50}`
      : `1px solid ${currentStatus.strokeColor}`,
    backgroundColor: disabled ? transparentColors.transparentGray02 : colors.gray.gray00,
    color: disabled ? transparentColors.transparentGray40 : colors.gray.gray100,
    outline: 'none',
    transition: 'border-color 0.15s ease',
    boxSizing: 'border-box',
    cursor: disabled ? 'not-allowed' : 'text'
  };

  // Message container styles
  const messageContainerStyles = {
    ...body.a,
    color: currentStatus.messageColor,
    marginTop: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  };

  return (
    <div style={{ width: '100%' }} {...rest}>
      {/* Label */}
      {label && !labelLarge && (
        <label style={labelStyles}>
          {label}
        </label>
      )}

      {/* Large Label */}
      {labelLarge && (
        <label style={labelLargeStyles}>
          {labelLarge}
        </label>
      )}

      {/* Input Container */}
      <div style={inputContainerStyles}>
        <input
          ref={(el) => {
            inputRef.current = el;
            menu.anchorRef.current = el;
          }}
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onClick={menu.handleClick}
          disabled={disabled}
          placeholder={placeholder}
          style={inputStyles}
          autoComplete="off"
        />

        {/* Clear Button - only show when focused */}
        {clearable && value && !disabled && isFocused && (
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              handleClear(e);
            }}
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '4px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.gray.gray60,
              transition: 'color 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = colors.gray.gray100}
            onMouseLeave={(e) => e.currentTarget.style.color = colors.gray.gray60}
          >
            <Close width="16px" height="16px" />
          </button>
        )}
      </div>

      {/* Message */}
      {message && (
        <div style={messageContainerStyles}>
          <span>{message}</span>
        </div>
      )}

      {/* MenuOverlay with Options */}
      <MenuOverlay
        isOpen={menu.isOpen}
        close={menu.close}
        anchorRef={menu.anchorRef}
        position="bottom"
        align="start"
      >
        <div style={{
          minWidth: inputRef.current?.offsetWidth || 200,
          maxHeight: '240px',
          overflowY: 'auto'
        }}>
          {allOptions.length > 0 ? (
            allOptions.map((option, index) => {
              const optValue = typeof option === 'string' ? option : option.value;
              const optLabel = typeof option === 'string' ? option : option.label;
              const isCreate = option.isCreate || false;

              return (
                <ListItem
                  key={index}
                  heading={isCreate ? `${createLabel}: ${optLabel}` : optLabel}
                  onClick={() => handleSelect(option)}
                  onMouseDown={(e) => {
                    // Only prevent default on left click (button 0)
                    if (e.button === 0) {
                      e.preventDefault();
                    }
                  }}
                  fullWidth={true}
                />
              );
            })
          ) : (
            <div style={{
              ...body.b,
              padding: '12px 16px',
              color: colors.gray.gray60
            }}>
              No options found
            </div>
          )}
        </div>
      </MenuOverlay>
    </div>
  );
};

AutoSuggest.propTypes = {
  label: PropTypes.string,
  labelLarge: PropTypes.string,
  message: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  status: PropTypes.oneOf(['default', 'valid', 'warning', 'error']),
  disabled: PropTypes.bool,
  billboard: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    ])
  ),
  clearable: PropTypes.bool,
  allowCreate: PropTypes.bool,
  createLabel: PropTypes.string
};
