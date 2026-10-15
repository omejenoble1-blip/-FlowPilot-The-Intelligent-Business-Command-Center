# Architecture

FlowPilot is a static, local-first web application. `index.html` provides the shell; CSS is split into base, layout, component, module, and theme layers. JavaScript uses browser ES modules with core state/router/event utilities, reusable UI components, services, and module-specific views.

## Data flow

Views call module/service functions; `js/services/database.js` provides IndexedDB CRUD. Modules share store records rather than maintaining separate shadow datasets. The dashboard and analytics derive summaries from those same records. `bus` emits local change events for cross-module refresh and navigation infrastructure.

## Storage

IndexedDB stores structured records. LocalStorage is restricted to small preferences and the active local profile ID. No remote database or server API is included. The local profile model is not an authentication boundary.

## UI modules

Projects, tasks, finance, budgets, goals, team, risks, and automation rules share a metadata-driven CRUD form and table renderer. Kanban, time tracking, notifications, dashboard, analytics, reports, search, settings, and assistant have specialized views.

## External assets

Lucide, Chart.js, and Google Fonts load from CDNs. The application can be hosted as static files; no bundler is required.
