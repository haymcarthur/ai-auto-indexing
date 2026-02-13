import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { InfoSheet } from "../../ux-zion-library/src/components/InfoSheet";
import { Button } from "../../ux-zion-library/src/components/Button";
import { Divider } from "../../ux-zion-library/src/components/Divider";
import { Paragraph } from "../../ux-zion-library/src/components/Paragraph";
import { Heading } from "../../ux-zion-library/src/components/Heading";
import { TextField } from "../../ux-zion-library/src/components/TextField";
import { MenuOverlay, useMenuOverlay } from "../../ux-zion-library/src/components/MenuOverlay";
import { ListItem } from "../../ux-zion-library/src/components/ListItem";
import {
  ContentAttached,
  DocumentRecordPerson,
  ContentDetach,
  MenuFilter,
  ArrowCaret,
  ContentCompose,
  HelpAi
} from "../../ux-zion-library/src/icons";
import { spacing } from "../../ux-zion-library/src/tokens/spacing";
import { transparentColors, buttonColors, colors } from "../../ux-zion-library/src/tokens/colors";
import { bold } from "../../ux-zion-library/src/tokens/typography";
import { getAllRecordGroups, filterRecordGroups } from '../utils/censusData';
import { ManageNamesInfoSheet } from './ManageNamesInfoSheet';
import { ViewNameInfoSheet } from './ViewNameInfoSheet';
import { AddNameInfoSheet } from './AddNameInfoSheet';
import { AIReviewInfoSheet } from './AIReviewInfoSheet';

/**
 * Helper function to normalize relationship role from uppercase to display format
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
 * Helper function to get inverse relationship role (for bidirectional updates)
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

  return roleMap[role.toUpperCase()] || role;
};

/**
 * Helper function to get relationship type from role
 */
const getRelationshipType = (role) => {
  const upperRole = role.toUpperCase();

  if (upperRole === 'SPOUSE') return 'COUPLE';
  if (upperRole === 'PARENT' || upperRole === 'CHILD') return 'PARENT_CHILD';
  if (upperRole === 'SIBLING') return 'SIBLING';
  if (upperRole === 'GRANDPARENT' || upperRole === 'GRANDCHILD') return 'PARENT_CHILD';
  if (upperRole === 'AUNT_OR_UNCLE' || upperRole === 'NIECE_OR_NEPHEW') return 'OTHER';
  if (upperRole === 'COUSIN') return 'OTHER';
  if (upperRole === 'STEPPARENT' || upperRole === 'STEPCHILD') return 'PARENT_CHILD';
  if (upperRole === 'STEPSIBLING') return 'SIBLING';
  if (upperRole === 'PARENT_IN_LAW' || upperRole === 'CHILD_IN_LAW') return 'OTHER';
  if (upperRole === 'SIBLING_IN_LAW') return 'OTHER';

  return 'OTHER';
};

