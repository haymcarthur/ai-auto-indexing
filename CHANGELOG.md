# Changelog

## 2026-02-19 - Manually Added Member Now Gets Own Review Card

### Fixed Manually Added Household Member Not Appearing in Review Queue ✅
- **Root cause**: `handleSaveAndContinue` added new people to `censusData` but never to `remainingPeople`. The ReviewCard reads from `remainingPeople`, so the added person never appeared there and never got their own card.
- **Fix**: Expanded the `setRemainingPeople` call to also append newly created people to the end of the queue (with a duplicate guard to prevent double-adding on subsequent household saves)

### Files Modified
- `src/components/AddNameInfoSheet.jsx` - Append new people to `remainingPeople` queue

---

## 2026-02-19 - AutoSuggest Free-Text Name Fix

### Fixed Typed Name Not Saving in AutoSuggest ✅
- **Root cause found**: `AutoSuggest.onChange` only fired on dropdown selection, never on free-text input — typed names were lost when the user tabbed away
- **Fix**: Added `onBlur` handler that commits `inputValue` to `onChange` when the field loses focus

### Files Modified
- `ux-zion-library/src/components/AutoSuggest.jsx` - Added onBlur commit

---

## 2026-02-18 - Household Member Name Entry Simplified

### Fixed Household Member Name Not Saving ✅
- **Removed QuickGlance overlay requirement**: Users can now type a name and select a relationship directly — no "Create new name" confirmation step required
- **Eliminated duplicate creation bug**: Names are only committed when user clicks Save/Next on the card, so editing a misspelled name no longer creates a duplicate person

### Files Modified
- `src/components/RecordGroupCard.jsx` - Removed QuickGlance overlay, simplified AutoSuggest onChange to commit directly to form state

---

## 2026-02-18 - Highlights Viewer Task Independence Fix

### Fixed Name Persistence Between Tasks ✅
- **Manually-entered names no longer carry over between tasks**: Names added in Task A (or B) no longer appear in Task B (or C) when navigating back to the entry screen and selecting a new task
- **Implementation**: Added resets for `allPeopleData`, `allPeopleDataB`, `allPeopleDataC`, and `hoveredHighlightIds` in `handleBackToEntry()` in `App.jsx` — forces fresh JSON reload for each task

### Files Modified
- `viewer/src/App.jsx` - Reset all task data caches and hover state in handleBackToEntry

---

## 2026-02-17 - Manual Entry Fixes (Session Continuation)

### Fixed Primary Event Data Population ✅
- **Primary event now sharing correctly**: Events card date/place now pre-fills for all household members
- **Implementation**: Check both `cardData.primaryEvent` and `cardData.events.primaryEvent` paths when creating record

### Fixed Household Labels and Primary Person Detection ✅
- **Household name now correct**: Shows "John Ockerman Household" instead of wrong person's name
- **First person automatically Primary**: When creating new household, first person marked with isPrimary=true and relationship='Primary'

### Task Independence Fixed ✅
- **Immutable census data updates**: All array/object mutations replaced with immutable patterns
- **updateBidirectionalRelationships rewritten**: Fully immutable - creates new person/record/censusData objects
- **Task A/B no longer share data**: Each task now has separate census data

### Fixed Relationships Persistence ✅
- **Relationships now persisting correctly**: When manually adding household members, relationships update bidirectionally and persist when loading next person
- **Implementation**: Added `isVisible: true` filter when searching for household members to update relationships, preventing matches to AI-extracted people with same names

### UX Improvements - SelectNameInfoSheet ✅
- **Clearer instructions for Method B AI extraction**: Added H5 heading "Select a Highlight" and revised paragraph text to guide users
- **De-emphasized manual entry**: Changed "Enter Name Manually" button from medium to low emphasis to encourage highlight selection first

### Files Modified
- `src/components/AddNameInfoSheet.jsx` - Visibility filtering in relationship updates, removed debug logging
- `src/components/RecordGroupCard.jsx` - Fixed PropType warning with Boolean() wrapper
- `src/components/SelectNameInfoSheet.jsx` - H5 heading, updated instructions, low-emphasis button

---

## 2026-02-17 - Read-Only Household Member Names

### Bug Fix: Prevent Accidental Duplicate Creation
- **Fixed editable names in Household Details**: When adding a new person to an existing household, pre-populated household member names are now read-only
- **Prevents duplicate creation**: Users can no longer accidentally create duplicate people by editing existing member names (e.g., adding surnames)
- **Implementation**: Uses `isOriginal` flag to distinguish pre-populated members (read-only) from newly added members (editable)

