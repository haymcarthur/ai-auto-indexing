# Changelog

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
