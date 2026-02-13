import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { InfoSheet } from "../../ux-zion-library/src/components/InfoSheet";
import { Card } from "../../ux-zion-library/src/components/Card";
import { BillboardButton } from "../../ux-zion-library/src/components/BillboardButton";
import { Button } from "../../ux-zion-library/src/components/Button";
import { IconButton } from "../../ux-zion-library/src/components/IconButton";
import { Alert } from "../../ux-zion-library/src/components/Alert";
import { Paragraph } from "../../ux-zion-library/src/components/Paragraph";
import { HeadingBlock } from "../../ux-zion-library/src/components/HeadingBlock";
import { Header } from "../../ux-zion-library/src/components/Header";
import { ContentDelete } from "../../ux-zion-library/src/icons";
import { spacing } from "../../ux-zion-library/src/tokens/spacing";
import { colors } from "../../ux-zion-library/src/tokens/colors";
import { elevation } from "../../ux-zion-library/src/tokens/elevation";

/**
 * Helper function to get inverse relationship role for display
 */
const getInverseRelationshipRole = (role) => {
  const roleMap = {
    // Symmetric relationships (same both ways)
    'SPOUSE': 'SPOUSE',
    'SIBLING': 'SIBLING',
    'COUSIN': 'COUSIN',

    // Asymmetric relationships (bidirectional pairs)
    'PARENT': 'CHILD',
    'CHILD': 'PARENT',
    'GRANDPARENT': 'GRANDCHILD',
    'GRANDCHILD': 'GRANDPARENT',
    'AUNT_OR_UNCLE': 'NIECE_OR_NEPHEW',
    'NIECE_OR_NEPHEW': 'AUNT_OR_UNCLE',
    'STEPPARENT': 'STEPCHILD',
    'STEPCHILD': 'STEPPARENT',
    'PARENT_IN_LAW': 'CHILD_IN_LAW',
    'CHILD_IN_LAW': 'PARENT_IN_LAW',
    'SIBLING_IN_LAW': 'SIBLING_IN_LAW',
    'STEPSIBLING': 'STEPSIBLING',

    // Default
    'NO_RELATION': 'NO_RELATION',
    'OTHER': 'OTHER'
  };

  return roleMap[role?.toUpperCase()] || role;
};

/**
 * AIReviewInfoSheet - Review screen for AI-extracted people from a record group
 * Shows all people in the record group with their extracted details
 * User can review, edit, or mark each person as correct
 */
