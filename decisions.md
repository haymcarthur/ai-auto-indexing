# Technical Decisions

## Analytics Data Flow Decisions (2026-02-12 Session 10)

### 53. Accumulated Response Submission Pattern
**Date:** 2026-02-12 (Session 10)
**Status:** Implemented ✅

**Decision**: Collect all responses (Task 1, Task 2, Final questions) in InstructionPanel and submit together at test completion instead of submitting after each task.

**Problem**: Submitting Task 1 responses early caused data flow issues and prevented collecting final comparison questions. User needed analytics for BOTH methods and final preference questions.

**Implementation**:
- Added collectedResponses state to InstructionPanel with task1, task2, and final fields
- Step 3 (Task 1 complete): Store responses, don't submit, switch to Task 2
- Step 8 (all complete): Submit all responses together with taskOrder metadata
- TestSessionContext parses all responses and makes two separate saveTaskCompletion calls

**Rationale**: User needs to answer questions about BOTH methods before giving final preference. Early submission would close the session before final questions could be asked.

**Files Modified**: InstructionPanel.jsx, StartingScreen.jsx, TestSessionContext.jsx

### 54. Dual Task Completion Saves with Method-Based task_id
**Date:** 2026-02-12 (Session 10)
**Status:** Implemented ✅ (blocked by database constraint)

**Decision**: Save two separate task_completions rows - one for each method (Prompt/Highlight) - using method name as task_id.

**Problem**: Analytics only showing one method because single task completion was saved. User needed separate statistics for Prompt method vs Highlight method.

**Implementation**:
```javascript
// Save Task 1
await saveTaskCompletion(sessionId, {
  timeSpent: Math.floor(timeSpent / 2),
  selfReportedSuccess: task1Success === 'yes',
  actualSuccess: actualSuccess,
  difficulty: task1Difficulty,
  taskId: task1Method // 'Prompt' or 'Highlight'
});

// Save Task 2
await saveTaskCompletion(sessionId, {
  timeSpent: Math.floor(timeSpent / 2),
  selfReportedSuccess: task2Success === 'yes',
  actualSuccess: actualSuccess,
  difficulty: task2Difficulty,
  taskId: task2Method // 'Prompt' or 'Highlight'
});
```

**Rationale**: Each method needs independent metrics (time, difficulty, success rate). Using method name as task_id enables dynamic statistics calculation.

**Database Issue**: task_completions.task_id has check constraint limiting values to 'A', 'B', 'C'. Code attempts to insert 'Prompt'/'Highlight' which violates constraint.

**Files Modified**: TestSessionContext.jsx, supabase.js (ai-auto-index)

### 55. Survey Responses Table for Final Questions
**Date:** 2026-02-12 (Session 10)
**Status:** Implemented ✅ (blocked by database schema)

**Decision**: Save preferred-method and overall-feedback answers to survey_responses table instead of embedding in validation data.

**Problem**: Final preference questions weren't appearing in analytics. Data was only stored in validation_data JSON, not in dedicated survey table.

**Implementation**:
```javascript
await saveSurveyResponses(sessionId, [
  {
    questionId: 'preferred-method',
    answer: preferredMethod
  },
  {
    questionId: 'overall-feedback',
    answer: overallFeedback
  }
]);
```

**Rationale**: survey_responses table is the correct location for questionnaire answers. Enables proper analytics queries and consistent data structure with highlights test.

**Database Issue**: survey_responses table doesn't have 'answer' column. Schema mismatch prevents saves.

**Files Modified**: TestSessionContext.jsx, supabase.js (ai-auto-index)

### 56. Dynamic Task ID Discovery in Analytics
**Date:** 2026-02-12 (Session 10)
**Status:** Implemented ✅

**Decision**: calculateStatistics dynamically discovers task IDs from task_completions instead of hardcoding 'A', 'B', 'C'.

**Problem**: Analytics dashboard was hardcoded for task IDs 'A'/'B'/'C'. Couldn't display ai-auto-index test which uses 'Prompt'/'Highlight'.

**Implementation**:
```javascript
// Discover unique task IDs
const uniqueTaskIds = [...new Set(taskCompletions.map(tc => tc.task_id))];

// Generate statistics for discovered IDs
const taskStats = {};
uniqueTaskIds.forEach(taskId => {
  const taskData = taskCompletions.filter(tc => tc.task_id === taskId);
  // Calculate avgTime, successRate, difficulty, etc.
  taskStats[taskId] = { /* stats */ };
});
```

**Rationale**: Makes analytics system flexible and reusable across different test designs. Eliminates need to hardcode test-specific task IDs.

**Files Modified**: user-test-hub/src/lib/supabase.js, user-test-hub/src/pages/TestDetail.jsx

### 57. Guaranteed Session Completion with Individual Error Handling
**Date:** 2026-02-12 (Session 10)
**Status:** Implemented ✅

**Decision**: Wrap each database save operation in individual try-catch blocks. Always complete session even if some saves fail.

**Problem**: Test sessions weren't completing when any database save failed. Users lost all progress if a single operation errored.

**Implementation**:
```javascript
const errors = [];

try {
  await saveTaskCompletion(sessionId, task1Data);
} catch (error) {
  errors.push(`Task 1: ${error.message}`);
}

try {
  await saveTaskCompletion(sessionId, task2Data);
} catch (error) {
  errors.push(`Task 2: ${error.message}`);
}

// Show accumulated errors
if (errors.length > 0) {
  alert('Some data may not have been saved:\n' + errors.join('\n'));
}

// ALWAYS complete session
await completeTestSession(sessionId, recordingUrl);
```

**Rationale**: Test completion is more important than perfect data. Users should see completion screen even if database has issues. Detailed error logging helps debugging.

**Files Modified**: TestSessionContext.jsx

### 58. Six-Person Validation for John Ockerman Family
**Date:** 2026-02-12 (Session 10)
**Status:** Implemented ✅

**Decision**: Validate that all 6 people in John Ockerman's household are added (John, Reamy, Isaic, Joseph, George, Christopher).

**Problem**: Validation was checking for wrong people (Gary/Ronald Fadden from old test). User needed correct success metrics.

**Implementation**: Completely rewrote validateTask to check for John Ockerman's household, finding the record where both John and Reamy exist together.

**Rationale**: Actual success should be based on task requirements - adding all members of John Ockerman's family.

**Files Modified**: taskValidation.js

### 59. Database Check Constraint Mapping for task_id and preferred_method
**Date:** 2026-02-12 (Session 10 Continuation)
**Status:** Implemented ✅

**Decision**: Map method names to database-compatible values before saving to database.

**Problem**: Both task_completions.task_id and survey_responses.preferred_method have check constraints only allowing 'A', 'B', 'C'. Code attempted to insert 'Prompt' and 'Highlight' which violated constraints.

**Implementation**:
```javascript
const mapMethodToTaskId = (method) => {
  if (method === 'Prompt') return 'A';
  if (method === 'Highlight') return 'B';
  return method;
};

// Applied to both task completions and survey responses
const task1MappedId = mapMethodToTaskId(task1Method);
const mappedPreferredMethod = mapMethodToTaskId(preferredMethod);
```

**Rationale**: Mapping at save time allows code to use meaningful method names ('Prompt'/'Highlight') internally while satisfying database constraints. Display layer uses getTaskName() to reverse the mapping for user-facing labels.

**Files Modified**: TestSessionContext.jsx

### 60. Test-Specific Task Name Display with Color Coding
**Date:** 2026-02-12 (Session 10 Continuation)
**Status:** Implemented ✅

**Decision**: Use getTaskName() function to conditionally map task IDs to display names based on test type, with color-coded visualizations.

