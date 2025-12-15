import React from 'react'
import PropTypes from 'prop-types'
import { spacing } from '../tokens/spacing'
import { colors } from '../tokens/colors'

/**
 * Breadcrumb
 *
 * A breadcrumb navigation component matching Zion UI design system.
 *
 * @param {array} items - Array of breadcrumb items [{label, onClick?}]
 */
export const Breadcrumb = ({ items, ...rest }) => {
  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    fontFamily: '"Noto Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: '12px',
    fontWeight: 400,
    color: colors.gray.gray100,
    flexWrap: 'wrap'
  }

  const itemStyles = (isActive) => ({
    textDecoration: isActive ? 'none' : 'underline',
    cursor: isActive ? 'default' : 'pointer',
    color: colors.gray.gray100,
    background: 'none',
    border: 'none',
    padding: 0,
    font: 'inherit'
  })

  const separatorStyles = {
    marginLeft: '3px',
    marginRight: spacing.xxs,
    color: colors.gray.gray100
  }

  return (
    <nav style={containerStyles} aria-label="Breadcrumb" {...rest}>
      {items.map((item, index) => {
        const isActive = index === items.length - 1

        return (
          <React.Fragment key={index}>
            {item.onClick && !isActive ? (
              <button
                onClick={item.onClick}
                style={itemStyles(isActive)}
                onMouseOver={(e) => !isActive && (e.currentTarget.style.opacity = '0.7')}
                onMouseOut={(e) => !isActive && (e.currentTarget.style.opacity = '1')}
              >
                {item.label}
              </button>
            ) : (
              <span style={itemStyles(isActive)}>
                {item.label}
              </span>
            )}

            {index < items.length - 1 && (
              <span style={separatorStyles} aria-hidden="true">
                ›
              </span>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func
    })
  ).isRequired
}
