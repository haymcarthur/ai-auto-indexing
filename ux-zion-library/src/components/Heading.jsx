import React from 'react';
import PropTypes from 'prop-types';

/**
 * Heading component for semantic heading elements
 */
export const Heading = ({ size = 'h3', children, style, ...props }) => {
  const Tag = size; // Use the size as the HTML tag (h1, h2, h3, etc.)

  const headingSizes = {
    h1: { fontSize: '32px', fontWeight: 700, lineHeight: '40px' },
    h2: { fontSize: '28px', fontWeight: 700, lineHeight: '36px' },
    h3: { fontSize: '24px', fontWeight: 600, lineHeight: '32px' },
    h4: { fontSize: '20px', fontWeight: 600, lineHeight: '28px' },
    h5: { fontSize: '16px', fontWeight: 600, lineHeight: '24px' },
    h6: { fontSize: '14px', fontWeight: 600, lineHeight: '20px' }
  };

  const headingStyles = {
    ...headingSizes[size],
    margin: 0,
    ...style
  };

  return (
    <Tag style={headingStyles} {...props}>
      {children}
    </Tag>
  );
};

Heading.propTypes = {
  size: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  children: PropTypes.node,
  style: PropTypes.object
};
