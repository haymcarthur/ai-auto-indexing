import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FullPageOverlay } from "../../ux-zion-library/src/components/FullPageOverlay";
import { ImageViewer } from "../../ux-zion-library/src/components/ImageViewer";
import { InfoSheet } from "../../ux-zion-library/src/components/InfoSheet";
import { IconButton } from "../../ux-zion-library/src/components/IconButton";
import { Button } from "../../ux-zion-library/src/components/Button";
import { Paragraph } from "../../ux-zion-library/src/components/Paragraph";
import { DocumentRecordPerson, NoticeInfo } from "../../ux-zion-library/src/icons";
import { NamesInfoSheet } from './NamesInfoSheet';
import { InstructionPanel } from './InstructionPanel';
import { SelectNameInfoSheet } from './SelectNameInfoSheet';
import { DocumentHighlightOverlay } from './DocumentHighlightOverlay';
import { FindDetailsDialog } from './FindDetailsDialog';
import { getAllHighlights } from '../data/highlightCoordinates';
import { useTestSession } from '../contexts/TestSessionContext';
import { validateTask } from '../utils/taskValidation';
import censusDataJson from '../../KentuckyCensus-simple.json';
import imageUrl from "../../ux-zion-library/src/assets/Records/KentuckyCensusRecords.jpg";

