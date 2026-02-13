# AI Auto-Index Project Overview

## Project Goal
Build a web application for indexing and managing Kentucky 1850 census records with person-to-person relationship tracking and FamilySearch integration.

## Core Functionality
- Display census records with person names and relationships
- Track direct person-to-person relationships (parent-child, siblings, spouses, etc.)
- Manage primary person designation for each household
- Edit person details and relationships
- Visual distinction for primary people in lists
- Record grouping by household

## Technology Stack
- **Frontend**: React with Vite
- **Data Processing**: Python script (simplify-census-data.py)
- **UI Components**: Custom UX Zion Library
- **Data Format**: Simplified JSON transformed from complex FamilySearch format

## Key Data Structures

### Person Object
```json
{
  "id": "unique-id",
  "givenName": "John",
  "surname": "Ockerman",
  "relationship": "Child",
  "sex": "",
  "age": "31",
  "race": "",
  "isPrimary": true,
  "relationships": [
    {
      "type": "PARENT_CHILD",
      "role": "PARENT",
      "relatedPersonId": "other-person-id",
      "relatedPersonName": "Christopher Ockerman"
    }
  ],
  "attachedPersons": [],
  "hints": []
}
```

### Relationship Storage
- **Bidirectional**: Each person stores their relationships from their perspective
- **Person-level**: `relationships` array on each person
- **Record-level**: `relationshipGraph` array on each record
- **Roles**: PARENT, CHILD, SIBLING, SPOUSE, GRANDPARENT, GRANDCHILD, etc.

## Current Scope
- 4 census records with 22 total people
- Kentucky 1850 census data
- Person-to-person relationship tracking
- Primary person management
- Essential information editing
- Relationship display in record group cards

## Constraints
- One primary person per household
- Primary people get bold text emphasis (no background color)
- Relationships displayed from active person's perspective
- Data transformations require Python script re-run + app reload

## Task A vs Task B Testing Flows

### Task A: AI Auto-Fill Flow
1. User opens Names panel (shows "No Names")
2. Clicks "Add Name" button
3. Enters given name and/or surname
4. Selects "Use AI auto fill" option
5. Loading screen appears (simulating AI search)
6. List of matching record groups displayed
7. User selects a record group
8. AIReviewInfoSheet shows all people in selected group
9. User reviews each person, can edit or mark as correct
10. Saves all people to census data

### Task B: Highlight-Based AI Review Flow
1. User selects Task B approach
2. Document image displayed with calibrated highlight overlays
3. User clicks on a highlight
4. "Finding Details" loading screen appears (2 seconds)
5. AIReviewInfoSheet shows all people in highlighted record group
6. User reviews each person sequentially:
   - Active card (yellow): Shows "Edit" and "Looks Good" buttons + Trash icon
   - Reviewed cards (grey): Shows "Edit" button only
7. After reviewing last person, Review card becomes active
8. Review card shows "Add Person" and "Save and Close" buttons
9. User can add additional people or save and close
10. All people saved to census data, Names panel opens

## Current Work Focus (Session 10 Continuation - Completed)

### ✅ Analytics Integration & Validation Fixes Complete

**Session 10 - Analytics Data Flow Refactor**:
- Accumulated response submission pattern (all tasks + final questions together)
- Dual task completion saves (Task 1 and Task 2 as separate database rows)
- Survey responses table integration
- Dynamic task ID discovery in analytics
- Database constraint mapping (Prompt→'A', Highlight→'B')
- Color-coded analytics display
- Comprehensive error handling

**Session 10 Continuation - Validation Fixes**:
- Phase 1: Separate task validation with census data snapshots
  - Fixed: Both tasks getting same actualSuccess value
  - Solution: Capture Task 1 data before reset, validate each separately
- Phase 2: Flexible name/surname validation
  - Fixed: Validation couldn't find "Heamy" (looking for "Reamy")
  - Fixed: Required surname "Ockerman" for all family members (only John has it)
  - Solution: Accept alternate spellings, make surname optional except for John
- Phase 3: Consistent participant numbering
  - Fixed: Same participant showing different numbers across analytics sections
  - Solution: Create stable mapping based on creation order

**All Issues Resolved**:
- ✅ Task 1 and Task 2 validated separately against own completion state
- ✅ Validation handles historical name variations ("Heamy" vs "Reamy")
- ✅ Validation doesn't require surnames for family members (realistic for historical data)
- ✅ Participant numbers consistent across all analytics displays
- ✅ Analytics show accurate success rates for both Prompt and Highlight methods

### Status
- **ai-auto-index test**: Fully functional end-to-end
- **user-test-hub analytics**: Fully functional with accurate data
- **Validation**: Working correctly, tested with real user data
- **No blocking issues**

### Next Session Focus
- Console logging cleanup (if needed for production)
- Additional analytics features or refinements as requested
- New test scenarios or user studies

## Testing Constraints

- **CRITICAL**: Task A and Task B are independent - changes to one must NOT affect the other
- All Task B work should use `currentApproach === 'B'` checks where needed
- Test both Task A and Task B flows after any changes
- Dev server runs on port 3004
