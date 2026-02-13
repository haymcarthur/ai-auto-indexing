# Open Questions & Issues

## Pending Issues

### 1. Validation False Negative Issue - FULLY RESOLVED ✅
**Date Identified**: 2026-02-12 (Session 10 Continuation)
**Date Resolved**: 2026-02-12 (Session 10 Continuation - Phase 2)
**Date Tested**: 2026-02-12 (Session 10 Continuation - Phase 2)
**Location**: TestSessionContext.jsx, StartingScreen.jsx, taskValidation.js
**Issue**: User completed tasks successfully (added all people) but analytics showed actual_success = false for both tasks
**Root Causes**:
1. Census data was reset between Task 1 and Task 2. Validation ran once at end using only Task 2's final state, applying same result to both tasks.
2. Validation was too strict - required spouse name to be "Reamy Ockerman" but data has "Heamy" with no surname
3. Validation required all family members to have surname "Ockerman" but only John has surname in census data
**Solution**:
1. Capture Task 1 census data snapshot before reset, validate each task separately against its own census data
2. Accept both "Heamy" and "Reamy" as valid spouse names
3. Only require surname "Ockerman" for John, make surname optional for other family members
**Status**: ✅ Fixed and tested - validation now correctly identifies successful task completions

### 2. Participant Numbering Inconsistency - RESOLVED ✅
**Date Identified**: 2026-02-12 (Session 10 Continuation - Phase 3)
**Date Resolved**: 2026-02-12 (Session 10 Continuation - Phase 3)
**Location**: user-test-hub/src/pages/TestDetail.jsx
**Issue**: Same participant showed different numbers in different parts of analytics dashboard (e.g., "Participant 1" in one place, "Participant 10" in another)
**Root Cause**: Different sections used `idx + 1` on different arrays with different orderings:
- Participants & Observations card: sorted by completion time descending (newest first)
- Task breakdowns: filtered task completions
- Overall feedback: feedback array order
- Video modal: findIndex on unsorted array
**Solution**: Created participantNumberMap based on session creation order (oldest = Participant 1), used consistently across all sections
**Files Modified**: user-test-hub/src/pages/TestDetail.jsx
**Status**: ✅ Fixed - all analytics sections now show consistent participant numbers

### 3. Console Logging Cleanup
**Location**: AddNameInfoSheet.jsx, SelectNameInfoSheet.jsx
**Issue**: Debug console.log statements still present from development
**Action Needed**: Remove or conditionally disable for production

---

### Historical (Resolved)

### R29. User Test Hub Integration - Test ID Mismatch
**Resolved**: 2026-02-12 (Session 9)
**Issue**: Test results not appearing in user-test-hub dashboard after completing test
**Root Cause**: ai-auto-index was saving results with test_id='index-creation' while user-test-hub was querying for test_id='ai-auto-index'
**Solution**: Updated test_id in createTestSession() from 'index-creation' to 'ai-auto-index'; updated recording folder path to match
**Files**: ai-auto-index/src/lib/supabase.js (lines 27, 187)

### R28. Task B Add Person Not Returning to Review List
**Resolved**: 2026-02-12 (Session 8 Continuation)
**Issue**: After adding Christopher in Task B and clicking "Save and Continue", stayed on Christopher's card with cycling Household Details instead of returning to AIReviewInfoSheet
**Root Cause**: "Save and Continue" button called onSaveAndContinue which tried to load next person from non-existent queue
**Solution**: Task B adding new person now shows "Save and Continue" button but calls onSaveAndClose to return to review list
**Files**: ReviewCard.jsx (lines 141-153)

### R27. Task B Edit Person Cycling Instead of Returning
**Resolved**: 2026-02-12 (Session 8 Continuation)
**Issue**: After editing person in Task B AIReviewInfoSheet and clicking "Save and Continue", stayed on form with cycling cards instead of returning to review list
**Root Cause**: Review card showed "Save and Continue" which called onSaveAndContinue (queue mode) instead of onSaveAndClose (return to parent)
**Solution**: Added isEditingExistingPerson prop to detect edit mode; Task B editing now shows "Save and Close" button
**Files**: ReviewCard.jsx (lines 128-140), AddNameInfoSheet.jsx (line 2237)