**Problem**: Database stores 'A'/'B' for ai-auto-index test but UI needs to show "Prompt Method"/"Highlight Method". Highlights test uses same IDs but needs different names.

**Implementation**:
```javascript
const getTaskName = (taskId, testId) => {
  if (testId === 'ai-auto-index') {
    return { 'A': 'Prompt Method', 'B': 'Highlight Method' }[taskId] || taskId;
  }
  return { 'A': 'Red Method', 'B': 'Blue Method', 'C': 'Green Method' }[taskId] || taskId;
};

// Color coding for bar graphs
const barColor = taskId === 'A' ? 'bg-red-600' : taskId === 'B' ? 'bg-blue-600' : 'bg-green-600';
```

**Rationale**: Single function handles test-specific naming. Color coding provides visual distinction between methods across all analytics displays (time, difficulty, preferences).

**Files Modified**: user-test-hub/src/pages/TestDetail.jsx

### 61. Separate Task Validation with Census Data Snapshots
**Date:** 2026-02-12 (Session 10 Continuation)
**Status:** Implemented ✅

**Decision**: Capture census data snapshot when Task 1 completes, validate each task separately using its own census data state.

**Problem**: Both tasks were getting same actualSuccess value because validation ran once at end using only final census data. Census data resets between tasks, so Task 1's completion data was lost when validating at the end.

**Implementation**:
```javascript
// StartingScreen.jsx - Capture Task 1 snapshot before reset
const [task1CensusData, setTask1CensusData] = useState(null);

onTaskComplete: (data, shouldSave) => {
  if (!shouldSave) {
    setTask1CensusData(censusData); // Capture before reset
    setCensusData(censusDataJson);  // Reset for Task 2
  } else {
    handleTaskComplete(task1CensusData, censusData, validateTask, data);
  }
}

// TestSessionContext.jsx - Validate each separately
const task1ValidationResults = validateTask(task1CensusData);
const task2ValidationResults = validateTask(task2CensusData);

const task1ActualSuccess = task1ValidationResults.allPeopleAdded;
const task2ActualSuccess = task2ValidationResults.allPeopleAdded;
```

**Rationale**: Each task must be validated against its own completion state to get accurate success metrics. Task 1's success shouldn't depend on Task 2's data.

**Files Modified**: StartingScreen.jsx, TestSessionContext.jsx

### 62. Flexible Name and Surname Validation
**Date:** 2026-02-12 (Session 10 Continuation - Phase 2)
**Status:** Implemented ✅

**Decision**: Make validation flexible to handle historical name variations and incomplete surname data in census records.

**Problem**: Validation failed even when all people were added because:
1. Spouse name in census data is "Heamy" not "Reamy" (historical spelling variation)
2. Only John has surname "Ockerman" in data - all family members have empty surnames
3. Validation required exact "Reamy Ockerman" match which didn't exist in data

**Implementation**:
```javascript
// Accept alternate spellings
const requiredPeople = [
  { name: 'John', surname: 'Ockerman', key: 'johnAdded', requireSurname: true },
  { name: 'Reamy', alternateNames: ['Heamy'], key: 'reamyAdded', requireSurname: false },
  { name: 'Isaic', key: 'isaicAdded', requireSurname: false },
  // ... other family members with requireSurname: false
];

// Flexible matching logic
const nameMatches = givenNameLower.includes(name.toLowerCase()) ||
  (alternateNames && alternateNames.some(alt => givenNameLower.includes(alt.toLowerCase())));

if (requireSurname && surname) {
  return surnameLower === surname.toLowerCase();
}
```

**Rationale**: Historical census records often have spelling variations and incomplete data. Validation should reflect reality of historical record-keeping where family members' surnames weren't always recorded individually.

**Files Modified**: taskValidation.js

### 63. Consistent Participant Numbering Based on Creation Order
**Date:** 2026-02-12 (Session 10 Continuation - Phase 3)
**Status:** Implemented ✅

**Decision**: Create a participant number mapping based on session creation order and use it consistently across all analytics displays.

**Problem**: Participant numbers were inconsistent across different sections of the analytics dashboard:
1. Participants & Observations card sorted by completion time descending, so newest session = "Participant 1"
2. Task breakdowns used filtered task completions with different ordering
3. Overall feedback used feedback array order
4. Video modal used findIndex on unsorted session array
5. Same session showed as "Participant 1" in one place, "Participant 10" in another, "Participant 6" elsewhere

**Implementation**:
```javascript
// Create mapping when data loads
const participantMap = {};
if (data.sessions && data.sessions.length > 0) {
  const sortedByCreation = [...data.sessions].sort((a, b) =>
    new Date(a.created_at) - new Date(b.created_at)
  );
  sortedByCreation.forEach((session, idx) => {
    participantMap[session.id] = idx + 1;
  });
}
setParticipantNumberMap(participantMap);

// Use mapping everywhere
<span>Participant {participantNumberMap[session.id] || idx + 1}</span>
```

**Updated Locations**:
- Scatter plot participant labels (index-creation test)
- Task breakdown participant labels (all tests)
- Overall feedback participant labels (ai-auto-index test)
- Participants & Observations card
- Video modal title

**Rationale**: Participant numbers should be stable and meaningful. Using creation order ensures the first person to complete the test is always "Participant 1" regardless of where they appear in the UI. This makes it easy to track specific participants across different analytics views.

**Files Modified**: user-test-hub/src/pages/TestDetail.jsx

## User Test Hub Integration (2026-02-12 Session 9)

### 52. Use 'ai-auto-index' Test ID for Supabase Integration
**Date:** 2026-02-12 (Session 9)
**Status:** Implemented ✅

**Decision**: Update test_id from 'index-creation' to 'ai-auto-index' in ai-auto-index/src/lib/supabase.js.

**Problem**: Test results weren't appearing in user-test-hub dashboard because ai-auto-index was saving data with test_id='index-creation' while user-test-hub was querying for test_id='ai-auto-index'.

**Implementation**: Changed test_id in createTestSession() function and updated recording storage folder path from 'index-creation' to 'ai-auto-index'.

**Rationale**: Test ID must match between the prototype and the hub dashboard for results to display correctly. Using 'ai-auto-index' aligns with the test's actual purpose and differentiates it from the previous index-creation test.

**Files Modified**: ai-auto-index/src/lib/supabase.js

---

## User Testing Overlay & Task B Fixes (2026-02-12 Session 8 Continuation)

### 51. Task B Review Card Button Logic Based on Edit vs Add Mode
**Date:** 2026-02-12 (Session 8 Continuation)
**Status:** Implemented ✅

**Decision**: Use `isEditingExistingPerson` prop to determine Review card button behavior in Task B.

**Problem**:
1. When editing existing person in Task B, "Save and Continue" button called onSaveAndContinue which cycled through non-existent queue
2. When adding new person in Task B, "Save and Continue" button also called onSaveAndContinue which tried to load next person instead of returning to review list

**Implementation**:
- Pass `isEditingExistingPerson={preselectedPerson && !preselectedPerson.isNew}` to ReviewCard
- Task B editing existing person: Show "Save and Close", call onSaveAndClose
- Task B adding new person: Show "Save and Continue", call onSaveAndClose (returns to review list)
- Task A: Unchanged (show "Add Person" and "Save and Close")

**Rationale**: Task B has no queue - all actions should return to AIReviewInfoSheet. "Save and Continue" makes sense for adding new person (save and continue back to review), but must call onSaveAndClose not onSaveAndContinue.

**Files Modified**: ReviewCard.jsx, AddNameInfoSheet.jsx

### 50. Defer Task 2 Response Submission Until Final Questions Complete
**Date:** 2026-02-12 (Session 8 Continuation)
**Status:** Implemented ✅

