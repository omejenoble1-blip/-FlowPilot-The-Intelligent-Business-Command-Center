# FlowPilot UI refresh

This refresh improves the Settings and Kanban experiences while preserving the existing local-first data model.

## Settings
- Added a compact profile, storage, and theme overview.
- Reworked settings navigation into icon-led sections with short descriptions.
- Improved form spacing, section headers, visual grouping, danger-zone treatment, and responsive layouts.
- Kept the existing profile, theme, backup, restore, clear-data, and privacy behaviors.
- Profile edits are reflected when switching between settings sections, and the overview theme label updates when the theme changes.

## Kanban
- Added workflow summary counts, task/project search, and a project filter.
- Refined task cards, priority/category chips, due-date context, and movement controls.
- Added clearer empty states and a more obvious drag-and-drop affordance.
- Preserved the same task records and status update path used by the task list and dashboard.

## Project selectors
- Project options now include category/status context when available.
- Projects with duplicate names are disambiguated rather than appearing indistinguishable.
- All active project records remain available; no fake projects or business records are seeded to pad the options list.
- Existing single-select controls continue to use the reusable custom-select component.

## Verification
- Unit and integration test suite: 18 passing.
- Local JavaScript import target check: 75 modules checked.
- JavaScript syntax checks passed for the modified modules.
- A complete interactive browser test across all settings actions and Kanban gestures has not been completed in this environment.