### R26. Task A Nested Add Person Not Returning to Names Panel
**Resolved**: 2026-02-12 (Session 7 Continuation)
**Issue**: After adding person via "Add Person" button (manual add mode with empty queue) and clicking "Save and Close", user returned to outer AddNameInfoSheet instead of Names panel, requiring manual tab clicks to navigate
**Root Cause**: handleNestedPersonSave always added person to remainingPeople queue regardless of context - didn't distinguish between manual add (empty queue) vs mid-queue add
**Solution**: Added mode detection - if remainingPeople is empty (manual add), call onSaveAndReturn() to close outer sheet and return to Names list; if queue has items, add to queue for review
**Files**: AddNameInfoSheet.jsx (lines 1808-1833)

### R25. Task A Name/Age Changes Not Persisting to Next Person
**Resolved**: 2026-02-12 (Session 7)
**Issue**: When editing person name or age in Task A flow, changes didn't appear on subsequent people's Household Details cards (e.g., "Heamy" → "Reamy" change not visible on Joseph's card)
**Root Cause**: handleSaveAndContinue only saved to local savedPeople array, not to censusData that next person's form reads from
**Solution**: Added code to update current person in censusData with all edited fields before loading next person
**Files**: AddNameInfoSheet.jsx (lines 1362-1409)

### R24. Task A Nested Add Person Queue Timing Issue
**Resolved**: 2026-02-12 (Session 7)
**Issue**: After adding Christopher via "Add Person" and saving, panel closed instead of showing "Save and Continue" button for Christopher
**Root Cause**: handleNestedPersonSave called handleSaveAndContinue immediately after async setRemainingPeople, so queue was empty when checked
**Solution**: Removed automatic handleSaveAndContinue call - user now clicks "Save and Continue" button to load newly added person
**Files**: AddNameInfoSheet.jsx (lines 1803-1819)

### R23. Names List Relationship Overline Display
**Resolved**: 2026-02-12 (Session 6 Continuation)
**Issue**: Names list showed census role in overline instead of bidirectional relationship to primary person
**Solution**: Added normalizeRelationshipRole helper and updated overline logic to look up relationship from person.relationships array
**Files**: NamesInfoSheet.jsx (lines ~29-61, ~346-362)

### R22. Names Panel Closing on Save
**Resolved**: 2026-02-12 (Session 6 Continuation)
**Issue**: Clicking "Save and Close" or X button on AddNameInfoSheet closed entire Names panel instead of returning to names list
**Solution**: Updated handleSaveAndClose to prefer onSaveAndReturn/onBack over onClose, and InfoSheet close prop to use `onBack || onClose`
**Files**: AddNameInfoSheet.jsx (lines ~1066-1077, ~2050)

### R21. New Person Default Relationship Propagation
**Resolved**: 2026-02-12 (Session 6 Continuation)
**Issue**: New people added via QuickGlance showed as "Other" in review mode and didn't appear in final names list
**Root Causes**:
1. Queue mode initialization used simple charAt/slice formatting instead of normalizeRelationshipRole function
2. handleSaveAndClose incorrectly routed temp people through Task B flow due to checking only `if (onSaveAndReturn)`
**Solution**:
1. Changed queue mode to use `normalizeRelationshipRole(rawRelationship)` for proper 'OTHER' → 'No Relation' mapping
2. Enhanced handleNewPersonCreated to immediately create person in censusData with bidirectional "No Relation" relationships
3. Fixed Task A/B detection: `if (onSaveAndReturn && currentApproach === 'B')`
**Files**: AddNameInfoSheet.jsx (lines ~767, ~1676, ~1732-1798)

###
- ✅ Relationship display inversion (fixed in 2025-12-11 session)
- ✅ Primary person grey background (fixed in previous session)
- ✅ Primary person selection defaults (fixed in previous session)
- ✅ Highlights not displaying (fixed in 2026-02-10 session)
- ✅ "rest is not defined" error (fixed in 2026-02-10 session)
- ✅ Duplicate React keys warning (fixed in 2026-02-10 session)
- ✅ **Highlight positioning accuracy** (fixed in 2026-02-10 session) - Adopted transform-based approach with objectFit: contain calculation, achieving pixel-perfect positioning
- ✅ **Task A Record Group/Events cards not populating** (fixed in 2026-02-10 session) - Fixed data structure in handleSelectRecord and handleSaveAndContinue to use nested format matching card expectations; Added birth/death events to additionalEvents array

## Potential Future Enhancements

### 1. Relationship Editing
**Question**: How should users edit/add/remove relationships between people?

**Considerations**:
- UI for selecting relationship type
- Ensuring bidirectional updates
- Validation (prevent impossible relationships)
- Impact on primary person logic

### 2. Relationship Graph Utilization
**Question**: Should we use the record-level `relationshipGraph` array for anything?

**Current State**:
- `relationshipGraph` exists in data but isn't used in UI
- Currently using person-level `relationships` arrays exclusively

**Potential Uses**:
- Relationship diagram visualization
- Validation of relationship consistency
- Bulk relationship operations

### 3. Multiple Primary People Scenarios
**Question**: Should any household be allowed to have no primary person?

**Current Behavior**:
- Exactly one person per record must be primary
- Toggling off requires assigning new primary

**Alternative**: Allow "no primary" state for some records?

### 4. Relationship Type Coverage
**Question**: Are all FamilySearch relationship types mapped correctly?

**Current Mappings**:
- PARENT_CHILD
- SIBLING
- COUPLE
- GRAND_PARENT
- PARENT_CHILD_IN_LAW
- SIBLING_IN_LAW
- AUNT_OR_UNCLE

**Unknown**: Are there other relationship types in source data that need mapping?

### 5. Delete Functionality
**Question**: How should person deletion work with relationships?

**Current State**: Delete is stubbed out (console.log only) in ViewNameInfoSheet.jsx:59-63

**Considerations**:
- Remove person from all other people's relationship arrays
- Update primary person if deleting current primary
- Update record-level relationshipGraph

## Technical Debt

### 1. Fallback Relationship Logic
**Location**: ViewNameInfoSheet.jsx:773-850

**Issue**: Complex fallback logic exists for old relationship format

**Question**: Can this be removed after full migration to new relationships array?

### 2. Group Name Logic
**Location**: censusData.js:155-157

**Issue**: Uses `p.relationship === 'Primary'` string comparison instead of `p.isPrimary` boolean

**Fix Needed**: Change to:
```javascript
const primary = people.find(p => p.isPrimary);
```

## Data Quality Questions

### 1. Missing Relationship Data
**Observation**: Some people have empty `relationships` arrays

**Examples**:
- John Ockerman (no age) - single person record
- Some single-person households

**Question**: Is this expected or data processing issue?

### 2. Relationship Consistency
**Question**: Should we validate relationship consistency?

**Examples to Check**:
- If A is parent of B, is B child of A?
- If A is sibling of B, is B sibling of A?
- Do all COUPLE relationships have matching SPOUSE roles?

## Performance Considerations

### 1. Relationship Lookups
**Current Approach**: Linear search through relationships array

**Question**: For larger datasets, would indexing help?

### 2. Data File Size
**Current**: ~1988 lines of JSON for 22 people

**Question**: At what scale would we need pagination or lazy loading?

---

## Resolved This Session ✅

### R14. Task B Active Card Position Lost After Edit
**Resolved**: 2026-02-11 (Session 5 Continuation)
**Issue**: When editing a person from AI Review panel, returning from edit made first person active instead of the edited person
**Root Cause**: AIReviewInfoSheet state (currentPersonIndex, reviewedPeople) lost on unmount when switching to edit mode
**Solution**: Implemented state preservation pattern - lifted state to parent NamesInfoSheet, passed via initialPersonIndex/onCurrentIndexChange and initialReviewedPeople/onReviewedPeopleChange props
**Files**: NamesInfoSheet.jsx (state management), AIReviewInfoSheet.jsx (props and sync)

### R15. Task B Add Person Opens in Review Mode
**Resolved**: 2026-02-11 (Session 5 Continuation)
**Issue**: "Add Person" button opened AddNameInfoSheet with all cards in review mode instead of add/pending mode
**Root Cause**: useEffect automatically activated review mode for any preselectedPerson, didn't distinguish add vs edit
**Solution**: Added early return when preselectedPerson.isNew flag is true, preventing review mode activation for new people
**Files**: AddNameInfoSheet.jsx (useEffect with isNew check)

### R16. Task B reviewedPeople State Lost After Edit
**Resolved**: 2026-02-11 (Session 5 Continuation)
**Issue**: Review card didn't activate after editing person because reviewedPeople state was lost
**Root Cause**: Same unmount issue as currentPersonIndex - state not preserved across edit flow
**Solution**: Added reviewedPeopleInReview state to NamesInfoSheet with Set data structure, synced via props
**Files**: NamesInfoSheet.jsx, AIReviewInfoSheet.jsx

### R17. Task B New People Not Appearing in List
**Resolved**: 2026-02-11 (Session 5 Continuation)
**Issue**: After adding a new person, they didn't appear in the AIReviewInfoSheet review list
**Root Cause**: onSaveAndReturn callback only updated existing people, didn't handle adding new people to array
**Solution**: Added conditional logic to check if person exists by ID - if not, append to people array
**Files**: NamesInfoSheet.jsx (onSaveAndReturn callback)

### R18. Task B New People Not Auto-Reviewed and Missing Edit Button
**Resolved**: 2026-02-11 (Session 5 Continuation)
**Issue**: Newly added people appeared in list but without edit button and Review card didn't activate
**Root Cause**: New people not automatically marked as reviewed (user already filled out their info in add form)
**Solution**: Auto-add new person's ID to reviewedPeopleInReview Set and set as currentPersonIndex
**Files**: NamesInfoSheet.jsx (onSaveAndReturn callback)

### R19. Task B New People Missing Relationships
**Resolved**: 2026-02-11 (Session 5 Continuation)
**Issue**: Newly added people's relationship cards showed no relationships even though user set them in Record Group card
**Root Cause**: Record Group card uses members array format, but person cards display relationships array format - data not converted
**Solution**: Convert Record Group members to relationships format when building person object: map `{ name, relationship, id }` to `{ relatedPersonName, role, relatedPersonId }`
**Files**: AddNameInfoSheet.jsx (handleSaveAndClose)

---

### R13. Task B NamesInfoSheet Auto-Open After Save
**Resolved**: 2026-02-11
**Issue**: After clicking "Save and Close" on Review card, AIReviewInfoSheet closed but NamesInfoSheet didn't automatically open
**Root Cause**: Architectural mismatch - Task B had AIReviewInfoSheet as separate top-level component, causing NamesInfoSheet to unmount/remount. Task A correctly renders child panels INSIDE NamesInfoSheet.
**Solution**: Refactored Task B to follow Task A's parent-child InfoSheet pattern:
- Moved AIReviewInfoSheet rendering inside NamesInfoSheet as child panel
- Moved Task B AddNameInfoSheet rendering inside NamesInfoSheet
- NamesInfoSheet now stays continuously mounted during entire Task B flow
- Removed separate rendering from StartingScreen
- Eliminated showAIReviewSheet state and ignoreTabButtonsRef workarounds
**Files**: NamesInfoSheet.jsx (added AIReviewInfoSheet child panel), StartingScreen.jsx (removed separate AIReviewInfoSheet/AddNameInfoSheet rendering)

### R8. Task B Review Card Styling and Activation
**Resolved**: 2026-02-11
**Issue**: Review card buttons showing immediately, wrong background color
**Solution**:
- Added conditional styling: yellow background + elevation when allReviewed
- Buttons conditionally render only when allReviewed is true
- Fixed paragraph size from "md" to "sm"
**Files**: AIReviewInfoSheet.jsx (lines 379-383, 392, 398-422)

### R9. Task B Edit Creates Duplicate
**Resolved**: 2026-02-11
**Issue**: Editing person created duplicate with new ID instead of updating
**Solution**:
- Preserved originalPersonId in handleSaveCard when saving essentialInfo
- Merged edited fields with original person data to preserve relationships/events
**Files**: AddNameInfoSheet.jsx (lines 340-361, 498-518, 577-603)

### R20. Task A Save and Continue Bug - Adding Person to Record Group
**Resolved**: 2026-02-12
**Issue**: When editing Record Group card to add a person (e.g., Christopher), then clicking "Save and Continue", the added person didn't appear in subsequent people's Record Group cards. Error: "Could not find person in census data"
**Root Causes**:
1. New people only existed in the Record Group members array of the person who added them, not in censusData
2. When searching for new people, only checked current person's Record Group, not previous people's saved data
**Solution**:
1. Immediately add new people to censusData with temp IDs and initial relationships when saving person data
2. Search savedPeople array as fallback when new person not found in current person's Record Group
3. Set up inverse relationships (e.g., added as "Child" → relationship to adder is "Parent")
**Files**: AddNameInfoSheet.jsx (handleSaveAndContinue function)

### R10. Task B New People Not Auto-Reviewed
**Resolved**: 2026-02-11
**Issue**: Newly added people not automatically marked as reviewed
**Solution**: Skip detection on initial mount when previousIds is empty
**Files**: AIReviewInfoSheet.jsx (lines 58-63)

### R11. Task B Save and Close Crash
**Resolved**: 2026-02-11
**Issue**: "prev is not iterable" error when clicking Save and Close
**Solution**: Work with prev.records array instead of spreading prev object
**Files**: StartingScreen.jsx (lines 335-370)

### R12. Task B People Not Visible in Names List
**Resolved**: 2026-02-11
**Issue**: Saved people not appearing in NamesInfoSheet
**Solution**: Mark all saved people with isVisible: true flag
**Files**: StartingScreen.jsx (lines 338-342)
