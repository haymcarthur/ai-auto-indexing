import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { colors, transparentColors } from '../tokens/colors';
import { body } from '../tokens/typography';
import { ContentCheck, NoticeWarning, NoticeImportant, ContentAdd, ContentClose } from '../icons';

/**
 * AutoSuggest
 *
 * An auto-suggest input component with dropdown suggestions.
 * Matches Zion UI design system.
 *
 * @param {string} label - Main label text (uses body.a)
 * @param {string} labelLarge - Optional large label text (uses body.b)
 * @param {string} message - Optional message text below input
 * @param {string} value - Input value (controlled)
 * @param {function} onChange - Change handler (value) => {}
 * @param {string} placeholder - Placeholder text
 * @param {string} status - Field status: 'default', 'valid', 'warning', 'error'
 * @param {boolean} disabled - Whether the field is disabled
 * @param {boolean} billboard - Use larger height (44px instead of 40px)
 * @param {array} suggestions - Array of suggestion objects {value, label} or strings
 * @param {boolean} allowCreate - Allow creating new items not in suggestions
 * @param {string} createLabel - Label for create option (default: "Create")
 */
export const AutoSuggest = ({
  label,
  labelLarge,
  message,
  value,
  onChange,
  onSelect,
  placeholder,
  status = 'default',
  disabled = false,
  billboard = false,
  suggestions = [],
  allowCreate = true,
  createLabel = 'Create',
  clearable = false,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Update input value when prop changes
  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  // Update dropdown position when it opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const updatePosition = () => {
        const rect = inputRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 4,
          left: rect.left,
          width: rect.width
        });
      };

      updatePosition();

      // Update position on scroll/resize
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isOpen]);

  // Filter suggestions based on input
  const filteredSuggestions = suggestions
    .map(s => typeof s === 'string' ? { value: s, label: s } : s)
    .filter(s =>
      s.label.toLowerCase().includes(inputValue.toLowerCase())
    );

  // Show create option if allowCreate and input doesn't match exactly
  const showCreate = allowCreate &&
    inputValue.trim() !== '' &&
    !filteredSuggestions.some(s => s.label.toLowerCase() === inputValue.toLowerCase());

  const allOptions = showCreate
    ? [{ value: inputValue, label: inputValue, isCreate: true }, ...filteredSuggestions]
    : filteredSuggestions;

  // Status configurations
  const statusConfig = {
    default: {
      labelColor: colors.gray.gray100,
      strokeColor: transparentColors.transparentGray40,
      messageColor: colors.gray.gray100,
      icon: null
    },
    valid: {
      labelColor: colors.green.green70,
      strokeColor: colors.green.green50,
      messageColor: colors.green.green70,
      icon: ContentCheck
    },
    warning: {
      labelColor: colors.yellow.yellow70,
      strokeColor: colors.yellow.yellow50,
      messageColor: colors.yellow.yellow70,
      icon: NoticeWarning
    },
    error: {
      labelColor: colors.danger.danger70,
      strokeColor: colors.danger.danger50,
      messageColor: colors.danger.danger70,
      icon: NoticeImportant
    }
  };

  const currentStatus = disabled ? statusConfig.default : statusConfig[status];
  const StatusIcon = currentStatus.icon;

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
    onChange?.(newValue);
  };

  const handleClear = () => {
    setInputValue('');
    onChange?.('');
    inputRef.current?.focus();
  };

  const handleSelectOption = (option) => {
    setInputValue(option.label);

    // Don't call onChange for create options - let onSelect handle it
    if (!option.isCreate) {
      onChange?.(option.value);
    }

    onSelect?.(option); // New callback for when option is selected
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsOpen(true);
      return;
    }

    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < allOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && allOptions[highlightedIndex]) {
          handleSelectOption(allOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
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

  // Input styles
  const inputStyles = {
    ...body.b,
    width: '100%',
    height: billboard ? '44px' : '40px',
    padding: '8px 12px',
    borderRadius: '4px',
    border: isFocused && !disabled
      ? `2px solid ${colors.blue.blue50}`
      : `1px solid ${currentStatus.strokeColor}`,
    backgroundColor: disabled ? transparentColors.transparentGray02 : colors.gray.gray00,
    color: disabled ? transparentColors.transparentGray40 : colors.gray.gray100,
    outline: 'none',
    transition: 'border-color 0.15s ease',
    boxSizing: 'border-box',
    cursor: disabled ? 'not-allowed' : 'text'
  };

  // Dropdown styles (fixed positioning for portal)
  const dropdownStyles = {
    position: 'fixed',
    top: `${dropdownPosition.top}px`,
    left: `${dropdownPosition.left}px`,
    width: `${dropdownPosition.width}px`,
    backgroundColor: colors.gray.gray00,
    border: `1px solid ${transparentColors.transparentGray40}`,
    borderRadius: '4px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    maxHeight: '240px',
    overflowY: 'auto',
    zIndex: 1000
  };

  // Option styles
  const getOptionStyles = (index, option) => ({
    ...body.b,
    padding: '8px 12px',
    cursor: 'pointer',
    backgroundColor: highlightedIndex === index
      ? transparentColors.transparentGray05
      : 'transparent',
    color: colors.gray.gray100,
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  });

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
    <div style={{ width: '100%', position: 'relative' }} {...rest}>
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
      <div style={{ position: 'relative' }}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            setIsFocused(true);
            setIsOpen(true);
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          style={{
            ...inputStyles,
            paddingRight: clearable && inputValue ? '36px' : inputStyles.padding
          }}
          autoComplete="off"
        />

        {/* Clear Button */}
        {clearable && inputValue && !disabled && (
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault(); // Prevent input blur
              handleClear();
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
            <ContentClose width="16px" height="16px" />
          </button>
        )}
      </div>

      {/* Message with Status Icon */}
      {message && (
        <div style={messageContainerStyles}>
          {StatusIcon && (
            <StatusIcon width="14px" height="14px" />
          )}
          <span>{message}</span>
        </div>
      )}

      {/* Dropdown - rendered via portal */}
      {isOpen && !disabled && allOptions.length > 0 && createPortal(
        <div ref={dropdownRef} style={dropdownStyles}>
          {allOptions.map((option, index) => (
            <div
              key={`${option.value}-${index}`}
              style={getOptionStyles(index, option)}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelectOption(option);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {option.isCreate && (
                <ContentAdd width="16px" height="16px" style={{ color: colors.blue.blue60 }} />
              )}
              <span>
                {option.isCreate ? `${createLabel} "${option.label}"` : option.label}
              </span>
            </div>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
};

AutoSuggest.propTypes = {
  label: PropTypes.string,
  labelLarge: PropTypes.string,
  message: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
  status: PropTypes.oneOf(['default', 'valid', 'warning', 'error']),
  disabled: PropTypes.bool,
  billboard: PropTypes.bool,
  suggestions: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    ])
  ),
  allowCreate: PropTypes.bool,
  createLabel: PropTypes.string,
  clearable: PropTypes.bool
};