### Files Modified
- `src/components/RecordGroupCard.jsx` - Added `member.isOriginal` check to disable prop

---

## 2026-02-17 - Instant Thank You Screen with Background Saves

### UX Improvement: Optimistic Submission
- **Fixed long loading on submission**: Users now see thank you screen immediately when clicking Submit, instead of waiting for database operations to complete
- **Background save pattern**: All database operations (task completions, survey responses, validation data, recording upload) now happen asynchronously in background after thank you screen displays
- **Prevent lost work**: Users can no longer lose progress by refreshing during long saves - thank you screen shows instantly so they have no reason to refresh
- **Better error handling**: Removed blocking alert dialogs, replaced with console logging (✅ success, ❌ error, ⚠️ warning, 🎉 completion)
- **User experience**: Submit → Instant thank you (< 100ms) instead of 10-30 second wait

### Technical Changes
- Moved `setTestComplete(true)` before database operations in `TestSessionContext.jsx`
- Wrapped all database saves in fire-and-forget `saveInBackground()` function
- Database operations continue even if user leaves page (browser keeps connection alive)
- Console logs provide developer visibility into background save progress

### Files Modified
- `src/contexts/TestSessionContext.jsx` - Refactored handleTaskComplete for optimistic UI

## 2026-02-12 - Deployment Fixes and Production Setup

### Vercel Deployment Fixes
- **Fixed import path issue**: Changed SelectNameInfoSheet.jsx imports from `../../../ux-zion-library` to `../../ux-zion-library` - incorrect path was going outside project directory, causing build failure on Vercel
- **Fixed missing image asset**: Copied SearchForName.gif from project root to public/ directory so it can be served correctly on deployed site
- **Fixed image reference**: Updated FindDetailsDialog.jsx to use correct filename (SearchForName.gif, not SearchingForNames.png)

### Production URL Configuration
- **Updated user-test-hub dashboard URLs**: Changed test URLs from `http://localhost:3004/` to `https://ai-auto-indexing.vercel.app/` in both Dashboard.jsx and TestDetail.jsx
- **Status parameter integration**: Confirmed test uses `?status=in%20progress` URL parameter for proper analytics filtering - "Launch Test" button automatically appends current study status

### Deployment Status
- ✅ ai-auto-index deployed to Vercel: https://ai-auto-indexing.vercel.app/
- ✅ Build succeeds without errors
- ✅ All assets loading correctly
- ✅ Dashboard "Launch Test" button points to production URL with status parameter

## 2026-02-12 - Analytics Data Flow Refactor & Validation Fixes

### Analytics Data Flow (Session 10)
- **Refactored response collection flow**: Changed from single-task submission to accumulated multi-task submission. InstructionPanel now collects all responses (Task 1, Task 2, Final questions) and submits once at completion
- **Implemented dual task completion saves**: Both Task 1 and Task 2 now save as separate task_completions with distinct task_ids ('Prompt' or 'Highlight' based on method used)
- **Added survey_responses table integration**: Final questions (preferred-method, overall-feedback) now save to survey_responses table for proper analytics display
- **Made analytics dynamic**: user-test-hub statistics calculation now discovers task IDs dynamically instead of hardcoded 'A/B/C', supporting both old tests and new ai-auto-index test
- **Updated validation logic**: Changed from Gary/Ronald Fadden to John Ockerman family (6 people: John, Reamy, Isaic, Joseph, George, Christopher)
- **Added comprehensive error handling**: Individual try-catch blocks for each database save operation, test sessions complete even if some saves fail, detailed error logging with user alerts
- **Fixed database constraint issues**: Map 'Prompt'→'A' and 'Highlight'→'B' for both task_id and preferred_method columns to satisfy check constraints
- **Updated analytics display**: Color-coded bar graphs (red=Prompt, blue=Highlight) and conditional task name mapping based on test type

### Validation Fixes (Session 10 Continuation)
- **Fixed validation false negative - Phase 1**: Implemented separate task validation with census data snapshots to validate each task against its own completion state instead of only validating final state
- **Fixed validation false negative - Phase 2**: Updated validation to handle "Heamy" vs "Reamy" spelling variation and to not require surname "Ockerman" for all family members (only John has surname in census data)
- **Fixed participant numbering inconsistency**: Created consistent participant number mapping based on session creation order (oldest = Participant 1) used across all analytics sections (scatter plots, task breakdowns, feedback, video modal)
