# Index Creation - Changelog

## 2025-12-11 - Add Name InfoSheet Integration

### Summary
Integrated the AddNameInfoSheet component into the application, connecting it to the "Add Name" button in ManageNamesInfoSheet. This completes the implementation of the new person creation flow with sequential card progression.

### Features Implemented

#### 1. Sequential Card Flow
- Users can now add a new person through a guided multi-step process
- Cards progress through: Essential Info → Record Group → Events → Additional Facts → Review
- Each card transitions from pending → add/edit → review states
- Cancel button properly discards changes (does not save)

#### 2. Record Group Integration
- QuickGlanceOverlay appears when creating new names in AutoSuggest
- Captures Given Name and Surname for new people
- Tracks multiple people created in Record Group that need details added
- Dialog prompts user to add additional details for newly created people

#### 3. Additional Facts Card
- MenuOverlay with checkbox list of fact types (Occupation, Religion, etc.)
- Selected facts appear as text fields above the "Additional Facts" button
- Empty fact fields are hidden in review state
- Supports adding/removing multiple facts dynamically

#### 4. Tree Attachment Card
- Three display states: hint, unattached, attached
- Shows possible tree matches with "Attach Hint" option
- Displays attached persons with PID and relationship info
- Read-only display card (no edit state)

#### 5. Review Card
- Two scenarios based on remaining people:
  - **With remaining people**: Shows bullet list and "Save and Continue" button
  - **All complete**: Shows "Save and Close" and "Save and Attach" buttons
- Displays current person's name in confirmation message

### Files Modified

#### `/src/components/ManageNamesInfoSheet.jsx`
- **Added**: Import for AddNameInfoSheet component
- **Added**: Conditional rendering to show AddNameInfoSheet when showAddName is true
- **Added**: onUpdateCensusData prop to component signature and PropTypes
- **Purpose**: Connect the "+ Name" button to open AddNameInfoSheet panel

#### `/src/components/NamesInfoSheet.jsx`
- **Added**: Pass onUpdateCensusData prop to ManageNamesInfoSheet
- **Purpose**: Enable ManageNamesInfoSheet to pass data updates up the chain

### Files Created (Previous Sessions)

#### `/src/components/AddNameInfoSheet.jsx`
- Main InfoSheet component for adding new person
- Manages state for all cards (essentialInfo, recordGroup, events, additionalFacts, review)
- Tracks remaining people created in Record Group needing details
- Handles sequential card progression with handleNextCard()
- Implements Save and Close, Save and Attach, Save and Continue actions

#### `/src/components/ReviewCard.jsx`
- Final card in add flow showing summary and action buttons
- Conditional display based on remainingPeople array
- Two button configurations: continue vs complete

#### `/src/components/AddPersonQuickGlance.jsx`
- QuickGlance form for capturing Given Name and Surname
- Auto-splits full name into given/surname
- Save/Cancel actions

#### `/src/components/AddPersonDetailsDialog.jsx`
- Dialog asking if user wants to add details for newly created person
- Add Details / Skip options

#### `/src/components/AdditionalFactsCard.jsx`
- Card with three states: pending, add/edit, review
- MenuOverlay with checkboxes for selecting fact types
- Dynamic text fields for selected facts
- Filters empty facts in review state

#### `/src/components/TreeAttachmentCard.jsx`
- Display-only card showing tree attachment status
- Three types: hint (blue container with match), unattached (no attachment message), attached (shows PID)
- Uses Avatar, ListItem for displaying person info

### Modified Library Components

#### `/ux-zion-library/src/components/AutoSuggest.jsx`
- **Added**: onSelect callback prop
- **Purpose**: Distinguish between typing (onChange) and selecting option (onSelect)
- **Behavior**: onSelect fires when option clicked, onChange fires while typing
- **Important**: Create options skip onChange, only trigger onSelect

### Technical Details

#### State Management
- Card states tracked in cardStates object: { essentialInfo: 'add', recordGroup: 'pending', ... }
- Form data stored separately in cardData object
- Review state displays data prop, not formData (enables proper cancel behavior)

#### Event Handling
- 50ms setTimeout delay when showing QuickGlance prevents click event propagation issue
- AutoSuggest onSelect distinguishes user clicking "Create" from typing
- Cancel button properly resets formData using useEffect when entering edit mode

#### Portal Usage
- Dialogs and overlays rendered via createPortal(component, document.body)
- Prevents React nesting errors with Card components
- Enables proper z-index layering

### Known Limitations

#### TODO Items
1. **Wire up data saving**: handleSaveAndClose, handleSaveAndAttach, handleSaveAndContinue currently log only
2. **Implement actual census data updates**: Need to add new person to censusData.records
3. **Test multiple person flow**: Verify adding details for multiple people created in Record Group works correctly
4. **Attach flow**: Attach dialog shows placeholder message, actual attach flow not implemented

### User Flow

```
Names Button
  ↓
NamesInfoSheet
  ↓ (click "Manage Names")
ManageNamesInfoSheet
  ↓ (click "+ Name")
AddNameInfoSheet
  ↓
Sequential Cards:
  1. Essential Information (Add) ← Starts here
  2. Record Group (Pending)
     - Can create new people here → tracked in remainingPeople array
  3. Events (Pending)
  4. Additional Facts (Pending)
  5. Review (Pending)
     - Shows "Save and Continue" if remainingPeople.length > 0
     - Shows "Save and Close" / "Save and Attach" if remainingPeople.length === 0
```

### Testing Notes

- Dev server running without errors on port 3002
- HMR updates successful for all file changes
- No console errors during compilation
- Ready for user testing

### Next Steps

1. Test the complete add name flow in the browser
2. Implement actual data saving logic
3. Handle multiple person creation flow
4. Build out attach to tree functionality
5. Add error handling and validation