export const StartingScreen = () => {
  const [showNamesSheet, setShowNamesSheet] = useState(false);
  const [showInfoSheet, setShowInfoSheet] = useState(false);
  const [censusData, setCensusData] = useState(censusDataJson);

  // A/B Test Variant Order - Randomly assigned on mount
  const [variantOrder] = useState(() => {
    // Randomly assign A→B or B→A order
    return Math.random() < 0.5 ? 'A-B' : 'B-A';
  });

  const [currentTask, setCurrentTask] = useState(1); // 1 or 2

  // Store census data snapshots for separate validation of each task
  const [task1CensusData, setTask1CensusData] = useState(null);

  // Determine current approach based on variant order and task number
  const currentApproach = currentTask === 1
    ? (variantOrder === 'A-B' ? 'A' : 'B')
    : (variantOrder === 'A-B' ? 'B' : 'A');

  // Highlight selection state for Approach B
  const [highlightMode, setHighlightMode] = useState(false);
  const [showSelectNameSheet, setShowSelectNameSheet] = useState(false);
  const [preselectedRecordGroup, setPreselectedRecordGroup] = useState(null);
  const [preselectedPerson, setPreselectedPerson] = useState(null);
  const [showFindingDetails, setShowFindingDetails] = useState(false);
  const [pendingRecordGroup, setPendingRecordGroup] = useState(null);

  // Get test session context
  const {
    recording,
    testComplete,
    handleRecordingStart,
    handleTaskComplete
  } = useTestSession();

  // Sync selectedRecordGroup with censusData updates
  // NOTE: Disabled this effect as it was causing race conditions with onComplete flow
  // The selectedRecordGroup is managed explicitly through setState calls
  // useEffect(() => {
  //   if (selectedRecordGroup && censusData) {
  //     // Find the updated version of the selected record group in censusData
  //     const updatedRecord = censusData.records.find(r => r.id === selectedRecordGroup.id);
  //     if (updatedRecord) {
  //       console.log('[StartingScreen] Updating selectedRecordGroup with latest data');
  //       setSelectedRecordGroup(updatedRecord);
  //     }
  //   }
  // }, [censusData, selectedRecordGroup]);

  // Handle task completion button click (now receives survey responses from InstructionPanel)
  const onTaskComplete = (data, shouldSave = false) => {
    if (!shouldSave) {
      // Task 1 complete - capture census data snapshot before resetting
      setTask1CensusData(censusData);
      setCurrentTask(2);
      // Reset census data and UI state for fresh start
      setCensusData(censusDataJson);
      setShowNamesSheet(false);
      setShowInfoSheet(false);
      setHighlightMode(false);
      setShowSelectNameSheet(false);
      setPreselectedPerson(null);
    } else {
      // All tasks complete - save all responses with both census data snapshots
      handleTaskComplete(task1CensusData, censusData, validateTask, data);
    }
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
      'Cousin': 'Cousin'
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
    if (roleUpper.includes('IN-LAW')) {
      if (roleUpper.includes('PARENT') || roleUpper.includes('CHILD')) return 'PARENT_CHILD_IN_LAW';
      if (roleUpper.includes('SIBLING')) return 'SIBLING_IN_LAW';
    }
    return 'OTHER';
  };

  /**
   * Helper function to update relationships bidirectionally in census data
   * When person A has relationship to person B, person B should have inverse relationship to person A
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

  // Prepare images array for ImageViewer
  const images = [{
    src: imageUrl,
    alt: 'Kentucky Census Records'
  }];

  // Handle triggering AI selection mode
  const handleShowAISelection = () => {
    // Keep NamesInfoSheet open - SelectNameInfoSheet will overlay on top
    setShowSelectNameSheet(true);
    setHighlightMode(true);
  };

  // Handle highlight click - show loading then AI review sheet for entire record group
  const handleHighlightClick = (highlightId) => {
    // Ignore header highlight
    if (highlightId === 'header-highlight') {
      return;
    }

    // Find the record containing this person
    const record = censusData.records.find(r =>
      r.people.some(p => p.id === highlightId)
    );

    if (record) {
      // Close select name sheet and highlight mode
      setShowSelectNameSheet(false);
      setHighlightMode(false);

      // Keep NamesInfoSheet open in background (needed for AddNameInfoSheet)
      setShowNamesSheet(true);

      // Show "Finding Details" loading screen first
      setPendingRecordGroup(record);
      setShowFindingDetails(true);

      // After 2 seconds, pass record to NamesInfoSheet to show AI review
      setTimeout(() => {
        setShowFindingDetails(false);
        setPreselectedRecordGroup(record);
        setPendingRecordGroup(null);
      }, 2000);
    }
  };

  // Handle cancel from AI selection mode
  const handleCancelAISelection = () => {
    setShowSelectNameSheet(false);
    setHighlightMode(false);
    setShowNamesSheet(true);
  };

  // Handle manual entry from AI selection mode
  const handleAddManually = () => {
    setShowSelectNameSheet(false);
    setHighlightMode(false);
    // Trigger AddNameInfoSheet by setting preselectedPerson to empty object
    // NamesInfoSheet is already open, so AddNameInfoSheet will overlay on top
    setPreselectedPerson({});
  };

  // Handle AI review completion - save to censusData
  const handleAIReviewComplete = (updatedPeople, recordGroup) => {

    // Save the updated people to censusData
    if (updatedPeople && recordGroup) {
      // Ensure all people have isVisible: true so they appear in Names list
      const visiblePeople = updatedPeople.map(person => ({
        ...person,
        isVisible: true
      }));

      // Find or create the record in censusData
      setCensusData(prev => {
        let updatedCensusData = { ...prev };
        const existingRecordIndex = prev.records.findIndex(r => r.id === recordGroup.id);

        if (existingRecordIndex !== -1) {
          // Record exists, update its people
          const updatedRecords = [...prev.records];
          updatedRecords[existingRecordIndex] = {
            ...updatedRecords[existingRecordIndex],
            people: visiblePeople
          };
          updatedCensusData = { ...prev, records: updatedRecords };
        } else {
          // Record doesn't exist, add it
          const newRecord = {
            id: recordGroup.id,
            recordType: recordGroup.recordType || 'Census',
            date: recordGroup.date || '',
            place: recordGroup.place || '',
            people: visiblePeople
          };
          updatedCensusData = {
            ...prev,
            records: [...prev.records, newRecord]
          };
        }

        // Update bidirectional relationships for all people in the record
        const processedPairs = new Set(); // Track processed pairs to avoid duplicates

        visiblePeople.forEach(person => {
          if (!person.relationships || person.relationships.length === 0) return;

          const personFullName = `${person.givenName} ${person.surname}`.trim() || person.givenName;

          // Update bidirectional relationship for each relationship this person has
          person.relationships.forEach(rel => {
            // Find the related person
            const relatedPersonId = rel.relatedPersonId;
            const relatedPerson = visiblePeople.find(p => p.id === relatedPersonId);

            if (relatedPerson) {
              // Create pair key to avoid processing same relationship twice
              const pairKey = [person.id, relatedPersonId].sort().join('-');
              if (processedPairs.has(pairKey)) return;
              processedPairs.add(pairKey);

              const relatedPersonName = `${relatedPerson.givenName} ${relatedPerson.surname}`.trim() || relatedPerson.givenName;

              // Convert role format to relationship format
              // E.g., "CHILD" → "Child", "PARENT" → "Parent", "SPOUSE" → "Spouse"
              let relationship;
              if (typeof rel.role === 'string') {
                relationship = rel.role.split('_').map(word =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                ).join(' ');
              } else if (typeof rel.relationship === 'string') {
                relationship = rel.relationship;
              } else {
                console.warn('[handleAIReviewComplete] Unknown relationship format:', rel);
                relationship = 'No Relation';
              }

              // Update bidirectionally
              updatedCensusData = updateBidirectionalRelationships(
                updatedCensusData,
                person.id,
                personFullName,
                relatedPersonId,
                relatedPersonName,
                relationship
              );
            }
          });
        });

        return updatedCensusData;
      });
    }
  };

  // Handle clearing preselected record group
  const handleClearPreselectedRecordGroup = () => {
    setPreselectedRecordGroup(null);
  };

  // Get all highlights for the overlay
  const highlights = highlightMode ? getAllHighlights(censusData) : [];

  // Secondary buttons (low-emphasis with labels and icons)
  const secondaryButtons = [
    {
      label: 'Names',
      icon: DocumentRecordPerson,
      onClick: () => {
        setShowInfoSheet(false);
        setShowNamesSheet(true);
      }
    },
    {
      label: 'Information',
      icon: NoticeInfo,
      onClick: () => {
        setShowNamesSheet(false);
        setShowInfoSheet(true);
      }
    }
  ];

  // Show thank you screen when test is complete
  if (testComplete) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '40px',
        textAlign: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: '32px', marginBottom: '16px', color: '#059669' }}>
            Thank You!
          </h1>
          <p style={{ fontSize: '18px', marginBottom: '24px', color: '#6b7280' }}>
            Your responses have been recorded successfully.
          </p>
          <p style={{ fontSize: '16px', color: '#9ca3af' }}>
            You can now close this window.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <FullPageOverlay
        isOpen={true}
        close={() => {}}
        hideBackButton={true}
        title="Georgia. Diaries Jun 14, 1738, May 25, 1744"
        secondaryButtons={secondaryButtons}
      >
        <ImageViewer
          images={images}
          overlayContent={highlightMode ? ({ zoomLevel, panOffset, isDragging, imageRef }) => (
              <DocumentHighlightOverlay
                highlights={highlights}
                onHighlightClick={handleHighlightClick}
                isActive={highlightMode}
                zoomLevel={zoomLevel}
                panOffset={panOffset}
                imageSize={{ width: 4032, height: 2624 }}
                isDragging={isDragging}
                imageRef={imageRef}
              />
          ) : null}
        />
      </FullPageOverlay>

      {showNamesSheet && (
        <NamesInfoSheet
          censusData={censusData}
          onUpdateCensusData={setCensusData}
          onClose={() => setShowNamesSheet(false)}
          onTriggerAISelection={handleShowAISelection}
          preselectedPerson={preselectedPerson}
          onClearPreselectedPerson={() => setPreselectedPerson(null)}
          currentApproach={currentApproach}
          // Task B AI Review props
          preselectedRecordGroup={preselectedRecordGroup}
          onClearPreselectedRecordGroup={handleClearPreselectedRecordGroup}
          onAIReviewComplete={handleAIReviewComplete}
        />
      )}

      {showSelectNameSheet && (
        <SelectNameInfoSheet
          onCancel={handleCancelAISelection}
          onAddManually={handleAddManually}
        />
      )}

      {showFindingDetails && pendingRecordGroup && (
        <FindDetailsDialog
          isOpen={true}
          onClose={() => {
            setShowFindingDetails(false);
            setPendingRecordGroup(null);
          }}
          onBack={() => {
            setShowFindingDetails(false);
            setPendingRecordGroup(null);
            setShowSelectNameSheet(true);
            setHighlightMode(true);
          }}
          searchCriteria={{ givenName: '', surname: '' }}
          censusData={censusData}
          onSelectRecord={() => {}} // Not used in loading mode
        />
      )}

      {showInfoSheet && (
        <InfoSheet
          title="Information"
          close={() => setShowInfoSheet(false)}
          size="lg"
          elevated={false}
        >
          <Paragraph secondary style={{ marginTop: '16px' }}>
            Information panel coming soon...
          </Paragraph>
        </InfoSheet>
      )}

      {/* Instruction Panel */}
      <InstructionPanel
        onRecordingStart={handleRecordingStart}
        onTaskComplete={onTaskComplete}
        isRecording={recording.isRecording}
        recordingError={recording.error}
        startRecording={recording.startRecording}
        recordingStopped={recording.recordingStopped}
        currentTask={currentTask}
      />
    </>
  );
};
