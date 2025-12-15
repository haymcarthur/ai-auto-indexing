import React from 'react'
import PropTypes from 'prop-types'
import { bold, paragraph } from '../tokens/typography'
import { Divider } from './Divider'

/**
 * DataTable
 *
 * A flexible table component with customizable headers and cells.
 * Matches Zion UI design system.
 *
 * @param {array} columns - Array of column definitions with header and key properties
 * @param {array} data - Array of row data objects
 * @param {function} renderCell - Optional custom cell renderer function(value, row, column)
 */
export const DataTable = ({
  columns = [],
  data = [],
  renderCell,
  ...rest
}) => {
  // Table container styles
  const tableContainerStyles = {
    width: '100%'
  }

  // Header row styles
  const headerRowStyles = {
    display: 'flex',
    gap: '58px',
    marginBottom: '12px'
  }

  // Header cell styles
  const headerCellStyles = {
    ...bold.c,
    flex: 1,
    minWidth: 0
  }

  // Divider container styles
  const dividerContainerStyles = {
    marginBottom: '26px'
  }

  // Body container styles
  const bodyContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '26px'
  }

  // Body row styles
  const bodyRowStyles = {
    display: 'flex',
    gap: '58px',
    alignItems: 'flex-start'
  }

  // Body cell styles (default for text content)
  const bodyCellStyles = {
    ...paragraph.sm,
    flex: 1,
    minWidth: 0
  }

  // Render cell content
  const renderCellContent = (row, column) => {
    const value = row[column.key]

    // If custom renderer provided, use it
    if (renderCell) {
      return renderCell(value, row, column)
    }

    // If value is a React element, render it directly
    if (React.isValidElement(value)) {
      return value
    }

    // Otherwise render as text with default styles
    return <div style={bodyCellStyles}>{value}</div>
  }

  return (
    <div style={tableContainerStyles} {...rest}>
      {/* Header Row */}
      <div style={headerRowStyles}>
        {columns.map((column, index) => (
          <div key={index} style={headerCellStyles}>
            {column.header}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={dividerContainerStyles}>
        <Divider />
      </div>

      {/* Body Rows */}
      <div style={bodyContainerStyles}>
        {data.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div style={bodyRowStyles}>
              {columns.map((column, colIndex) => (
                <div key={colIndex} style={{ flex: 1, minWidth: 0 }}>
                  {renderCellContent(row, column)}
                </div>
              ))}
            </div>
            {/* Divider between rows (except after last row) */}
            {rowIndex < data.length - 1 && (
              <Divider />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderCell: PropTypes.func
}
