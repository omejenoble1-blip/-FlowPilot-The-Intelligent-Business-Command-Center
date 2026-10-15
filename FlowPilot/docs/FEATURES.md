# Feature inventory and status

- Local workspace profiles: implemented as browser-local profile selection; not secure server authentication.
- Dashboard: metrics derive from stored records; charts show no-data states for empty collections.
- Projects: create, list, view, edit, delete; status, priority, dates, budget, archive flag supported by record model.
- Tasks: create, list, view, edit, delete; project/member associations, statuses, priorities, due dates.
- Kanban: four workflow columns, drag-and-drop, and accessible status selectors.
- Finance: income/expense records, category, date, amount, filters, CSV export, totals.
- Budgets: category spending and utilization calculated from transactions.
- Goals: current/target values, status, due dates, progress.
- Team: local directory records and role labels.
- Notifications: local reminders, read/unread, filtering, clear operations.
- Automations: local rules, enabled/disabled state, rule evaluation while app is open.
- Time tracking: timestamp-based timer, pause/resume/stop, manual entries, CSV export.
- Risks: probability, impact, severity score, mitigation and status.
- Analytics: actual-record summaries and charts.
- Reports: CSV exports, JSON backup, print summary.
- Global search: local search across supported record types.
- Settings: profile, workspace, currency, date format, theme, import/export, clear data.
- AI assistant: Coming Soon interface; no AI model connection.

All capabilities should be tested in a browser before being represented as release-verified. See `TESTING.md` and `LIMITATIONS.md`.
