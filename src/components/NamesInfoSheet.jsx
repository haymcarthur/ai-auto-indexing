import { useState } from 'react';
import PropTypes from 'prop-types';
import { InfoSheet } from "../../ux-zion-library/src/components/InfoSheet";
import { Button } from "../../ux-zion-library/src/components/Button";
import { Divider } from "../../ux-zion-library/src/components/Divider";
import { Paragraph } from "../../ux-zion-library/src/components/Paragraph";
import {
  ContentAttached,
  DocumentRecordPerson,
  ContentDetach,
  MenuFilter,
  ArrowCaret
} from "../../ux-zion-library/src/icons";
import { spacing } from "../../ux-zion-library/src/tokens/spacing";
import { transparentColors, buttonColors, colors } from "../../ux-zion-library/src/tokens/colors";
import { bold } from "../../ux-zion-library/src/tokens/typography";
import { getAllRecordGroups, filterRecordGroups } from '../utils/censusData';
import { ManageNamesInfoSheet } from './ManageNamesInfoSheet';
import { ViewNameInfoSheet } from './ViewNameInfoSheet';

export const NamesInfoSheet = ({ censusData, onUpdateCensusData, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showManageNames, setShowManageNames] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const allRecordGroups = getAllRecordGroups(censusData);
  const filteredGroups = filterRecordGroups(allRecordGroups, searchTerm);

  const getIconAndColor = (attachmentStatus) => {
    const iconColor = colors.gray.gray100;

    switch (attachmentStatus) {
      case 'attached':
        return { Icon: ContentAttached, bg: colors.green.green10, color: iconColor };
      case 'hint':
        return { Icon: DocumentRecordPerson, bg: colors.blue.blue10, color: iconColor };
      default:
        return { Icon: ContentDetach, bg: colors.gray.gray10, color: iconColor };
    }
  };

  const getAttachmentText = (person) => {
    if (person.attachmentStatus === 'attached') {
      return `Attached to ${person.attachedPid}`;
    } else if (person.attachmentStatus === 'hint') {
      return 'Possible Match';
    }
    return 'No Attachment';
  };

  if (selectedPerson) {
    return (
      <ViewNameInfoSheet
        person={selectedPerson}
        censusData={censusData}
        onUpdateCensusData={onUpdateCensusData}
        onBack={() => setSelectedPerson(null)}
        onClose={onClose}
        onDelete={(personId) => {
          // TODO: Implement delete functionality
          console.log('Delete person:', personId);
          setSelectedPerson(null);
        }}
      />
    );
  }

  if (showManageNames) {
    return (
      <ManageNamesInfoSheet
        censusData={censusData}
        recordGroups={allRecordGroups}
        onBack={() => setShowManageNames(false)}
        onClose={onClose}
        onUpdateCensusData={onUpdateCensusData}
        onSaveAndReturn={() => setShowManageNames(false)}
      />
    );
  }

  return (
    <InfoSheet
      title="Names"
      close={onClose}
      size="lg"
      elevated={false}
    >
      <Paragraph size="sm" secondary style={{ marginBottom: '16px' }}>
        Select a name to view, edit, or delete. Use <strong>Manage Names</strong> to add or rearrange.
      </Paragraph>

      <div style={{ marginBottom: '16px' }}>
        <Button
          variant="blue"
          emphasis="medium"
          onClick={() => setShowManageNames(true)}
        >
          Manage Names
        </Button>
      </div>

      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <MenuFilter
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9ca3af',
            width: '16px',
            height: '16px'
          }}
        />
        <input
          type="text"
          placeholder="Filter by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px 8px 36px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = '#066F90'}
          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
        />
      </div>

      <div style={{ margin: `${spacing.xxs} 0` }}>
        <Divider />
      </div>

        {/* List of record groups and people */}
        {filteredGroups.map((group, groupIndex) => (
          <div key={group.id}>
            {group.people.map((person, personIndex) => {
              const { Icon, bg, color } = getIconAndColor(person.attachmentStatus);

              const isPrimary = person.relationship === 'Primary';

              return (
                <div
                  key={person.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px',
                    cursor: 'pointer',
                    borderRadius: '6px',
                    transition: 'background-color 0.2s',
                    backgroundColor: isPrimary ? transparentColors.transparentGray05 : 'transparent'
                  }}
                  onClick={() => setSelectedPerson(person)}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = transparentColors.transparentGray05}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isPrimary ? transparentColors.transparentGray05 : 'transparent'}
                >
                  {/* Icon with background */}
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginRight: '12px'
                  }}>
                    <Icon style={{ width: '20px', height: '20px', color }} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '11px',
                      color: '#6b7280',
                      marginBottom: '1px'
                    }}>
                      {isPrimary ? 'Primary' : person.relationship}
                    </div>
                    <div style={{
                      ...(isPrimary ? bold.b : { fontSize: '14px', fontWeight: 500 }),
                      color: '#111827',
                      marginBottom: '1px'
                    }}>
                      {person.fullName}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      {getAttachmentText(person)}
                    </div>
                  </div>

                  {/* Arrow */}
                  <ArrowCaret
                    direction="forward"
                    size="sm"
                    style={{
                      color: buttonColors.highBlue,
                      flexShrink: 0
                    }}
                  />
                </div>
              );
            })}

            {groupIndex < filteredGroups.length - 1 && (
              <div style={{ margin: `${spacing.xxs} 0` }}>
                <Divider />
              </div>
            )}
          </div>
        ))}

      {filteredGroups.length === 0 && (
        <Paragraph size="sm" secondary style={{ textAlign: 'center', marginTop: '40px' }}>
          No names match your search
        </Paragraph>
      )}
    </InfoSheet>
  );
};

NamesInfoSheet.propTypes = {
  censusData: PropTypes.object.isRequired,
  onUpdateCensusData: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};
