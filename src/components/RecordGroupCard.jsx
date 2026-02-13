import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Card } from "../../ux-zion-library/src/components/Card";
import { Button } from "../../ux-zion-library/src/components/Button";
import { IconButton } from "../../ux-zion-library/src/components/IconButton";
import { Divider } from "../../ux-zion-library/src/components/Divider";
import { Header } from "../../ux-zion-library/src/components/Header";
import { Paragraph } from "../../ux-zion-library/src/components/Paragraph";
import { AutoSuggest } from "../../ux-zion-library/src/components/AutoSuggest";
import { Select } from "../../ux-zion-library/src/components/Select";
import { QuickGlanceOverlay } from "../../ux-zion-library/src/components/QuickGlanceOverlay";
import { PersonFamily, ContentAdd, ContentDelete } from "../../ux-zion-library/src/icons";
import { colors, transparentColors } from "../../ux-zion-library/src/tokens/colors";
import { spacing } from "../../ux-zion-library/src/tokens/spacing";
import { bold } from "../../ux-zion-library/src/tokens/typography";
import { getAllRecordGroupsUnfiltered, getAllNamesUnfiltered } from '../utils/censusData';
import { AddPersonQuickGlance } from './AddPersonQuickGlance';

// Core relationship types based on bidirectional pairs
const RELATIONSHIPS = [
  'Spouse',
  'Parent',
  'Child',
  'Sibling',
  'Aunt or Uncle',
  'Niece or Nephew',
  'Cousin',
  'Grandparent',
  'Grandchild',
  'Stepparent',
  'Stepchild',
  'Stepsibling',
  'Parent-in-law',
  'Child-in-law',
  'Sibling-in-law',
  'No Relation'
];

