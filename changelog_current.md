# Changelog - Current Work

## Session (2026-02-03 Evening)

### Fixed
- **Relationship Display Inversion** (ViewNameInfoSheet.jsx:800-814)
  - Fixed record group card showing inverted relationship labels
  - Changed logic to look at OTHER person's relationships instead of current person's
  - Example: When viewing Joseph (8), now correctly shows Reamy and John as "Parent" instead of "Child"
  - Updated from `person.relationships.find(r => r.relatedPersonId === p.id)` to `p.relationships.find(r => r.relatedPersonId === person.id)`
  - Dev server hot-reloaded successfully

## Previous Session (2026-02-03 Afternoon)

### Added
- **Primary Person Boolean Field**
  - Added `isPrimary: false` field to all person objects (simplify-census-data.py:125)
  - Created primary person selection logic preferring Ockerman surname and older age (simplify-census-data.py:298-313)
  - Set John Ockerman (31), John D Ockerman (60), John Ockerman (no age), and George Ockerman (34) as default primary people

- **Primary Person UI Emphasis** (NamesInfoSheet.jsx:142-186)
  - Display "Primary" overline text instead of relationship label
  - Bold text emphasis using `bold.b` token
  - No background color (transparent by default, grey only on hover)

- **Primary Person Toggle** (ViewNameInfoSheet.jsx:208-252, 669)
  - Essential information card includes isPrimary toggle
  - Toggling primary status updates all people in the record (only one can be primary)
  - UI displays "Primary" or "Child to Primary" based on isPrimary field

- **Utility Function Updates** (censusData.js:33, 76, 146)
  - Added `isPrimary: person.isPrimary || false` to all utility functions
  - Ensures isPrimary field propagates through all person transformations

### Changed
- **Relationship Data Structure**
  - Person objects now include full `relationships` array with bidirectional links
  - Each relationship includes: type, role, relatedPersonId, relatedPersonName
  - Python transformation script extracts all person-to-person relationships
  - Record objects include `relationshipGraph` array

### Fixed
- **Primary Person Visual Treatment**
  - Removed persistent grey background that looked like hover state
  - Kept only bold text emphasis for primary people

## Foundation Work

### Implemented
- Person-to-person relationship extraction from complex FamilySearch JSON
- Relationship role mappings (PARENT_CHILD, SIBLING, COUPLE, etc.)
- Bidirectional relationship storage
- Record group cards with member lists
- Names info sheet with search/filter
- Manage names functionality
- View name details with essential information
- Data transformation pipeline (Python → Simplified JSON)
