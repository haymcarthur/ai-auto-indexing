# AI Auto-Index Project Overview

## Project Goal

A user-study prototype for FamilySearch UX research. Participants complete two genealogical indexing tasks using two AI-assisted methods (Prompt and Highlight) so researchers can compare usability, accuracy, and user preference. The app records screen+audio, tracks task completion, and submits structured analytics to Supabase.

This is **not** a production indexing tool — it is a research prototype. Correctness of instructions and minimal AI framing of the task are intentional constraints.

---

## Technology Stack

- **Frontend**: React + Vite
- **UI Components**: `ux-zion-library` (local, relative import `../../ux-zion-library`)
- **Backend / DB**: Supabase (same instance for dev and production)
- **Recording**: MediaRecorder API (screen + microphone)
- **Deployment**: Vercel (auto-deploy on push to `main`)
- **Production URL**: https://ai-auto-indexing.vercel.app/
- **Dev server**: `npm run dev` → http://localhost:5173

---

## Two Test Methods

### Method A — Prompt Method
1. User opens Names panel → clicks "Add Name"
2. Types ancestor's name → selects "Use AI auto fill"
3. Loading screen → list of matching record groups
4. Selects a record group → AIReviewInfoSheet shows all people
5. Reviews/edits each person → saves all to census data

### Method B — Highlight Method
1. User selects Task B → census document displayed with calibrated highlight overlays
2. User clicks a highlight → "Finding Details" loading (2s)
3. AIReviewInfoSheet shows all people in that record group sequentially
4. Active card: Edit / Looks Good / Trash. Reviewed cards: Edit only
5. After last person, Review card activates → Add Person or Save and Close
6. All people saved → Names panel opens

Task order (Prompt first vs Highlight first) is randomised per participant via `taskOrder` state in InstructionPanel.

---

## Key Data Structures

### Person Object
```json
{
  "id": "unique-id",
  "givenName": "John",
  "surname": "Ockerman",
  "relationship": "Child",
  "sex": "M",
  "age": "31",
  "race": "",
  "isPrimary": true,
  "isVisible": false,
  "relationships": [
    {
      "type": "PARENT_CHILD",
      "role": "PARENT",
      "relatedPersonId": "other-id",
      "relatedPersonName": "Christopher Ockerman"
    }
  ]
}
```

- `isVisible`: `false` = AI-extracted (hidden until reviewed), `true` = user-confirmed
- `isNew`: ephemeral flag indicating a brand-new person being added in the current flow
- Relationships are bidirectional — each person carries their own perspective

---

## Census Data

- File: `KentuckyCensus-simple.json`
- 4 records, 22 people, Kentucky 1850 census
- John Ockerman's household: John, Heamy/Reamy, Isaic, Joseph, George, Christopher
- **Intentional errors in data** for testing: John's age (37 instead of 31), spouse name "Heamy" instead of "Reamy", Christopher omitted from raw data
- All Ockerman family members exist in censusData with `isVisible: false` — they are NOT removed from the data, they are just hidden

---

## Critical Architecture Constraints

| Constraint | Detail |
|---|---|
| Task A and B are independent | Changes to one must not affect the other |
| `currentApproach === 'B'` guard | Required wherever Task B needs different behaviour |
| `isAIFlow` guard in AddNameInfoSheet Effect 2 | Forces `preselectedRecordGroup` branch for Task B, bypasses `censusData.records.find()` |
| Effect 1 early-return | `if (preselectedPerson && !preselectedPerson.isNew) return` — prevents Effect 1 overwriting Effect 2 |
| `isVisible` filtering | Always filter by `isVisible: true` when searching for manually-created people |
| Immutable census data updates | Never mutate censusData arrays directly — spread to new objects |
| Recording blob ordering | `await recordingBlobPromise` must come AFTER all DB saves in `saveInBackground` |
| DB saves are fire-and-forget | `setTestComplete(true)` fires first; DB saves run in background |

---

## Supabase Tables

| Table | Purpose |
|---|---|
| `test_sessions` | One row per participant; `project_status` from `?status=` URL param |
| `task_completions` | Two rows per session (one per method); `task_id` = 'A' (Prompt) or 'B' (Highlight) |
| `survey_responses` | `preferred_method` + `preference_reason` (overall feedback) |
| `task_validation_data` | Raw JSON dump of validation results + all survey responses |
| `test-recordings` storage | WebM files at `ai-auto-index/{sessionId}_{timestamp}.webm` |

`task_id` and `preferred_method` have DB check constraints — only 'A', 'B', 'C' are valid. Map 'Prompt'→'A', 'Highlight'→'B' before saving.

---

## Analytics Dashboard (user-test-hub)

- Local only: `cd "/Users/haymcarthur/User Tests/user-test-hub" && npm run dev`
- Participant numbers: stable, based on `started_at` creation order (oldest = Participant 1)
- Task names: `A` → "Prompt Method", `B` → "Highlight Method" for `ai-auto-index` test
- Task IDs discovered dynamically — not hardcoded

---

## Current Status (2026-02-20)

### ✅ All Known Bugs Resolved — Actively Collecting Test Data

**Recent changes this session:**
- Task instructions rewritten: removed AI-framing, "John Ockerman" bolded, "ACCURATELY" and "ALL" emphasised, AI-makes-mistakes paragraph removed
- Recording pipeline fixed: Promise-based `stopRecording()`, removed duplicate chunk issue, decoupled DB saves from blob
- Method B household visibility fixed: Christopher now appears correctly in RecordGroupCard when editing subsequent household members

### Production
- ✅ Live at https://ai-auto-indexing.vercel.app/
- ✅ Auto-deploys on `git push origin main`
- ✅ Supabase connected and writing data
- ✅ Recordings uploading to `test-recordings` storage bucket

### Next Steps
- Monitor dashboard for new test results
- Address any new bugs discovered during live testing
- Optional: console logging cleanup in AddNameInfoSheet.jsx, SelectNameInfoSheet.jsx
