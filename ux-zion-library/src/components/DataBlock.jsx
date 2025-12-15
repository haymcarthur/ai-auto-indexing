import React from 'react'
import PropTypes from 'prop-types'
import { Header } from './Header'
import { Paragraph } from './Paragraph'

/**
 * DataBlock
 *
 * A block component with an H6 heading and small paragraph.
 * Matches Zion UI design system.
 *
 * @param {string} heading - Heading text (required)
 * @param {string} paragraph - Paragraph text (required)
 */
export const DataBlock = ({
  heading,
  paragraph,
  ...rest
}) => {
  return (
    <div {...rest}>
      <div style={{ marginBottom: '2px' }}>
        <Header level="h6">{heading}</Header>
      </div>

      <Paragraph size="sm">{paragraph}</Paragraph>
    </div>
  )
}

DataBlock.propTypes = {
  heading: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired
}