**Decision**: Submit Task 2 responses at step 8 (after final questions) instead of step 6 (end of Task 2).

**Problem**: Calling onTaskComplete at step 6 caused parent to close session before user could answer final preference questions (steps 7-8).

**Implementation**: At step 8, submit both Task 2 responses AND final question responses in sequence.

**Rationale**: Final questions are part of overall study, not part of Task 2. All responses should be collected before any submission triggers session close.

**Files Modified**: InstructionPanel.jsx

---

## User Testing Overlay Decisions (2026-02-12 Session 8)

### 49. Scrim Z-Index Stacking for Testing Overlay
**Date:** 2026-02-12 (Session 8)
**Status:** Implemented ✅

**Decision**: Use very high z-index values (9999/10000) to ensure scrim appears above prototype but below instruction panel.

**Problem**: Initial z-index values (999/1000) didn't stack properly above the prototype's FullPageOverlay, causing scrim to only appear over the instruction panel area rather than the entire screen.

**Implementation**:
- Scrim: z-index 9999 (covers entire viewport including prototype)
- Instruction panel: z-index 10000 (appears above scrim)
- Tab: z-index 10000 (appears above scrim)

**Rationale**: The FullPageOverlay likely has a high z-index, so the scrim needs to be higher to appear on top of it. Using 9999/10000 ensures proper stacking across all elements without conflicts.

**Files Modified**: InstructionPanel.jsx

---

## Task A Flow Decisions (2026-02-12 Session 7)

### 48. Detect Manual Add Mode vs Queue Mode in Nested Add Person
**Date:** 2026-02-12 (Session 7 Continuation)
**Status:** Implemented ✅

**Decision**: In handleNestedPersonSave, check if remainingPeople is empty to distinguish between manual add mode and queue mode, with different navigation behavior for each.

**Problem**: When user clicked "Add Person" with empty queue (manual add mode) and filled out the nested form, clicking "Save and Close" returned to outer AddNameInfoSheet showing "Save and Continue" button. User expected to go directly to Names list since they just completed the full form - nothing more to review.

**Implementation**: Check `remainingPeople.length`:
- **If > 0** (queue mode): Add person to queue for review (existing behavior for mid-queue additions)
- **If === 0** (manual add mode): Person already saved to censusData by nested handleSaveAndClose, so immediately call onSaveAndReturn() to close outer sheet and return to Names list

**Rationale**: User already filled out complete form for manually added person - no additional review needed. Forcing "Save and Continue" → "Save and Close" was redundant. Manual add (empty queue) is fundamentally different UX from queue mode (person added mid-queue needs review).

**Files Modified**: AddNameInfoSheet.jsx (lines 1808-1833)

### 47. Call Both onSaveAndReturn and onBack for Final Save Navigation
**Date:** 2026-02-12 (Session 7 Continuation)
**Status:** Implemented ✅

**Decision**: In handleSaveAndClose for normal Task A flow, call BOTH onSaveAndReturn() and onBack() to ensure proper navigation.

**Problem**: After clicking "Save and Close" on final Review card, entire panel closed instead of AddNameInfoSheet closing and NamesInfoSheet staying open with names list. handleSaveAndClose was calling only onSaveAndReturn() to notify parent to save data, relying on parent's state update to unmount AddNameInfoSheet. This created a timing issue where the InfoSheet didn't properly close.

**Implementation**: After calling onSaveAndReturn() (line ~1091), also call onBack() if it exists (lines ~1094-1096). This ensures both:
1. Data is saved via onSaveAndReturn callback
2. InfoSheet explicitly closes via onBack callback

**Rationale**: While the parent setting showAddName to false should unmount AddNameInfoSheet, explicitly calling onBack ensures the InfoSheet closes immediately and returns to names list. This matches the successful pattern used in Task B where callbacks both save data AND trigger state changes for proper navigation.

**Alternative Considered**: Rely solely on parent state update - REJECTED because it created a race condition or timing issue where panel closed incorrectly.

**Files Modified**: AddNameInfoSheet.jsx (lines ~1089-1096)

### 46. Eagerly Update Current Person in censusData During Save and Continue
**Date:** 2026-02-12 (Session 7)
**Status:** Implemented ✅

**Decision**: In handleSaveAndContinue, update the current person in censusData with all edited fields BEFORE loading the next person.

**Problem**: Edits to name, age, sex, etc. were only saved to local `savedPeople` array during Save and Continue. When loading next person, it read from stale `censusData`, showing old values (e.g., "Heamy" instead of "Reamy" on subsequent cards).

**Implementation**: Added code at lines 1362-1409 to find current person by `originalPersonId` and update all fields (givenName, surname, age, sex, race, isPrimary, birth/death data) in censusData before proceeding.

**Rationale**: Each person's form initialization reads from censusData to populate member lists. Without updating censusData immediately, subsequent people see stale names/ages in their Household Details cards.

**Files Modified**: AddNameInfoSheet.jsx

### 45. Avoid Automatic Save and Continue After Nested Add Person
**Date:** 2026-02-12 (Session 7)
**Status:** Implemented ✅

**Decision**: When adding a nested person (e.g., Christopher), do NOT automatically call handleSaveAndContinue after adding to queue.

**Problem**: `setRemainingPeople` is async. Calling `handleSaveAndContinue()` immediately after `setRemainingPeople([...prev, newPerson])` meant handleSaveAndContinue saw empty queue (state not updated yet), proceeded to final save flow, and closed entire panel.

**Implementation**: Removed `handleSaveAndContinue()` call from handleNestedPersonSave (line 1820). User must click "Save and Continue" button on parent form's Review card to load the newly added person.

**Rationale**: React state updates are asynchronous. Cannot rely on state being updated immediately after setState call. Let user explicitly trigger next step via UI button, which guarantees queue is populated.

**Alternative Considered**: Use setState callback or pass person directly to handleSaveAndContinue - REJECTED because adding complexity for marginal UX gain (one extra click).

**Files Modified**: AddNameInfoSheet.jsx (lines 1803-1819)

## Census Data Decisions (2026-02-12)

### 44. Relationship Role Display Inversion
**Date:** 2026-02-12 (Session 6 Continuation)
**Status:** Implemented ✅

**Decision**: In Task B AI Review cards, display the inverse of the stored relationship role to show what the related person is TO the current person, not what the current person is to them.

**Implementation**: Added `getInverseRelationshipRole()` helper in AIReviewInfoSheet that maps roles to their inverses (PARENT→CHILD, CHILD→PARENT, etc.) before displaying.