export const NamesInfoSheet = ({
  censusData,
  onUpdateCensusData,
  onClose,
  onTriggerAISelection,
  preselectedPerson,
  onClearPreselectedPerson,
  currentApproach,
  // Task B AI Review props
  preselectedRecordGroup,
  onClearPreselectedRecordGroup,
  onAIReviewComplete
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showManageNames, setShowManageNames] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showAddName, setShowAddNameInternal] = useState(false);

  // Task B: Track editing person from AI Review
  const [editingPersonFromReview, setEditingPersonFromReview] = useState(null);
  // Task B: Track internal record group state (synced with prop)
  const [selectedRecordGroup, setSelectedRecordGroup] = useState(null);
  // Task B: Preserve currentPersonIndex when editing
  const [currentPersonIndexInReview, setCurrentPersonIndexInReview] = useState(0);
  // Task B: Preserve reviewedPeople Set when editing
  const [reviewedPeopleInReview, setReviewedPeopleInReview] = useState(new Set());

  // Wrapper to log all setShowAddName calls
  const setShowAddName = (value) => {
    setShowAddNameInternal(value);
  };

  const addNameMenu = useMenuOverlay();
  const [menuWidth, setMenuWidth] = useState('auto');

  // Calculate menu width to match button
  useEffect(() => {
    if (addNameMenu.anchorRef?.current && addNameMenu.isOpen) {
      const width = addNameMenu.anchorRef.current.offsetWidth;
      setMenuWidth(`${width}px`);
    }
  }, [addNameMenu.isOpen, addNameMenu.anchorRef]);

  // Automatically open AddNameInfoSheet when preselectedPerson is set (Task A/B add manually)
  useEffect(() => {
    if (preselectedPerson) {
      setShowAddName(true);
    } else {
      setShowAddName(false);
    }
  }, [preselectedPerson]);

  // Task B: Sync selectedRecordGroup with preselectedRecordGroup prop
  useEffect(() => {
    if (preselectedRecordGroup) {
      setSelectedRecordGroup(preselectedRecordGroup);
    } else {
      setSelectedRecordGroup(null);
      setEditingPersonFromReview(null); // Clear editing state when record group cleared
      setReviewedPeopleInReview(new Set()); // Clear reviewed people when record group cleared
    }
  }, [preselectedRecordGroup]);

  const allRecordGroups = getAllRecordGroups(censusData);
  // Filter out groups with no visible people
  const visibleGroups = allRecordGroups.filter(group =>
    group.people.some(person => person.isVisible === true)
  );
  const filteredGroups = filterRecordGroups(visibleGroups, searchTerm);

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

  // Task B: Editing person from AI Review (highest priority in Task B flow)
  if (editingPersonFromReview && selectedRecordGroup) {
    return (
      <AddNameInfoSheet
        censusData={censusData}
        onUpdateCensusData={onUpdateCensusData}
        onBack={() => {
          setEditingPersonFromReview(null);
        }}
        onClose={onClose}
        onSaveAndReturn={(updatedPerson) => {
          // Add or update the person in selectedRecordGroup
          if (updatedPerson) {
            setSelectedRecordGroup(prev => {
              const personExists = prev.people.some(p => p.id === updatedPerson.id);

              if (personExists) {
                // UPDATE EXISTING PERSON
                // Find the original person to detect changes
                const originalPerson = prev.people.find(p => p.id === updatedPerson.id);

                // Check if name changed
                const nameChanged = originalPerson &&
                  (originalPerson.givenName !== updatedPerson.givenName ||
                   originalPerson.surname !== updatedPerson.surname);

                const newFullName = `${updatedPerson.givenName} ${updatedPerson.surname}`.trim();

                // Update all people in the record group
                const updatedPeople = prev.people.map(p => {
                  if (p.id === updatedPerson.id) {
                    // This is the person being edited - use the updated version
                    return { ...p, ...updatedPerson };
                  } else {
                    // This is a related person - may need to update their relationships array
                    let needsUpdate = false;
                    let updatedRelationships = p.relationships || [];

                    // 1. Update name references if name changed
                    if (nameChanged && updatedRelationships.length > 0) {
                      updatedRelationships = updatedRelationships.map(rel => {
                        if (rel.relatedPersonId === updatedPerson.id) {
                          needsUpdate = true;
                          return {
                            ...rel,
                            relatedPersonName: newFullName
                          };
                        }
                        return rel;
                      });
                    }

                    // 2. Apply bidirectional relationship updates
                    // For each relationship the edited person has, ensure inverse exists on related person
                    if (updatedPerson.relationships) {
                      updatedPerson.relationships.forEach(rel => {
                        if (rel.relatedPersonId === p.id) {
                          // The edited person has a relationship to this person
                          // Ensure this person has the inverse relationship back

                          const inverseRole = getInverseRelationshipRole(rel.role);
                          const existingRelIndex = updatedRelationships.findIndex(r => r.relatedPersonId === updatedPerson.id);

                          if (existingRelIndex !== -1) {
                            // Relationship exists - update it if role changed
                            if (updatedRelationships[existingRelIndex].role !== inverseRole) {
                              needsUpdate = true;
                              updatedRelationships[existingRelIndex] = {
                                ...updatedRelationships[existingRelIndex],
                                role: inverseRole,
                                type: getRelationshipType(inverseRole),
                                relatedPersonName: newFullName
                              };
                            }
                          } else {
                            // Relationship doesn't exist - add it
                            needsUpdate = true;
                            updatedRelationships.push({
                              type: getRelationshipType(inverseRole),
                              role: inverseRole,
                              relatedPersonId: updatedPerson.id,
                              relatedPersonName: newFullName
                            });
                          }
                        }
                      });
                    }

                    // 3. Remove relationships to edited person that no longer exist
                    if (originalPerson && originalPerson.relationships) {
                      // Find relationships to this person (p) in the old data
                      const hadRelationshipBefore = originalPerson.relationships.some(
                        rel => rel.relatedPersonId === p.id
                      );

                      // Find relationships to this person (p) in the new data
                      const hasRelationshipNow = (updatedPerson.relationships || []).some(
                        rel => rel.relatedPersonId === p.id
                      );

                      // If relationship was removed, remove the inverse
                      if (hadRelationshipBefore && !hasRelationshipNow) {
                        needsUpdate = true;
                        updatedRelationships = updatedRelationships.filter(rel =>
                          rel.relatedPersonId !== updatedPerson.id
                        );
                      }
                    }

                    return needsUpdate ? { ...p, relationships: updatedRelationships } : p;
                  }
                });

                return {
                  ...prev,
                  people: updatedPeople
                };
              } else {
                // ADD NEW PERSON
                const newPeople = [...prev.people, updatedPerson];

                // Mark new person as reviewed and set as active
                setReviewedPeopleInReview(reviewedSet => {
                  const updated = new Set(reviewedSet);
                  updated.add(updatedPerson.id);
                  return updated;
                });

                // Set currentPersonIndex to the new person (last in array)
                setCurrentPersonIndexInReview(newPeople.length - 1);

                return {
                  ...prev,
                  people: newPeople
                };
              }
            });
          }
          setEditingPersonFromReview(null);
        }}
        onTriggerAISelection={onTriggerAISelection}
        preselectedPerson={editingPersonFromReview}
        preselectedRecordGroup={selectedRecordGroup}
        currentApproach={currentApproach}
      />
    );
  }

  // Task B: AI Review mode
  if (selectedRecordGroup && currentApproach === 'B') {
    return (
      <AIReviewInfoSheet
        recordGroup={selectedRecordGroup}
        initialPersonIndex={currentPersonIndexInReview}
        onCurrentIndexChange={(index) => {
          setCurrentPersonIndexInReview(index);
        }}
        initialReviewedPeople={reviewedPeopleInReview}
        onReviewedPeopleChange={(reviewedSet) => {
          setReviewedPeopleInReview(reviewedSet);
        }}
        onBack={() => {
          setSelectedRecordGroup(null);
          setCurrentPersonIndexInReview(0); // Reset when leaving
          setReviewedPeopleInReview(new Set()); // Reset reviewed people when leaving
          if (onClearPreselectedRecordGroup) {
            onClearPreselectedRecordGroup();
          }
        }}
        onClose={onClose}
        onComplete={(updatedPeople) => {
          // Callback to StartingScreen to save to censusData
          if (onAIReviewComplete) {
            onAIReviewComplete(updatedPeople, selectedRecordGroup);
          }
          // Clear local state
          setSelectedRecordGroup(null);
          setCurrentPersonIndexInReview(0); // Reset after completion
          setReviewedPeopleInReview(new Set()); // Reset reviewed people after completion
          if (onClearPreselectedRecordGroup) {
            onClearPreselectedRecordGroup();
          }
        }}
        onEditPerson={(person) => {
          setEditingPersonFromReview(person);
        }}
        onDeletePerson={(personId) => {
          // Remove person from selectedRecordGroup
          setSelectedRecordGroup(prev => ({
            ...prev,
            people: prev.people.filter(p => p.id !== personId)
          }));
        }}
      />
    );
  }

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
          setSelectedPerson(null);
        }}
      />
    );
  }

  if (showManageNames) {
    return (
      <ManageNamesInfoSheet
        censusData={censusData}
        recordGroups={visibleGroups}
        onBack={() => setShowManageNames(false)}
        onClose={onClose}
        onUpdateCensusData={onUpdateCensusData}
        onSaveAndReturn={() => setShowManageNames(false)}
      />
    );
  }

  if (showAddName) {
    return (
      <AddNameInfoSheet
        censusData={censusData}
        onUpdateCensusData={onUpdateCensusData}
        onBack={() => {
          setShowAddName(false);
          if (onClearPreselectedPerson) {
            onClearPreselectedPerson();
          }
        }}
        onClose={onClose}
        onSaveAndReturn={() => {
          setShowAddName(false);
          if (onClearPreselectedPerson) {
            onClearPreselectedPerson();
          }
        }}
        onTriggerAISelection={onTriggerAISelection}
        preselectedPerson={preselectedPerson}
        currentApproach={currentApproach}
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
      {/* Show header elements when there are visible names */}
      {visibleGroups.length > 0 && (
        <>
          <Paragraph size="sm" secondary style={{ marginBottom: spacing.xs }}>
            Select a name to view, edit, or delete. Use Manage Names to add or rearrange.
          </Paragraph>

          <div style={{ marginBottom: spacing.xs }}>
            <Button
              variant="gray"
              emphasis="medium"
              fullWidth
              onClick={() => setShowManageNames(true)}
            >
              Manage Names
            </Button>
          </div>

          <div style={{ marginBottom: spacing.xs }}>
            <TextField
              label="Filter by Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search names..."
            />
          </div>

          <Divider style={{ marginBottom: spacing.xs }} />
        </>
      )}

      {/* List of record groups and people */}
        {filteredGroups.map((group, groupIndex) => (
          <div key={group.id}>
            {group.people.filter(person => person.isVisible === true).map((person, personIndex) => {
              const { Icon, bg, color } = getIconAndColor(person.attachmentStatus);

              const isPrimary = person.isPrimary || false;

              // Determine overline text: show relationship to primary person
              let overlineText = person.relationship; // fallback to census role
              if (isPrimary) {
                overlineText = 'Primary';
              } else {
                // Find primary person in this group
                const primaryPerson = group.people.find(p => p.isPrimary === true);
                if (primaryPerson && person.relationships) {
                  // Find relationship to primary person
                  const relToPrimary = person.relationships.find(
                    rel => rel.relatedPersonId === primaryPerson.id
                  );
                  if (relToPrimary && relToPrimary.role) {
                    overlineText = normalizeRelationshipRole(relToPrimary.role);
                  }
                }
              }

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
                    backgroundColor: 'transparent'
                  }}
                  onClick={() => {
                    setSelectedPerson(person);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = transparentColors.transparentGray05;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
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
                      {overlineText}
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

      {/* Blank state when no names are visible at all */}
      {visibleGroups.length === 0 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: `${spacing.lg} 0`,
          textAlign: 'center'
        }}>
          <img
            src="/SearchingForNames.svg"
            alt="No names"
            style={{
              maxWidth: '400px',
              marginBottom: spacing.md
            }}
          />
          <Heading size="h4" style={{ marginBottom: spacing.xs }}>
            No Names
          </Heading>
          <Paragraph size="sm" secondary style={{
            marginBottom: spacing.md,
            maxWidth: '400px'
          }}>
            Add a name to capture details that improve search and update the Family Tree.
          </Paragraph>
          <Button
            ref={currentApproach === 'B' ? addNameMenu.anchorRef : undefined}
            variant="blue"
            emphasis="medium"
            onClick={currentApproach === 'B' ? addNameMenu.handleClick : () => {
              setShowAddName(true);
            }}
          >
            Add Name
          </Button>

          {/* Menu overlay for Approach B */}
          {currentApproach === 'B' && (
            <MenuOverlay
              isOpen={addNameMenu.isOpen}
              close={addNameMenu.close}
              anchorRef={addNameMenu.anchorRef}
              position="bottom"
              align="end"
            >
              <div>
                <ListItem
                  startElement={<ContentCompose />}
                  heading="Add Manually"
                  fullWidth={true}
                  onClick={() => {
                    addNameMenu.close();
                    setShowAddName(true);
                  }}
                />
                <ListItem
                  startElement={<HelpAi />}
                  heading="Use AI Extraction"
                  fullWidth={true}
                  onClick={() => {
                    addNameMenu.close();
                    if (onTriggerAISelection) {
                      onTriggerAISelection();
                    } else {
                    }
                  }}
                />
              </div>
            </MenuOverlay>
          )}
        </div>
      )}

      {/* Empty search results */}
      {filteredGroups.length === 0 && visibleGroups.length > 0 && (
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
  onClose: PropTypes.func.isRequired,
  onTriggerAISelection: PropTypes.func,
  preselectedPerson: PropTypes.object,
  onClearPreselectedPerson: PropTypes.func,
  currentApproach: PropTypes.oneOf(['A', 'B']),
  // Task B AI Review props
  preselectedRecordGroup: PropTypes.object,
  onClearPreselectedRecordGroup: PropTypes.func,
  onAIReviewComplete: PropTypes.func
};
