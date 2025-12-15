import { useState } from 'react';
import PropTypes from 'prop-types';
import { DialogOverlay } from "../../ux-zion-library/src/components/DialogOverlay";
import { Paragraph } from "../../ux-zion-library/src/components/Paragraph";
import { spacing } from "../../ux-zion-library/src/tokens/spacing";
import { colors } from "../../ux-zion-library/src/tokens/colors";

const COMMON_RELATIONSHIPS = [
  'Child',
  'Divorced Spouse',
  'Domestic Partner',
  'Fiancé',
  'Parent',
  'Sibling',
  'Spouse',
  'No Relation'
];

const OTHER_RELATIONSHIPS = [
  'Adopted Child',
  'Adopted Parent',
  'Aunt or Uncle',
  'Child-in-law',
  'Cousin',
  'Foster Child',
  'Foster Parent',
  'Godchild',
  'Godparent',
  'Grandchild',
  'Grandparent',
  'Guardian Child',
  'Guardian Parent',
  'Niece or Nephew',
  'Parent-in-law',
  'Relative',
  'Sibling-in-law',
  'Stepchild',
  'Stepparent',
  'Stepsibling',
  'Surrogate Child',
  'Surrogate Parent',
  'Ancestor',
  'Associate',
  'Descendant',
  'Enslaved Person',
  'Slaveholder',
  'Other'
];

export const PreviousRelationshipsDialog = ({
  isOpen,
  personName,
  previousRelationships = [],
  currentGroupMembers = [],
  onSave,
  onCancel
}) => {
  const [newRelationships, setNewRelationships] = useState(
    currentGroupMembers.map(member => ({
      name: member.name,
      relationship: 'No Relation'
    }))
  );

  const handleSave = () => {
    onSave?.(newRelationships);
  };

  return (
    <DialogOverlay
      isOpen={isOpen}
      close={onCancel}
      title="Previous Relationships"
      size="md"
      primaryButton={{
        label: 'Save',
        onClick: handleSave
      }}
      secondaryButton={{
        label: 'Cancel',
        onClick: onCancel
      }}
    >
      <Paragraph size="sm" style={{ marginBottom: spacing.xs }}>
        <strong>{personName}</strong> is in another record with existing relationships.
        To create this relationship, the following relationship{previousRelationships.length > 1 ? 's' : ''} will be removed:
      </Paragraph>

      {/* Previous relationships that will be removed */}
      <ul style={{
        marginLeft: spacing.sm,
        marginBottom: spacing.sm,
        color: colors.gray.gray100
      }}>
        {previousRelationships.map((rel, index) => (
          <li key={index} style={{ marginBottom: spacing.nano }}>
            {rel.relationship}: {rel.name}
          </li>
        ))}
      </ul>

      <Paragraph size="sm" style={{ marginBottom: spacing.xs }}>
        Does this person have a relationship with any of the other members in this record group?
      </Paragraph>

      {/* New relationship rows */}
      {newRelationships.map((rel, index) => (
        <div
          key={index}
          style={{
            marginBottom: spacing.xs,
            display: 'flex',
            gap: spacing.xxs,
            alignItems: 'flex-end'
          }}
        >
          {/* Relationship Select */}
          <div style={{ width: '128px' }}>
            <select
              value={rel.relationship}
              onChange={(e) => {
                const updated = [...newRelationships];
                updated[index].relationship = e.target.value;
                setNewRelationships(updated);
              }}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              <optgroup label="Common Relationships">
                {COMMON_RELATIONSHIPS.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </optgroup>
              <optgroup label="Other Relationships">
                {OTHER_RELATIONSHIPS.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Name (disabled) */}
          <div style={{ flex: 1 }}>
            <input
              type="text"
              value={rel.name}
              disabled
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: '#f3f4f6',
                color: '#6b7280'
              }}
            />
          </div>
        </div>
      ))}
    </DialogOverlay>
  );
};

PreviousRelationshipsDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  personName: PropTypes.string.isRequired,
  previousRelationships: PropTypes.arrayOf(PropTypes.shape({
    relationship: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })),
  currentGroupMembers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    relationship: PropTypes.string
  })),
  onSave: PropTypes.func,
  onCancel: PropTypes.func
};
