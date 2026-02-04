import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { InfoSheet } from "../../ux-zion-library/src/components/InfoSheet";
import { Button } from "../../ux-zion-library/src/components/Button";
import { Header } from "../../ux-zion-library/src/components/Header";
import { Paragraph } from "../../ux-zion-library/src/components/Paragraph";
import { EssentialInformationCard } from './EssentialInformationCard';
import { RecordGroupCard } from './RecordGroupCard';
import { EventsCard } from './EventsCard';
import { AdditionalFactsCard } from './AdditionalFactsCard';
import { TreeAttachmentCard } from './TreeAttachmentCard';
import { PreviousRelationshipsDialog } from './PreviousRelationshipsDialog';
import { DeleteMemberDialog } from './DeleteMemberDialog';
import { AddPersonDetailsDialog } from './AddPersonDetailsDialog';
import { getRecordGroupPeople, getPerson } from '../utils/censusData';
import { colors } from "../../ux-zion-library/src/tokens/colors";
import { spacing } from "../../ux-zion-library/src/tokens/spacing";

export const ViewNameInfoSheet = ({ person: initialPerson, censusData, onUpdateCensusData, onBack, onClose, onDelete }) => {
  // Use state to track current person, so it can be refreshed after updates
  const [person, setPerson] = useState(initialPerson);

  // Refresh person data when censusData changes
  useEffect(() => {
    const updatedPerson = getPerson(censusData, person.id);
    if (updatedPerson) {
      setPerson(updatedPerson);
    }
  }, [censusData, person.id]);
  const [cardStates, setCardStates] = useState({
    essentialInfo: 'review',
    recordGroup: 'review',
    events: 'review',
    additionalFacts: 'review'
  });

  // Dialog state management
  const [dialogState, setDialogState] = useState({
    showPreviousRelationships: false,
    showDeleteMember: false,
    currentPersonIndex: 0,
    peopleToMove: [],
    pendingFormData: null,
    memberToDelete: null,
    currentGroupMembers: []
  });

  // New person dialog state
  const [newPersonDialog, setNewPersonDialog] = useState({
    showDetailsDialog: false,
    newPersonName: '',
    newPersonId: null
  });

  const handleEditCard = (cardName) => {
    setCardStates(prev => ({
      ...prev,
      [cardName]: 'edit'
    }));
  };

  const handleSaveCard = (cardName, formData) => {
    // Handle record group changes - check for people from other groups
    if (cardName === 'recordGroup') {
      // Find current person's record to get current group members
      const currentRecord = censusData.records.find(r =>
        r.people.some(p => p.id === person.id)
      );

      if (!currentRecord) return;

      // Identify people being moved from other groups
      const peopleToMove = [];

      if (formData.members) {
        formData.members.forEach(member => {
          // Find which record this person is currently in
          for (const record of censusData.records) {
            const foundPerson = record.people.find(p => {
              const personFullName = `${p.givenName} ${p.surname}`.trim();
              return personFullName === member.name;
            });

            if (foundPerson && record.id !== currentRecord.id) {
              // This person is from another group - get their previous relationships
              // Show the actual relationships this person has in their current group
              const previousRelationships = record.people
                .filter(p => p.id !== foundPerson.id)
                .map(p => {
                  // If the person being moved is Primary/Head, show others' relationships to them (as-is)
                  if (foundPerson.relationship === 'Primary' || foundPerson.relationship === 'Head') {
                    return {
                      relationship: p.relationship,
                      name: `${p.givenName} ${p.surname}`.trim()
                    };
                  }
                  // If Primary/Head is in the group, show the INVERSE of the person's relationship
                  // e.g., if Ronald is "Son" to Edgar (Head), show Edgar as "Parent" to Ronald
                  if (p.relationship === 'Primary' || p.relationship === 'Head') {
                    return {
                      relationship: getInverseRelationship(foundPerson.relationship),
                      name: `${p.givenName} ${p.surname}`.trim()
                    };
                  }
                  // For other non-Primary people, they have no direct relationship defined
                  return {
                    relationship: 'No Relation',
                    name: `${p.givenName} ${p.surname}`.trim()
                  };
                });

              peopleToMove.push({
                person: foundPerson,
                name: member.name,
                sourceRecordId: record.id,
                newRelationship: member.relationship,
                previousRelationships
              });
              break;
            }
          }
        });
      }

      // If there are people to move, show dialog for first person
      if (peopleToMove.length > 0) {
        // Get current group members (excluding the current viewing person but INCLUDING other people being moved)
        const currentGroupMembers = getRecordGroupPeople(censusData, currentRecord.id)
          .filter(p => p.id !== person.id && p.fullName !== peopleToMove[0].name)
          .map(p => ({
            name: p.fullName,
            relationship: p.relationship
          }));

        // Add other people being moved (except the current one) to the list
        peopleToMove.forEach((personToMove, index) => {
          if (index !== 0) { // Skip the first person (current one in dialog)
            currentGroupMembers.push({
              name: personToMove.name,
              relationship: personToMove.newRelationship
            });
          }
        });

        setDialogState({
          showPreviousRelationships: true,
          showDeleteMember: false,
          currentPersonIndex: 0,
          peopleToMove,
          pendingFormData: formData,
          memberToDelete: null,
          currentGroupMembers
        });
        return;
      }

      // No people to move, proceed with normal save
      performSaveWithoutDialogs(formData);
    } else if (cardName === 'events') {
      // Handle events card save - update the person's events in census data
      const updatedCensusData = {
        records: censusData.records.map(record => ({
          ...record,
          people: record.people.map(p => ({ ...p }))
        }))
      };

      // Find the person and update their events
      for (const record of updatedCensusData.records) {
        const personToUpdate = record.people.find(p => p.id === person.id);
        if (personToUpdate) {
          personToUpdate.events = formData.additionalEvents;
          break;
        }
      }

      onUpdateCensusData?.(updatedCensusData);

      setCardStates(prev => ({
        ...prev,
        [cardName]: 'review'
      }));
    } else if (cardName === 'additionalFacts') {
      // Handle additional facts card save - update the person's additionalFacts in census data
      const updatedCensusData = {
        records: censusData.records.map(record => ({
          ...record,
          people: record.people.map(p => ({ ...p }))
        }))
      };

      // Find the person and update their additional facts
      for (const record of updatedCensusData.records) {
        const personToUpdate = record.people.find(p => p.id === person.id);
        if (personToUpdate) {
          personToUpdate.additionalFacts = formData.facts;
          break;
        }
      }

      onUpdateCensusData?.(updatedCensusData);

      setCardStates(prev => ({
        ...prev,
        [cardName]: 'review'
      }));
    } else {
      // Other cards don't need dialog flow
      setCardStates(prev => ({
        ...prev,
        [cardName]: 'review'
      }));
    }
  };

  const performSaveWithoutDialogs = (formData) => {
    // Manual deep clone to preserve all properties
    const updatedCensusData = {
      records: censusData.records.map(record => ({
        ...record,
        people: record.people.map(p => ({ ...p }))
      }))
    };

    // Find current person's record
    const currentRecord = updatedCensusData.records.find(r =>
      r.people.some(p => p.id === person.id)
    );

    if (currentRecord && formData.members) {
      // Process each member to check if they need to be moved
      formData.members.forEach(member => {
        const memberFullName = member.name;

        // First find which record this person is currently in
        let sourceRecord = null;
        let personToMove = null;

        for (const record of updatedCensusData.records) {
          const foundPerson = record.people.find(p => {
            const personFullName = `${p.givenName} ${p.surname}`.trim();
            return personFullName === memberFullName;
          });

          if (foundPerson) {
            sourceRecord = record;
            personToMove = foundPerson;
            break;
          }
        }

        // If found in a different record, move them
        if (personToMove && sourceRecord && sourceRecord.id !== currentRecord.id) {
          // Remove from old record
          sourceRecord.people = sourceRecord.people.filter(p => p.id !== personToMove.id);

          // Add to current record with updated relationship
          const movedPerson = {
            ...personToMove,
            relationship: member.relationship
          };
          currentRecord.people.push(movedPerson);
        }
      });
    }

    // Update census data
    onUpdateCensusData?.(updatedCensusData);

    setCardStates(prev => ({
      ...prev,
      recordGroup: 'review'
    }));
  };

  const handleCancelEdit = (cardName) => {
    setCardStates(prev => ({
      ...prev,
      [cardName]: 'review'
    }));
  };

  const handlePreviousRelationshipsSave = (newRelationships) => {
    const { currentPersonIndex, peopleToMove } = dialogState;

    // Store the new relationships for this person
    const updatedPeopleToMove = [...peopleToMove];
    updatedPeopleToMove[currentPersonIndex].newRelationshipsWithGroup = newRelationships;

    // Check if there are more people to process
    if (currentPersonIndex < peopleToMove.length - 1) {
      // Move to next person
      const nextIndex = currentPersonIndex + 1;
      const nextPerson = peopleToMove[nextIndex];

      // Find current person's record
      const currentRecord = censusData.records.find(r =>
        r.people.some(p => p.id === person.id)
      );

      // Get current group members for next person (excluding current viewing person and next person)
      const currentGroupMembers = getRecordGroupPeople(censusData, currentRecord.id)
        .filter(p => {
          if (p.id === person.id) return false;
          if (p.fullName === nextPerson.name) return false;
          return true;
        })
        .map(p => ({
          name: p.fullName,
          relationship: p.relationship
        }));

      // Add other people being moved (except the next person) to the list
      updatedPeopleToMove.forEach((personToMove, index) => {
        if (index !== nextIndex) { // Skip the next person (current one in dialog)
          currentGroupMembers.push({
            name: personToMove.name,
            relationship: personToMove.newRelationship
          });
        }
      });

      setDialogState({
        ...dialogState,
        currentPersonIndex: nextIndex,
        peopleToMove: updatedPeopleToMove,
        currentGroupMembers
      });
    } else {
      // All people processed, now perform the actual move
      performMoveWithRelationships(updatedPeopleToMove);
    }
  };

  const handlePreviousRelationshipsCancel = () => {
    // Return to edit state
    setDialogState({
      showPreviousRelationships: false,
      showDeleteMember: false,
      currentPersonIndex: 0,
      peopleToMove: [],
      pendingFormData: null,
      memberToDelete: null,
      currentGroupMembers: []
    });
    setCardStates(prev => ({
      ...prev,
      recordGroup: 'edit'
    }));
  };

  const performMoveWithRelationships = (peopleToMove) => {
    // Manual deep clone to preserve all properties
    const updatedCensusData = {
      records: censusData.records.map(record => ({
        ...record,
        people: record.people.map(p => ({ ...p }))
      }))
    };

    // Find current person's record
    const currentRecord = updatedCensusData.records.find(r =>
      r.people.some(p => p.id === person.id)
    );

    if (!currentRecord) return;

    // Move each person and update their relationships
    peopleToMove.forEach(moveInfo => {
      const { person: personToMove, newRelationship, sourceRecordId, newRelationshipsWithGroup } = moveInfo;

      // Find source record
      const sourceRecord = updatedCensusData.records.find(r => r.id === sourceRecordId);

      if (sourceRecord) {
        // Remove from source record
        sourceRecord.people = sourceRecord.people.filter(p => p.id !== personToMove.id);

        // Add to current record with new relationship
        const movedPerson = {
          ...personToMove,
          relationship: newRelationship
        };
        currentRecord.people.push(movedPerson);
      }
    });

    // Apply the new relationships that were established in the dialogs
    peopleToMove.forEach(moveInfo => {
      const { name: movedPersonName, newRelationshipsWithGroup } = moveInfo;

      console.log('Applying relationships for:', movedPersonName);
      console.log('New relationships:', newRelationshipsWithGroup);

      if (!newRelationshipsWithGroup || newRelationshipsWithGroup.length === 0) return;

      // Find the moved person in the current record
      const movedPerson = currentRecord.people.find(p => {
        const fullName = `${p.givenName} ${p.surname}`.trim();
        return fullName === movedPersonName;
      });

      if (!movedPerson) {
        console.log('Could not find moved person:', movedPersonName);
        return;
      }

      console.log('Found moved person:', movedPerson);

      // Apply relationships - for now we just store the relationship on the moved person
      // The relationship system is based on relationship to Primary, so we need to handle this carefully
      newRelationshipsWithGroup.forEach(newRel => {
        console.log('Processing relationship:', newRel);

        // Find the target person in the current record
        const targetPerson = currentRecord.people.find(p => {
          const fullName = `${p.givenName} ${p.surname}`.trim();
          return fullName === newRel.name;
        });

        if (!targetPerson) {
          console.log('Could not find target person:', newRel.name);
          return;
        }

        console.log('Target person:', targetPerson.givenName, 'relationship:', targetPerson.relationship);

        // If the target is Primary/Head, update the moved person's relationship
        if (targetPerson.relationship === 'Primary' || targetPerson.relationship === 'Head') {
          console.log('Target is Primary/Head, setting moved person relationship to:', newRel.relationship);
          movedPerson.relationship = newRel.relationship;
        } else {
          // Target is not Primary - need to infer relationship to Primary
          // If setting as Sibling to someone who is "Son", then this person should also be "Son"
          // If setting as Sibling to someone who is "Child", then this person should also be "Child"
          console.log('Target is not Primary/Head, inferring relationship to Primary based on:', newRel.relationship, 'and target relationship:', targetPerson.relationship);

          if (newRel.relationship === 'Sibling') {
            // If they're siblings, they should have the same relationship to Primary
            console.log('Setting as sibling - copying target relationship:', targetPerson.relationship);
            movedPerson.relationship = targetPerson.relationship;
            console.log('After setting, movedPerson.relationship is now:', movedPerson.relationship);
          } else if (newRel.relationship === 'No Relation') {
            // Keep the relationship they were assigned in the card (newRelationship)
            console.log('No relation - keeping original relationship');
          } else {
            // For other relationships between non-Primary people, we can't accurately represent them
            console.log('Cannot accurately store this relationship in current data model');
          }
        }
      });
    });

    console.log('Final census data before update:');
    const peopleList = currentRecord.people.map(p => ({
      name: `${p.givenName} ${p.surname}`,
      relationship: p.relationship
    }));
    console.log('Current record people:', peopleList);
    peopleList.forEach(p => console.log(`  - ${p.name}: ${p.relationship}`));

    // Update census data
    onUpdateCensusData?.(updatedCensusData);

    console.log('Census data updated');

    // Close dialog and set to review state
    setDialogState({
      showPreviousRelationships: false,
      showDeleteMember: false,
      currentPersonIndex: 0,
      peopleToMove: [],
      pendingFormData: null,
      memberToDelete: null,
      currentGroupMembers: []
    });

    setCardStates(prev => ({
      ...prev,
      recordGroup: 'review'
    }));
  };

  const handleDeleteMember = (memberToDelete) => {
    // Check if this is an original member or newly added
    // For now, always show the delete dialog
    setDialogState(prev => ({
      ...prev,
      showDeleteMember: true,
      memberToDelete
    }));
  };

  const handleDeleteCompletely = () => {
    const { memberToDelete } = dialogState;

    if (!memberToDelete) return;

    // Manual deep clone
    const updatedCensusData = {
      records: censusData.records.map(record => ({
        ...record,
        people: record.people.map(p => ({ ...p }))
      }))
    };

    // Find and remove this person from all records
    for (const record of updatedCensusData.records) {
      const personFullName = `${memberToDelete.givenName} ${memberToDelete.surname}`.trim();
      record.people = record.people.filter(p => {
        const pFullName = `${p.givenName} ${p.surname}`.trim();
        return pFullName !== personFullName;
      });
    }

    // Update census data
    onUpdateCensusData?.(updatedCensusData);

    // Close dialog and stay in edit mode
    setDialogState(prev => ({
      ...prev,
      showDeleteMember: false,
      memberToDelete: null
    }));
  };

  const handleMoveToOwnGroup = () => {
    const { memberToDelete } = dialogState;

    if (!memberToDelete) return;

    // Manual deep clone
    const updatedCensusData = {
      records: censusData.records.map(record => ({
        ...record,
        people: record.people.map(p => ({ ...p }))
      }))
    };

    // Find current record
    const currentRecord = updatedCensusData.records.find(r =>
      r.people.some(p => p.id === person.id)
    );

    if (!currentRecord) return;

    // Find the person in current record
    const personFullName = `${memberToDelete.givenName} ${memberToDelete.surname}`.trim();
    const personToMove = currentRecord.people.find(p => {
      const pFullName = `${p.givenName} ${p.surname}`.trim();
      return pFullName === personFullName;
    });

    if (personToMove) {
      // Remove from current record
      currentRecord.people = currentRecord.people.filter(p => p.id !== personToMove.id);

      // Create new record with this person as Primary
      const newRecordId = `record-${Date.now()}`;
      const newRecord = {
        id: newRecordId,
        people: [{
          ...personToMove,
          relationship: 'Head'
        }]
      };

      updatedCensusData.records.push(newRecord);
    }

    // Update census data
    onUpdateCensusData?.(updatedCensusData);

    // Close dialog and stay in edit mode
    setDialogState(prev => ({
      ...prev,
      showDeleteMember: false,
      memberToDelete: null
    }));
  };

  const handleDeleteMemberCancel = () => {
    setDialogState(prev => ({
      ...prev,
      showDeleteMember: false,
      memberToDelete: null
    }));
  };

  // Handle new person creation from RecordGroupCard
  const handleNewPersonCreated = (givenName, surname) => {
    // Create new person in census data
    const updatedCensusData = {
      records: censusData.records.map(record => ({
        ...record,
        people: record.people.map(p => ({ ...p }))
      }))
    };

    // Find current person's record to add the new person to
    const currentRecord = updatedCensusData.records.find(r =>
      r.people.some(p => p.id === person.id)
    );

    if (!currentRecord) return null;

    // Generate a unique ID for the new person
    const newPersonId = `1:1:NEW-${Date.now()}`;
    const fullName = `${givenName} ${surname}`.trim();

    // Create the new person object
    const newPerson = {
      id: newPersonId,
      givenName,
      surname,
      relationship: 'Child', // Default relationship
      sex: '',
      age: '',
      race: '',
      attachedPersons: [],
      hints: [],
      events: []
    };

    // Add to census data
    currentRecord.people.push(newPerson);
    onUpdateCensusData?.(updatedCensusData);

    // Show dialog asking if they want to add details
    setNewPersonDialog({
      showDetailsDialog: true,
      newPersonName: fullName,
      newPersonId
    });

    return newPersonId;
  };

  const handleAddPersonDetails = () => {
    // Close dialog - later we'll open an add details infoSheet
    setNewPersonDialog({
      showDetailsDialog: false,
      newPersonName: '',
      newPersonId: null
    });
    // TODO: Open add details infoSheet for the person with newPersonDialog.newPersonId
    console.log('TODO: Open add details sheet for person:', newPersonDialog.newPersonId);
  };

  const handleSkipPersonDetails = () => {
    // Just close the dialog
    setNewPersonDialog({
      showDetailsDialog: false,
      newPersonName: '',
      newPersonId: null
    });
  };

  const getRelationshipDisplay = () => {
    if (person.relationship === 'Primary') {
      return 'Primary';
    }
    return `${person.relationship} to Primary`;
  };

  // Sample data structure - in real app this would come from person prop
  const essentialInfoData = {
    isPrimary: person.relationship === 'Primary',
    names: [
      {
        type: 'Birth Name',
        givenName: person.givenName || '',
        surname: person.surname || ''
      }
    ],
    sex: person.sex || '',
    race: person.race || '',
    age: person.age || ''
  };

  // Helper function to get inverse relationship
  const getInverseRelationship = (relationship) => {
    const inverseMap = {
      'Child': 'Parent',
      'Son': 'Parent',
      'Daughter': 'Parent',
      'Parent': 'Child',
      'Spouse': 'Spouse',
      'Wife': 'Spouse',
      'Husband': 'Spouse',
      'Head': 'Primary',
      'Sibling': 'Sibling',
      'Brother': 'Sibling',
      'Sister': 'Sibling',
      'Divorced Spouse': 'Divorced Spouse',
      'Domestic Partner': 'Domestic Partner',
      'Fiancé': 'Fiancé',
      'Adopted Child': 'Adopted Parent',
      'Adopted Parent': 'Adopted Child',
      'Aunt or Uncle': 'Niece or Nephew',
      'Niece or Nephew': 'Aunt or Uncle',
      'Child-in-law': 'Parent-in-law',
      'Parent-in-law': 'Child-in-law',
      'Cousin': 'Cousin',
      'Foster Child': 'Foster Parent',
      'Foster Parent': 'Foster Child',
      'Godchild': 'Godparent',
      'Godparent': 'Godchild',
      'Grandchild': 'Grandparent',
      'Grandparent': 'Grandchild',
      'Guardian Child': 'Guardian Parent',
      'Guardian Parent': 'Guardian Child',
      'Sibling-in-law': 'Sibling-in-law',
      'Stepchild': 'Stepparent',
      'Stepparent': 'Stepchild',
      'Stepsibling': 'Stepsibling',
      'Surrogate Child': 'Surrogate Parent',
      'Surrogate Parent': 'Surrogate Child',
      'Ancestor': 'Descendant',
      'Descendant': 'Ancestor',
      'Enslaved Person': 'Slaveholder',
      'Slaveholder': 'Enslaved Person',
      'Associate': 'Associate',
      'Relative': 'Relative',
      'Other': 'Other',
      'Primary': 'Primary'
    };

    return inverseMap[relationship] || 'No Relation';
  };

  // Get record group data for this person
  const getRecordGroupData = () => {
    // Find the record this person belongs to
    const record = censusData.records.find(r =>
      r.people.some(p => p.id === person.id)
    );

    if (!record) return null;

    // Get all people in this record
    const allPeople = getRecordGroupPeople(censusData, record.id);

    // Find the primary person for the record group name
    const primaryPerson = allPeople.find(p => p.relationship === 'Primary');
    const recordGroupName = primaryPerson
      ? primaryPerson.fullName
      : 'Census';

    // Build members array (all people except the current person)
    // Use the relationships array to find direct relationships
    const members = allPeople
      .filter(p => p.id !== person.id)
      .map(p => {
        // Check if there's a relationship defined in the current person's relationships array
        if (person.relationships && person.relationships.length > 0) {
          const rel = person.relationships.find(r => r.relatedPersonId === p.id);
          if (rel) {
            // Capitalize the role for display
            const displayRole = rel.role.split('_').map(word =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ).join(' ');

            return {
              relationship: displayRole,
              name: p.fullName
            };
          }
        }

        // Fallback to old logic if relationships array doesn't exist or relationship not found
        // If viewing the Primary person, show everyone's relationships as-is
        if (person.relationship === 'Primary' || person.relationship === 'Head') {
          return {
            relationship: p.relationship,
            name: p.fullName
          };
        }

        // If viewing a non-Primary person:
        if (p.relationship === 'Primary' || p.relationship === 'Head') {
          // Show inverse of current person's relationship to Primary
          return {
            relationship: getInverseRelationship(person.relationship),
            name: p.fullName
          };
        } else {
          // For other non-Primary people, check if they have the same relationship (siblings)
          const personRel = person.relationship;
          const otherRel = p.relationship;

          // If both have the same child-like relationship, they're siblings
          if ((personRel === 'Son' || personRel === 'Daughter' || personRel === 'Child') &&
              (otherRel === 'Son' || otherRel === 'Daughter' || otherRel === 'Child')) {
            return {
              relationship: 'Sibling',
              name: p.fullName
            };
          }

          // If both are stepchildren, they're stepsiblings
          if ((personRel === 'Stepson' || personRel === 'Stepdaughter' || personRel === 'Stepchild') &&
              (otherRel === 'Stepson' || otherRel === 'Stepdaughter' || otherRel === 'Stepchild')) {
            return {
              relationship: 'Stepsibling',
              name: p.fullName
            };
          }

          // Otherwise, no direct relationship defined
          return {
            relationship: 'No Relation',
            name: p.fullName
          };
        }
      });

    return {
      recordGroup: {
        type: 'Census',
        primaryName: recordGroupName
      },
      members
    };
  };

  const recordGroupData = getRecordGroupData();

  // Get events data for this person
  const getEventsData = () => {
    // Find the record this person belongs to to get the primary event
    const record = censusData.records.find(r =>
      r.people.some(p => p.id === person.id)
    );

    if (!record) return null;

    // Get primary event from record (assuming it's stored as recordType)
    const primaryEvent = {
      type: record.recordType || '',
      date: record.date || '',
      place: record.place || ''
    };

    // Get additional events from person (if they exist)
    const additionalEvents = person.events || [];

    console.log('getEventsData for', person.fullName);
    console.log('person.events:', person.events);
    console.log('additionalEvents:', additionalEvents);

    return {
      primaryEvent,
      additionalEvents
    };
  };

  const eventsData = getEventsData();

  // Get additional facts data for this person
  const getAdditionalFactsData = () => {
    // Get additional facts from person (if they exist)
    const facts = person.additionalFacts || [];

    return {
      facts
    };
  };

  const additionalFactsData = getAdditionalFactsData();

  // Get tree attachment data for this person
  const getTreeAttachmentData = () => {
    const fullName = person.fullName;

    // Map of hints
    const hints = {
      'Horace Bruce Denton': {
        name: 'Horace Bruce Denton Jr.',
        sex: 'Male',
        initials: 'HBD',
        birthYear: '1922',
        deathYear: '1987',
        pid: 'LHRD-1TM'
      },
      'Virginia Denton': {
        name: 'Virginia Lucille Jager',
        sex: 'Female',
        initials: 'VLJ',
        birthYear: '1924',
        deathYear: '2015',
        pid: 'LB6S-ZBM'
      },
      'Catherine Denton': {
        name: 'Catherine Ann Denton',
        sex: 'Female',
        initials: 'CAD',
        birthYear: '1944',
        deathYear: '2022',
        pid: 'GKPX-45B'
      }
    };

    // Map of attachments
    const attachments = {
      'Edgar J Fadden': {
        name: 'Edgar Joseph Fadden',
        sex: 'Male',
        initials: 'EJF',
        birthYear: '1923',
        deathYear: '2007',
        pid: 'PSZS-N4R'
      },
      'Dagle H Fadden': {
        name: 'Dayle Gresley Hart',
        sex: 'Female',
        initials: 'DGH',
        birthYear: '1929',
        deathYear: '2019',
        pid: 'PSZ9-55M'
      },
      'Carroll Morgan': {
        name: 'Carroll Morgan',
        sex: 'Male',
        initials: 'CM',
        birthYear: '1925',
        deathYear: '2020',
        pid: 'G4MH-KVN'
      },
      'Maxine Morgan': {
        name: 'Maxine Cade',
        sex: 'Female',
        initials: 'MC',
        birthYear: '1928',
        deathYear: '2005',
        pid: 'G4MH-K3W'
      },
      'Lester C Montgomery': {
        name: 'Lester Charles Montgomery',
        sex: 'Male',
        initials: 'LCM',
        birthYear: '1906',
        deathYear: '1954',
        pid: 'L2J4-QMB'
      },
      'Charlotte W Montgomery': {
        name: 'Charlotte Walteretta Sanford',
        sex: 'Female',
        initials: 'CWS',
        birthYear: '1909',
        deathYear: '1989',
        pid: 'L2J4-3PW'
      },
      'Lester C Montgomery, Jr': {
        name: 'Lester Charles Montgomery',
        sex: 'Male',
        initials: 'LCM',
        birthYear: '1932',
        deathYear: '2023',
        pid: 'GYQQ-138'
      }
    };

    if (hints[fullName]) {
      return {
        type: 'hint',
        data: { hint: hints[fullName] }
      };
    }

    if (attachments[fullName]) {
      return {
        type: 'attached',
        data: { attachment: attachments[fullName] }
      };
    }

    return {
      type: 'unattached',
      data: {}
    };
  };

  const treeAttachmentInfo = getTreeAttachmentData();

  return (
    <InfoSheet
      title="View Name"
      panel={true}
      onBack={onBack}
      close={onClose}
      size="lg"
      elevated={false}
    >
      {/* Custom top border */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          backgroundColor: colors.green.green60
        }}
      />

      {/* Person header */}
      <div style={{ marginBottom: spacing.xs }}>
        <div
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color: colors.gray.gray60,
            marginBottom: '3px'
          }}
        >
          {getRelationshipDisplay()}
        </div>
        <Header level="h4" style={{ marginBottom: spacing.xxs }}>
          {person.fullName}
        </Header>
        <Button
          variant="blue"
          emphasis="low"
          inline={true}
          onClick={() => console.log('View Record clicked')}
        >
          View Record
        </Button>
      </div>

      <Paragraph size="sm" style={{ marginBottom: spacing.xs }}>
        Click any edit button to fix the text or highlights.
      </Paragraph>

      {/* Tree Attachment Card */}
      <div style={{ marginBottom: spacing.xs }}>
        <TreeAttachmentCard
          type={treeAttachmentInfo.type}
          data={treeAttachmentInfo.data}
          onAttachHint={() => console.log('Attach Hint clicked')}
          onAttachManually={() => console.log('Attach manually clicked')}
        />
      </div>

      {/* Essential Information Card */}
      <div style={{ marginBottom: spacing.xs }}>
        <EssentialInformationCard
          state={cardStates.essentialInfo}
          data={essentialInfoData}
          onEdit={() => handleEditCard('essentialInfo')}
          onSave={(formData) => handleSaveCard('essentialInfo', formData)}
          onCancel={() => handleCancelEdit('essentialInfo')}
        />
      </div>

      {/* Record Group Card */}
      {recordGroupData && (
        <div style={{ marginBottom: spacing.xs }}>
          <RecordGroupCard
            state={cardStates.recordGroup}
            data={recordGroupData}
            censusData={censusData}
            currentPersonId={person.id}
            onEdit={() => handleEditCard('recordGroup')}
            onSave={(formData) => handleSaveCard('recordGroup', formData)}
            onCancel={() => handleCancelEdit('recordGroup')}
            onDelete={handleDeleteMember}
            onNewPersonCreated={handleNewPersonCreated}
          />
        </div>
      )}

      {/* Events Card */}
      {eventsData && (
        <div style={{ marginBottom: spacing.xs }}>
          <EventsCard
            state={cardStates.events}
            data={eventsData}
            onEdit={() => handleEditCard('events')}
            onSave={(formData) => handleSaveCard('events', formData)}
            onCancel={() => handleCancelEdit('events')}
          />
        </div>
      )}

      {/* Additional Facts Card */}
      {additionalFactsData && (
        <div style={{ marginBottom: spacing.xs }}>
          <AdditionalFactsCard
            state={cardStates.additionalFacts}
            data={additionalFactsData}
            onEdit={() => handleEditCard('additionalFacts')}
            onSave={(formData) => handleSaveCard('additionalFacts', formData)}
            onCancel={() => handleCancelEdit('additionalFacts')}
          />
        </div>
      )}

      {/* Delete button */}
      <div style={{ marginTop: spacing.sm }}>
        <Button
          variant="danger"
          emphasis="low"
          inline={true}
          onClick={() => {
            if (window.confirm(`Are you sure you want to delete ${person.fullName}?`)) {
              onDelete?.(person.id);
            }
          }}
        >
          Delete {person.fullName}
        </Button>
      </div>

      {/* Previous Relationships Dialog - rendered via portal */}
      {dialogState.showPreviousRelationships && dialogState.peopleToMove.length > 0 && createPortal(
        <PreviousRelationshipsDialog
          isOpen={dialogState.showPreviousRelationships}
          personName={dialogState.peopleToMove[dialogState.currentPersonIndex]?.name}
          previousRelationships={dialogState.peopleToMove[dialogState.currentPersonIndex]?.previousRelationships || []}
          currentGroupMembers={dialogState.currentGroupMembers || []}
          onSave={handlePreviousRelationshipsSave}
          onCancel={handlePreviousRelationshipsCancel}
        />,
        document.body
      )}

      {/* Delete Member Dialog - rendered via portal */}
      {dialogState.showDeleteMember && dialogState.memberToDelete && createPortal(
        <DeleteMemberDialog
          isOpen={dialogState.showDeleteMember}
          memberName={`${dialogState.memberToDelete.givenName} ${dialogState.memberToDelete.surname}`.trim()}
          onDeleteCompletely={handleDeleteCompletely}
          onMoveToOwnGroup={handleMoveToOwnGroup}
          onCancel={handleDeleteMemberCancel}
        />,
        document.body
      )}

      {/* Add Person Details Dialog - rendered via portal */}
      {newPersonDialog.showDetailsDialog && createPortal(
        <AddPersonDetailsDialog
          isOpen={newPersonDialog.showDetailsDialog}
          personName={newPersonDialog.newPersonName}
          onAddDetails={handleAddPersonDetails}
          onSkip={handleSkipPersonDetails}
        />,
        document.body
      )}
    </InfoSheet>
  );
};

ViewNameInfoSheet.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    givenName: PropTypes.string,
    surname: PropTypes.string,
    relationship: PropTypes.string,
    sex: PropTypes.string,
    race: PropTypes.string,
    age: PropTypes.string
  }).isRequired,
  censusData: PropTypes.object.isRequired,
  onUpdateCensusData: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func
};
