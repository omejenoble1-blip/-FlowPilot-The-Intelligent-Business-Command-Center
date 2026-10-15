# Testing

Run the unit and lightweight integration tests with:

```bash
npm test
npm run check
```

The module check verifies that relative JavaScript imports resolve. Unit tests cover selected pure calculations, validation, formatting, date helpers, and a database CRUD path in Node's available environment. Because IndexedDB may be unavailable in Node, the database service falls back to in-memory storage for that test environment.

## Manual browser checklist

- Open over HTTP; create a local profile.
- Reload and confirm profile/session restoration.
- Create/edit/delete a project and task.
- Link a task to a project and verify the Kanban board.
- Move a task using both drag-and-drop and the status selector.
- Record income and expenses; verify the balance.
- Create a budget whose category matches an expense and verify utilization.
- Create a goal and a risk and verify their progress/severity.
- Start, pause, resume, and stop a timer; reload and inspect saved entries.
- Search for a record by title and category.
- Export CSV and JSON; test restore with a backup copy.
- Switch themes; verify dark mode is the first-launch default.
- Test mobile navigation and narrow-screen layouts.
- Deploy to GitLab Pages and verify relative assets and ES module imports.

Automated tests do not constitute complete browser end-to-end certification. Verify the above checklist before calling a release fully tested.
