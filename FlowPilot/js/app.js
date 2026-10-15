import { APP_CONFIG } from './config.js';
import { bindRouter, readRoute, navigate } from './core/router.js';
import { state } from './core/state.js';
import { bus } from './core/event-bus.js';
import { initializeDatabase } from './bootstrap/initialize-database.js';
import { session } from './auth/session-state.js';
import {
	createProfile,
	listProfiles,
	selectProfile,
	signOut,
} from './auth/local-profiles.js';
import { storage } from './services/storage-service.js';
import {
	applyTheme,
	getInitialTheme,
} from './modules/settings/theme-settings.js';
import { updateHeader } from './components/header.js';
import { updateSidebarCounts, setActiveNav } from './components/sidebar.js';
import { openModal } from './components/modal.js';
import { toast, showError } from './components/toast.js';
import { escapeHTML, initials } from './utils/formatters.js';
import { evaluateLocalRules } from './services/notification-service.js';
import { runAutomationRules } from './modules/automations/automation-rules.js';
import { renderDashboard } from './modules/dashboard/dashboard.js';
import { renderCrud } from './modules/shared/crud-view.js';
import { renderKanban } from './modules/kanban/kanban.js';
import { renderTimeTracking } from './modules/time-tracking/time-tracking.js';
import { renderNotifications } from './modules/notifications/notifications.js';
import { renderAnalytics } from './modules/analytics/analytics.js';
import { renderReports } from './modules/reports/reports.js';
import { renderSearch } from './modules/search/search.js';
import { renderSettings } from './modules/settings/settings.js';
import { renderAssistant } from './modules/assistant/assistant.js';
import { initializeCustomSelects } from './components/custom-select.js';