**Rationale**: The data structure stores each person's role in the relationship (e.g., John has role "PARENT" to Joseph). But when displaying on John's card, it's more intuitive to show "Child: Joseph" (Joseph is John's child) rather than "Parent: Joseph" (which incorrectly suggests Joseph is John's parent). This makes the UI match user mental models.

**Files Modified**: AIReviewInfoSheet.jsx

### 43. UI Terminology Standardization - "Household" over "Record Group"
**Date:** 2026-02-12 (Session 6 Continuation)
**Status:** Implemented ✅

**Decision**: Replace "Record Group" terminology with "Household" throughout the application UI.

**Rationale**: "Household" is more user-friendly and genealogically accurate than "Record Group". Improves clarity for non-technical users.

**Files Modified**: RecordGroupCard.jsx, EventsCard.jsx, AddPersonQuickGlance.jsx

### 42. Child InfoSheet Navigation Pattern
**Date:** 2026-02-12 (Session 6 Continuation)
**Status:** Implemented ✅

**Decision**: Child InfoSheets (AddNameInfoSheet, ManageNamesInfoSheet, etc.) should return to parent InfoSheet (NamesInfoSheet) instead of closing entire panel when user clicks "Save and Close" or X button.

**Implementation**:
- AddNameInfoSheet.handleSaveAndClose: Prefer onSaveAndReturn/onBack over onClose
- AddNameInfoSheet InfoSheet close prop: Use `onBack || onClose`

**Rationale**: Maintains context and reduces navigation friction. Consistent with Task B pattern where ManageNamesInfoSheet is a child of NamesInfoSheet.

**Files Modified**: AddNameInfoSheet.jsx

### 41. Simplified Relationship Dropdown Options
**Date:** 2026-02-12
**Status:** Implemented ✅

**Decision**: Limit relationship dropdown in RecordGroupCard to only the 16 core bidirectional relationship types.

**Implementation**: Replaced COMMON_RELATIONSHIPS and OTHER_RELATIONSHIPS arrays with single RELATIONSHIPS array containing only: Spouse, Parent, Child, Sibling, Aunt or Uncle, Niece or Nephew, Cousin, Grandparent, Grandchild, Stepparent, Stepchild, Stepsibling, Parent-in-law, Child-in-law, Sibling-in-law, No Relation.

**Rationale**: Aligns dropdown options with supported bidirectional relationship pairs, reducing cognitive load and preventing unsupported relationship types.

**Files Modified**: RecordGroupCard.jsx

### 40. Bidirectional Relationship Updates
**Date:** 2026-02-12 (Session 6)
**Status:** Partially Complete - Core working ✅, Edge case unresolved ⚠️

**Decision**: When a user changes or adds a relationship between two people, automatically update the inverse relationship on both people bidirectionally.

**Implementation**:
1. **Helper Functions**:
   - `getInverseRelationship(relationship)` - Maps relationships to their inverses (e.g., "Child" → "Parent", "Spouse" → "Spouse")
   - `getRelationshipType(role)` - Maps relationship roles to FamilySearch relationship types (PARENT_CHILD, COUPLE, SIBLING, etc.)
   - `updateBidirectionalRelationships(censusData, personAId, personAName, personBId, personBName, relationshipAtoB)` - Updates both people's relationships arrays

2. **Core Relationship Pairs**:
   - Spouse ↔ Spouse
   - Parent ↔ Child
   - Sibling ↔ Sibling
   - Aunt or Uncle ↔ Niece or Nephew
   - Cousin ↔ Cousin
   - Grandparent ↔ Grandchild
   - Stepparent ↔ Stepchild
   - Stepsibling ↔ Stepsibling
   - Parent-in-law ↔ Child-in-law
   - Sibling-in-law ↔ Sibling-in-law
   - No Relation ↔ No Relation
   - Plus all adopted, foster, guardian, godparent, and surrogate variations

3. **Integration Points**:
   - **Task A - handleSaveAndContinue**: Updates bidirectional relationships for ALL members (new and existing) immediately during each save, uses updated census data when loading next person to avoid stale state
   - **Task A - handleSaveAndClose**: Iterates through all saved people and updates relationships based on Record Group members
   - **Task A - handleSaveAndAttach**: Same as handleSaveAndClose
   - **Task B - handleAIReviewComplete**: Iterates through all people in reviewed record group and updates relationships bidirectionally

4. **Duplicate Prevention**:
   - updateBidirectionalRelationships checks for existing relationships by relatedPersonId and updates in-place rather than creating duplicates
   - Task B uses a processedPairs Set to avoid processing same relationship pair twice

**Rationale**: Relationships in genealogy are inherently bidirectional - if John is a Parent to Christopher, then Christopher is a Child to John. Requiring users to manually set both directions is error-prone and violates DRY principle. This implementation ensures data consistency and reduces user cognitive load.

**Trade-offs Considered**:
- **Complexity**: Added ~200 lines of helper functions and update logic across two files
- **Performance**: Each relationship update requires finding both people in censusData (O(n) search), but acceptable for small datasets
- **Data Migration**: Existing relationships in censusData may be one-directional; bidirectional updates will gradually fix this as users edit

**Critical Fixes Applied**:
1. **Display bug**: Record Group card initialization was reading from `person.relationship` (census role) instead of looking up from current person's `relationships` array. Fixed by modifying householdMembers initialization at lines ~1665-1690.
2. **Save and Continue timing**: Updates only happened at end of flow in handleSaveAndClose. Fixed by updating relationships for ALL members during each handleSaveAndContinue call.
3. **Stale data**: After updating relationships, code used old `censusData` prop when loading next person. Fixed by using `updatedCensusData` variable consistently throughout.
4. **New member default**: "Add Group Member" button defaulted to "Child" relationship. Fixed by changing default to "No Relation" in RecordGroupCard.jsx line ~594.
5. **Double processing**: New people were processed in bidirectional update loop after already being set up. Fixed by removing skip logic that prevented newly created people from getting relationships with everyone.
6. **Const reassignment warnings**: Dev server warnings about reassigning const variable. Fixed by changing const to let for updatedCensusData in handleSaveAndClose (line ~823) and handleSaveAndAttach (line ~1088).

**Final Resolution** ✅:
- **Root Cause 1**: Queue mode initialization used simple charAt/slice formatting instead of normalizeRelationshipRole function, so 'OTHER' census role wasn't being converted to 'No Relation'
- **Root Cause 2**: New people created with temp IDs were incorrectly taking Task B flow path in handleSaveAndClose due to checking only `if (onSaveAndReturn)`, causing early return before `isVisible = true` was set
- **Solution**:
  1. Changed queue mode formatting to use `normalizeRelationshipRole(rawRelationship)` (line ~1676)
  2. Enhanced handleNewPersonCreated to immediately create person in censusData with "No Relation" relationships bidirectionally (lines ~1732-1798)
  3. Fixed Task A/B detection: `if (onSaveAndReturn && currentApproach === 'B')` (line ~767)
- **Status**: ✅ Resolved - New people show "No Relation" correctly and appear in names list

**Files Modified**:
- AddNameInfoSheet.jsx (added helper functions, integration, display fix, and Save and Continue improvements)
- StartingScreen.jsx (added helper functions and Task B integration)
- RecordGroupCard.jsx (changed default relationship for new members)

### 39. Immediate Census Data Updates for New People
**Date:** 2026-02-12
**Status:** Implemented ✅

**Decision**: When a user adds a new person via Record Group card, immediately add them to censusData with temp ID and initial relationship.

**Implementation**:
- In handleSaveAndContinue, after saving current person's data, check for new people in their Record Group members
- Create temp person objects with temp IDs (format: `temp-{timestamp}-{random}`)
- Set up bidirectional relationships using inverse relationship mapping (e.g., if added as "Child", set their relationship to current person as "Parent")
- Add temp people to censusData record immediately
- Also search savedPeople array when looking for new people (fallback if not in current person's data)

**Rationale**: Ensures new people appear in all subsequent reviewers' Record Group cards and can progress through the entire review flow. Without this, new people only existed in the Record Group members array of the person who added them, causing "Could not find person in census data" errors.

**Files Modified**: AddNameInfoSheet.jsx (handleSaveAndContinue function, added getRelationshipType helper)

### 38. Intentional Data Errors for Task A Testing
**Date:** 2026-02-12
**Status:** Implemented ✅

**Decision**: Modified KentuckyCensus-simple.json to include intentional errors for Task A user testing

**Changes**:
1. Fixed John's surname: "Ookerman" → "Ockerman" (was preventing search matches)
2. Added age error: John's age "31" → "37" (intentional error for users to catch)
3. Added name error: "Reamy" → "Heamy" (intentional error for users to catch)
4. Removed Christopher completely (users must manually add him during testing)

**Rationale**: Task A is designed to test users' ability to catch and correct AI-suggested data errors. Removed Christopher to test the "add missing person" workflow, while keeping other intentional errors for correction testing.

**Files Modified**: KentuckyCensus-simple.json (removed person object, all relationship references, and relationshipGraph entries for Christopher)

## Task B Review Flow Decisions (2026-02-11 Session 5)

### 26. Review Card Active State Styling
**Date:** 2026-02-11
**Status:** Implemented ✅

**Decision**: Review card background and elevation change conditionally based on allReviewed state

**Implementation**:
- Active (allReviewed === true): yellow02 background, elevation[2] shadow, no border
- Inactive: gray00 background, gray20 border, no elevation

**Rationale**: Visual consistency with active person cards. Yellow background signals the Review card is ready for interaction.

### 27. Separated Sync Logic for State Management
**Date:** 2026-02-11
**Status:** Implemented (still debugging issues)

**Decision**: Split AIReviewInfoSheet sync logic into two separate useEffects instead of nested state setters

**Implementation**:
```javascript
// First useEffect: Sync localPeople with recordGroup.people
useEffect(() => {
  if (recordGroup?.people) {
    setLocalPeople(recordGroup.people);
  }
}, [recordGroup?.people]);

// Second useEffect: Detect new people and mark as reviewed
useEffect(() => {
  // Compare localIds with recordGroup.people to find new IDs
  // Add new IDs to reviewedPeople Set
}, [recordGroup?.people, localPeople]);
```

**Rationale**:
- Clearer separation of concerns (sync vs. detection)
- Avoids nesting setReviewedPeople inside setLocalPeople callback
- Should ensure both state updates happen correctly in sequence

**Current Status**: ✅ Working - skips initial mount detection, correctly identifies new people

### 28. Record Group Pre-population for AI Review Flow
**Date:** 2026-02-11
**Status:** Implemented ✅

**Decision**: AddNameInfoSheet uses preselectedRecordGroup directly when record not found in censusData

**Problem**: Task B add person flow - record exists only in selectedRecordGroup, not in censusData.records yet

**Solution**:
```javascript
const sourceRecord = record || preselectedRecordGroup;
```

**Rationale**: AI review records haven't been saved to censusData yet, so fallback to using preselectedRecordGroup data directly.

### 29. Preserve originalPersonId Across Form Edits
**Date:** 2026-02-11
**Status:** Implemented ✅

**Decision**: When saving form cards (essentialInfo), preserve originalPersonId alongside existingRecordId

**Problem**: Editing person in Task B lost originalPersonId when form saved, causing new person creation instead of update

**Solution**:
```javascript
else if (cardName === 'essentialInfo' && prev.essentialInfo?.originalPersonId) {
  newData[cardName] = {
    ...formData,
    originalPersonId: prev.essentialInfo.originalPersonId
  };
}
```

**Rationale**: Form handlers only include user-editable fields; system fields like originalPersonId must be explicitly preserved

### 30. Merge Edit Updates with Original Person Data
**Date:** 2026-02-11
**Status:** Implemented ✅

**Decision**: When editing person in Task B, merge form changes with original person object to preserve relationships and events

**Problem**: Building minimal person object lost relationships, events, and other fields not in the edit form

**Solution**:
```javascript
let basePersonData = {};
if (essentialInfo.originalPersonId && preselectedRecordGroup) {
  const originalPerson = preselectedRecordGroup.people.find(p => p.id === essentialInfo.originalPersonId);
  if (originalPerson) {
    basePersonData = { ...originalPerson };
  }
}
const personToReturn = {
  ...basePersonData, // Preserve all original fields
  // Then apply edited fields
  givenName: name.givenName || basePersonData.givenName || '',
  // ...
};
```

**Rationale**: Only edited fields are in form state; preserve all other person data (relationships, events, etc.) by merging

### 31. Mark All Saved People as Visible
**Date:** 2026-02-11
**Status:** Implemented ✅

**Decision**: Ensure all people saved from Task B review have isVisible: true flag

**Problem**: People from AI review didn't have isVisible flag, causing them not to appear in NamesInfoSheet

**Solution**:
```javascript
const visiblePeople = updatedPeople.map(person => ({
  ...person,
  isVisible: true
}));
```

**Rationale**: NamesInfoSheet filters for people with isVisible: true; AI-extracted people need this flag added when saved

### 32. Hide Tab Buttons During AI Review Flow
**Date:** 2026-02-11
**Status:** ~~Attempted (did not resolve issue)~~ → Superseded by Decision 33

**Decision**: Conditionally hide secondaryButtons when showAIReviewSheet is true

**Problem**: Tab buttons receiving spurious onClick events when AIReviewInfoSheet closes, causing showNamesSheet to toggle false→true→false→true

**Solution**:
```javascript
const secondaryButtons = showAIReviewSheet ? [] : [/* buttons */];
```

**Outcome**: Empty array prevents rendering but buttons still receive click events at lines 218 and 225. Issue persists. → Superseded by architectural refactor (Decision 33).

### 33. Task B InfoSheet Parent-Child Architecture
**Date:** 2026-02-11
**Status:** Implemented ✅

**Decision**: Refactor Task B to follow Task A's parent-child InfoSheet pattern instead of separate top-level components

**Problem**:
- NamesInfoSheet didn't auto-open after "Save and Close" in Task B
- Root cause: AIReviewInfoSheet was separate top-level component in StartingScreen
- Caused NamesInfoSheet to unmount/remount, leading to spurious events and state toggling issues
- Task A worked correctly because child panels render INSIDE NamesInfoSheet parent

**Solution**:
```javascript
// NamesInfoSheet.jsx - Added conditional rendering for Task B child panels
if (editingPersonFromReview && selectedRecordGroup) {
  return <AddNameInfoSheet ... />; // Task B edit mode
}
if (selectedRecordGroup && currentApproach === 'B') {
  return <AIReviewInfoSheet ... />; // Task B review mode
}
// Existing Task A panels (ViewNameInfoSheet, ManageNamesInfoSheet, etc.)
```

**Implementation**:
- Moved AIReviewInfoSheet rendering from StartingScreen → inside NamesInfoSheet
- Moved Task B AddNameInfoSheet rendering from StartingScreen → inside NamesInfoSheet
- Added new props to NamesInfoSheet: `preselectedRecordGroup`, `onClearPreselectedRecordGroup`, `onAIReviewComplete`
- Added internal state: `editingPersonFromReview`, `selectedRecordGroup`
- Removed `showAIReviewSheet` and `selectedRecordGroup` state from StartingScreen
- Removed `ignoreTabButtonsRef` workaround (no longer needed)

**Rationale**:
- InfoSheet panels should be "anchored" to parent InfoSheet and rendered as children
- Parent InfoSheet stays mounted while child panels switch content
- Matches established Task A pattern (ViewNameInfoSheet, ManageNamesInfoSheet, AddNameInfoSheet all render inside NamesInfoSheet)
- Eliminates need for complex state toggling and event blocking
- Simpler, more maintainable architecture

**Files Modified**:
- NamesInfoSheet.jsx: Added AIReviewInfoSheet and Task B AddNameInfoSheet as child panels
- StartingScreen.jsx: Removed separate AIReviewInfoSheet/AddNameInfoSheet rendering, simplified state management

### 34. State Preservation Across Component Unmount/Remount
**Date:** 2026-02-11 (Session 5 Continuation)
**Status:** Implemented ✅

**Decision**: Lift Task B review flow state (currentPersonIndex, reviewedPeople) to parent NamesInfoSheet for preservation across unmount/remount cycles

**Problem**:
- After editing a person from AIReviewInfoSheet, returning made first person active instead of edited person
- reviewedPeople state lost when AIReviewInfoSheet unmounted, causing Review card not to activate
- Parent-child architecture means child can unmount when switching between review and edit modes

**Solution**:
```javascript
// NamesInfoSheet.jsx - Parent maintains state
const [currentPersonIndexInReview, setCurrentPersonIndexInReview] = useState(0);
const [reviewedPeopleInReview, setReviewedPeopleInReview] = useState(new Set());

// AIReviewInfoSheet - Initialize from parent, notify on changes
const [currentPersonIndex, setCurrentPersonIndex] = useState(initialPersonIndex || 0);
const [reviewedPeople, setReviewedPeople] = useState(initialReviewedPeople || new Set());

useEffect(() => {
  if (onCurrentIndexChange) {
    onCurrentIndexChange(currentPersonIndex);
  }
}, [currentPersonIndex, onCurrentIndexChange]);

useEffect(() => {
  if (onReviewedPeopleChange) {
    onReviewedPeopleChange(reviewedPeople);
  }
}, [reviewedPeople, onReviewedPeopleChange]);
```

**Rationale**:
- Parent component (NamesInfoSheet) remains mounted during entire Task B flow
- Child components (AIReviewInfoSheet, AddNameInfoSheet) mount/unmount as user navigates
- State stored in parent survives child unmount/remount cycles
- Callback props enable bidirectional state synchronization
- Pattern similar to controlled component pattern in React forms

**Props Added**:
- AIReviewInfoSheet: `initialPersonIndex`, `onCurrentIndexChange`, `initialReviewedPeople`, `onReviewedPeopleChange`

### 35. Task B Add vs Edit Mode Detection
**Date:** 2026-02-11 (Session 5 Continuation)
**Status:** Implemented ✅

**Decision**: Use isNew flag to distinguish between add mode and edit/review mode in AddNameInfoSheet

**Problem**:
- "Add Person" button opened AddNameInfoSheet with all cards in review mode
- Expected behavior: Essential Information card open in add mode with Next button
- Single useEffect was setting all cards to review mode for any preselectedPerson

**Solution**:
```javascript
// AddNameInfoSheet.jsx - Check isNew flag early
useEffect(() => {
  if (!preselectedPerson) {
    return;
  }

  // Check if this is a new person being added
  if (preselectedPerson.isNew) {
    console.log('[AddNameInfoSheet] New person being added - keeping add/pending mode');
    return; // Don't activate review mode
  }

  // Existing person - set up for editing/review
  // ... activate review mode
}, [preselectedPerson, censusData, preselectedRecordGroup]);
```

**Rationale**:
- preselectedPerson prop used for both add and edit flows
- isNew flag provides clear signal for add mode
- Early return prevents review mode activation for new people
- Preserves existing edit/review behavior for existing people

### 36. Dual State Management for Add New Person Flow
**Date:** 2026-02-11 (Session 5 Continuation)
**Status:** Implemented ✅

**Decision**: Handle both adding new people and updating existing people in single onSaveAndReturn callback with conditional logic

**Problem**:
- onSaveAndReturn only updated existing people, didn't add new ones to array
- Newly added people not appearing in AIReviewInfoSheet review list

**Solution**:
```javascript
// NamesInfoSheet.jsx - onSaveAndReturn callback
onSaveAndReturn={(updatedPerson) => {
  if (updatedPerson) {
    setSelectedRecordGroup(prev => {
      const personExists = prev.people.some(p => p.id === updatedPerson.id);

      if (personExists) {
        // Update existing person
        return {
          ...prev,
          people: prev.people.map(p =>
            p.id === updatedPerson.id ? { ...p, ...updatedPerson } : p
          )
        };
      } else {
        // Add new person
        const newPeople = [...prev.people, updatedPerson];

        // Auto-mark as reviewed and set as active
        setReviewedPeopleInReview(reviewedSet => {
          const updated = new Set(reviewedSet);
          updated.add(updatedPerson.id);
          return updated;
        });

        setCurrentPersonIndexInReview(newPeople.length - 1);

        return { ...prev, people: newPeople };
      }
    });
  }
  setEditingPersonFromReview(null);
}}
```

**Rationale**:
- Single callback handles both add and edit flows (simpler than separate callbacks)
- Check person existence by ID to determine flow
- Auto-mark new people as reviewed (user already filled out their information)
- Set new person as active card for immediate visibility
- Review card activates if all people now reviewed

### 37. Convert Record Group Members to Relationships Format
**Date:** 2026-02-11 (Session 5 Continuation)
**Status:** Implemented ✅

**Decision**: When adding new person from Task B, convert Record Group members array to relationships array format

**Problem**:
- Newly added people missing relationships on their cards in AIReviewInfoSheet
- User sets relationships via Record Group card (members array format)
- AIReviewInfoSheet displays relationships array format
- Data format mismatch caused relationships not to appear

**Solution**:
```javascript
// AddNameInfoSheet.jsx - handleSaveAndClose
const relationshipsFromMembers = currentPersonData.recordGroup?.members?.map(member => ({
  role: member.relationship || 'UNKNOWN',
  relatedPersonName: member.name || '',
  relatedPersonId: member.id || ''
})) || [];

const personToReturn = {
  ...basePersonData,
  // ... other fields
  relationships: relationshipsFromMembers.length > 0
    ? relationshipsFromMembers
    : (basePersonData.relationships || []),
  // ...
};
```

**Rationale**:
- Record Group card uses members format: `{ name, relationship, id }`
- Person relationships array uses: `{ role, relatedPersonName, relatedPersonId }`
- Conversion needed when creating person object from form data
- Preserves original relationships for edited people (who already have relationships array)
- Enables newly added people to display relationships correctly in review cards

**Data Format Mapping**:
- `member.name` → `relatedPersonName`
- `member.relationship` → `role`
- `member.id` → `relatedPersonId`

## Highlight Overlay Integration Decisions (2026-02-10)

### 9. Render Prop Pattern for Overlay Integration
**Decision**: Use render prop (`overlayContent`) to pass ImageViewer state to DocumentHighlightOverlay

**Rationale**:
- Overlay needs access to imageRef, zoomLevel, panOffset to calculate correct positions
- Originally, DocumentHighlightOverlay was a sibling to ImageViewer with no state access
- Render prop allows ImageViewer to pass internal state without prop drilling
- Enables overlay to be rendered inside ImageViewer container for proper containment

**Implementation**:
```jsx
// ImageViewer.jsx
{overlayContent && overlayContent({ zoomLevel, panOffset, isDragging, imageRef })}

// StartingScreen.jsx
<ImageViewer
  overlayContent={({ zoomLevel, panOffset, isDragging, imageRef }) => (
    <DocumentHighlightOverlay
      zoomLevel={zoomLevel}
      panOffset={panOffset}
      isDragging={isDragging}
      imageRef={imageRef}
      // ... other props
    />
  )}
/>
```

**Trade-offs**:
- More complex than simple prop passing
- Requires understanding render prop pattern
- Better than alternatives (Context API would be overkill, prop drilling would require too many changes)

### 10. Remove Rest Operator Spreading
**Decision**: Remove `{...rest}` spreading from ImageViewer wrapper div, explicitly define all props

**Rationale**:
- React warning: Unknown props (like `overlayContent`) should not be spread to DOM elements
- Only valid HTML attributes should be on DOM elements
- Custom React props should be consumed by component, not passed to DOM

**Alternative Considered**: Filter out custom props before spreading
**Rejected Because**: More complex, easy to miss new custom props, explicit is clearer

### 11. getBoundingClientRect() with Timing Delay
**Decision**: Use `getBoundingClientRect()` to calculate image position, with 150ms setTimeout for transitions

**Rationale**:
- Need actual displayed position/size of image element
- InfoSheet has CSS transition (~200-300ms) that shifts image position
- Calling getBoundingClientRect() during transition returns mid-animation values
- 150ms delay allows most of transition to complete before measuring

**Implementation**:
```javascript
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    setTimeout(updateImagePosition, 150);
  });
});
```

**Trade-offs**:
- Timing dependency is fragile (if transition duration changes, delay may need adjustment)
- Not as robust as transform-based approach used in Highlights viewer
- Works "good enough" for current needs but not perfect
- Highlights viewer uses synchronized transforms (no timing dependencies)

**Future Consideration**: May need to adopt transform-based approach for pixel-perfect alignment

### 12. Coordinate Space Transformation
**Decision**: Store highlights in natural image pixel coordinates (2000x2618), transform to display coordinates at runtime

**Rationale**:
- Calibration captures coordinates in natural image space (actual image dimensions)
- Display size varies based on container size and zoom level
- Runtime transformation keeps data independent of display context
- Simpler than re-calibrating for every display size

**Formula**:
```javascript
const scaleX = displayedWidth / naturalWidth;
const scaleY = displayedHeight / naturalHeight;
const displayedX = naturalX * scaleX;
const displayedY = naturalY * scaleY;
```

**Alternative Considered**: Store in percentage coordinates (0-100%)
**Rejected Because**: Less precise with rounding, calibration already in pixels

### 13. Unique Keys from Multiple Attributes
**Decision**: Use `${highlight.id}-${highlight.x}-${highlight.y}` for React keys instead of just `highlight.id`

**Rationale**:
- Multiple highlights can have same ID (e.g., "1:1:X7YY-B92N" and "1:1:X7YY-B92N-2" both use "1:1:X7YY-B92N")
- React requires unique keys in array rendering
- Coordinates are guaranteed unique per highlight (two highlights can't have identical id, x, and y)

**Alternative Considered**: Fix highlight IDs to be truly unique
**Rejected Because**: Would require re-calibrating all 24 highlights, coordinates already available

### 14. Transform-Based Overlay with objectFit Calculation (FINAL)
**Decision**: Overlay uses same transform as image, sized using objectFit: contain calculation instead of getBoundingClientRect()

**Rationale**:
- Calibrated image dimensions (2000x2618) != actual image dimensions (4032x2624)
- Image uses objectFit: contain, making displayed size smaller than natural size
- Transform-based approach (from Highlights viewer) keeps overlay perfectly synchronized with image
- Calculate display size deterministically: `imageAspect > containerAspect ? fitToWidth : fitToHeight`
- Window resize listener handles InfoSheet open/close events

**Implementation**:
```javascript
const imageAspect = 4032 / 2624;
const containerAspect = containerWidth / containerHeight;
const displayWidth = imageAspect > containerAspect
  ? containerWidth
  : containerHeight * imageAspect;
```

**Replaced Decision #11**: Eliminates getBoundingClientRect() timing dependency entirely

### 15. AI Review Flow with Card-Based Review UI
**Decision**: Use AIReviewInfoSheet with card-based layout showing all people in record group sequentially

**Rationale**:
- User needs to review all AI-extracted people before accepting
- Card format matches existing "Add Name Matching Names" pattern for consistency
- One active card at a time focuses user attention
- Auto-scroll to next card improves review flow
- Primary person shown first for context

**Implementation**:
- HeadingBlock with overline (relationship/primary) and heading (full name)
- Data blocks for vital information, relationships, and events
- Yellow background (yellow02) for active card, grey (gray00) for reviewed
- Edit and Correct buttons (full-width BillboardButtons) only on active card
- Last card shows different message: "If everything looks correct, you can save and close"

**Trade-offs**:
- More verbose than list view
- Requires more scrolling for large households
- Better for careful review of AI extractions

### 16. BillboardButton fullWidth Prop
**Decision**: Add fullWidth boolean prop to BillboardButton for full-width layout support

**Rationale**:
- AI review cards need full-width buttons in grid layout
- Existing BillboardButton uses inline-flex (only as wide as content)
- fullWidth changes display to 'flex' and sets width: '100%'
- Matches pattern from regular Button component

**Alternative Considered**: Style prop override
**Rejected Because**: Style prop spreading overrides internal button styles, breaks appearance

### 17. AddNameInfoSheet Data Structure Fix
**Decision**: Pass cardData.recordGroup and cardData.events directly to cards instead of destructuring

**Rationale**:
- Original code tried to pass `cardData.members` (doesn't exist separately)
- Actual data structure: `cardData.recordGroup = { recordGroup: {...}, members: [...] }`
- Cards expect this nested structure, not flattened props
- Fix enables proper data prefilling in edit flow

**Bug Fixed**: Record group and events cards weren't showing prefilled data from AI review edit

### 18. getFullName() Helper in ViewNameInfoSheet
**Decision**: Create `getFullName(person)` helper function instead of using non-existent `.fullName` property

**Rationale**:
- Person objects have `givenName` and `surname` properties, not `fullName`
- 14 instances throughout ViewNameInfoSheet were trying to access `.fullName`
- Helper centralizes name construction logic: `givenName + ' ' + surname`
- Returns fallback "Unknown Name" for missing data

**Bug Fixed**: ViewNameInfoSheet showing undefined/blank names for all people and household members

### 19. Dual useEffect Handling for AI Review vs Existing Person Edit
**Decision**: AddNameInfoSheet uses two separate useEffects with fallback logic - one for preselectedRecordGroup, one for preselectedPerson

**Rationale**:
- Two different edit flows need different data sources:
  - **AI Review Flow**: Person not in censusData yet, use preselectedRecordGroup passed from StartingScreen
  - **Existing Person Flow**: Person already in censusData, find their record by searching
- preselectedPerson useEffect searches censusData first, falls back to preselectedRecordGroup if not found
- StartingScreen passes selectedRecordGroup as preselectedRecordGroup prop for AI review edits
- Enables Record Group and Events cards to populate correctly in both flows

**Implementation**:
```javascript
// StartingScreen.jsx - pass selectedRecordGroup for AI review flow
<AddNameInfoSheet
  preselectedPerson={preselectedPerson}
  preselectedRecordGroup={selectedRecordGroup}
  // ...
/>

// AddNameInfoSheet.jsx - handle both flows
if (record) {
  // Person found in censusData - use that record
} else if (preselectedRecordGroup) {
  // AI review flow - use preselectedRecordGroup
}
```

**Bug Fixed**: Task A Record Group and Events cards not populating when editing person from AIReviewInfoSheet

## Data Structure Decisions

### 1. Bidirectional Relationship Storage
**Decision**: Store relationships from both perspectives (each person has their own relationships array)

**Rationale**:
- Simplifies lookups when viewing any person
- Avoids need to traverse and invert relationships
- Supports easy display of "X is Y to the current person"

**Trade-offs**:
- Larger data file size (~2x relationships stored)
- Requires consistent updates when relationships change

### 2. Explicit isPrimary Boolean Field
**Decision**: Use explicit `isPrimary: true/false` field instead of inferring from relationships

**Rationale**:
- User-controllable via toggle in essential information
- Only one person per household can be primary
- Clearer than inferring from "no CHILD role" logic
- Prevents both parents from being marked as primary

**Trade-offs**:
- Requires manual management in UI
- Must ensure only one primary per record when toggling

### 3. Relationship Display Perspective
**Decision**: When viewing person A, show what person B is TO person A (not A's role)

**Rationale**:
- More intuitive from user perspective
- "Joseph's parents are John and Reamy" reads better than "Joseph is child of..."
- Matches how people naturally think about relationships

**Implementation**: Look at `p.relationships.find(r => r.relatedPersonId === person.id)` to get what person P is to the current person

## UI/UX Decisions

### 4. Primary Person Visual Treatment
**Decision**: Use bold text emphasis only (no persistent background color)

**Rationale**:
- Grey background looked like persistent hover state (confusing)
- Bold text provides clear emphasis without visual ambiguity
- All items have consistent hover behavior

**Rejected Approach**: Persistent grey background + no hover state for primary people

### 5. Primary Person Default Selection
**Decision**: Prefer Ockerman surname, then older age, exclude people with CHILD role

**Rationale**:
- Ockerman is the surname being researched
- Older person typically head of household
- People with CHILD role shouldn't be primary

**Algorithm**:
```python
has_ockerman = 1 if 'ockerman' in surname.lower() else 0
age = int(age) if age.isdigit() else 0
sort_key = (-has_ockerman, -age)  # Descending
```

### 6. Relationship Label Format
**Decision**: Capitalize and space-separate role strings (e.g., "PARENT_CHILD" → "Parent Child")

**Rationale**:
- More readable than all caps with underscores
- Consistent with UI convention

**Implementation**:
```javascript
rel.role.split('_').map(word =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
).join(' ')
```

## Data Processing Decisions

### 7. Hybrid Relationship Approach
**Decision**: Keep legacy `relationship` field AND add new `relationships` array

**Rationale**:
- Backward compatibility with existing UI code
- Gradual migration path
- Old field shows relationship to primary ("Child", "Spouse")
- New array shows all person-to-person relationships

### 8. Python Script for Transformation
**Decision**: Use Python script to transform complex FamilySearch JSON

**Rationale**:
- One-time processing vs runtime overhead
- Easier to debug and verify transformations
- Smaller output file for web app

**Trade-off**: Requires script re-run + app reload for data changes

### 20. Task A FindDetailsDialog Data Structure Consistency
**Decision**: Fix handleSelectRecord and handleSaveAndContinue to use nested data structure matching card expectations

**Rationale**:
- Cards expect `cardData.recordGroup.recordGroup` and `cardData.events.primaryEvent` (nested)
- Original code set `cardData.recordGroup` and `cardData.primaryEvent` (flat)
- Inconsistency caused Record Group and Events cards to be empty in Task A flow
- Both functions needed same fix: initial record selection and "Save and Continue" flow

**Implementation**:
```javascript
// Fixed structure in both handleSelectRecord and handleSaveAndContinue
recordGroup: {
  recordGroup: { type: 'Census', primaryName: householdName },
  members: [...],
  existingRecordId: record.id
},
events: {
  primaryEvent: { type: 'Census', date: record.date, place: record.place },
  additionalEvents: [
    ...(person.birthDate || person.birthPlace ? [{ type: 'Birth', ... }] : []),
    ...(person.deathDate || person.deathPlace ? [{ type: 'Death', ... }] : [])
  ]
}
```

**Bug Fixed**: Task A Record Group and Events cards not populating when selecting from Matching Names or continuing to next person

### 21. Task B First Card No Auto-Scroll
**Decision**: Skip auto-scroll for first card in AIReviewInfoSheet to ensure alert banner visibility

**Rationale**:
- Alert banner at top ("AI can make mistakes...") is critical for user awareness
- Auto-scrolling immediately to first card would hide the alert
- First card needs to stay in place so users see the warning
- Subsequent cards benefit from auto-scroll for smooth review flow

**Implementation**:
```javascript
useEffect(() => {
  if (currentPersonIndex === 0) return; // Skip first card
  // Auto-scroll for cards 1+
}, [currentPersonIndex]);
```

**UX Impact**: Users see warning on arrival, then get smooth scrolling for remaining cards

### 22. Task B AIReviewInfoSheet Enhancement Architecture
**Decision**: Implement delete, edit, add person, and save flows with state synchronization between AIReviewInfoSheet and AddNameInfoSheet

**Rationale**:
- Need to support three distinct flows: delete person, edit existing person, add new person
- Each flow has different data requirements and update patterns
- State synchronization ensures UI reflects changes from nested InfoSheet panels

**Implementation**:
```javascript
// Delete: Remove from localPeople
setLocalPeople(prev => prev.filter(p => p.id !== personId));

// Edit: Update selectedRecordGroup, sync via useEffect
setSelectedRecordGroup(prev => ({
  ...prev,
  people: prev.people.map(p =>
    p.id === updatedPerson.id ? { ...p, ...updatedPerson } : p
  )
}));

// Add: Append to selectedRecordGroup, sync via useEffect
setSelectedRecordGroup(prev => ({
  ...prev,
  people: [...prev.people, newPerson]
}));

// Sync: useEffect watches recordGroup.people
useEffect(() => {
  if (recordGroup?.people) {
    setLocalPeople(recordGroup.people);
  }
}, [recordGroup?.people]);
```

**Trade-offs**:
- More complex than direct state manipulation in AIReviewInfoSheet
- Requires state synchronization via useEffect
- Cleaner separation of concerns - StartingScreen owns selectedRecordGroup
- Prevents state inconsistencies between parent and child components

### 23. Task B Edit vs Add Person Detection
**Decision**: Use preselectedPerson.isNew flag and preselectedPerson.id to differentiate add vs edit flows

**Rationale**:
- Both flows open AddNameInfoSheet but with different initial states
- Edit flow: preselectedPerson has id property → update existing person
- Add flow: preselectedPerson has isNew=true → create new person
- Single callback (onSaveAndReturn) handles both flows with conditional logic

**Implementation**:
```javascript
// AIReviewInfoSheet
handleEdit(person) → onEditPerson(personWithContext)  // has person.id
handleAddPerson() → onEditPerson({ isNew: true })     // has isNew flag

// StartingScreen
onSaveAndReturn={(updatedPerson) => {
  if (preselectedPerson && !preselectedPerson.isNew && preselectedPerson.id) {
    // Edit flow
    setSelectedRecordGroup(prev => ({ ...prev, people: prev.people.map(...) }));
  } else {
    // Add flow
    setSelectedRecordGroup(prev => ({ ...prev, people: [...prev.people, updatedPerson] }));
  }
}}
```

**Alternative Considered**: Separate callbacks for add vs edit
**Rejected Because**: Single callback with detection reduces prop drilling and simplifies AddNameInfoSheet interface

### 24. Task B Review Card Always Visible
**Decision**: Render Review card unconditionally at bottom of person list, not dependent on review completion

**Rationale**:
- User requirement: "This card should show right when the user arrives"
- Allows user to add people or save at any time, not just after reviewing all
- Simplifies UI flow - no conditional rendering logic
- Matches pattern of other cards being always present

**Implementation**:
```jsx
// Before: Conditional rendering
{allReviewed && <ReviewCard />}

// After: Always rendered
<ReviewCard />  // No condition
```

**UX Impact**: Review card accessible immediately, provides clear exit path even if user wants to skip detailed review

### 25. IconButton Required Props Pattern
**Decision**: Always provide `label` prop for IconButton components for accessibility

**Rationale**:
- IconButton requires `label` prop for screen readers (accessibility requirement)
- `variant` prop only accepts "blue", "gray", or "danger" (not "neutral")
- Missing or invalid props cause runtime errors

**Common Mistake**: Using IconButton without label or with invalid variant
**Fix**: Always include `label="..."` and use valid variant value

**Example**:
```jsx
// Correct
<IconButton
  icon={ContentDelete}
  label="Delete person"
  variant="gray"
  emphasis="low"
/>

// Incorrect - missing label, invalid variant
<IconButton
  icon={ContentDelete}
  variant="neutral"  // ❌ Invalid
  emphasis="low"
/>
```
