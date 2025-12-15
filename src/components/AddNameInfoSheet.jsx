import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { InfoSheet } from '../../../ux-zion-library/src/components/InfoSheet';
import { Paragraph } from '../../../ux-zion-library/src/components/Paragraph';
import { DialogOverlay } from '../../../ux-zion-library/src/components/DialogOverlay';
import { EssentialInformationCard } from './EssentialInformationCard';
import { RecordGroupCard } from './RecordGroupCard';
import { EventsCard } from './EventsCard';
import { AdditionalFactsCard } from './AdditionalFactsCard';
import { ReviewCard } from './ReviewCard';
import { PreviousRelationshipsDialog } from './PreviousRelationshipsDialog';
import { spacing } from '../../../ux-zion-library/src/tokens/spacing';
import { colors } from '../../../ux-zion-library/src/tokens/colors';

export const AddNameInfoSheet = ({ onBack, onClose, onSaveAndReturn, censusData, onUpdateCensusData, preselectedRecordGroup }) => {
  const [cardStates, setCardStates] = useState({
    essentialInfo: 'add',
    recordGroup: 'pending',
    events: 'pending',
    additionalFacts: 'pending',
    review: 'pending'
  });

  const [cardData, setCardData] = useState({
    essentialInfo: { isPrimary: false, names: [{ type: 'Birth Name', givenName: '', surname: '' }], sex: '', race: '', age: '' },
    recordGroup: { recordGroup: null, members: [] },
    events: { primaryEvent: { type: '', date: '', place: '' }, additionalEvents: [] },
    additionalFacts: { facts: [] }
  });

  // Initialize with preselected record group if provided
  useEffect(() => {
    if (preselectedRecordGroup) {
      // Find the actual record from census data to get record-level data
      const record = censusData.records.find(r => r.id === preselectedRecordGroup.id);

      if (record) {
        // Pre-populate record group and events data
        const members = preselectedRecordGroup.people.map(person => ({
          relationship: 'No Relation',
          name: person.fullName,
          fromGroupId: preselectedRecordGroup.id
        }));

        setCardData(prev => ({
          ...prev,
          recordGroup: {
            recordGroup: {
              type: record.recordType || 'Census',
              primaryName: preselectedRecordGroup.name
            },
            members: members,
            existingRecordId: record.id
          },
          events: {
            primaryEvent: {
              type: record.recordType || 'Census',
              date: record.date || '',
              place: record.place || ''
            },
            additionalEvents: []
          }
        }));
      }
    }
  }, [preselectedRecordGroup, censusData]);

  const [showAttachDialog, setShowAttachDialog] = useState(false);
  const [remainingPeople, setRemainingPeople] = useState([]);
  const [currentPersonIndex, setCurrentPersonIndex] = useState(0);
  const [savedPeople, setSavedPeople] = useState([]); // Track all saved people with their relationships
  const [dialogState, setDialogState] = useState({
    showPreviousRelationships: false,
    currentPersonIndex: 0,
    peopleToMove: [],
    pendingFormData: null,
    currentGroupMembers: []
  });

  // Get current person name for display
  const getCurrentPersonName = () => {
    const names = cardData.essentialInfo.names;
    if (names && names.length > 0) {
      const name = names[0];
      return `${name.givenName} ${name.surname}`.trim() || 'This person';
    }
    return 'This person';
  };

  // Get remaining people names for display (convert objects to strings)
  const getRemainingPeopleNames = () => {
    return remainingPeople.slice(currentPersonIndex).map(person => {
      if (typeof person === 'string') {
        return person;
      }
      return `${person.givenName} ${person.surname}`.trim();
    });
  };

  const handleEditCard = (cardName) => {
    setCardStates(prev => ({
      ...prev,
      [cardName]: 'edit'
    }));
  };

  const handleSaveCard = (cardName, formData) => {
    // Save the data, preserving existingRecordId if it exists
    setCardData(prev => {
      const newData = { ...prev };

      // For recordGroup, preserve existingRecordId
      if (cardName === 'recordGroup' && prev.recordGroup?.existingRecordId) {
        newData[cardName] = {
          ...formData,
          existingRecordId: prev.recordGroup.existingRecordId
        };
      } else {
        newData[cardName] = formData;
      }

      return newData;
    });

    setCardStates(prev => ({
      ...prev,
      [cardName]: 'review'
    }));
  };

  // Helper function to get inverse relationship
  const getInverseRelationship = (relationship) => {
    const relationshipMap = {
      'Child': 'Parent',
      'Parent': 'Child',
      'Spouse': 'Spouse',
      'Divorced Spouse': 'Divorced Spouse',
      'Domestic Partner': 'Domestic Partner',
      'Fiancé': 'Fiancé',
      'Sibling': 'Sibling',
      'Adopted Child': 'Adopted Parent',
      'Adopted Parent': 'Adopted Child',
      'Child-in-law': 'Parent-in-law',
      'Parent-in-law': 'Child-in-law',
      'Foster Child': 'Foster Parent',
      'Foster Parent': 'Foster Child',
      'Godchild': 'Godparent',
      'Godparent': 'Godchild',
      'Grandchild': 'Grandparent',
      'Grandparent': 'Grandchild',
      'Guardian Child': 'Guardian Parent',
      'Guardian Parent': 'Guardian Child',
      'Stepchild': 'Stepparent',
      'Stepparent': 'Stepchild',
      'Surrogate Child': 'Surrogate Parent',
      'Surrogate Parent': 'Surrogate Child',
      'Niece or Nephew': 'Aunt or Uncle',
      'Aunt or Uncle': 'Niece or Nephew',
      'Sibling-in-law': 'Sibling-in-law',
      'Stepsibling': 'Stepsibling'
    };
    return relationshipMap[relationship] || relationship;
  };

  const handleNextCard = (cardName, formData) => {
    console.log('[handleNextCard] Called for card:', cardName, 'with data:', formData);

    // Special handling for recordGroup - check if people are being moved
    if (cardName === 'recordGroup') {
      const peopleToMove = [];

      // Get the target record ID (if selecting an existing record group)
      let targetRecordId = cardData.recordGroup?.existingRecordId;

      // Check each member to see if they're from another record group
      if (formData.members && formData.members.length > 0) {
        formData.members.forEach(member => {
          // Search all records for this person
          for (const record of censusData.records) {
            const foundPerson = record.people.find(p => {
              const personFullName = `${p.givenName} ${p.surname}`.trim();
              return personFullName === member.name;
            });

            if (foundPerson) {
              // Only add to peopleToMove if this person is from a DIFFERENT record group
              if (targetRecordId && record.id === targetRecordId) {
                // Person is already in the target record group, skip them
                break;
              }

              // This person exists in a different record - get their previous relationships
              const previousRelationships = record.people
                .filter(p => p.id !== foundPerson.id)
                .map(p => {
                  if (foundPerson.relationship === 'Primary' || foundPerson.relationship === 'Head') {
                    return {
                      relationship: p.relationship,
                      name: `${p.givenName} ${p.surname}`.trim()
                    };
                  }
                  if (p.relationship === 'Primary' || p.relationship === 'Head') {
                    return {
                      relationship: getInverseRelationship(foundPerson.relationship),
                      name: `${p.givenName} ${p.surname}`.trim()
                    };
                  }
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
        // Get current group members including the person being added (from essentialInfo)
        const currentPersonName = getCurrentPersonName();
        const currentGroupMembers = [
          // Add the current person being added first
          {
            name: currentPersonName,
            relationship: 'Primary' // The person being added is typically primary
          },
          // Then add other members from the form
          ...formData.members
            .filter(m => m.name !== peopleToMove[0].name)
            .map(m => ({
              name: m.name,
              relationship: m.relationship
            }))
        ];

        setDialogState({
          showPreviousRelationships: true,
          currentPersonIndex: 0,
          peopleToMove,
          pendingFormData: formData,
          currentGroupMembers
        });
        return; // Don't proceed with card transition yet
      }
    }

    // Save the data
    setCardData(prev => {
      const newData = { ...prev };

      // For recordGroup, preserve existingRecordId
      if (cardName === 'recordGroup' && prev.recordGroup?.existingRecordId) {
        newData[cardName] = {
          ...formData,
          existingRecordId: prev.recordGroup.existingRecordId
        };
      } else {
        newData[cardName] = formData;
      }

      // If moving from Essential Info to Record Group, set default record group name
      if (cardName === 'essentialInfo' && !prev.recordGroup.recordGroup) {
        const names = formData.names;
        if (names && names.length > 0) {
          const name = names[0];
          const fullName = `${name.givenName} ${name.surname}`.trim();
          if (fullName) {
            newData.recordGroup = {
              recordGroup: {
                type: 'Census',
                primaryName: `New Group: ${fullName} Household`
              },
              members: []
            };
          }
        }
      }

      return newData;
    });

    // Determine next card
    const cardOrder = ['essentialInfo', 'recordGroup', 'events', 'additionalFacts', 'review'];
    const currentIndex = cardOrder.indexOf(cardName);
    const nextCard = cardOrder[currentIndex + 1];

    console.log('[handleNextCard] Transitioning:', cardName, '-> review,', nextCard, '-> add');

    // Update states: current card to review, next card to add
    setCardStates(prev => ({
      ...prev,
      [cardName]: 'review',
      [nextCard]: 'add'
    }));
  };

  const handleCancelEdit = (cardName) => {
    setCardStates(prev => ({
      ...prev,
      [cardName]: 'review'
    }));
  };

  const handleSaveAndClose = () => {
    console.log('[handleSaveAndClose] Starting save process...');
    // Save the current person to the saved people list
    const currentPersonName = getCurrentPersonName();
    const currentPersonData = {
      name: currentPersonName,
      relationships: cardData.recordGroup.members || [],
      essentialInfo: cardData.essentialInfo,
      events: cardData.events,
      additionalFacts: cardData.additionalFacts,
      recordGroup: cardData.recordGroup
    };

    // Create the complete list of all people to save
    const allPeopleToSave = [...savedPeople, currentPersonData];
    console.log('[handleSaveAndClose] People to save:', allPeopleToSave);

    // Transform the saved people into the census data format
    const updatedCensusData = { ...censusData };

    // Check if we're adding to an existing record
    const existingRecordId = allPeopleToSave[0]?.recordGroup?.existingRecordId;
    const primaryEvent = allPeopleToSave[0]?.events?.primaryEvent;

    let targetRecord;

    if (existingRecordId) {
      // Find the existing record by ID
      targetRecord = updatedCensusData.records.find(r => r.id === existingRecordId);
      if (!targetRecord) {
        console.error('[handleSaveAndClose] Could not find existing record with ID:', existingRecordId);
      }
    }

    // If no existing record found (or this is a new group), create a new record
    if (!targetRecord) {
      targetRecord = {
        id: `1:2:${Date.now()}`, // Generate a temporary ID
        recordType: primaryEvent?.type || 'Census',
        date: primaryEvent?.date || '',
        place: primaryEvent?.place || '',
        people: []
      };
      updatedCensusData.records.push(targetRecord);
      console.log('[handleSaveAndClose] Created new record:', targetRecord.id);
    } else {
      console.log('[handleSaveAndClose] Adding to existing record:', targetRecord.id);
    }

    // Add all the new people to the record
    allPeopleToSave.forEach(personData => {
      const essentialInfo = personData.essentialInfo;
      const name = essentialInfo.names[0];

      // Determine the relationship for the new person
      // If adding to an existing record, try to find their relationship from the members list
      let newPersonRelationship = 'Primary'; // Default for new records

      if (existingRecordId && personData.relationships.length > 0) {
        // For existing records, find the primary person and determine relationship from that
        const primaryMember = targetRecord.people.find(p =>
          p.relationship === 'Primary' || p.relationship === 'Head'
        );

        if (primaryMember) {
          const primaryFullName = `${primaryMember.givenName} ${primaryMember.surname}`.trim();
          const relationshipToPrimary = personData.relationships.find(
            rel => rel.name === primaryFullName
          );

          if (relationshipToPrimary) {
            // Invert the relationship (if primary is "Parent" to new person, new person is "Child")
            newPersonRelationship = getInverseRelationship(relationshipToPrimary.relationship);
          } else {
            // If no relationship to primary, default to first relationship or "Other"
            newPersonRelationship = 'Other';
          }
        }
      }

      const newPerson = {
        id: `1:1:${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        givenName: name.givenName,
        surname: name.surname,
        relationship: newPersonRelationship,
        sex: essentialInfo.sex || '',
        age: essentialInfo.age || '',
        race: essentialInfo.race || '',
        attachedPersons: [],
        hints: [],
        events: personData.events.additionalEvents || []
      };

      targetRecord.people.push(newPerson);
    });

    // Also add any existing people who were moved from other households
    // These are people in recordGroup.members who exist in census data
    const lastSavedPersonData = allPeopleToSave[allPeopleToSave.length - 1];
    if (lastSavedPersonData?.recordGroup?.members) {
      lastSavedPersonData.recordGroup.members.forEach(member => {
        // Check if this person exists in any record (they were moved from another household)
        let existingPerson = null;
        let sourceRecordId = null;

        for (const record of updatedCensusData.records) {
          existingPerson = record.people.find(p => {
            const fullName = `${p.givenName} ${p.surname}`.trim();
            return fullName === member.name;
          });
          if (existingPerson) {
            sourceRecordId = record.id;
            break;
          }
        }

        // Only move the person if they're from a DIFFERENT record group
        if (existingPerson && sourceRecordId !== existingRecordId) {
          // Remove from old record
          const sourceRecord = updatedCensusData.records.find(r => r.id === sourceRecordId);
          if (sourceRecord) {
            sourceRecord.people = sourceRecord.people.filter(p => p.id !== existingPerson.id);
          }

          // Add the existing person to the target record with their new relationship
          const movedPerson = {
            ...existingPerson,
            relationship: member.relationship
          };
          targetRecord.people.push(movedPerson);
          console.log('[handleSaveAndClose] Moved person from different record:', member.name);
        }
        // If they're already in the target record, don't touch them
      });
    }

    // Call onUpdateCensusData with the updated census data
    console.log('[handleSaveAndClose] Updated census data:', updatedCensusData);
    if (onUpdateCensusData) {
      console.log('[handleSaveAndClose] Calling onUpdateCensusData');
      onUpdateCensusData(updatedCensusData);
    } else {
      console.warn('[handleSaveAndClose] onUpdateCensusData is not defined!');
    }

    // Go back to NamesInfoSheet (reset both ManageNames and AddName states)
    if (onSaveAndReturn) {
      console.log('[handleSaveAndClose] Calling onSaveAndReturn');
      onSaveAndReturn();
    } else {
      console.log('[handleSaveAndClose] Calling onClose');
      onClose?.();
    }
    console.log('[handleSaveAndClose] Save complete!');
  };

  const handleSaveAndAttach = () => {
    // Save current person first - use the same logic as handleSaveAndClose
    const currentPersonName = getCurrentPersonName();
    const currentPersonData = {
      name: currentPersonName,
      relationships: cardData.recordGroup.members || [],
      essentialInfo: cardData.essentialInfo,
      events: cardData.events,
      additionalFacts: cardData.additionalFacts,
      recordGroup: cardData.recordGroup
    };

    const allPeopleToSave = [...savedPeople, currentPersonData];

    console.log('Saving and attaching:', allPeopleToSave);

    // Transform the saved people into the census data format (same as handleSaveAndClose)
    const updatedCensusData = { ...censusData };

    const existingRecordId = allPeopleToSave[0]?.recordGroup?.existingRecordId;
    const primaryEvent = allPeopleToSave[0]?.events?.primaryEvent;

    let targetRecord;

    if (existingRecordId) {
      // Find the existing record by ID
      targetRecord = updatedCensusData.records.find(r => r.id === existingRecordId);
      if (!targetRecord) {
        console.error('[handleSaveAndAttach] Could not find existing record with ID:', existingRecordId);
      }
    }

    // If no existing record found (or this is a new group), create a new record
    if (!targetRecord) {
      targetRecord = {
        id: `1:2:${Date.now()}`,
        recordType: primaryEvent?.type || 'Census',
        date: primaryEvent?.date || '',
        place: primaryEvent?.place || '',
        people: []
      };
      updatedCensusData.records.push(targetRecord);
      console.log('[handleSaveAndAttach] Created new record:', targetRecord.id);
    } else {
      console.log('[handleSaveAndAttach] Adding to existing record:', targetRecord.id);
    }

    // Add all the new people to the record
    allPeopleToSave.forEach(personData => {
      const essentialInfo = personData.essentialInfo;
      const name = essentialInfo.names[0];

      // Determine the relationship for the new person
      // If adding to an existing record, try to find their relationship from the members list
      let newPersonRelationship = 'Primary'; // Default for new records

      if (existingRecordId && personData.relationships.length > 0) {
        // For existing records, find the primary person and determine relationship from that
        const primaryMember = targetRecord.people.find(p =>
          p.relationship === 'Primary' || p.relationship === 'Head'
        );

        if (primaryMember) {
          const primaryFullName = `${primaryMember.givenName} ${primaryMember.surname}`.trim();
          const relationshipToPrimary = personData.relationships.find(
            rel => rel.name === primaryFullName
          );

          if (relationshipToPrimary) {
            // Invert the relationship (if primary is "Parent" to new person, new person is "Child")
            newPersonRelationship = getInverseRelationship(relationshipToPrimary.relationship);
          } else {
            // If no relationship to primary, default to first relationship or "Other"
            newPersonRelationship = 'Other';
          }
        }
      }

      const newPerson = {
        id: `1:1:${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        givenName: name.givenName,
        surname: name.surname,
        relationship: newPersonRelationship,
        sex: essentialInfo.sex || '',
        age: essentialInfo.age || '',
        race: essentialInfo.race || '',
        attachedPersons: [],
        hints: [],
        events: personData.events.additionalEvents || []
      };

      targetRecord.people.push(newPerson);
    });

    // Also add any existing people who were moved from other households
    // These are people in recordGroup.members who exist in census data
    const lastSavedPersonData = allPeopleToSave[allPeopleToSave.length - 1];
    if (lastSavedPersonData?.recordGroup?.members) {
      lastSavedPersonData.recordGroup.members.forEach(member => {
        // Check if this person exists in any record (they were moved from another household)
        let existingPerson = null;
        let sourceRecordId = null;

        for (const record of updatedCensusData.records) {
          existingPerson = record.people.find(p => {
            const fullName = `${p.givenName} ${p.surname}`.trim();
            return fullName === member.name;
          });
          if (existingPerson) {
            sourceRecordId = record.id;
            break;
          }
        }

        // Only move the person if they're from a DIFFERENT record group
        if (existingPerson && sourceRecordId !== existingRecordId) {
          // Remove from old record
          const sourceRecord = updatedCensusData.records.find(r => r.id === sourceRecordId);
          if (sourceRecord) {
            sourceRecord.people = sourceRecord.people.filter(p => p.id !== existingPerson.id);
          }

          // Add the existing person to the target record with their new relationship
          const movedPerson = {
            ...existingPerson,
            relationship: member.relationship
          };
          targetRecord.people.push(movedPerson);
          console.log('[handleSaveAndAttach] Moved person from different record:', member.name);
        }
        // If they're already in the target record, don't touch them
      });
    }

    // Call onUpdateCensusData with the updated census data
    if (onUpdateCensusData) {
      onUpdateCensusData(updatedCensusData);
    }

    setShowAttachDialog(true);
  };

  const handleSaveAndContinue = () => {

    // Save the current person's information with ALL data
    const currentPersonName = getCurrentPersonName();
    const currentPersonData = {
      name: currentPersonName,
      relationships: cardData.recordGroup.members || [],
      essentialInfo: cardData.essentialInfo,
      events: cardData.events,
      additionalFacts: cardData.additionalFacts,
      recordGroup: cardData.recordGroup
    };

    // Add to saved people list
    setSavedPeople(prev => [...prev, currentPersonData]);

    // Save the record group info to reuse for next person
    const previousRecordGroup = cardData.recordGroup;
    const previousEvents = cardData.events;

    // Get the next person's name from remainingPeople if available
    const nextPersonIndex = currentPersonIndex;
    const nextPerson = remainingPeople[nextPersonIndex];
    const nextPersonFullName = nextPerson ? `${nextPerson.givenName} ${nextPerson.surname}`.trim() : '';

    // Build the members list by checking ALL saved people for relationships with the next person
    const updatedMembers = [];

    // Check all saved people (including the current person we just saved)
    const allSavedPeople = [...savedPeople, currentPersonData];

    allSavedPeople.forEach(savedPerson => {
      // Find if this saved person had a relationship with the next person
      const relationshipToNext = savedPerson.relationships.find(
        rel => rel.name === nextPersonFullName
      );

      if (relationshipToNext) {
        // Add this saved person with the inverted relationship
        updatedMembers.push({
          name: savedPerson.name,
          relationship: getInverseRelationship(relationshipToNext.relationship)
        });
      }
    });

    // Add any other members that weren't the next person and reset to "No Relation"
    const otherMembers = previousRecordGroup.members
      ?.filter(member => {
        // Exclude next person and anyone already in updatedMembers
        if (member.name === nextPersonFullName) return false;
        if (updatedMembers.some(um => um.name === member.name)) return false;
        return true;
      })
      .map(member => ({
        ...member,
        relationship: 'No Relation'
      })) || [];

    const finalMembers = [...updatedMembers, ...otherMembers];

    // Reset cards for next person
    setCardStates({
      essentialInfo: 'add',
      recordGroup: 'pending',
      events: 'pending',
      additionalFacts: 'pending',
      review: 'pending'
    });

    // Reset card data for next person, but keep record group and events
    // If there's a person in remainingPeople, pre-fill their name
    setCardData({
      essentialInfo: {
        isPrimary: false,
        names: [{
          type: 'Birth Name',
          givenName: nextPerson?.givenName || '',
          surname: nextPerson?.surname || ''
        }],
        sex: '',
        race: '',
        age: ''
      },
      recordGroup: {
        ...previousRecordGroup,
        members: finalMembers
      },
      events: previousEvents, // Keep the same events (census info)
      additionalFacts: { facts: [] }
    });
    setCurrentPersonIndex(prev => prev + 1);
  };

  const handleNewPersonCreated = (givenName, surname) => {
    // Add to remaining people list with separate name parts
    setRemainingPeople(prev => [...prev, { givenName, surname }]);
  };

  const handleRecordGroupSelected = (recordEventData) => {
    console.log('[handleRecordGroupSelected] Called with:', recordEventData);
    // Update events card data with record's primary event information
    setCardData(prev => {
      const newData = {
        ...prev,
        events: {
          primaryEvent: {
            type: recordEventData.recordType || 'Census',
            date: recordEventData.date || '',
            place: recordEventData.place || ''
          },
          additionalEvents: prev.events.additionalEvents || []
        },
        recordGroup: {
          ...prev.recordGroup,
          existingRecordId: recordEventData.recordId // Track the existing record ID
        }
      };
      console.log('[handleRecordGroupSelected] Setting cardData to:', newData);
      console.log('[handleRecordGroupSelected] New recordGroup:', newData.recordGroup);
      return newData;
    });
  };

  const handlePreviousRelationshipsSave = (newRelationships) => {
    const { peopleToMove, currentPersonIndex, pendingFormData } = dialogState;
    const currentPersonToMove = peopleToMove[currentPersonIndex];

    console.log('[handlePreviousRelationshipsSave] Saving relationships:', newRelationships);
    console.log('[handlePreviousRelationshipsSave] Person to move:', currentPersonToMove);

    // Note: We don't remove the person from their old record here
    // That will happen in handleSaveAndClose/handleSaveAndAttach
    // when all the data is being saved together

    // Check if there are more people to process
    if (currentPersonIndex < peopleToMove.length - 1) {
      // Move to next person
      const nextPersonIndex = currentPersonIndex + 1;
      const nextPerson = peopleToMove[nextPersonIndex];

      // Update current group members to include the relationships we just saved
      const updatedCurrentGroupMembers = [
        ...dialogState.currentGroupMembers,
        {
          name: currentPersonToMove.name,
          relationship: currentPersonToMove.newRelationship
        }
      ];

      setDialogState({
        ...dialogState,
        currentPersonIndex: nextPersonIndex,
        currentGroupMembers: updatedCurrentGroupMembers.filter(m => m.name !== nextPerson.name)
      });
    } else {
      // All people processed, continue with the card transition
      setDialogState({
        showPreviousRelationships: false,
        currentPersonIndex: 0,
        peopleToMove: [],
        pendingFormData: null,
        currentGroupMembers: []
      });

      // Now proceed with saving the record group card and moving to next card
      // Save the data directly without re-checking for people to move
      setCardData(prev => {
        const newData = { ...prev };
        newData.recordGroup = pendingFormData;
        return newData;
      });

      // Transition to next card
      setCardStates(prev => ({
        ...prev,
        recordGroup: 'review',
        events: 'add'
      }));
    }
  };

  const handlePreviousRelationshipsCancel = () => {
    console.log('[handlePreviousRelationshipsCancel] Cancelled');
    setDialogState({
      showPreviousRelationships: false,
      currentPersonIndex: 0,
      peopleToMove: [],
      pendingFormData: null,
      currentGroupMembers: []
    });
  };

  return (
    <>
      <InfoSheet
        title="Manage Names"
        subtitle="Add Name"
        panel={true}
        onBack={onBack}
        close={onClose}
        size="lg"
        elevated={false}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            backgroundColor: colors.yellow.yellow60
          }}
        />
        <Paragraph size="sm" style={{ marginBottom: spacing.xs }}>
          Add the details for the person you would like to add. There needs to be at least one name to continue.
        </Paragraph>

        {/* Essential Information Card */}
        <div style={{ marginBottom: spacing.xs }}>
          <EssentialInformationCard
            state={cardStates.essentialInfo}
            data={cardData.essentialInfo}
            isNewRecord={true}
            onEdit={() => handleEditCard('essentialInfo')}
            onSave={(formData) => handleSaveCard('essentialInfo', formData)}
            onNext={(formData) => handleNextCard('essentialInfo', formData)}
            onCancel={() => handleCancelEdit('essentialInfo')}
          />
        </div>

        {/* Record Group Card */}
        <div style={{ marginBottom: spacing.xs }}>
          <RecordGroupCard
            state={cardStates.recordGroup}
            data={cardData.recordGroup}
            censusData={censusData}
            currentPersonName={getCurrentPersonName()}
            onEdit={() => handleEditCard('recordGroup')}
            onSave={(formData) => handleSaveCard('recordGroup', formData)}
            onNext={(formData) => handleNextCard('recordGroup', formData)}
            onCancel={() => handleCancelEdit('recordGroup')}
            onNewPersonCreated={handleNewPersonCreated}
            onRecordGroupSelected={handleRecordGroupSelected}
          />
        </div>

        {/* Events Card */}
        <div style={{ marginBottom: spacing.xs }}>
          <EventsCard
            state={cardStates.events}
            data={cardData.events}
            onEdit={() => handleEditCard('events')}
            onSave={(formData) => handleSaveCard('events', formData)}
            onNext={(formData) => handleNextCard('events', formData)}
            onCancel={() => handleCancelEdit('events')}
          />
        </div>

        {/* Additional Facts Card */}
        <div style={{ marginBottom: spacing.xs }}>
          <AdditionalFactsCard
            state={cardStates.additionalFacts}
            data={cardData.additionalFacts}
            onEdit={() => handleEditCard('additionalFacts')}
            onSave={(formData) => handleSaveCard('additionalFacts', formData)}
            onNext={(formData) => handleNextCard('additionalFacts', formData)}
            onCancel={() => handleCancelEdit('additionalFacts')}
          />
        </div>

        {/* Review Card */}
        <div style={{ marginBottom: spacing.xs }}>
          <ReviewCard
            state={cardStates.review}
            currentPersonName={getCurrentPersonName()}
            remainingPeople={getRemainingPeopleNames()}
            onSaveAndClose={handleSaveAndClose}
            onSaveAndAttach={handleSaveAndAttach}
            onSaveAndContinue={handleSaveAndContinue}
          />
        </div>
      </InfoSheet>

      {/* Attach Dialog */}
      {showAttachDialog && createPortal(
        <DialogOverlay
          isOpen={showAttachDialog}
          close={() => setShowAttachDialog(false)}
          title="Attach Flow Not Built"
          size="md"
          primaryButton={{
            label: 'OK',
            onClick: () => {
              setShowAttachDialog(false);
              if (onSaveAndReturn) {
                onSaveAndReturn();
              } else {
                onClose?.();
              }
            }
          }}
        >
          <Paragraph size="sm">
            The attach flow isn't built yet. The person has been saved successfully.
          </Paragraph>
        </DialogOverlay>,
        document.body
      )}

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
    </>
  );
};

AddNameInfoSheet.propTypes = {
  onBack: PropTypes.func,
  onClose: PropTypes.func,
  onSaveAndReturn: PropTypes.func,
  censusData: PropTypes.object,
  onUpdateCensusData: PropTypes.func,
  preselectedRecordGroup: PropTypes.object
};