export const AIReviewInfoSheet = ({
  recordGroup,
  onBack,
  onClose,
  onComplete,
  onEditPerson,
  onDeletePerson,
  initialPersonIndex,
  onCurrentIndexChange,
  initialReviewedPeople,
  onReviewedPeopleChange
}) => {
  // Track which cards have been marked as correct
  const [reviewedPeople, setReviewedPeople] = useState(initialReviewedPeople || new Set());
  const [currentPersonIndex, setCurrentPersonIndex] = useState(initialPersonIndex || 0);
  const [localPeople, setLocalPeople] = useState(recordGroup?.people || []);
  const cardRefs = useRef({});
  const previousPeopleIdsRef = useRef(new Set());

  // Notify parent when currentPersonIndex changes
  useEffect(() => {
    if (onCurrentIndexChange) {
      onCurrentIndexChange(currentPersonIndex);
    }
  }, [currentPersonIndex, onCurrentIndexChange]);

  // Notify parent when reviewedPeople changes
  useEffect(() => {
    if (onReviewedPeopleChange) {
      onReviewedPeopleChange(reviewedPeople);
    }
  }, [reviewedPeople, onReviewedPeopleChange]);

  // Sync localPeople with recordGroup.people when it changes (from edits or additions)
  useEffect(() => {
    if (recordGroup?.people) {
      setLocalPeople(recordGroup.people);
    }
  }, [recordGroup?.people]);

  // Detect newly added people and mark them as reviewed
  useEffect(() => {

    if (recordGroup?.people) {
      const currentIds = new Set(recordGroup.people.map(p => p.id));
      const previousIds = previousPeopleIdsRef.current;


      // Skip detection on initial mount (when previousIds is empty)
      if (previousIds.size === 0) {
        previousPeopleIdsRef.current = currentIds;
        return;
      }

      // Find IDs in current but not in previous (newly added)
      const newPersonIds = recordGroup.people
        .filter(p => !previousIds.has(p.id))
        .map(p => p.id);


      // Automatically mark newly added people as reviewed
      if (newPersonIds.length > 0) {
        setReviewedPeople(prev => {
          const updated = new Set(prev);
          newPersonIds.forEach(id => updated.add(id));
          return updated;
        });
      }

      // Update ref with current IDs for next comparison
      previousPeopleIdsRef.current = currentIds;
    }
  }, [recordGroup?.people]);

  // Sort people: primary person first, then others
  const sortedPeople = [...localPeople].sort((a, b) => {
    if (a.isPrimary && !b.isPrimary) return -1;
    if (!a.isPrimary && b.isPrimary) return 1;
    return 0;
  });

  const allReviewed = reviewedPeople.size === sortedPeople.length;

  // Debug: Log render state
  useEffect(() => {
  });

  // Scroll to active card when currentPersonIndex changes (skip first card so users see alert)
  useEffect(() => {
    // Don't auto-scroll for the first card (index 0) - let users see the alert banner
    if (currentPersonIndex === 0) {
      return;
    }

    const activePersonId = sortedPeople[currentPersonIndex]?.id;
    if (activePersonId && cardRefs.current[activePersonId]) {
      cardRefs.current[activePersonId].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [currentPersonIndex, sortedPeople]);

  const handleCorrect = (personId) => {
    setReviewedPeople(prev => new Set([...prev, personId]));

    // Move to next person if not at the end
    if (currentPersonIndex < sortedPeople.length - 1) {
      setCurrentPersonIndex(prev => prev + 1);
    }
    // When last person is reviewed, Review card becomes active and shows buttons
    // User must manually click "Save and Close" to exit
  };

  const handleEdit = (person) => {
    if (onEditPerson) {
      // Merge record group context with person data
      const personWithContext = {
        ...person,
        recordDate: recordGroup?.date,
        recordPlace: recordGroup?.place,
        recordType: recordGroup?.recordType
      };
      onEditPerson(personWithContext);
    }
  };

  const handleDelete = (personId) => {
    // Notify parent to update selectedRecordGroup
    if (onDeletePerson) {
      onDeletePerson(personId);
    }

    // Local state updates will be synced from parent via useEffect
    // But update immediately for responsive UI
    setLocalPeople(prev => prev.filter(p => p.id !== personId));
    setReviewedPeople(prev => {
      const newSet = new Set(prev);
      newSet.delete(personId);
      return newSet;
    });

    // Adjust current index if needed
    if (currentPersonIndex >= sortedPeople.length - 1 && currentPersonIndex > 0) {
      setCurrentPersonIndex(prev => prev - 1);
    }
  };

  const handleAddPerson = () => {
    if (onEditPerson) {
      // Pass {isNew: true} to indicate adding a new person
      onEditPerson({ isNew: true });
    }
  };

  const handleFinalSaveAndClose = () => {
    // Save all people and close
    if (onComplete) {
      onComplete(localPeople);
    }
  };

  const formatRelationshipLabel = (relationship) => {
    if (!relationship) return 'Unknown';
    // Convert from formats like "HEAD_OF_HOUSEHOLD" or "head_of_household" to "Head of Household"
    return relationship
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <InfoSheet
      title="Manage Names"
      subtitle="Review AI Extracted Details"
      panel={true}
      onBack={onBack}
      close={onClose}
      size="lg"
      elevated={false}
    >
      {/* Yellow top stroke for AI branding */}
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

      {/* Alert - different message for last card */}
      <div style={{ marginBottom: spacing.xs }}>
        {currentPersonIndex === sortedPeople.length - 1 ? (
          <Paragraph size="md">
            If everything looks correct, you can save and close.
          </Paragraph>
        ) : (
          <Alert status="warning" outline>
            AI can make mistakes. Please review the extracted information for accuracy before continuing.
          </Alert>
        )}
      </div>

      {/* Person Review Cards */}
      {sortedPeople.map((person, index) => {
        const isReviewed = reviewedPeople.has(person.id);
        const isActive = index === currentPersonIndex && !isReviewed;

        // Build vital info lines
        const vitalInfoLines = [];
        if (person.givenName) {
          vitalInfoLines.push({ label: 'Given Name', value: person.givenName });
        }
        if (person.surname) {
          vitalInfoLines.push({ label: 'Surname', value: person.surname });
        }
        if (person.sex) {
          vitalInfoLines.push({ label: 'Sex', value: person.sex });
        }
        if (person.age) {
          vitalInfoLines.push({ label: 'Age', value: person.age.toString() });
        }
        if (person.race) {
          vitalInfoLines.push({ label: 'Race', value: person.race });
        }

        // Build relationship lines from relationships array
        const relationshipLines = [];
        if (person.relationships && person.relationships.length > 0) {
          person.relationships.forEach(rel => {
            if (rel.relatedPersonName) {
              // Invert the role for display: if person's role is PARENT, show related person as CHILD
              const inverseRole = getInverseRelationshipRole(rel.role);
              relationshipLines.push({
                label: formatRelationshipLabel(inverseRole),
                value: rel.relatedPersonName
              });
            }
          });
        }

        // Build event blocks (birth, residence, etc.)
        const eventBlocks = [];

        // Birth event
        if (person.birthDate || person.birthPlace) {
          eventBlocks.push({
            type: 'Birth',
            lines: [
              ...(person.birthDate ? [{ label: 'Date', value: person.birthDate }] : []),
              ...(person.birthPlace ? [{ label: 'Place', value: person.birthPlace }] : [])
            ]
          });
        }

        // Census/Residence event (from record-level data)
        if (recordGroup?.date || recordGroup?.place) {
          const eventLines = [];
          if (recordGroup.date) eventLines.push({ label: 'Date', value: recordGroup.date });
          if (recordGroup.place) eventLines.push({ label: 'Place', value: recordGroup.place });

          if (eventLines.length > 0) {
            eventBlocks.push({
              type: recordGroup.recordType || 'Census',
              lines: eventLines
            });
          }
        }

        const backgroundColor = isActive ? colors.yellow.yellow02 : colors.gray.gray00;

        return (
          <div
            key={person.id}
            ref={el => cardRefs.current[person.id] = el}
            style={{ marginBottom: spacing.xs, width: '100%' }}
          >
            <Card
              variant="none"
              size="xxs"
              style={{ width: '100%' }}
            >
              <div style={{
                backgroundColor,
                border: isActive ? 'none' : `1px solid ${colors.gray.gray20}`,
                padding: spacing.xxs,
                borderRadius: spacing.nano,
                ...(isActive && { boxShadow: elevation[2] })
              }}>
                {/* Person Name with Overline and Action Buttons */}
                <div style={{
                  marginBottom: spacing.xs,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <div style={{ flex: 1 }}>
                    <HeadingBlock
                      overline={person.isPrimary ? 'Primary' : (formatRelationshipLabel(person.relationship) || 'Person')}
                      heading={`${person.givenName || ''} ${person.surname || ''}`.trim() || 'Unknown Name'}
                      level="h5"
                    />
                  </div>
                  {/* Trash icon for active cards */}
                  {isActive && (
                    <IconButton
                      icon={ContentDelete}
                      onClick={() => handleDelete(person.id)}
                      label="Delete person"
                      emphasis="low"
                      variant="gray"
                      size="md"
                    />
                  )}
                  {/* Edit button for reviewed cards */}
                  {isReviewed && (
                    <Button
                      onClick={() => handleEdit(person)}
                      emphasis="low"
                      variant="blue"
                      size="md"
                    >
                      Edit
                    </Button>
                  )}
                </div>

                {/* Vital Information */}
                {vitalInfoLines.length > 0 && (
                  <div style={{ marginBottom: spacing.xs }}>
                    <div style={{ marginBottom: '2px' }}>
                      <Header level="h6">Vital Information</Header>
                    </div>
                    {vitalInfoLines.map((line, idx) => (
                      <div key={idx} style={{ marginBottom: '4px' }}>
                        <Paragraph size="sm" style={{ color: colors.gray.gray100 }}>
                          <span style={{ color: colors.gray.gray60 }}>{line.label}: </span>
                          {line.value}
                        </Paragraph>
                      </div>
                    ))}
                  </div>
                )}

                {/* Relationships */}
                {relationshipLines.length > 0 && (
                  <div style={{ marginBottom: spacing.xs }}>
                    <div style={{ marginBottom: '2px' }}>
                      <Header level="h6">Relationships</Header>
                    </div>
                    {relationshipLines.map((line, idx) => (
                      <div key={idx} style={{ marginBottom: '4px' }}>
                        <Paragraph size="sm" style={{ color: colors.gray.gray100 }}>
                          <span style={{ color: colors.gray.gray60 }}>{line.label}: </span>
                          {line.value}
                        </Paragraph>
                      </div>
                    ))}
                  </div>
                )}

                {/* Events */}
                {eventBlocks.map((event, eventIndex) => (
                  <div key={eventIndex} style={{ marginBottom: spacing.xs }}>
                    <div style={{ marginBottom: '2px' }}>
                      <Header level="h6">{event.type}</Header>
                    </div>
                    {event.lines.map((line, idx) => (
                      <div key={idx} style={{ marginBottom: '4px' }}>
                        <Paragraph size="sm" style={{ color: colors.gray.gray100 }}>
                          <span style={{ color: colors.gray.gray60 }}>{line.label}: </span>
                          {line.value}
                        </Paragraph>
                      </div>
                    ))}
                  </div>
                ))}

                {/* Action Buttons - Only show for active card */}
                {isActive && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: spacing.xxs,
                    marginTop: spacing.xs
                  }}>
                    <BillboardButton
                      variant="yellow"
                      emphasis="medium"
                      onClick={() => handleEdit(person)}
                      fullWidth
                    >
                      Edit
                    </BillboardButton>
                    <BillboardButton
                      variant="yellow"
                      emphasis="high"
                      onClick={() => handleCorrect(person.id)}
                      fullWidth
                    >
                      Looks Good
                    </BillboardButton>
                  </div>
                )}
              </div>
            </Card>
          </div>
        );
      })}

      {/* Final Review Card - Always visible */}
      <div style={{ marginBottom: spacing.xs, width: '100%' }}>
        <Card
          variant="none"
          size="xxs"
          style={{ width: '100%' }}
        >
          <div style={{
            backgroundColor: allReviewed ? colors.yellow.yellow02 : colors.gray.gray00,
            border: allReviewed ? 'none' : `1px solid ${colors.gray.gray20}`,
            padding: spacing.xxs,
            borderRadius: spacing.nano,
            ...(allReviewed && { boxShadow: elevation[2] })
          }}>
            {/* Review Heading */}
            <div style={{ marginBottom: spacing.xs }}>
              <Header level="h6">Review</Header>
            </div>

            {/* Review Message */}
            <div style={{ marginBottom: spacing.xs }}>
              <Paragraph size="sm">
                If everything looks good you can save and close. If anyone is missing from this group, you can add them now.
              </Paragraph>
            </div>

            {/* Action Buttons - Only show when all people have been reviewed */}
            {allReviewed && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: spacing.xxs,
                marginTop: spacing.xs
              }}>
                <BillboardButton
                  variant="yellow"
                  emphasis="medium"
                  onClick={handleAddPerson}
                  fullWidth
                >
                  Add Person
                </BillboardButton>
                <BillboardButton
                  variant="yellow"
                  emphasis="high"
                  onClick={handleFinalSaveAndClose}
                  fullWidth
                >
                  Save and Close
                </BillboardButton>
              </div>
            )}
          </div>
        </Card>
      </div>
    </InfoSheet>
  );
};

AIReviewInfoSheet.propTypes = {
  recordGroup: PropTypes.shape({
    id: PropTypes.string,
    people: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
  onBack: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onComplete: PropTypes.func,
  onEditPerson: PropTypes.func,
  onDeletePerson: PropTypes.func,
  initialPersonIndex: PropTypes.number,
  onCurrentIndexChange: PropTypes.func,
  initialReviewedPeople: PropTypes.instanceOf(Set),
  onReviewedPeopleChange: PropTypes.func
};
