# ✦ FlowPilot — The Intelligent Business Command Center

<p align="center">
  <img src="docs/screenshots/flowpilot-banner.png" alt="FlowPilot Business Command Center" width="100%">
</p>

<p align="center">
  <strong>Plan smarter. Work better. Stay in control.</strong>
</p>

<p align="center">
  A modern, local-first business management workspace for managing projects, tasks, finances, goals, teams, and business performance — all from one centralized command center.
</p>

<p align="center">
  <a href="https://flowpilot-managment-3dvqqnlj9-noble-s-team.vercel.app/"><strong>🚀 Live Demo</strong></a>
  &nbsp;·&nbsp;
  <a href="#-features">Features</a>
  &nbsp;·&nbsp;
  <a href="#-screenshots">Screenshots</a>
  &nbsp;·&nbsp;
  <a href="#-technology-stack">Tech Stack</a>
  &nbsp;·&nbsp;
  <a href="#-installation">Installation</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/IndexedDB-Browser_Storage-4B6C9E?style=flat-square" alt="IndexedDB">
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=flat-square&logo=chartdotjs&logoColor=white" alt="Chart.js">
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel">
</p>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Screenshots](#-screenshots)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Application Architecture](#-application-architecture)
- [Data Storage](#-data-storage)
- [Installation](#-installation)
- [Getting Started](#-getting-started)
- [Data Backup and Recovery](#-data-backup-and-recovery)
- [Deployment](#-deployment)
- [Privacy and Data Management](#-privacy-and-data-management)
- [Project Status](#-project-status)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [Author](#-author)

---

## 🌐 Overview

**FlowPilot** is a modern business management dashboard designed to simplify the way individuals and small teams organize and monitor their business operations.

Managing a business often involves switching between different applications to organize projects, track tasks, monitor finances, manage objectives, record working hours, and evaluate performance.

FlowPilot brings these essential activities into one centralized workspace.

It provides an integrated environment where users can organize projects, manage daily tasks, record financial transactions, monitor business goals, maintain team information, track time, manage potential risks, and review business performance through visual dashboards and analytics.

Built with HTML5, CSS3, and Vanilla JavaScript, FlowPilot combines a responsive user interface with browser-based data persistence through IndexedDB and LocalStorage.

The application follows a **local-first architecture**, allowing workspace information to be stored directly in the user's browser without requiring a traditional backend server.

### What FlowPilot Provides

- Centralized business dashboard.
- Project and task management.
- Financial transaction tracking.
- Business goals and OKRs.
- Team directory management.
- Time tracking.
- Risk management.
- Analytics and reporting.
- Local automation rules.
- Browser-based data persistence.
- Data export and backup capabilities.

**FlowPilot brings everyday business management workflows together in one organized and accessible workspace.**

---

## 🚀 Live Demo

Experience the deployed application:

<p align="center">
  <a href="https://flowpilot-managment-3dvqqnlj9-noble-s-team.vercel.app/">
    <img src="https://img.shields.io/badge/OPEN_FLOWPILOT-Live_Demo-7C3AED?style=for-the-badge&logo=vercel&logoColor=white" alt="Open FlowPilot Live Demo">
  </a>
</p>

**Live Application:**  
https://flowpilot-managment-3dvqqnlj9-noble-s-team.vercel.app/

---

## 📸 Screenshots

Explore the FlowPilot interface and its main workspace features.

### 1. Dashboard Overview

The central workspace provides an overview of business activities, including project statistics, completed tasks, financial information, task distribution, and upcoming deadlines.

![FlowPilot Dashboard](docs/screenshots/dashboard.png)

### 2. Compact Dashboard

A compact navigation experience that provides additional workspace flexibility.

![FlowPilot Compact Dashboard](docs/screenshots/dashboard-compact.png)

### 3. Project Management

Organize projects, monitor progress, search records, apply filters, and manage project information.

![FlowPilot Project Management](docs/screenshots/projects.png)

### 4. Project List

View project records and monitor their current progress and status.

![FlowPilot Project List](docs/screenshots/project-list.png)

### 5. Finance Transaction Management

Record income and expenses using the transaction management interface.

![FlowPilot Finance Transaction](docs/screenshots/finance-transaction.png)

### 6. Financial Overview

Visualize financial activity and review income and expenses through dashboard charts.

![FlowPilot Financial Analytics](docs/screenshots/financial-analytics.png)

---

## ✨ Features

FlowPilot brings several business management capabilities together in one application.

### 📊 1. Business Dashboard

A centralized overview of important business information.

- Business performance overview.
- Total project statistics.
- Completed task metrics.
- Financial balance overview.
- Overdue task indicators.
- Financial charts and visual summaries.
- Task distribution visualization.
- Project progress overview.
- Upcoming deadlines.
- Data-driven dashboard information.

### 📁 2. Project Management

Organize and monitor business projects.

- Create and manage projects.
- Maintain project information.
- Monitor project progress.
- Track project statuses.
- Organize project deadlines.
- Search project records.
- Filter project information.
- Sort project records.
- Export supported project data to CSV.
- View project progress through dashboard summaries.

### ✅ 3. Task Management

Organize daily activities and monitor work progress.

- Create and manage tasks.
- Organize tasks by status.
- Monitor pending tasks.
- Track completed tasks.
- Identify overdue tasks.
- Associate tasks with projects.
- Review task distribution.
- Monitor task progress.

### 💰 4. Finance Management

Keep track of business financial activities.

- Record income transactions.
- Record expense transactions.
- Add transaction descriptions.
- Specify transaction amounts.
- Organize transactions by category.
- Assign transaction dates.
- Associate transactions with projects.
- Add transaction notes.
- Review financial records.
- Visualize financial information.
- Monitor financial summaries.

### 🎯 5. Goals & OKRs

Organize business objectives and monitor progress.

- Create business goals.
- Define measurable objectives.
- Track goal progress.
- Monitor goal status.
- Organize business priorities.

### 👥 6. Team Directory

Maintain organized team information.

- Manage team directory records.
- Organize team information.
- Keep team details accessible.
- Maintain a centralized directory.

### ⏱️ 7. Time Tracking

Keep records of time spent on business activities.

- Record time entries.
- Associate time records with work.
- Organize tracked time information.
- Review recorded time.

### ⚠️ 8. Risk Management

Maintain visibility into potential business and project risks.

- Record business risks.
- Organize risk information.
- Monitor risk status.
- Keep potential issues visible.

### 📈 9. Analytics & Reporting

Understand business activity through visual summaries.

- Business dashboard metrics.
- Project progress summaries.
- Task distribution charts.
- Financial overview charts.
- Income and expense comparisons.
- Business activity summaries.
- Supported CSV exports.

### ⚙️ 10. Local Automation

Organize supported workflow rules.

- Create local automation rules.
- Define rule conditions and actions.
- Evaluate supported rules while the application is open.

### 💾 11. Data Management

Manage and preserve workspace information.

- IndexedDB structured data storage.
- LocalStorage preferences.
- JSON workspace backup.
- JSON data restoration.
- CSV exports for supported records.
- Browser-based data persistence.

### 🎨 12. User Interface & Experience

A modern interface designed for clarity and usability.

- Dark-first visual design.
- Purple-accented interface.
- Responsive layouts.
- Collapsible sidebar.
- Compact navigation mode.
- Dashboard cards.
- Data visualization.
- Search and filtering interfaces.
- Custom searchable dropdowns.
- Modal-based forms.
- Empty states and interface feedback.
- Lucide icon integration.
- Custom scrollbar styling.
- Responsive navigation.

---

## 🛠️ Technology Stack

FlowPilot is built using native frontend technologies and selected libraries.

| Technology | Purpose |
|---|---|
| HTML5 | Semantic application structure |
| CSS3 | Styling, responsive layouts, and visual design |
| Vanilla JavaScript | Application logic and interactivity |
| JavaScript ES Modules | Modular code organization |
| IndexedDB | Structured browser-based data storage |
| LocalStorage | Lightweight preferences and settings |
| Chart.js | Charts and data visualization |
| Lucide Icons | Interface iconography |
| Google Fonts | Typography |
| Vercel | Application hosting and deployment |

### Technology Highlights

**HTML5 & CSS3**

Provide the application structure, responsive layouts, reusable visual patterns, and interface styling.

**Vanilla JavaScript**

Powers application functionality, event handling, data operations, and interactive components without requiring a frontend framework.

**IndexedDB**

Provides browser-based persistence for structured application records.

**LocalStorage**

Stores lightweight preferences and application settings.

**Chart.js**

Powers visual representations of business and financial information.

---

## 🏗️ Application Architecture

FlowPilot follows a modular frontend architecture that separates application logic, interface components, business features, utilities, and data persistence.

### High-Level Architecture

```text
                       FLOWPILOT
                           |
                  Application Interface
                           |
                  JavaScript Application
                           |
             +-------------+-------------+
             |             |             |
          Features      Components     Utilities
             |             |             |
             +-------------+-------------+
                           |
                  Application Services
                           |
                      Storage Layer
                           |
                +----------+----------+
                |                     |
             IndexedDB             LocalStorage
                |                     |
                +----------+----------+
                           |
                     Workspace Data
                           |
                  Dashboard & Analytics
```

### Architectural Principles

- **Modularity:** Application responsibilities are separated into logical modules.
- **Maintainability:** Features and supporting utilities are organized independently.
- **Local-first persistence:** Supported workspace records are stored in the browser.
- **Responsive design:** The interface adapts to different screen sizes.
- **Native technologies:** The application uses HTML, CSS, and JavaScript without requiring a frontend framework.

---

## 💽 Data Storage

FlowPilot uses browser storage to maintain workspace information.

### IndexedDB

IndexedDB provides structured storage for supported application records, including:

- Projects.
- Tasks.
- Financial transactions.
- Goals.
- Team directory records.
- Time entries.
- Risk records.
- Other supported workspace data.

### LocalStorage

LocalStorage is used for lightweight information such as:

- Application preferences.
- Theme-related settings.
- Sidebar preferences.
- Other supported interface settings.

### Storage Workflow

```text
User Interaction
       |
       v
Application Logic
       |
       v
Storage Services
       |
       +------------------+
       |                  |
       v                  v
    IndexedDB         LocalStorage
       |                  |
       +------------------+
                |
                v
        Persisted Browser Data
                |
                v
       Application Data Views
                |
                v
       Dashboard & Analytics
```

The application reads supported stored records to populate its dashboard, project information, financial summaries, and visualizations.

---

## 💻 Installation

FlowPilot is a static frontend application.

It does not require a Node.js backend or a frontend build process to run locally.

### Prerequisites

Make sure you have:

- [Visual Studio Code](https://code.visualstudio.com/)
- [Python](https://www.python.org/downloads/)
- A modern web browser.
- Git (optional).

### 1. Download the Project

Download the repository as a ZIP file and extract it.

Alternatively, clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Open the Project in Visual Studio Code

Open Visual Studio Code.

Select:

`File → Open Folder`

Choose the extracted FlowPilot project folder.

### 3. Start the Local Server

Open the VS Code integrated terminal.

Run:

```bash
python -m http.server 8000
```

### 4. Open the Application

Visit the following address in your browser:

```text
http://localhost:8000
```

FlowPilot should now load locally.

> **Important:** Because the application uses JavaScript ES modules and browser storage, run it through a local HTTP server instead of opening `index.html` directly using a `file://` URL.

---

## 🧭 Getting Started

After launching FlowPilot:

1. Create your local workspace profile.
2. Explore the main dashboard.
3. Create your first project.
4. Add tasks and organize their statuses.
5. Record income and expense transactions.
6. Create business goals.
7. Add team directory information.
8. Record time entries.
9. Explore risk management.
10. Review dashboard analytics.
11. Export a backup of your workspace data when necessary.

As you create and update supported records, the application uses the stored information to populate relevant dashboard metrics and visualizations.

---

## 📦 Data Backup and Recovery

FlowPilot provides data management capabilities for supported workspace information.

### JSON Backup

Export supported workspace information into a JSON backup.

### JSON Restore

Restore supported data from a previously exported JSON backup.

### CSV Export

Export supported records into CSV format for use in spreadsheet applications and external reporting workflows.

### Recommended Practice

Keep backup copies of important workspace information outside the browser.

Browser storage can be affected by:

- Clearing browser site data.
- Removing browser profiles.
- Browser storage restrictions.
- Switching to another browser or device.

---

## ☁️ Deployment

FlowPilot is deployed using **Vercel**.

### Live Deployment

https://flowpilot-managment-3dvqqnlj9-noble-s-team.vercel.app/

### Deploy Your Own Version

1. Push your project to a Git repository.
2. Sign in to [Vercel](https://vercel.com/).
3. Import your repository.
4. Configure it as a static frontend application.
5. Deploy the project.

The current application does not require a separate backend deployment.

---

## 🔐 Privacy & Data Management

FlowPilot follows a local-first data storage approach.

This means supported workspace information is stored in the user's browser rather than automatically being transmitted to a centralized application database.

### Important Limitations

- Workspace records are stored in the current browser.
- Data does not automatically synchronize between browsers or devices.
- Clearing browser site data may remove locally stored information.
- Local profiles are convenience profiles, not server-backed authentication.
- Team directory records do not create real user accounts or send invitations.
- Local automation rules are evaluated while the application is open.
- There is currently no remote database or cloud synchronization service.
- The AI assistant interface is marked **Coming Soon** and is not connected to an AI model.

For important business records, maintain regular external backups.

**FlowPilot is currently a local-first business management application, not a fully operational cloud-based SaaS platform with centralized authentication and remote data storage.**

---

## 🚧 Project Status

**Status: Active Development**

FlowPilot is an evolving business management workspace.

The current development focus is providing an organized, responsive, and locally persistent application for managing everyday business activities.

### Current Scope

- Frontend business management interface.
- Browser-based data persistence.
- Project and task organization.
- Financial record management.
- Business dashboard and visualizations.
- Supported reporting and export capabilities.
- Local automation functionality.

---

## 🗺️ Future Improvements

Potential future development areas include:

- Backend API integration.
- Secure server-backed authentication.
- Cloud database integration.
- Cross-device data synchronization.
- Real team accounts and invitations.
- Advanced analytics and reporting.
- Expanded workflow automation.
- AI-powered business assistance.
- Comprehensive browser end-to-end testing.

These are future development possibilities and are not claims about currently implemented functionality.

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

If you would like to contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes.
4. Verify that your changes work.
5. Commit your work with a descriptive commit message.
6. Submit a pull request.

For major changes, open an issue first to discuss the proposed improvement.

---

## 👨‍💻 Author

**Noble**

Frontend Developer | Building modern web applications and exploring practical software engineering.

---

## ⭐ Support

If you find FlowPilot interesting or useful, consider giving the repository a star on GitLab.

Your feedback, suggestions, and contributions are appreciated.

---

<p align="center">
  <strong>FLOWPILOT</strong>
  <br>
  The Intelligent Business Command Center.
  <br><br>
  Plan smarter. Work better. Stay in control.
  <br><br>
  <a href="https://flowpilot-managment-3dvqqnlj9-noble-s-team.vercel.app/">Explore the Live Application</a>
</p>