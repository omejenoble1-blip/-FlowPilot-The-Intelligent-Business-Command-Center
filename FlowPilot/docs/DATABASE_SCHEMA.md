# Local database schema

Database: `flowpilot-local`, schema version 1. Every store uses `id` as its key path and records normally include `createdAt` and `updatedAt` timestamps.

| Store | Intended records | Key fields |
|---|---|---|
| profiles | Local workspace profiles | name, workspace, email |
| projects | Projects | name, status, priority, startDate, dueDate, budget, progress |
| tasks | Tasks | title, status, priority, projectId, assigneeId, dueDate |
| transactions | Finance records | type, description, amount, category, date, projectId |
| budgets | Budgets | name, category, limit, startDate, endDate |
| goals | Objectives and key results | title, keyResult, current, target, unit, dueDate |
| team | Local directory entries | name, email, role, department, status |
| risks | Risk register | title, probability, impact, mitigation, status, projectId |
| notifications | Local alerts | title, message, type, read, relatedId, dedupeKey |
| automations | Local rules | name, trigger, threshold, enabled, action |
| timeEntries | Time sessions | description, taskId, projectId, startAt, endAt, pausedMs, state |
| activity | Local activity trail | title, detail, date, type, dedupeKey |

Relationships are references by record ID. The UI should handle deleted or missing referenced records gracefully. Data is stored only in the current browser origin/profile; there is no cross-device sync.
