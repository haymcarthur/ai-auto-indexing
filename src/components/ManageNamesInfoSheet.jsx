import { useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { InfoSheet } from '../../../ux-zion-library/src/components/InfoSheet';
import { Button } from '../../../ux-zion-library/src/components/Button';
import { Paragraph } from '../../../ux-zion-library/src/components/Paragraph';
import { ListItem } from '../../../ux-zion-library/src/components/ListItem';
import { Divider } from '../../../ux-zion-library/src/components/Divider';
import { ContentAdd, ControlDrag } from '../../../ux-zion-library/src/icons';
import { spacing } from '../../../ux-zion-library/src/tokens/spacing';
import { AddNameInfoSheet } from './AddNameInfoSheet';
import { PreviousRelationshipsDialog } from './PreviousRelationshipsDialog';
import { getAllRecordGroups } from '../utils/censusData';

export const ManageNamesInfoSheet = ({ censusData, recordGroups, onBack, onClose, onUpdateCensusData, onSaveAndReturn }) => {
  const [showAddName, setShowAddName] = useState(false);
  const [selectedRecordGroup, setSelectedRecordGroup] = useState(null);
  const [draggedPerson, setDraggedPerson] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const [dialogState, setDialogState] = useState({
    showPreviousRelationships: false,
    personToMove: null,
    sourceRecordGroup: null,
    targetRecordGroup: null,
    previousRelationships: [],
    currentGroupMembers: []
  });

  // Helper function to get inverse relationship
  const getInverseRelationship = (relationship) => {
    const inverseMap = {
      'Parent': 'Child',
      'Child': 'Parent',
      'Spouse': 'Spouse',
      'Sibling': 'Sibling',
      'Grandparent': 'Grandchild',
      'Grandchild': 'Grandparent',
      'Other': 'Other',
      'No Relation': 'No Relation'
    };
    return inverseMap[relationship] || relationship;
  };

  const handleSaveAndReturn = () => {
    // Reset showAddName state before calling parent's onSaveAndReturn
    setShowAddName(false);
    setSelectedRecordGroup(null);
    // Call parent's onSaveAndReturn if provided
    if (onSaveAndReturn) {
      onSaveAndReturn();
    }
  };

  // Get all record groups from census data
  const allRecordGroups = getAllRecordGroups(censusData);

  // Handle opening Add Name sheet with pre-populated record group
  const handleAddNameToGroup = (recordGroup) => {
    setSelectedRecordGroup(recordGroup);
    setShowAddName(true);
  };

  // Handle opening Add Name sheet for new group
  const handleAddNameNewGroup = () => {
    setSelectedRecordGroup(null);
    setShowAddName(true);
  };

  // Drag handlers
  const handleDragStart = (person, sourceRecordGroup) => (e) => {
    setDraggedPerson({ person, sourceRecordGroup });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (targetId) => (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDropTarget(targetId);
  };

  const handleDragLeave = () => {
    setDropTarget(null);
  };

  const handleDrop = (targetRecordGroup) => (e) => {
    e.preventDefault();
    setDropTarget(null);

    if (!draggedPerson) return;

    const { person, sourceRecordGroup } = draggedPerson;

    // Find the source record in the original census data
    const sourceRecord = censusData.records.find(r => r.id === sourceRecordGroup.id);
    if (!sourceRecord) {
      console.error('Source record not found');
      setDraggedPerson(null);
      return;
    }

    // Find the person in the source record
    const personToMove = sourceRecord.people.find(p => p.id === person.id);
    if (!personToMove) {
      console.error('Person not found in source record');
      setDraggedPerson(null);
      return;
    }

    // Check if person has relationships in source group (more than just them)
    const hasRelationships = sourceRecord.people.length > 1;

    if (hasRelationships) {
      // Get previous relationships
      const previousRelationships = sourceRecord.people
        .filter(p => p.id !== personToMove.id)
        .map(p => {
          if (personToMove.relationship === 'Primary' || personToMove.relationship === 'Head') {
            return {
              relationship: p.relationship,
              name: `${p.givenName} ${p.surname}`.trim()
            };
          }
          if (p.relationship === 'Primary' || p.relationship === 'Head') {
            return {
              relationship: getInverseRelationship(personToMove.relationship),
              name: `${p.givenName} ${p.surname}`.trim()
            };
          }
          return {
            relationship: 'No Relation',
            name: `${p.givenName} ${p.surname}`.trim()
          };
        });

      // Get current group members for the target
      let currentGroupMembers = [];
      if (targetRecordGroup !== 'new-group') {
        const targetRecord = censusData.records.find(r => r.id === targetRecordGroup.id);
        if (targetRecord) {
          currentGroupMembers = targetRecord.people.map(p => ({
            relationship: 'No Relation',
            name: `${p.givenName} ${p.surname}`.trim()
          }));
        }
      }

      // Show the Previous Relationships dialog
      setDialogState({
        showPreviousRelationships: true,
        personToMove,
        sourceRecordGroup,
        targetRecordGroup,
        previousRelationships,
        currentGroupMembers
      });
    } else {
      // No relationships, just move the person directly
      completeMoveWithoutDialog(personToMove, sourceRecordGroup, targetRecordGroup);
    }

    setDraggedPerson(null);
  };

  // Complete the move without showing dialog
  const completeMoveWithoutDialog = (personToMove, sourceRecordGroup, targetRecordGroup) => {
    // Deep copy census data to avoid mutations
    const updatedCensusData = {
      ...censusData,
      records: censusData.records.map(record => ({
        ...record,
        people: [...record.people]
      }))
    };

    // Find the source record
    const sourceRecord = updatedCensusData.records.find(r => r.id === sourceRecordGroup.id);
    if (!sourceRecord) return;

    // Remove person from source record
    sourceRecord.people = sourceRecord.people.filter(p => p.id !== personToMove.id);

    let targetRecord;

    if (targetRecordGroup === 'new-group') {
      // Create a new record group
      targetRecord = {
        id: `1:2:${Date.now()}`,
        recordType: sourceRecord.recordType || 'Census',
        date: sourceRecord.date || '',
        place: sourceRecord.place || '',
        people: []
      };
      updatedCensusData.records.push(targetRecord);
    } else {
      // Find the target record
      targetRecord = updatedCensusData.records.find(r => r.id === targetRecordGroup.id);
      if (!targetRecord) return;
    }

    // Determine the new relationship
    let newRelationship = 'Primary';

    // If adding to an existing group, set as "Other" (user can change later)
    if (targetRecordGroup !== 'new-group') {
      const hasPrimary = targetRecord.people.some(p => p.relationship === 'Primary' || p.relationship === 'Head');
      newRelationship = hasPrimary ? 'Other' : 'Primary';
    }

    // Add person to target record with new relationship
    targetRecord.people.push({
      ...personToMove,
      relationship: newRelationship
    });

    // Update census data
    onUpdateCensusData(updatedCensusData);
  };

  // Handle Previous Relationships dialog save
  const handlePreviousRelationshipsSave = (newRelationships) => {
    const { personToMove, sourceRecordGroup, targetRecordGroup } = dialogState;

    // Deep copy census data to avoid mutations
    const updatedCensusData = {
      ...censusData,
      records: censusData.records.map(record => ({
        ...record,
        people: [...record.people]
      }))
    };

    // Find the source record
    const sourceRecord = updatedCensusData.records.find(r => r.id === sourceRecordGroup.id);
    if (!sourceRecord) {
      setDialogState({ ...dialogState, showPreviousRelationships: false });
      return;
    }

    // Remove person from source record
    sourceRecord.people = sourceRecord.people.filter(p => p.id !== personToMove.id);

    let targetRecord;

    if (targetRecordGroup === 'new-group') {
      // Create a new record group
      targetRecord = {
        id: `1:2:${Date.now()}`,
        recordType: sourceRecord.recordType || 'Census',
        date: sourceRecord.date || '',
        place: sourceRecord.place || '',
        people: []
      };
      updatedCensusData.records.push(targetRecord);
    } else {
      // Find the target record
      targetRecord = updatedCensusData.records.find(r => r.id === targetRecordGroup.id);
      if (!targetRecord) {
        setDialogState({ ...dialogState, showPreviousRelationships: false });
        return;
      }
    }

    // Determine the new relationship from the dialog
    let newRelationship = 'Primary';
    if (newRelationships && newRelationships.length > 0) {
      // Use the first relationship from the dialog
      newRelationship = getInverseRelationship(newRelationships[0].relationship);
    } else if (targetRecordGroup !== 'new-group') {
      const hasPrimary = targetRecord.people.some(p => p.relationship === 'Primary' || p.relationship === 'Head');
      newRelationship = hasPrimary ? 'Other' : 'Primary';
    }

    // Add person to target record with new relationship
    targetRecord.people.push({
      ...personToMove,
      relationship: newRelationship
    });

    // Update census data
    onUpdateCensusData(updatedCensusData);

    // Close dialog
    setDialogState({ ...dialogState, showPreviousRelationships: false });
  };

  // Handle Previous Relationships dialog cancel
  const handlePreviousRelationshipsCancel = () => {
    setDialogState({ ...dialogState, showPreviousRelationships: false });
  };

  if (showAddName) {
    return (
      <AddNameInfoSheet
        onBack={() => {
          setShowAddName(false);
          setSelectedRecordGroup(null);
        }}
        onClose={onClose}
        onSaveAndReturn={handleSaveAndReturn}
        censusData={censusData}
        onUpdateCensusData={onUpdateCensusData}
        preselectedRecordGroup={selectedRecordGroup}
      />
    );
  }

  return (
    <InfoSheet
      title="Manage Names"
      subtitle="Add or Rearrange Names"
      panel={true}
      onBack={onBack}
      close={onClose}
      size="lg"
      elevated={false}
    >
      <Paragraph size="sm" secondary style={{ marginBottom: spacing.xxs }}>
        Moving a name will remove its previous relationships.
      </Paragraph>

      <Divider style={{ marginTop: spacing.xxs, marginBottom: spacing.xxs }} />

      {/* New Group Section */}
      <div
        onDragOver={handleDragOver('new-group')}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop('new-group')}
        style={{
          backgroundColor: dropTarget === 'new-group' ? 'rgba(24, 106, 201, 0.1)' : 'transparent',
          transition: 'background-color 0.2s ease',
          borderRadius: '8px',
          padding: dropTarget === 'new-group' ? '8px' : '0'
        }}
      >
        <ListItem
          heading="New Group"
          subheading="Add or drag names here to create a new group"
        />
      </div>

      <div style={{ marginTop: spacing.nano, marginBottom: spacing.xxs }}>
        <Button
          variant="blue"
          emphasis="low"
          iconStart={ContentAdd}
          inline
          onClick={handleAddNameNewGroup}
        >
          Name
        </Button>
      </div>

      <Divider style={{ marginTop: spacing.xxs, marginBottom: spacing.xxs }} />

      {/* Existing Record Groups */}
      {allRecordGroups.map((recordGroup, groupIndex) => {
        const primaryPerson = recordGroup.people.find(p => p.relationship === 'Primary');
        const primaryName = primaryPerson?.fullName || recordGroup.primary;

        return (
          <div key={recordGroup.id} style={{ marginTop: spacing.xxs }}>
            {/* Members in this record group */}
            <div
              onDragOver={handleDragOver(recordGroup.id)}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop(recordGroup)}
              style={{
                backgroundColor: dropTarget === recordGroup.id ? 'rgba(24, 106, 201, 0.1)' : 'transparent',
                transition: 'background-color 0.2s ease',
                borderRadius: '8px',
                padding: dropTarget === recordGroup.id ? '8px' : '0'
              }}
            >
              {recordGroup.people.map((person, personIndex) => {
                const isPrimary = person.relationship === 'Primary';
                const relationshipDisplay = isPrimary
                  ? 'Primary'
                  : `${person.relationship} of ${primaryName}`;

                return (
                  <div
                    key={person.id}
                    draggable
                    onDragStart={handleDragStart(person, recordGroup)}
                    onDragEnd={() => setDraggedPerson(null)}
                    style={{
                      cursor: 'grab',
                      opacity: draggedPerson?.person?.id === person.id ? 0.5 : 1,
                      marginBottom: spacing.pico
                    }}
                  >
                    <ListItem
                      overline={relationshipDisplay}
                      heading={person.fullName}
                      endIcon={<ControlDrag size="sm" />}
                      fullWidth={false}
                    />
                  </div>
                );
              })}
            </div>

            {/* Add Name button for this record group */}
            <div style={{ marginTop: spacing.nano, marginBottom: spacing.xxs }}>
              <Button
                variant="blue"
                emphasis="low"
                iconStart={ContentAdd}
                inline
                onClick={() => handleAddNameToGroup(recordGroup)}
              >
                Name
              </Button>
            </div>

            {/* Divider after each record group (except the last one) */}
            {groupIndex < allRecordGroups.length - 1 && <Divider style={{ marginTop: spacing.xxs, marginBottom: spacing.xxs }} />}
          </div>
        );
      })}

      {/* Previous Relationships Dialog - rendered via portal */}
      {dialogState.showPreviousRelationships && createPortal(
        <PreviousRelationshipsDialog
          isOpen={dialogState.showPreviousRelationships}
          personName={dialogState.personToMove ? `${dialogState.personToMove.givenName} ${dialogState.personToMove.surname}`.trim() : ''}
          previousRelationships={dialogState.previousRelationships}
          currentGroupMembers={dialogState.currentGroupMembers}
          onSave={handlePreviousRelationshipsSave}
          onCancel={handlePreviousRelationshipsCancel}
        />,
        document.body
      )}
    </InfoSheet>
  );
};

ManageNamesInfoSheet.propTypes = {
  censusData: PropTypes.object.isRequired,
  recordGroups: PropTypes.array.isRequired,
  onBack: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateCensusData: PropTypes.func.isRequired,
  onSaveAndReturn: PropTypes.func
};