export const RecordGroupCard = ({
  state = 'review', // 'pending' | 'add' | 'edit' | 'review'
  data = {},
  censusData = null,
  currentPersonId = null,
  currentPersonName = null,
  onSave,
  onCancel,
  onNext,
  onEdit,
  onDelete,
  onNewPersonCreated,
  onRecordGroupSelected
}) => {
  const [formData, setFormData] = useState({
    recordGroup: data.recordGroup || null,
    members: (data.members || []).map(m => ({
      ...m,
      isOriginal: true // Mark original members
    }))
  });

  // State for new person creation QuickGlanceOverlay
  const [newPersonState, setNewPersonState] = useState({
    showQuickGlance: false,
    pendingName: '',
    memberIndex: -1
  });
  const autoSuggestRefs = useRef({});
  const prevStateRef = useRef(state);

  // Update formData when transitioning INTO edit or add mode
  useEffect(() => {
    const prevState = prevStateRef.current;
    const isEnteringEditMode = (state === 'edit' || state === 'add') && prevState !== state;

    if (isEnteringEditMode) {
      setFormData({
        recordGroup: data.recordGroup || null,
        members: (data.members || []).map(m => ({
          ...m,
          isOriginal: true
        }))
      });
    }

    prevStateRef.current = state;
  }, [state, data]);

  // Get ALL available record groups from census data (unfiltered)
  // Also add "New Group: [name] Household" option
  const availableRecordGroups = (() => {
    const existingGroups = censusData
      ? getAllRecordGroupsUnfiltered(censusData).map(g => ({
          value: g.name,
          label: g.name
        }))
      : [];

    // Add new group option if we have a current person name
    if (currentPersonName && currentPersonName !== 'This person') {
      const newGroupName = `New Group: ${currentPersonName} Household`;
      existingGroups.unshift({
        value: newGroupName,
        label: newGroupName,
        isNewGroup: true
      });
    }

    return existingGroups;
  })();

  // Get ALL available names from census data (unfiltered)
  const availableNames = censusData
    ? getAllNamesUnfiltered(censusData).map(p => ({
        value: p.fullName,
        label: p.fullName
      }))
    : [];

  const getIconConfig = () => {
    switch (state) {
      case 'add':
      case 'edit':
        return {
          color: colors.yellow.yellow90,
          bg: colors.yellow.yellow05
        };
      case 'review':
        return {
          color: colors.green.green90,
          bg: colors.green.green05
        };
      case 'pending':
      default:
        return {
          color: colors.gray.gray50,
          bg: colors.gray.gray03
        };
    }
  };

  const iconConfig = getIconConfig();

  // Get display value - just return the group name as is
  const getRecordGroupDisplayValue = () => {
    const displayVal = formData.recordGroup?.primaryName || '';
    return displayVal;
  };

  // Check if a name exists in the available names list
  const isExistingName = (name) => {
    return availableNames.some(n => n.label.toLowerCase() === name.toLowerCase());
  };

  // Handle name change - just update the form data
  const handleNameChange = (index, value) => {
    const newMembers = [...formData.members];
    newMembers[index].name = value;
    setFormData(prev => ({ ...prev, members: newMembers }));
  };

  // Handle option selection - show QuickGlance if Create option selected
  const handleNameSelect = (index, option) => {
    if (option.isCreate) {
      // Delay showing QuickGlance to let the click event finish propagating
      // This prevents the click from being detected as "click outside"
      setTimeout(() => {
        setNewPersonState({
          showQuickGlance: true,
          pendingName: option.label,
          memberIndex: index
        });
      }, 50);
    } else {
      // For existing names, just update the formData
      const newMembers = [...formData.members];
      newMembers[index].name = option.value;
      setFormData(prev => ({ ...prev, members: newMembers }));
    }
  };

  // Handle saving new person from QuickGlance
  const handleSaveNewPerson = (personData) => {
    const { givenName, surname } = personData;
    const fullName = `${givenName} ${surname}`.trim();

    // Update the member name with the formatted full name
    const newMembers = [...formData.members];
    if (newPersonState.memberIndex >= 0) {
      newMembers[newPersonState.memberIndex].name = fullName;
      setFormData(prev => ({ ...prev, members: newMembers }));
    }

    // Call parent callback to create the person in census data
    if (onNewPersonCreated) {
      onNewPersonCreated(givenName, surname);
    }

    // Close current QuickGlance
    setNewPersonState({
      showQuickGlance: false,
      pendingName: '',
      memberIndex: -1
    });
  };

  // Handle canceling QuickGlance
  const handleCancelNewPerson = () => {
    // Remove the name from the member
    const newMembers = [...formData.members];
    if (newPersonState.memberIndex >= 0) {
      newMembers[newPersonState.memberIndex].name = '';
      setFormData(prev => ({ ...prev, members: newMembers }));
    }

    // Close QuickGlance
    setNewPersonState({
      showQuickGlance: false,
      pendingName: '',
      memberIndex: -1
    });
  };

  const renderHeader = () => {
    const headingColor = state === 'pending' ? transparentColors.transparentGray40 : colors.gray.gray100;
    const showSubheading = state === 'pending' || state === 'add';

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing.xxs,
        marginBottom: state === 'pending' ? 0 : spacing.xs
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: iconConfig.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <PersonFamily
            size="sm"
            style={{ color: iconConfig.color }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Header level="h5" style={{ color: headingColor, marginBottom: showSubheading ? '2px' : 0 }}>
            Household Details
          </Header>
          {showSubheading && (
            <div style={{ fontSize: '12px', color: colors.gray.gray60 }}>
              Household and Member Relationships
            </div>
          )}
        </div>
        {state === 'review' && (
          <Button
            variant="blue"
            emphasis="low"
            inline={true}
            onClick={onEdit}
          >
            Edit
          </Button>
        )}
      </div>
    );
  };

  const renderPendingState = () => {
    if (!data.recordGroup) return null;

    return (
      <div style={{ marginTop: spacing.xs }}>
        {/* Record Group DataBlock - Muted style for pending */}
        <div style={{ marginBottom: spacing.xs }}>
          <div style={{
            ...bold.b,
            color: transparentColors.transparentGray40,
            marginBottom: '2px'
          }}>
            Household • {data.recordGroup.type || 'Census'}
          </div>
          <div style={{ fontSize: '14px', color: transparentColors.transparentGray40 }}>
            Primary: {data.recordGroup.primaryName || ''}
          </div>
        </div>

        {/* Member Relationships - Muted style for pending */}
        {data.members?.map((member, index) => (
          <div key={index} style={{ marginBottom: spacing.xs }}>
            <div style={{
              ...bold.b,
              color: transparentColors.transparentGray40,
              marginBottom: '2px'
            }}>
              {member.relationship}
            </div>
            <div style={{ fontSize: '14px', color: transparentColors.transparentGray40 }}>
              {member.name}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderReviewState = () => {
    if (!data.recordGroup) return null;

    return (
      <>
        {/* Record Group DataBlock */}
        <div style={{ marginBottom: spacing.xs }}>
          <div style={{
            ...bold.b,
            color: colors.gray.gray100,
            marginBottom: '2px'
          }}>
            Household • {data.recordGroup.type || 'Census'}
          </div>
          <div style={{ fontSize: '14px', color: colors.gray.gray100 }}>
            Primary: {data.recordGroup.primaryName || ''}
          </div>
        </div>

        {/* Member Relationships */}
        {data.members?.map((member, index) => (
          <div key={index} style={{ marginBottom: spacing.xs }}>
            <div style={{
              ...bold.b,
              color: colors.gray.gray100,
              marginBottom: '2px'
            }}>
              {member.relationship}
            </div>
            <div style={{ fontSize: '14px', color: colors.gray.gray100 }}>
              {member.name}
            </div>
          </div>
        ))}
      </>
    );
  };

  const renderAddEditState = () => {
    return (
      <>
        <Paragraph size="sm" style={{ marginBottom: spacing.xs }}>
          Create a new household or choose an existing one.
        </Paragraph>

        {/* AutoSuggest for Household */}
        <div style={{ marginBottom: spacing.xs }}>
          <AutoSuggest
            label="Household"
            placeholder="Select household..."
            value={getRecordGroupDisplayValue()}
            clearable={true}
            options={availableRecordGroups}
            allowCreate={false}
            onChange={(value) => {

              // Check if this is the new group option or an existing one
              const selectedOption = availableRecordGroups.find(g => g.value === value);
              const isNewGroup = selectedOption?.isNewGroup || false;


              if (!isNewGroup && censusData) {
                // Find the selected record group
                const allGroups = getAllRecordGroupsUnfiltered(censusData);
                const selectedGroup = allGroups.find(g => g.name === value);


                if (selectedGroup && selectedGroup.people) {
                  // Convert people to member format
                  const newMembers = selectedGroup.people
                    .filter(person => {
                      // Exclude current person if provided
                      if (currentPersonId) {
                        return person.id !== currentPersonId;
                      }
                      return true;
                    })
                    .map(person => ({
                      relationship: 'No Relation',
                      name: person.fullName,
                      fromGroupId: selectedGroup.id
                    }));

                  const newData = {
                    recordGroup: {
                      type: 'Census',
                      primaryName: value
                    },
                    members: newMembers
                  };
                  setFormData(prev => ({
                    ...prev,
                    ...newData
                  }));

                  // Find the actual record from census data to get record-level data
                  const record = censusData.records.find(r => r.id === selectedGroup.id);
                  if (record && onRecordGroupSelected) {
                    const eventData = {
                      recordId: record.id,
                      recordType: record.recordType || 'Census',
                      date: record.date || '',
                      place: record.place || ''
                    };
                    // Notify parent with record event data
                    onRecordGroupSelected(eventData);
                  }
                } else {
                  setFormData(prev => ({
                    ...prev,
                    recordGroup: {
                      type: 'Census',
                      primaryName: value
                    }
                  }));
                }
              } else {
                // For new groups, keep the full "New Group: [name] Household" value

                const newData = {
                  recordGroup: {
                    type: 'Census',
                    primaryName: value
                  },
                  members: []
                };

                setFormData(prev => ({
                  ...prev,
                  ...newData
                }));
              }
            }}
          />
        </div>

        <Header level="h6" style={{ marginBottom: spacing.xxs }}>
          Household Relationships
        </Header>

        <Paragraph size="sm" style={{ marginBottom: spacing.xs }}>
          Add individuals to this household and indicate how they are related to {currentPersonName || 'this person'}.
        </Paragraph>

        {/* Member Relationship Rows */}
        {formData.members?.map((member, index) => (
          <div key={index} style={{ marginBottom: spacing.xs }}>
            <div style={{ display: 'flex', gap: spacing.xxs, marginBottom: spacing.xxs, alignItems: 'flex-end' }}>
              {/* AutoSuggest for Name */}
              <div style={{ flex: 1 }} ref={(el) => { if (el) autoSuggestRefs.current[index] = el; }}>
                <AutoSuggest
                  label="Name"
                  placeholder="Name..."
                  value={member.name}
                  options={availableNames}
                  allowCreate={true}
                  createLabel="Create new name"
                  onChange={(value) => {
                    // Check if this is a new name that needs QuickGlance
                    const isExisting = availableNames.some(n => n.label === value);

                    if (!isExisting && value.trim()) {
                      // Delay showing QuickGlance to let the selection finish
                      setTimeout(() => {
                        setNewPersonState({
                          showQuickGlance: true,
                          pendingName: value,
                          memberIndex: index
                        });
                      }, 50);
                    } else {
                      // Existing name, just update
                      handleNameChange(index, value);
                    }
                  }}
                />
              </div>

              {/* Select for Relationship */}
              <div style={{ width: '160px' }}>
                <Select
                  label="Relationship"
                  value={member.relationship}
                  onChange={(e) => {
                    const newMembers = [...formData.members];
                    newMembers[index].relationship = e.target.value;
                    setFormData(prev => ({ ...prev, members: newMembers }));
                  }}
                >
                  {RELATIONSHIPS.map(rel => (
                    <option key={rel} value={rel}>{rel}</option>
                  ))}
                </Select>
              </div>

              {/* Delete Button */}
              <IconButton
                icon={ContentDelete}
                variant="danger"
                size="md"
                label={`Remove ${member.name || 'member'}`}
                onClick={() => {
                  // Check if this person was added from another group
                  if (member.fromGroupId && !member.isOriginal) {
                    // Just remove from list, no dialog
                    const newMembers = formData.members.filter((_, i) => i !== index);
                    setFormData(prev => ({ ...prev, members: newMembers }));
                  } else {
                    // This is an original member or new name - need to show dialog
                    // Find the actual person object from census data
                    if (censusData && member.name) {
                      const allGroups = getAllRecordGroupsUnfiltered(censusData);
                      let foundPerson = null;
                      for (const group of allGroups) {
                        foundPerson = group.people.find(p => {
                          const fullName = `${p.givenName} ${p.surname}`.trim();
                          return fullName === member.name;
                        });
                        if (foundPerson) break;
                      }

                      if (foundPerson) {
                        // Pass the index so ViewNameInfoSheet can remove from list after delete
                        onDelete?.(foundPerson, index);
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        ))}

        {/* Add Household Member Button */}
        <div style={{ marginBottom: spacing.xs }}>
          <Button
            variant="blue"
            emphasis="low"
            inline={true}
            iconStart={ContentAdd}
            onClick={() => {
              setFormData(prev => ({
                ...prev,
                members: [...prev.members, { relationship: 'No Relation', name: '' }]
              }));
            }}
          >
            Household Member
          </Button>
        </div>
      </>
    );
  };

  const renderFooter = () => {
    if (state === 'add') {
      return (
        <Button
          variant="blue"
          emphasis="high"
          onClick={() => onNext?.(formData)}
          fullWidth
        >
          Next
        </Button>
      );
    }

    if (state === 'edit') {
      return (
        <div style={{ display: 'flex', gap: spacing.nano }}>
          <Button
            variant="blue"
            emphasis="medium"
            onClick={() => onCancel?.()}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            variant="blue"
            emphasis="high"
            onClick={() => onSave?.(formData)}
            fullWidth
          >
            Save
          </Button>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <Card
        variant={state === 'add' || state === 'edit' ? 'elevated' : 'outlined'}
        size="xxs"
      >
        {renderHeader()}

        {state === 'pending' && renderPendingState()}

        {(state === 'add' || state === 'edit' || state === 'review') && (
          <>
            {state === 'review' ? renderReviewState() : renderAddEditState()}

            {state === 'add' && renderFooter() && (
              <div style={{ marginTop: spacing.xs }}>
                {renderFooter()}
              </div>
            )}

            {state === 'edit' && renderFooter() && (
              <div style={{ marginTop: spacing.xs }}>
                {renderFooter()}
              </div>
            )}
          </>
        )}
      </Card>

      {/* QuickGlanceOverlay for new person creation - rendered via portal */}
      {newPersonState.showQuickGlance && newPersonState.memberIndex >= 0 && createPortal(
        <QuickGlanceOverlay
          isOpen={newPersonState.showQuickGlance}
          close={handleCancelNewPerson}
          anchorRef={{ current: autoSuggestRefs.current[newPersonState.memberIndex] }}
          position="bottom"
        >
          <AddPersonQuickGlance
            fullName={newPersonState.pendingName}
            onSave={handleSaveNewPerson}
            onCancel={handleCancelNewPerson}
          />
        </QuickGlanceOverlay>,
        document.body
      )}
    </>
  );
};

RecordGroupCard.propTypes = {
  state: PropTypes.oneOf(['pending', 'add', 'edit', 'review']),
  data: PropTypes.shape({
    recordGroup: PropTypes.object,
    members: PropTypes.arrayOf(PropTypes.shape({
      relationship: PropTypes.string,
      name: PropTypes.string
    }))
  }),
  censusData: PropTypes.object,
  currentPersonId: PropTypes.string,
  currentPersonName: PropTypes.string,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onNext: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onNewPersonCreated: PropTypes.func,
  onRecordGroupSelected: PropTypes.func
};
