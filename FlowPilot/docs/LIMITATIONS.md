# Known architecture limitations

- IndexedDB and LocalStorage are scoped to the browser origin/profile and do not sync across devices.
- Browser storage can be inspected, altered, or cleared by someone with access to the browser profile; do not store secrets or sensitive regulated data.
- Local profiles are not secure server-side authentication and do not protect records from a user with browser access.
- Team directory entries are local metadata, not real invites, remote accounts, or collaborative sessions.
- Local automations are evaluated while FlowPilot is open and cannot guarantee background execution after the page is closed.
- The AI assistant is a Coming Soon interface and is not connected to an AI model.
- Notifications are local app notifications, not email or push delivery.
- Chart.js and Lucide load from external CDNs and may not load in offline or restricted-network environments.
- A browser-only application cannot provide server-side access control, cloud backup, remote synchronization, or durable server jobs without additional infrastructure.
