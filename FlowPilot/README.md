# FlowPilot — The Intelligent Business Command Center

FlowPilot is a custom, local-first business workspace for projects, tasks, finance, budgets, goals, team records, time tracking, risks, analytics, reports, and local automation rules.

## Highlights

- Dark theme by default, with a light theme option.
- HTML5, custom CSS, vanilla JavaScript ES modules.
- IndexedDB for structured records; LocalStorage for lightweight preferences.
- Chart.js visualizations and Lucide icons.
- Responsive sidebar and workspace views.
- Data-derived metrics; no automatic demo business records.
- CSV exports and JSON backup/restore.
- GitLab Pages configuration included.

## Run locally

Because this application uses JavaScript ES modules and IndexedDB, serve it over HTTP rather than opening `index.html` directly as a `file://` URL.

Python is one simple option:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` from the project directory. No Node.js backend or build step is required to run the application.

## First use

1. Open FlowPilot in a modern browser.
2. Create a local profile and workspace.
3. Create projects, tasks, and other records using the module pages.
4. Dashboard metrics and analytics are derived from the records you enter.
5. Export a JSON backup periodically from Settings or Reports.

## Deploy to GitLab Pages

Push the repository to GitLab. GitLab CI uses `.gitlab-ci.yml` to publish the static application. Check the project Pages URL and base path after the first deployment; the app uses relative paths for its local assets.

## Storage and privacy

Records are stored in the current browser's IndexedDB database. Theme and small preferences use LocalStorage. Data does not automatically sync between browsers or devices. Browser storage is inspectable and should not be treated as secure storage for sensitive information.

Local profiles are convenience profiles, not server authentication. Team directory entries do not create accounts or invite users. Local automation rules are evaluated while the app is open. The AI assistant is an interface marked Coming Soon and is not connected to a model.

## Testing

Run the unit tests with Node.js built-in test runner:

```bash
npm test
```

These tests cover selected pure utility functions. They do not replace full browser end-to-end testing. See `docs/TESTING.md` for the current test scope and manual verification checklist.

## Dependencies

The app loads Lucide, Chart.js, and Google Fonts from external CDNs. Internet access is required for those remote assets; core record storage and non-chart views are implemented locally. If a CDN is blocked, icons or charts may not render, but the source modules remain available.

## License

MIT; see `LICENSE`.


## UI refresh

The interface uses a dark-first visual system with refined spacing, typography, subtle surfaces, a clearer dashboard hierarchy, focused analytics layouts, and more distinct Kanban lanes. Native single-select controls are progressively enhanced into keyboard-operable custom dropdowns with selected-state feedback and searchable options for longer lists. The original select values remain synchronized with form submissions and existing change handlers.
