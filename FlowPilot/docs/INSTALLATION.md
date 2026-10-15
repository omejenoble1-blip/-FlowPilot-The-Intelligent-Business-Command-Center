# Installation and local run

1. Extract the ZIP.
2. Open a terminal in the project directory.
3. Run `python -m http.server 8000` (or use another static HTTP server).
4. Open `http://localhost:8000` in a modern browser.
5. Create a local profile when prompted.

No Node.js backend or frontend build is required. Node.js is only used for the included test scripts. If the browser uses strict privacy settings, ensure IndexedDB is available. Do not use `file://` for reliable ES module/database testing.