let routeUnsubscribe = null;
let currentRenderToken = 0;
let automationInterval = null;
function loadExternalLibrary(src, globalName, onReady) {
	if (globalThis[globalName]) {
		onReady?.();
		return;
	}
	const script = document.createElement('script');
	script.src = src;
	script.async = true;
	script.crossOrigin = 'anonymous';
	script.onload = () => {
		onReady?.();
	};
	script.onerror = () =>
		console.warn(`Optional library failed to load: ${globalName}`);
	document.head.append(script);
}
const root = document.querySelector('#page-content');
function context() {
	return {
		profile: state.profile,
		currency: state.currency,
		dateFormat: state.dateFormat,
		filters: state.filters || {},
		searchQuery: state.searchQuery,
		activeSettings: state.activeSettings,
	};
}
function iconRefresh() {
	globalThis.lucide?.createIcons();
}
async function renderRoute(route) {
	const token = ++currentRenderToken;
	if (state.route !== route) state.filters = {};
	state.route = route;
	setActiveNav(route);
	updateHeader(route, state.profile);
	document.title = `${{ dashboard: 'Overview', projects: 'Projects', tasks: 'Tasks', kanban: 'Kanban board', finance: 'Finance', budgets: 'Budgets', goals: 'Goals & OKRs', team: 'Team directory', 'time-tracking': 'Time tracking', risks: 'Risk register', analytics: 'Analytics', reports: 'Reports', automations: 'Automations', notifications: 'Notifications', search: 'Search records', settings: 'Settings', assistant: 'AI assistant' }[route] || 'Overview'} · FlowPilot`;
	root.innerHTML =
		'<div class="panel"><div class="empty-state compact"><div class="empty-icon"><i data-lucide="loader-circle"></i></div><h3>Loading workspace</h3><p>Preparing your local records…</p></div></div>';
	iconRefresh();
	try {
		const ctx = context();
		if (route === 'dashboard') await renderDashboard(root, ctx);
		else if (
			[
				'projects',
				'tasks',
				'finance',
				'budgets',
				'goals',
				'team',
				'risks',
				'automations',
			].includes(route)
		)
			await renderCrud(route, root, ctx);
		else if (route === 'kanban') await renderKanban(root, ctx);
		else if (route === 'time-tracking') await renderTimeTracking(root, ctx);
		else if (route === 'notifications') await renderNotifications(root, ctx);
		else if (route === 'analytics') await renderAnalytics(root, ctx);
		else if (route === 'reports') await renderReports(root, ctx);
		else if (route === 'search') await renderSearch(root, ctx);
		else if (route === 'settings') await renderSettings(root, ctx);
		else if (route === 'assistant') renderAssistant(root, ctx);
		if (token !== currentRenderToken) return;
		iconRefresh();
		await updateSidebarCounts();
	} catch (error) {
		console.error(error);
		root.innerHTML = `<section class="panel"><div class="error-state"><strong>Could not load this view.</strong><p style="margin-top:7px;color:inherit">${escapeHTML(error?.message || 'An unexpected error occurred.')}</p><button class="button" id="retry-view" style="margin-top:12px">Try again</button></div></section>`;
		root
			.querySelector('#retry-view')
			?.addEventListener('click', () => renderRoute(route));
	}
}
function showProfileGate() {
	const profiles = [];
	listProfiles().then((rows) => {
		profiles.push(...rows);
		if (session.current) return;
		const profileOptions =
			profiles.length ?
				`<div class="divider"></div><p class="eyebrow" style="margin-bottom:10px">EXISTING LOCAL PROFILES</p><div class="list-stack">${profiles.map((p) => `<button class="list-row" type="button" data-profile-id="${p.id}" style="width:100%;background:transparent;border-left:0;border-right:0;border-top:0;color:var(--text);text-align:left"><span class="profile-avatar">${escapeHTML(initials(p.name))}</span><span class="list-row-main"><strong>${escapeHTML(p.name)}</strong><p>${escapeHTML(p.workspace || 'My workspace')}</p></span><i data-lucide="arrow-up-right"></i></button>`).join('')}</div>`
			:	'';
		const { root: mr, close } = openModal({
			title: 'Welcome to FlowPilot',
			description:
				'Complete these required details before entering your workspace. No account or password is sent to a server.',
			dismissible: false,
			body: `<div class="profile-dialog" style="padding:0;margin:0"><span class="brand-mark"><i data-lucide="orbit"></i></span><h1>Your work, in one place.</h1><p>Set up your local workspace to manage projects, tasks, finance, goals, and more.</p><form id="profile-create-form" class="form-grid"><div class="field full"><label for="setup-name">Full name <span aria-hidden="true">*</span></label><input id="setup-name" name="name" required maxlength="80" autocomplete="name" placeholder="Enter your full name"></div><div class="field full"><label for="setup-workspace">Workspace or business name <span aria-hidden="true">*</span></label><input id="setup-workspace" name="workspace" required maxlength="100" autocomplete="organization" placeholder="Enter your workspace name"></div><div class="field full"><label for="setup-email">Email (optional)</label><input id="setup-email" name="email" type="email" placeholder="you@example.com"></div><div class="field full"><button class="button primary" type="submit" style="width:100%">Continue to FlowPilot <i data-lucide="arrow-right"></i></button></div></form>${profileOptions}<p class="field-hint" style="margin-top:15px">Local profile only. This is not secure server authentication or cloud sync.</p></div>`,
		});
		mr.querySelector('#profile-create-form').addEventListener(
			'submit',
			async (e) => {
				e.preventDefault();
				const v = Object.fromEntries(new FormData(e.target));
				v.name = String(v.name || '').trim();
				v.workspace = String(v.workspace || '').trim();
				if (!v.name || !v.workspace) {
					showError(
						new Error(
							'Enter your full name and workspace name before continuing.',
						),
					);
					return;
				}
				try {
					const profile = await createProfile(v);
					session.set(profile);
					state.profile = profile;
					close();
					updateHeader(state.route, profile);
					await renderRoute(readRoute());
					toast(
						'Workspace ready',
						'Your new local workspace has been created.',
					);
				} catch (err) {
					showError(err);
				}
			},
		);
		mr.querySelectorAll('[data-profile-id]').forEach((b) =>
			b.addEventListener('click', async () => {
				try {
					const p = await selectProfile(b.dataset.profileId);
					if (!String(p.name || '').trim() || !String(p.workspace || '').trim())
						throw new Error(
							'This saved profile is missing required setup details. Create a new profile to continue.',
						);
					session.set(p);
					state.profile = p;
					close();
					updateHeader(state.route, p);
					await renderRoute(readRoute());
				} catch (err) {
					showError(err);
				}
			}),
		);
	});
}
async function boot() {
	try {
		loadExternalLibrary('https://unpkg.com/lucide@latest', 'lucide', () =>
			iconRefresh(),
		);
		loadExternalLibrary(
			'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js',
			'Chart',
			() => {
				if (session.current && ['dashboard', 'analytics'].includes(state.route))
					renderRoute(state.route);
			},
		);
		await initializeDatabase();
		state.theme = applyTheme(getInitialTheme());
		state.currency = storage.get('currency', APP_CONFIG.defaultCurrency);
		state.dateFormat = storage.get('dateFormat', 'medium');
		await session.restore();
		state.profile = session.current;
		updateHeader(readRoute(), state.profile);
		document.querySelector('#app-version').textContent =
			`v${APP_CONFIG.version}`;
		bindRouter((route) => {
			if (!session.current) {
				state.route = route;
				return;
			}
			renderRoute(route);
		});
		document.querySelector('#mobile-menu').addEventListener('click', () => {
			document.querySelector('#sidebar').classList.toggle('open');
			document.querySelector('#sidebar-scrim').classList.toggle('visible');
		});
		const sidebar = document.querySelector('#sidebar');
		const collapseButton = document.querySelector('#sidebar-collapse-toggle');
		const applySidebarCollapsed = (collapsed) => {
			sidebar.classList.toggle('collapsed', collapsed);
			document.body.classList.toggle('sidebar-collapsed', collapsed);
			collapseButton.setAttribute('aria-pressed', String(collapsed));
			collapseButton.setAttribute(
				'aria-label',
				collapsed ? 'Expand sidebar' : 'Collapse sidebar',
			);
			collapseButton.title = collapsed ? 'Expand sidebar' : 'Collapse sidebar';
			collapseButton.innerHTML = `<i data-lucide="${collapsed ? 'panel-left-open' : 'panel-left-close'}"></i>`;
			document.querySelectorAll('#sidebar .nav-item').forEach((link) => {
				const label = link.querySelector('span:not(.nav-count)');
				if (label && !link.dataset.fullLabel)
					link.dataset.fullLabel = label.textContent.trim();
				link.title =
					collapsed ?
						link.dataset.fullLabel || link.getAttribute('aria-label') || ''
					:	link.dataset.fullLabel || '';
			});
			iconRefresh();
		};
		applySidebarCollapsed(storage.get('sidebarCollapsed', false));
		collapseButton.addEventListener('click', () => {
			const collapsed = !sidebar.classList.contains('collapsed');
			storage.set('sidebarCollapsed', collapsed);
			applySidebarCollapsed(collapsed);
		});
		document
			.querySelector('#sidebar-scrim')
			.addEventListener('click', closeSidebar);
		document
			.querySelectorAll('[data-route]')
			.forEach((a) => a.addEventListener('click', closeSidebar));
		function closeSidebar() {
			document.querySelector('#sidebar').classList.remove('open');
			document.querySelector('#sidebar-scrim').classList.remove('visible');
		}
		document.querySelector('#theme-toggle').addEventListener('click', () => {
			state.theme = applyTheme(
				document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark',
			);
			if (state.route === 'dashboard' || state.route === 'analytics')
				renderRoute(state.route);
		});
		document
			.querySelector('#global-search-trigger')
			.addEventListener('click', () => {
				state.searchQuery = '';
				navigate('search');
				setTimeout(
					() => document.querySelector('#global-search-input')?.focus(),
					100,
				);
			});
		document
			.querySelector('#notification-trigger')
			.addEventListener('click', () => navigate('notifications'));
		document
			.querySelector('#topbar-profile')
			.addEventListener('click', () => navigate('settings'));
		document
			.querySelector('#profile-menu')
			.addEventListener('click', () => navigate('settings'));
		document.addEventListener('keydown', (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault();
				state.searchQuery = '';
				navigate('search');
				setTimeout(
					() => document.querySelector('#global-search-input')?.focus(),
					100,
				);
			}
			if (e.key === 'Escape') closeSidebar();
		});
		if (!session.current) {
			showProfileGate();
		} else {
			await renderRoute(readRoute());
		}
		const runRules = async () => {
			if (!session.current) return;
			try {
				await evaluateLocalRules();
				await runAutomationRules();
				await updateSidebarCounts();
			} catch (e) {
				console.warn('Local rule evaluation failed', e);
			}
		};
		await runRules();
		automationInterval = setInterval(runRules, 60000);
		bus.on('data:changed', async () => {
			await updateSidebarCounts();
		});
	} catch (error) {
		console.error(error);
		root.innerHTML = `<section class="panel"><div class="error-state"><strong>FlowPilot could not start.</strong><p style="margin-top:7px;color:inherit">${escapeHTML(error.message || 'Database initialization failed.')}</p><button class="button" onclick="location.reload()" style="margin-top:12px">Reload application</button></div></section>`;
	}
}
window.addEventListener('beforeunload', () => {
	if (automationInterval) clearInterval(automationInterval);
});
initializeCustomSelects(document);
boot();

