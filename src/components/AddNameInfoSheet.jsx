import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { InfoSheet } from "../../ux-zion-library/src/components/InfoSheet";
import { Paragraph } from "../../ux-zion-library/src/components/Paragraph";
import { DialogOverlay } from "../../ux-zion-library/src/components/DialogOverlay";
import { EssentialInformationCard } from './EssentialInformationCard';
import { RecordGroupCard } from './RecordGroupCard';
import { EventsCard } from './EventsCard';
import { AdditionalFactsCard } from './AdditionalFactsCard';
import { ReviewCard } from './ReviewCard';
import { PreviousRelationshipsDialog } from './PreviousRelationshipsDialog';
import { FindDetailsDialog } from './FindDetailsDialog';
import { spacing } from "../../ux-zion-library/src/tokens/spacing";
import { colors } from "../../ux-zion-library/src/tokens/colors";

export const AddNameInfoSheet = ({ onBack, onClose, onSaveAndReturn, censusData, onUpdateCensusData, preselectedRecordGroup, preselectedPerson, onTriggerAISelection, currentApproach }) => {
  const infoSheetContentRef = useRef(null);

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

      // Use record from censusData if found, otherwise use preselectedRecordGroup directly (AI review flow)
      const sourceRecord = record || preselectedRecordGroup;

      if (sourceRecord) {
        // Pre-populate record group and events data
        const members = preselectedRecordGroup.people.map(person => ({
          relationship: 'No Relation',
          name: person.givenName + (person.surname ? ' ' + person.surname : ''),
          fromGroupId: preselectedRecordGroup.id
        }));

        // Get primary person for household name
        const primaryPerson = preselectedRecordGroup.people.find(p => p.isPrimary);
        const householdName = primaryPerson
          ? `${primaryPerson.givenName || ''} ${primaryPerson.surname || ''}`.trim()
          : 'Household';


        const newCardData = {
          ...cardData,
          recordGroup: {
            recordGroup: {
              type: sourceRecord.recordType || 'Census',
              primaryName: householdName
            },
            members: members,
            existingRecordId: sourceRecord.id
          },
          events: {
            primaryEvent: {
              type: sourceRecord.recordType || 'Census',
              date: sourceRecord.date || '',
              place: sourceRecord.place || ''
            },
            additionalEvents: []
          }
        };

        setCardData(newCardData);
      } else {
      }
    }
  }, [preselectedRecordGroup, censusData]);

  // Initialize with preselected person from highlight selection (AI flow)
  useEffect(() => {
    if (!preselectedPerson) {
      return;
    }

    // Check if this is a new person being added
    if (preselectedPerson.isNew) {
      // Don't change cardStates or cardData - leave as default (essentialInfo: 'add', others: 'pending')
      return;
    }

    // Existing person - set up for editing/review

    // Find the record containing this person in censusData
    const record = censusData.records.find(r =>
      r.people.some(p => p.id === preselectedPerson.id)
    );

    if (record) {
        // Get all people in this record for household members
        const householdMembers = record.people
          .filter(p => p.id !== preselectedPerson.id) // Exclude the current person
          .map(person => {
            // Look up the relationship from the CURRENT person's relationships array
            const relationshipToThisPerson = preselectedPerson.relationships?.find(
              rel => rel.relatedPersonId === person.id
            );

            const personName = person.givenName + (person.surname ? ' ' + person.surname : '');
            const normalizedRelationship = normalizeRelationshipRole(relationshipToThisPerson?.role);


            return {
              relationship: normalizedRelationship,
              name: personName,
              fromGroupId: record.id,
              id: person.id // Add person ID for bidirectional updates
            };
          });

        // Find the primary person name for record group label
        const primaryPerson = record.people.find(p => p.isPrimary);
        const primaryName = primaryPerson
          ? `${primaryPerson.givenName} ${primaryPerson.surname || ''} household`.trim()
          : 'Household';

        // Prepare facts array
        const facts = [];
        if (preselectedPerson.race) {
          facts.push({ type: 'Race', value: preselectedPerson.race });
        }

        // Auto-populate all cards with person data
        setCardData({
          essentialInfo: {
            originalPersonId: preselectedPerson.id, // Track the original person ID for updates
            isPrimary: preselectedPerson.isPrimary || false,
            names: [{
              type: 'Birth Name',
              givenName: preselectedPerson.givenName || '',
              surname: preselectedPerson.surname || ''
            }],
            sex: preselectedPerson.sex || '',
            race: preselectedPerson.race || '',
            age: preselectedPerson.age || ''
          },
          recordGroup: {
            recordGroup: {
              type: record.recordType || 'Census',
              primaryName: primaryName
            },
            members: householdMembers,
            existingRecordId: record.id
          },
          events: {
            primaryEvent: {
              type: record.recordType || 'Census',
              date: record.date || '',
              place: record.place || ''
            },
            additionalEvents: []
          },
          additionalFacts: {
            facts: facts
          }
        });

        // Set all cards to 'review' state (similar to FindDetailsDialog flow)
        setCardStates({
          essentialInfo: 'review',
          recordGroup: 'review',
          events: 'review',
          additionalFacts: 'review',
          review: 'add'
        });
      } else if (preselectedRecordGroup) {
        // Person not found in censusData - must be from AI review flow
        // Use preselectedRecordGroup to populate the cards

        // Get all people in this record group for household members (excluding current person)
        const householdMembers = preselectedRecordGroup.people
          .filter(p => p.id !== preselectedPerson.id)
          .map(person => {
            // Look up the relationship from the CURRENT person's relationships array
            const relationshipToThisPerson = preselectedPerson.relationships?.find(
              rel => rel.relatedPersonId === person.id
            );

            const personName = person.givenName + (person.surname ? ' ' + person.surname : '');
            const normalizedRelationship = normalizeRelationshipRole(relationshipToThisPerson?.role);


            return {
              relationship: normalizedRelationship,
              name: personName,
              fromGroupId: preselectedRecordGroup.id,
              id: person.id // Add person ID for bidirectional updates
            };
          });

        // Find the primary person name for record group label
        const primaryPerson = preselectedRecordGroup.people.find(p => p.isPrimary);
        const primaryName = primaryPerson
          ? `${primaryPerson.givenName} ${primaryPerson.surname || ''} household`.trim()
          : 'Household';

        // Prepare facts array
        const facts = [];
        if (preselectedPerson.race) {
          facts.push({ type: 'Race', value: preselectedPerson.race });
        }

        // Auto-populate all cards with person data
        setCardData({
          essentialInfo: {
            originalPersonId: preselectedPerson.id, // Track the original person ID for updates
            isPrimary: preselectedPerson.isPrimary || false,
            names: [{
              type: 'Birth Name',
              givenName: preselectedPerson.givenName || '',
              surname: preselectedPerson.surname || ''
            }],
            sex: preselectedPerson.sex || '',
            race: preselectedPerson.race || '',
            age: preselectedPerson.age || ''
          },
          recordGroup: {
            recordGroup: {
              type: preselectedRecordGroup.recordType || 'Census',
              primaryName: primaryName
            },
            members: householdMembers,
            existingRecordId: preselectedRecordGroup.id
          },
          events: {
            primaryEvent: {
              type: preselectedRecordGroup.recordType || 'Census',
              date: preselectedRecordGroup.date || '',
              place: preselectedRecordGroup.place || ''
            },
            additionalEvents: []
          },
          additionalFacts: {
            facts: facts
          }
        });

        // Set all cards to 'review' state
        setCardStates({
          essentialInfo: 'review',
          recordGroup: 'review',
          events: 'review',
          additionalFacts: 'review',
          review: 'add'
        });
    }
  }, [preselectedPerson, censusData, preselectedRecordGroup]);

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

  // Find Details dialog state
  const [showFindDetails, setShowFindDetails] = useState(false);
  const [findDetailsSearch, setFindDetailsSearch] = useState(null);

  // Scroll trigger for Save and Continue
  const [shouldScrollToTop, setShouldScrollToTop] = useState(false);

  // Add Person nested InfoSheet state
  const [addingNewPersonToHousehold, setAddingNewPersonToHousehold] = useState(false);

  // Scroll to top when triggered (after Save and Continue)
  useEffect(() => {
    if (shouldScrollToTop) {
      // Use setTimeout to ensure React has finished rendering the new content
      const timer = setTimeout(() => {
        let scrolled = false;

        // Try using the ref first
        if (infoSheetContentRef.current) {
          infoSheetContentRef.current.scrollTo({ top: 0, behavior: 'instant' });
          scrolled = true;
        } else {
          console.warn('[useEffect] Ref is null, trying fallback method');

          // Fallback: Find the scrollable div within the InfoSheet
          const allDivs = document.querySelectorAll('div');
          for (const div of allDivs) {
            const style = window.getComputedStyle(div);
            if (style.overflowY === 'auto' && div.scrollHeight > div.clientHeight) {
              div.scrollTo({ top: 0, behavior: 'instant' });
              scrolled = true;
              break;
            }
          }
        }

        if (!scrolled) {
          console.error('[useEffect] Could not find scrollable element');
        }

        setShouldScrollToTop(false);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [shouldScrollToTop]);

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
    // Save the data, preserving existingRecordId and originalPersonId if they exist
    setCardData(prev => {
      const newData = { ...prev };

      // For recordGroup, preserve existingRecordId
      if (cardName === 'recordGroup' && prev.recordGroup?.existingRecordId) {
        newData[cardName] = {
          ...formData,
          existingRecordId: prev.recordGroup.existingRecordId
        };
      }
      // For essentialInfo, preserve originalPersonId (for Task B edits)
      else if (cardName === 'essentialInfo' && prev.essentialInfo?.originalPersonId) {
        newData[cardName] = {
          ...formData,
          originalPersonId: prev.essentialInfo.originalPersonId
        };
      }
      else {
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
      'Stepsibling': 'Stepsibling',
      'Cousin': 'Cousin',
      'No Relation': 'No Relation'
    };
    return relationshipMap[relationship] || relationship;
  };

  // Helper function to get relationship type from role
  const getRelationshipType = (role) => {
    const roleUpper = role.toUpperCase();
    if (roleUpper.includes('PARENT') || roleUpper.includes('CHILD')) return 'PARENT_CHILD';
    if (roleUpper.includes('SPOUSE') || roleUpper.includes('PARTNER') || roleUpper.includes('FIANCÉ')) return 'COUPLE';
    if (roleUpper.includes('SIBLING')) return 'SIBLING';
    if (roleUpper.includes('GRANDPARENT') || roleUpper.includes('GRANDCHILD')) return 'GRAND_PARENT';
    if (roleUpper.includes('AUNT') || roleUpper.includes('UNCLE') || roleUpper.includes('NEPHEW') || roleUpper.includes('NIECE')) return 'AUNT_OR_UNCLE';
    if (roleUpper.includes('COUSIN')) return 'COUSIN';
    if (roleUpper.includes('NO RELATION')) return 'OTHER';
    if (roleUpper.includes('IN-LAW')) {
      if (roleUpper.includes('PARENT') || roleUpper.includes('CHILD')) return 'PARENT_CHILD_IN_LAW';
      if (roleUpper.includes('SIBLING')) return 'SIBLING_IN_LAW';
    }
    return 'OTHER';
  };

  /**
   * Normalize relationship role from uppercase to title case dropdown format
   * E.g., "PARENT" → "Parent", "AUNT_OR_UNCLE" → "Aunt or Uncle"
   */
  const normalizeRelationshipRole = (role) => {
    if (!role) return 'No Relation';

    // Map from uppercase roles to dropdown values
    const roleMap = {
      'SPOUSE': 'Spouse',
      'PARENT': 'Parent',
      'CHILD': 'Child',
      'SIBLING': 'Sibling',
      'AUNT_OR_UNCLE': 'Aunt or Uncle',
      'NIECE_OR_NEPHEW': 'Niece or Nephew',
      'COUSIN': 'Cousin',
      'GRANDPARENT': 'Grandparent',
      'GRANDCHILD': 'Grandchild',
      'STEPPARENT': 'Stepparent',
      'STEPCHILD': 'Stepchild',
      'STEPSIBLING': 'Stepsibling',
      'PARENT-IN-LAW': 'Parent-in-law',
      'PARENT_IN_LAW': 'Parent-in-law',
      'CHILD-IN-LAW': 'Child-in-law',
      'CHILD_IN_LAW': 'Child-in-law',
      'SIBLING-IN-LAW': 'Sibling-in-law',
      'SIBLING_IN_LAW': 'Sibling-in-law',
      'NO RELATION': 'No Relation',
      'NO_RELATION': 'No Relation',
      'OTHER': 'No Relation'
    };

    return roleMap[role.toUpperCase()] || 'No Relation';
  };

  /**
   * Helper function to update relationships bidirectionally in census data
   * When person A has relationship to person B, person B should have inverse relationship to person A
   *
   * @param {object} censusData - The census data object to update
   * @param {string} personAId - ID of the first person
   * @param {string} personAName - Full name of the first person
   * @param {string} personBId - ID of the second person
   * @param {string} personBName - Full name of the second person
   * @param {string} relationshipAtoB - Relationship from A to B (e.g., "Child")
   * @returns {object} Updated census data
   */
  const updateBidirectionalRelationships = (censusData, personAId, personAName, personBId, personBName, relationshipAtoB) => {

    const inverseRelationship = getInverseRelationship(relationshipAtoB);
    const relationshipType = getRelationshipType(relationshipAtoB);

    // Find both people in census data
    let personA = null;
    let personB = null;
    let recordWithA = null;
    let recordWithB = null;

    for (const record of censusData.records) {
      const foundA = record.people.find(p => p.id === personAId);
      const foundB = record.people.find(p => p.id === personBId);

      if (foundA) {
        personA = foundA;
        recordWithA = record;
      }
      if (foundB) {
        personB = foundB;
        recordWithB = record;
      }

      if (personA && personB) break;
    }

    if (!personA || !personB) {
      console.warn('[updateBidirectionalRelationships] Could not find both people:', personAId, personBId);
      return censusData;
    }

    // Ensure relationships arrays exist
    if (!personA.relationships) personA.relationships = [];
    if (!personB.relationships) personB.relationships = [];

    // Update person A's relationship to person B
    const existingRelAtoB = personA.relationships.findIndex(r => r.relatedPersonId === personBId);
    const newRelAtoB = {
      type: relationshipType,
      role: relationshipAtoB.toUpperCase(),
      relatedPersonId: personBId,
      relatedPersonName: personBName
    };

    if (existingRelAtoB >= 0) {
      personA.relationships[existingRelAtoB] = newRelAtoB;
    } else {
      personA.relationships.push(newRelAtoB);
    }

    // Update person B's relationship to person A (inverse)
    const existingRelBtoA = personB.relationships.findIndex(r => r.relatedPersonId === personAId);
    const newRelBtoA = {
      type: relationshipType,
      role: inverseRelationship.toUpperCase(),
      relatedPersonId: personAId,
      relatedPersonName: personAName
    };

    if (existingRelBtoA >= 0) {
      personB.relationships[existingRelBtoA] = newRelBtoA;
    } else {
      personB.relationships.push(newRelBtoA);
    }

    // Return updated census data
    return {
      ...censusData,
      records: censusData.records.map(r => {
        if (r.id === recordWithA.id) return recordWithA;
        if (recordWithB && r.id === recordWithB.id) return recordWithB;
        return r;
      })
    };
  };

  const handleNextCard = (cardName, formData) => {

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
      }
      // For essentialInfo, preserve originalPersonId (for Task B edits)
      else if (cardName === 'essentialInfo' && prev.essentialInfo?.originalPersonId) {
        newData[cardName] = {
          ...formData,
          originalPersonId: prev.essentialInfo.originalPersonId
        };
      }
      else {
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
    // Save the current person to the saved people list
    const currentPersonName = getCurrentPersonName();
    const currentPersonData = {
      name: currentPersonName,
      relationships: cardData.recordGroup.members || [],
      essentialInfo: cardData.essentialInfo,
      primaryEvent: cardData.primaryEvent,
      additionalEvents: cardData.additionalEvents,
      additionalFacts: cardData.additionalFacts,
      recordGroup: cardData.recordGroup
    };

    // Task B (AI review flow): If onSaveAndReturn exists AND we're in Task B, build person and return directly
    // Don't try to save to censusData - selectedRecordGroup isn't in censusData yet
    if (onSaveAndReturn && currentApproach === 'B') {
      const essentialInfo = currentPersonData.essentialInfo;
      const name = essentialInfo.names[0];

      // If editing, find and merge with original person to preserve relationships and other data
      let basePersonData = {};
      if (essentialInfo.originalPersonId && preselectedRecordGroup) {
        const originalPerson = preselectedRecordGroup.people.find(p => p.id === essentialInfo.originalPersonId);
        if (originalPerson) {
          // Start with original person data to preserve relationships, events, etc.
          basePersonData = { ...originalPerson };
        }
      }

      // Build the updated person object, merging edited fields with original data
      // Convert members from Record Group card to relationships array
      const relationshipsFromMembers = currentPersonData.recordGroup?.members?.map(member => ({
        role: member.relationship || 'UNKNOWN',
        relatedPersonName: member.name || '',
        relatedPersonId: member.id || ''
      })) || [];

      const personToReturn = {
        ...basePersonData, // Preserve original data (relationships, events, etc.)
        // Update with edited fields from form
        id: essentialInfo.originalPersonId || `1:1:${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        givenName: name.givenName || basePersonData.givenName || '',
        surname: name.surname || basePersonData.surname || '',
        sex: essentialInfo.sex || basePersonData.sex || '',
        age: essentialInfo.age || basePersonData.age || '',
        race: essentialInfo.race || basePersonData.race || '',
        isPrimary: essentialInfo.isPrimary ?? basePersonData.isPrimary ?? false,
        // Use relationships from members if available, otherwise preserve original
        relationships: relationshipsFromMembers.length > 0 ? relationshipsFromMembers : (basePersonData.relationships || []),
        // Update birth/death data from additionalEvents if present, otherwise preserve original
        birthDate: currentPersonData.additionalEvents?.find(e => e.type === 'Birth')?.date || basePersonData.birthDate || '',
        birthPlace: currentPersonData.additionalEvents?.find(e => e.type === 'Birth')?.place || basePersonData.birthPlace || '',
        deathDate: currentPersonData.additionalEvents?.find(e => e.type === 'Death')?.date || basePersonData.deathDate || '',
        deathPlace: currentPersonData.additionalEvents?.find(e => e.type === 'Death')?.place || basePersonData.deathPlace || ''
      };

      onSaveAndReturn(personToReturn);
      return; // Exit early - don't process censusData for Task B
    }

    // Task A flow: Continue with normal censusData save process

    // Create the complete list of all people to save
    const allPeopleToSave = [...savedPeople, currentPersonData];

    // Transform the saved people into the census data format
    let updatedCensusData = { ...censusData };

    // Check if we're adding to an existing record (check both existingRecordId and recordGroupId for AI extraction)
    const existingRecordId = allPeopleToSave[0]?.recordGroup?.existingRecordId || allPeopleToSave[0]?.recordGroup?.recordGroupId;
    const primaryEvent = allPeopleToSave[0]?.primaryEvent;

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
    } else {
    }

    // Track if we're editing an existing person from AI review
    let editedPerson = null;

    // Add all the new people to the record
    allPeopleToSave.forEach(personData => {
      const essentialInfo = personData.essentialInfo;
      const name = essentialInfo.names[0];


      // Check if this person came from AI extraction (has originalPersonId) or is a temp person
      if (essentialInfo.originalPersonId && existingRecordId) {
        // This person already exists in the record - just mark as visible
        const existingPerson = targetRecord.people.find(p => p.id === essentialInfo.originalPersonId);
        if (existingPerson) {
          existingPerson.isVisible = true;
          // Update any modified fields from the form
          existingPerson.givenName = name.givenName || existingPerson.givenName;
          existingPerson.surname = name.surname || existingPerson.surname;
          existingPerson.sex = essentialInfo.sex || existingPerson.sex;
          existingPerson.age = essentialInfo.age || existingPerson.age;
          existingPerson.race = essentialInfo.race || existingPerson.race;
          existingPerson.isPrimary = essentialInfo.isPrimary || existingPerson.isPrimary;

          // Also update birth/death data from additionalEvents if present
          if (personData.additionalEvents && personData.additionalEvents.length > 0) {
            personData.additionalEvents.forEach(event => {
              if (event.type === 'Birth') {
                existingPerson.birthDate = event.date || existingPerson.birthDate;
                existingPerson.birthPlace = event.place || existingPerson.birthPlace;
              } else if (event.type === 'Death') {
                existingPerson.deathDate = event.date || existingPerson.deathDate;
                existingPerson.deathPlace = event.place || existingPerson.deathPlace;
              }
            });
          }

          // Store the edited person for passing to onSaveAndReturn
          editedPerson = existingPerson;
          return; // Skip creating a new person
        }
      }

      // No original person ID - this is a manually entered person, create new
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
        events: personData.additionalEvents || [],
        isVisible: true // Mark new person as visible
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
        }
        // If they're already in the target record, don't touch them
      });
    }

    // Update bidirectional relationships for all saved people based on their Record Group members
    allPeopleToSave.forEach(personData => {
      if (!personData.recordGroup?.members) return;

      // Find this person in census data
      const personGivenName = personData.essentialInfo?.names?.[0]?.givenName || '';
      const personSurname = personData.essentialInfo?.names?.[0]?.surname || '';
      const personFullName = `${personGivenName} ${personSurname}`.trim();

      let personInCensus = null;
      let personId = null;

      for (const record of updatedCensusData.records) {
        personInCensus = record.people.find(p => {
          const pName = `${p.givenName} ${p.surname}`.trim();
          return pName === personFullName;
        });
        if (personInCensus) {
          personId = personInCensus.id;
          break;
        }
      }

      if (!personId) {
        console.warn('[handleSaveAndClose] Could not find person in census data:', personFullName);
        return;
      }

      // Update relationships for each member in their Record Group
      personData.recordGroup.members.forEach(member => {
        // Find the member in census data
        let memberId = null;
        for (const record of updatedCensusData.records) {
          const memberPerson = record.people.find(p => {
            const pName = `${p.givenName} ${p.surname}`.trim();
            return pName === member.name;
          });
          if (memberPerson) {
            memberId = memberPerson.id;
            break;
          }
        }

        if (!memberId) {
          console.warn('[handleSaveAndClose] Could not find member in census data:', member.name);
          return;
        }

        // IMPORTANT: member.relationship is the relationship OF the member TO the current person
        // E.g., if John's Record Group has Christopher with relationship "Child",
        // it means Christopher IS John's child, so John is Christopher's "Parent"
        // We need to get the inverse before calling updateBidirectionalRelationships
        const inverseRel = getInverseRelationship(member.relationship);

        // Update bidirectional relationship
        // This sets: currentPerson → member as inverseRel (e.g., "Parent")
        //            member → currentPerson as member.relationship (e.g., "Child")
        updatedCensusData = updateBidirectionalRelationships(
          updatedCensusData,
          personId,
          personFullName,
          memberId,
          member.name,
          inverseRel
        );
      });
    });

    // Call onUpdateCensusData with the updated census data
    if (onUpdateCensusData) {
      onUpdateCensusData(updatedCensusData);
    } else {
      console.warn('[handleSaveAndClose] onUpdateCensusData is not defined!');
    }

    // Return to names list if called from NamesInfoSheet, otherwise close completely

    if (onSaveAndReturn) {
      // Check if this is a nested "add person" call by seeing if we're adding a new person
      const isNestedAddPerson = preselectedPerson?.isNew && preselectedRecordGroup;

      if (isNestedAddPerson) {
        // Nested call - return the person data structure
        onSaveAndReturn({
          essentialInfo: cardData.essentialInfo,
          recordGroup: cardData.recordGroup,
          primaryEvent: cardData.primaryEvent,
          additionalEvents: cardData.additionalEvents,
          additionalFacts: cardData.additionalFacts
        });
      } else {
        // Normal Task A flow - just return to names list
        onSaveAndReturn();
      }
    } else if (onBack) {
      onBack();
    } else {
      onClose?.();
    }
  };

  const handleSaveAndAttach = () => {
    // Save current person first - use the same logic as handleSaveAndClose
    const currentPersonName = getCurrentPersonName();
    const currentPersonData = {
      name: currentPersonName,
      relationships: cardData.recordGroup.members || [],
      essentialInfo: cardData.essentialInfo,
      primaryEvent: cardData.primaryEvent,
      additionalEvents: cardData.additionalEvents,
      additionalFacts: cardData.additionalFacts,
      recordGroup: cardData.recordGroup
    };

    const allPeopleToSave = [...savedPeople, currentPersonData];


    // Transform the saved people into the census data format (same as handleSaveAndClose)
    let updatedCensusData = { ...censusData };

    const existingRecordId = allPeopleToSave[0]?.recordGroup?.existingRecordId || allPeopleToSave[0]?.recordGroup?.recordGroupId;
    const primaryEvent = allPeopleToSave[0]?.primaryEvent;

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
    } else {
    }

    // Add all the new people to the record
    allPeopleToSave.forEach(personData => {
      const essentialInfo = personData.essentialInfo;
      const name = essentialInfo.names[0];

      // Check if this person came from AI extraction (has originalPersonId)
      // But if it's a temp ID (starts with "temp-"), treat as new person
      const isTempId = essentialInfo.originalPersonId?.startsWith('temp-');

      if (essentialInfo.originalPersonId && existingRecordId && !isTempId) {
        // This person already exists in the record - just mark as visible
        const existingPerson = targetRecord.people.find(p => p.id === essentialInfo.originalPersonId);
        if (existingPerson) {
          existingPerson.isVisible = true;
          // Update any modified fields from the form
          existingPerson.givenName = name.givenName || existingPerson.givenName;
          existingPerson.surname = name.surname || existingPerson.surname;
          existingPerson.sex = essentialInfo.sex || existingPerson.sex;
          existingPerson.age = essentialInfo.age || existingPerson.age;
          existingPerson.race = essentialInfo.race || existingPerson.race;
          return; // Skip creating a new person
        }
      }

      // If person has temp ID, remove the temp person from the record first
      if (isTempId && existingRecordId) {
        const tempPersonIndex = targetRecord.people.findIndex(p => p.id === essentialInfo.originalPersonId);
        if (tempPersonIndex >= 0) {
          targetRecord.people.splice(tempPersonIndex, 1);
        }
      }

      // No original person ID - this is a manually entered person, create new
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
        events: personData.additionalEvents || [],
        isVisible: true // Mark new person as visible
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
        }
        // If they're already in the target record, don't touch them
      });
    }

    // Update bidirectional relationships for all saved people based on their Record Group members
    allPeopleToSave.forEach(personData => {
      if (!personData.recordGroup?.members) return;

      // Find this person in census data
      const personGivenName = personData.essentialInfo?.names?.[0]?.givenName || '';
      const personSurname = personData.essentialInfo?.names?.[0]?.surname || '';
      const personFullName = `${personGivenName} ${personSurname}`.trim();

      let personInCensus = null;
      let personId = null;

      for (const record of updatedCensusData.records) {
        personInCensus = record.people.find(p => {
          const pName = `${p.givenName} ${p.surname}`.trim();
          return pName === personFullName;
        });
        if (personInCensus) {
          personId = personInCensus.id;
          break;
        }
      }

      if (!personId) {
        console.warn('[handleSaveAndAttach] Could not find person in census data:', personFullName);
        return;
      }

      // Update relationships for each member in their Record Group
      personData.recordGroup.members.forEach(member => {
        // Find the member in census data
        let memberId = null;
        for (const record of updatedCensusData.records) {
          const memberPerson = record.people.find(p => {
            const pName = `${p.givenName} ${p.surname}`.trim();
            return pName === member.name;
          });
          if (memberPerson) {
            memberId = memberPerson.id;
            break;
          }
        }

        if (!memberId) {
          console.warn('[handleSaveAndAttach] Could not find member in census data:', member.name);
          return;
        }

        // IMPORTANT: member.relationship is the relationship OF the member TO the current person
        // E.g., if John's Record Group has Christopher with relationship "Child",
        // it means Christopher IS John's child, so John is Christopher's "Parent"
        // We need to get the inverse before calling updateBidirectionalRelationships
        const inverseRel = getInverseRelationship(member.relationship);

        // Update bidirectional relationship
        // This sets: currentPerson → member as inverseRel (e.g., "Parent")
        //            member → currentPerson as member.relationship (e.g., "Child")
        updatedCensusData = updateBidirectionalRelationships(
          updatedCensusData,
          personId,
          personFullName,
          memberId,
          member.name,
          inverseRel
        );
      });
    });

    // Call onUpdateCensusData with the updated census data
    if (onUpdateCensusData) {
      onUpdateCensusData(updatedCensusData);
    }

    setShowAttachDialog(true);
  };

  const handleSaveAndContinue = () => {

    // Save the current person's data before loading the next one
    const currentPersonName = getCurrentPersonName();
    const currentPersonData = {
      name: currentPersonName,
      relationships: cardData.recordGroup.members || [],
      essentialInfo: cardData.essentialInfo,
      primaryEvent: cardData.primaryEvent,
      additionalEvents: cardData.additionalEvents,
      additionalFacts: cardData.additionalFacts,
      recordGroup: cardData.recordGroup
    };

    // Add current person to savedPeople
    setSavedPeople(prev => [...prev, currentPersonData]);

    // Initialize updatedCensusData - we'll use this throughout to avoid stale state
    let updatedCensusData = { ...censusData };
    let censusDataWasUpdated = false;

    // FIRST: Update the CURRENT person in censusData with their edited information
    const currentPersonId = cardData.essentialInfo?.originalPersonId;
    const currentPersonGivenName = cardData.essentialInfo?.names?.[0]?.givenName || '';
    const currentPersonSurname = cardData.essentialInfo?.names?.[0]?.surname || '';
    const currentPersonFullName = `${currentPersonGivenName} ${currentPersonSurname}`.trim() || currentPersonGivenName;

    if (currentPersonId) {
      // Find and update the current person in censusData
      for (const record of updatedCensusData.records) {
        const personToUpdate = record.people.find(p => p.id === currentPersonId);
        if (personToUpdate) {
          // Update all editable fields
          personToUpdate.givenName = currentPersonGivenName || personToUpdate.givenName;
          personToUpdate.surname = currentPersonSurname || personToUpdate.surname;
          personToUpdate.sex = cardData.essentialInfo.sex || personToUpdate.sex;
          personToUpdate.age = cardData.essentialInfo.age || personToUpdate.age;
          personToUpdate.race = cardData.essentialInfo.race || personToUpdate.race;
          personToUpdate.isPrimary = cardData.essentialInfo.isPrimary ?? personToUpdate.isPrimary;
          personToUpdate.isVisible = true;

          // Update birth/death data from additionalEvents
          if (cardData.additionalEvents && cardData.additionalEvents.length > 0) {
            cardData.additionalEvents.forEach(event => {
              if (event.type === 'Birth') {
                personToUpdate.birthDate = event.date || personToUpdate.birthDate;
                personToUpdate.birthPlace = event.place || personToUpdate.birthPlace;
              } else if (event.type === 'Death') {
                personToUpdate.deathDate = event.date || personToUpdate.deathDate;
                personToUpdate.deathPlace = event.place || personToUpdate.deathPlace;
              }
            });
          }

          censusDataWasUpdated = true;
          break;
        }
      }
    }

    // Check if there are new people in Record Group that need to be added to censusData
    const recordId = cardData.recordGroup?.existingRecordId;
    if (recordId && cardData.recordGroup?.members) {
      const record = updatedCensusData.records.find(r => r.id === recordId);
      if (record) {
        const newPeopleToAdd = [];

        // Note: currentPersonId, currentPersonGivenName, currentPersonSurname, and currentPersonFullName
        // are already declared above (before updating current person in censusData)

        // Find members that don't exist in census data yet
        cardData.recordGroup.members.forEach(member => {
          const memberExists = record.people.some(p => {
            const personName = `${p.givenName} ${p.surname}`.trim() || p.givenName;
            return personName === member.name;
          });

          if (!memberExists) {
            // This is a new person - create a temp person object
            const nameParts = member.name.split(' ');
            const givenName = nameParts[0] || '';
            const surname = nameParts.slice(1).join(' ') || '';

            const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

            // Set up relationships - the member.relationship is relative to the current person
            // So if current person is "John" and member is "Christopher" with relationship "Child",
            // that means Christopher is a Child of John, so John is a Parent to Christopher
            const inverseRelationship = getInverseRelationship(member.relationship || 'Other');
            const relationships = currentPersonId ? [{
              type: getRelationshipType(inverseRelationship),
              role: inverseRelationship.toUpperCase(),
              relatedPersonId: currentPersonId,
              relatedPersonName: currentPersonFullName
            }] : [];

            const newPerson = {
              id: tempId,
              givenName: givenName,
              surname: surname,
              relationship: 'Other', // Census role - set to generic "Other" for new people
              sex: '',
              age: '',
              race: '',
              isPrimary: false,
              isVisible: false,
              relationships: relationships,
              attachedPersons: [],
              hints: []
            };

            newPeopleToAdd.push(newPerson);
          }
        });

        // Add new people to the record
        if (newPeopleToAdd.length > 0) {
          record.people.push(...newPeopleToAdd);

          // Update census data
          updatedCensusData = {
            ...updatedCensusData,
            records: updatedCensusData.records.map(r => {
              if (r.id === recordId) {
                return record;
              }
              return r;
            })
          };
          censusDataWasUpdated = true;

          // Now update bidirectional relationships for each new person
          newPeopleToAdd.forEach(newPerson => {
            if (currentPersonId) {
              const memberData = cardData.recordGroup.members.find(m => {
                const memberName = `${newPerson.givenName} ${newPerson.surname}`.trim();
                return m.name === memberName;
              });

              if (memberData) {
                // IMPORTANT: memberData.relationship is the relationship OF the new person TO the current person
                // We need to get the inverse before calling updateBidirectionalRelationships
                const inverseRel = getInverseRelationship(memberData.relationship);

                // Update bidirectional relationship between current person and new person
                // This sets: currentPerson → newPerson as inverseRel (e.g., "Parent")
                //            newPerson → currentPerson as memberData.relationship (e.g., "Child")
                updatedCensusData = updateBidirectionalRelationships(
                  updatedCensusData,
                  currentPersonId,
                  currentPersonFullName,
                  newPerson.id,
                  `${newPerson.givenName} ${newPerson.surname}`.trim(),
                  inverseRel
                );
              }
            }
          });
          censusDataWasUpdated = true;
        }

        // ALSO update bidirectional relationships for ALL members (including newly created ones)
        // This sets up relationships between new people and everyone else in the household
        if (currentPersonId && cardData.recordGroup?.members) {

          cardData.recordGroup.members.forEach(member => {
            // Find the member's ID in census data
            let memberId = null;
            for (const rec of updatedCensusData.records) {
              const memberPerson = rec.people.find(p => {
                const pName = `${p.givenName} ${p.surname}`.trim();
                return pName === member.name;
              });
              if (memberPerson) {
                memberId = memberPerson.id;
                break;
              }
            }

            if (memberId) {
              // IMPORTANT: member.relationship is the relationship OF the member TO the current person
              // E.g., if John's Record Group has Heamy with relationship "Cousin",
              // it means Heamy IS John's cousin, so John is Heamy's "Cousin" (inverse)
              // We need to get the inverse before calling updateBidirectionalRelationships
              const inverseRel = getInverseRelationship(member.relationship);

              // Update bidirectional relationship
              // This sets: currentPerson → member as inverseRel
              //            member → currentPerson as member.relationship
              updatedCensusData = updateBidirectionalRelationships(
                updatedCensusData,
                currentPersonId,
                currentPersonFullName,
                memberId,
                member.name,
                inverseRel
              );
              censusDataWasUpdated = true;
            }
          });
        }
      }
    }

    // Update census data once at the end if any changes were made
    if (censusDataWasUpdated && onUpdateCensusData) {
      onUpdateCensusData(updatedCensusData);
    }

    // Get the next person from the queue
    if (remainingPeople.length === 0) {
      return;
    }

    const nextPersonName = remainingPeople[0];

    // Normalize nextPersonName to a string (it could be an object for new people)
    let nextPersonNameStr;
    let nextPersonGivenName;
    let nextPersonSurname;

    if (typeof nextPersonName === 'string') {
      nextPersonNameStr = nextPersonName;
      // Try to split into given/surname
      const parts = nextPersonName.split(' ');
      nextPersonGivenName = parts[0] || '';
      nextPersonSurname = parts.slice(1).join(' ') || '';
    } else {
      // It's an object with givenName and surname
      nextPersonGivenName = nextPersonName.givenName || '';
      nextPersonSurname = nextPersonName.surname || '';
      nextPersonNameStr = `${nextPersonGivenName} ${nextPersonSurname}`.trim() || nextPersonGivenName;
    }


    // Find this person in the census data (use updatedCensusData to get latest relationships)
    let foundPerson = null;
    let foundRecord = null;

    for (const record of updatedCensusData.records) {
      for (const person of record.people) {
        const personFullName = `${person.givenName || ''} ${person.surname || ''}`.trim() || person.givenName;
        if (personFullName === nextPersonNameStr) {
          foundPerson = person;
          foundRecord = record;
          break;
        }
      }
      if (foundPerson) break;
    }

    // If not found in census data, this is a new person added via Record Group card
    if (!foundPerson || !foundRecord) {

      // Try to find the member in current person's Record Group data
      const currentRecordId = cardData.recordGroup?.existingRecordId;
      let memberInfo = cardData.recordGroup?.members?.find(m => {
        const memberName = m.name || `${m.givenName || ''} ${m.surname || ''}`.trim();
        return memberName === nextPersonNameStr ||
               (m.givenName === nextPersonGivenName && (m.surname || '') === nextPersonSurname);
      });


      // If not found in current person's Record Group, search in savedPeople
      // (the new person may have been added to an earlier person's Record Group)
      if (!memberInfo) {
        for (const savedPerson of savedPeople) {
          const savedMember = savedPerson.recordGroup?.members?.find(m => {
            const memberName = m.name || `${m.givenName || ''} ${m.surname || ''}`.trim();
            return memberName === nextPersonNameStr ||
                   (m.givenName === nextPersonGivenName && (m.surname || '') === nextPersonSurname);
          });
          if (savedMember) {
            memberInfo = savedMember;
            break;
          }
        }
      }

      if (!memberInfo) {
        console.error('[handleSaveAndContinue] Could not find new person in Record Group data or savedPeople:', nextPersonNameStr);
        console.error('[handleSaveAndContinue] Available members in current:', cardData.recordGroup?.members?.map(m => m.name || m.givenName));
        console.error('[handleSaveAndContinue] Saved people:', savedPeople.map(p => p.name));
        return;
      }

      // Create a minimal person object for the new person
      foundRecord = censusData.records.find(r => r.id === currentRecordId);
      if (!foundRecord) {
        console.error('[handleSaveAndContinue] Could not find record:', currentRecordId);
        return;
      }

      // Generate a temporary ID for the new person
      const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      foundPerson = {
        id: tempId,
        givenName: nextPersonGivenName,
        surname: nextPersonSurname,
        relationship: memberInfo.relationship || '',
        sex: '',
        age: '',
        race: '',
        isPrimary: false,
        isVisible: false,
        relationships: [],
        attachedPersons: [],
        hints: []
      };


      // Add the new person to the record temporarily so they appear in other people's Record Group cards
      foundRecord.people.push(foundPerson);

      // Update census data with the new person
      const updatedCensusData = {
        ...censusData,
        records: censusData.records.map(r => {
          if (r.id === foundRecord.id) {
            return foundRecord;
          }
          return r;
        })
      };

      // Update parent component's census data
      if (onUpdateCensusData) {
        onUpdateCensusData(updatedCensusData);
      }

    }


    // Get all people from this record
    const allPeople = foundRecord.people;

    // Find primary person in household
    const primaryPerson = allPeople.find(p => p.isPrimary) || foundPerson;
    const primaryFullName = `${primaryPerson.givenName || ''} ${primaryPerson.surname || ''}`.trim() || primaryPerson.givenName || 'Unknown';
    const householdName = primaryFullName + ' Household';

    // Auto-populate all cards for next person
    const populatedData = {
      essentialInfo: {
        isPrimary: foundPerson.isPrimary || false,
        names: [{
          type: 'Birth Name',
          givenName: foundPerson.givenName || '',
          surname: foundPerson.surname || ''
        }],
        sex: foundPerson.sex || '',
        race: foundPerson.race || '',
        age: foundPerson.age || '',
        originalPersonId: foundPerson.id // Store original ID from AI extraction
      },
      recordGroup: {
        recordGroup: {
          type: 'Census',
          primaryName: householdName
        },
        members: allPeople
          .filter(p => p.id !== foundPerson.id)
          .map(p => {
            const personName = `${p.givenName || ''} ${p.surname || ''}`.trim() || p.givenName || 'Unknown';
            const relationshipEntry = p.relationships?.find(r => r.relatedPersonId === foundPerson.id);
            let rawRelationship = relationshipEntry?.role || p.relationship || '';


            // Use normalizeRelationshipRole to properly format and map relationships
            // This handles 'OTHER' → 'No Relation', uppercase roles, etc.
            const formattedRelationship = normalizeRelationshipRole(rawRelationship);

            return {
              id: p.id,
              name: personName,
              relationship: formattedRelationship,
              fromGroupId: foundRecord.id
            };
          }),
        existingRecordId: foundRecord.id
      },
      events: {
        primaryEvent: {
          type: 'Census',
          date: foundRecord.date || '',
          place: foundRecord.place || ''
        },
        additionalEvents: [
          ...(foundPerson.birthDate || foundPerson.birthPlace ? [{
            type: 'Birth',
            date: foundPerson.birthDate || '',
            place: foundPerson.birthPlace || ''
          }] : []),
          ...(foundPerson.deathDate || foundPerson.deathPlace ? [{
            type: 'Death',
            date: foundPerson.deathDate || '',
            place: foundPerson.deathPlace || ''
          }] : [])
        ]
      },
      additionalFacts: {
        facts: []
      }
    };

    // Set all cards to review state
    setCardStates({
      essentialInfo: 'review',
      recordGroup: 'review',
      events: 'review',
      additionalFacts: 'review',
      review: 'add'
    });

    setCardData(populatedData);

    // Remove this person from remaining people
    setRemainingPeople(prev => prev.slice(1));


    // Trigger scroll to top after state updates
    setShouldScrollToTop(true);
  };

  const handleAddPerson = () => {
    setAddingNewPersonToHousehold(true);
  };

  const handleNestedPersonSave = (savedPersonData) => {

    // Close the nested InfoSheet
    setAddingNewPersonToHousehold(false);

    // Extract name from saved data
    const givenName = savedPersonData.essentialInfo?.names?.[0]?.givenName || '';
    const surname = savedPersonData.essentialInfo?.names?.[0]?.surname || '';
    const fullName = `${givenName} ${surname}`.trim();


    // Check if we're in queue mode (remainingPeople has items) or manual add mode (empty queue)
    if (remainingPeople.length > 0) {
      // Queue mode: Add to queue for review
      setRemainingPeople(prev => [...prev, fullName]);
    } else {
      // Manual add mode: Person already saved to censusData, close outer sheet and return to Names

      // Call onSaveAndReturn or onBack to close the outer AddNameInfoSheet
      if (onSaveAndReturn) {
        onSaveAndReturn();
      } else if (onBack) {
        onBack();
      }
    }
  };

  const handleNewPersonCreated = (givenName, surname) => {
    // Create the new person in censusData immediately with "No Relation" relationships
    const recordId = cardData.recordGroup?.existingRecordId;
    if (recordId && censusData && onUpdateCensusData) {
      const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const fullName = `${givenName} ${surname}`.trim();

      // Find the record
      const record = censusData.records.find(r => r.id === recordId);
      if (record) {
        // Create relationships array with "No Relation" to everyone in the record
        const relationships = record.people.map(p => ({
          type: 'OTHER',
          role: 'NO_RELATION',
          relatedPersonId: p.id,
          relatedPersonName: `${p.givenName} ${p.surname}`.trim() || p.givenName || 'Unknown'
        }));

        // Create new person object
        const newPerson = {
          id: tempId,
          givenName: givenName,
          surname: surname,
          relationship: 'Other', // Census role
          sex: '',
          age: '',
          race: '',
          isPrimary: false,
          isVisible: false,
          relationships: relationships,
          attachedPersons: [],
          hints: []
        };

        // Add to record
        record.people.push(newPerson);

        // Update bidirectional relationships - add "No Relation" from everyone to the new person
        record.people.forEach(p => {
          if (p.id !== tempId) {
            const existingRel = p.relationships?.find(r => r.relatedPersonId === tempId);
            if (!existingRel) {
              if (!p.relationships) {
                p.relationships = [];
              }
              p.relationships.push({
                type: 'OTHER',
                role: 'NO_RELATION',
                relatedPersonId: tempId,
                relatedPersonName: fullName
              });
            }
          }
        });

        // Update census data
        const updatedCensusData = {
          ...censusData,
          records: censusData.records.map(r =>
            r.id === recordId ? record : r
          )
        };

        onUpdateCensusData(updatedCensusData);
      }
    }

    // Add to remaining people list with separate name parts
    setRemainingPeople(prev => [...prev, { givenName, surname }]);
  };

  const handleRecordGroupSelected = (recordEventData) => {
    // Update events card data with record's primary event information
    setCardData(prev => {
      const newData = {
        ...prev,
        primaryEvent: {
          type: recordEventData.recordType || 'Census',
          date: recordEventData.date || '',
          place: recordEventData.place || ''
        },
        additionalEvents: prev.additionalEvents || [],
        recordGroup: {
          ...prev.recordGroup,
          existingRecordId: recordEventData.recordId // Track the existing record ID
        }
      };
      return newData;
    });
  };

  const handlePreviousRelationshipsSave = (newRelationships) => {
    const { peopleToMove, currentPersonIndex, pendingFormData } = dialogState;
    const currentPersonToMove = peopleToMove[currentPersonIndex];


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

  // Find Details handlers
  const handleShowFindDetails = (searchCriteria) => {
    setFindDetailsSearch(searchCriteria);
    setShowFindDetails(true);
  };

  const handleSelectRecord = (matchResult) => {
    const { record, matchedPersonId, allPeople } = matchResult;

    // Find the matched person
    const matchedPerson = allPeople.find(p => p.id === matchedPersonId);

    if (!matchedPerson) {
      console.error('Could not find matched person');
      return;
    }

    // Find primary person in household
    const primaryPerson = allPeople.find(p => p.isPrimary) || matchedPerson;
    const primaryFullName = `${primaryPerson.givenName || ''} ${primaryPerson.surname || ''}`.trim() || primaryPerson.givenName || 'Unknown';
    const householdName = primaryFullName + ' Household';

    // Auto-populate all cards for matched person
    const populatedData = {
      essentialInfo: {
        isPrimary: matchedPerson.isPrimary || false,
        names: [{
          type: 'Birth Name',
          givenName: matchedPerson.givenName || '',
          surname: matchedPerson.surname || ''
        }],
        sex: matchedPerson.sex || '',
        race: matchedPerson.race || '',
        age: matchedPerson.age || '',
        originalPersonId: matchedPerson.id // Store original ID from AI extraction
      },
      recordGroup: {
        recordGroup: {
          type: 'Census',
          primaryName: householdName
        },
        members: allPeople
          .filter(p => p.id !== matchedPersonId)
          .map(p => {
            const rawRelationship = p.relationships?.find(r => r.relatedPersonId === matchedPersonId)?.role || p.relationship || '';
            // Capitalize first letter, lowercase the rest
            const formattedRelationship = rawRelationship
              ? rawRelationship.charAt(0).toUpperCase() + rawRelationship.slice(1).toLowerCase()
              : '';
            return {
              id: p.id,
              name: `${p.givenName || ''} ${p.surname || ''}`.trim() || p.givenName || 'Unknown',
              relationship: formattedRelationship,
              fromGroupId: record.id
            };
          }),
        existingRecordId: record.id
      },
      events: {
        primaryEvent: {
          type: 'Census',
          date: record.date || '',
          place: record.place || ''
        },
        additionalEvents: [
          ...(matchedPerson.birthDate || matchedPerson.birthPlace ? [{
            type: 'Birth',
            date: matchedPerson.birthDate || '',
            place: matchedPerson.birthPlace || ''
          }] : []),
          ...(matchedPerson.deathDate || matchedPerson.deathPlace ? [{
            type: 'Death',
            date: matchedPerson.deathDate || '',
            place: matchedPerson.deathPlace || ''
          }] : [])
        ]
      },
      additionalFacts: {
        facts: []
      }
    };

    // Set all cards to review state
    setCardStates({
      essentialInfo: 'review',
      recordGroup: 'review',
      events: 'review',
      additionalFacts: 'review',
      review: 'add'
    });

    setCardData(populatedData);

    // Queue remaining people for review
    const otherPeople = allPeople
      .filter(p => p.id !== matchedPersonId)
      .map(p => `${p.givenName || ''} ${p.surname || ''}`.trim() || p.givenName || 'Unknown')
      .filter(name => name !== 'Unknown');

    setRemainingPeople(otherPeople);

    // Make all people in this record visible
    const updatedCensusData = {
      ...censusData,
      records: censusData.records.map(r => {
        if (r.id === record.id) {
          return {
            ...r,
            people: r.people.map(p => ({
              ...p,
              isVisible: true
            }))
          };
        }
        return r;
      })
    };

    onUpdateCensusData(updatedCensusData);

    setShowFindDetails(false);
  };

  const handlePreviousRelationshipsCancel = () => {
    setDialogState({
      showPreviousRelationships: false,
      currentPersonIndex: 0,
      peopleToMove: [],
      pendingFormData: null,
      currentGroupMembers: []
    });
  };

  // Show Find Details if active
  if (showFindDetails) {
    return (
      <FindDetailsDialog
        isOpen={true}
        onClose={() => setShowFindDetails(false)}
        onBack={() => setShowFindDetails(false)}
        searchCriteria={findDetailsSearch}
        censusData={censusData}
        onSelectRecord={handleSelectRecord}
      />
    );
  }

  return (
    <>
      <InfoSheet
        title="Manage Names"
        subtitle="Add Name"
        panel={true}
        onBack={onBack}
        close={onBack || onClose}
        size="lg"
        elevated={false}
        contentRef={infoSheetContentRef}
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
            onShowFindDetails={handleShowFindDetails}
            onShowAISelection={onTriggerAISelection}
            censusData={censusData}
            currentApproach={currentApproach}
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
            data={{ facts: cardData.facts }}
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
            onAddPerson={handleAddPerson}
            currentApproach={currentApproach}
            isEditingExistingPerson={preselectedPerson && !preselectedPerson.isNew}
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

      {/* Add Person nested InfoSheet - rendered when adding a new person to household */}
      {addingNewPersonToHousehold && (() => {
        // Find the actual record from censusData to pass to nested sheet
        const recordId = cardData.recordGroup.existingRecordId;
        const record = censusData.records.find(r => r.id === recordId);

        if (!record) {
          console.error('[AddNameInfoSheet] Could not find record for nested sheet:', recordId);
          return null;
        }

        return (
          <AddNameInfoSheet
            censusData={censusData}
            onUpdateCensusData={onUpdateCensusData}
            preselectedRecordGroup={record}
            preselectedPerson={{ isNew: true }}
            onSaveAndReturn={(savedData) => {
              handleNestedPersonSave(savedData);
            }}
            onBack={() => setAddingNewPersonToHousehold(false)}
            onClose={() => setAddingNewPersonToHousehold(false)}
            currentApproach={currentApproach}
          />
        );
      })()}
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
