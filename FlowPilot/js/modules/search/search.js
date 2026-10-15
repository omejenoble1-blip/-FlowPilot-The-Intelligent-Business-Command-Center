import { searchRecords } from '../../services/search-service.js';
import { escapeHTML } from '../../utils/formatters.js';
import { formatDate } from '../../utils/dates.js';
import { emptyState } from '../../components/empty-state.js';
const labels = {
	projects: 'Project',
	tasks: 'Task',
	transactions: 'Transaction',
	budgets: 'Budget',
	goals: 'Goal',
	team: 'Team member',
	risks: 'Risk',
};
export async function renderSearch(root, ctx) {
	const query = ctx.searchQuery || '';
	root.innerHTML = `<div class="page-heading"><div><p class="eyebrow">WORKSPACE / SEARCH</p><h1 class="page-title">Search records</h1><p class="page-description">Search across projects, tasks, transactions, budgets, goals, team members, and risks.</p></div></div><div class="panel" style="margin-bottom:17px"><form id="global-search-form" class="row"><div class="input-icon" style="max-width:none;flex:1"><i data-lucide="search"></i><input class="toolbar-search" id="global-search-input" placeholder="Search your workspace..." value="${escapeHTML(query)}" aria-label="Search workspace"></div><button class="button primary" type="submit">Search</button></form></div><div id="search-results">${query ? '<p class="muted">Searching your records…</p>' : emptyState({ icon: 'search', title: 'Find anything in your workspace', description: 'Enter a name, keyword, category, status, or description to search your local records.' })}</div>`;
	globalThis.lucide?.createIcons({ root });
	const run = async (q) => {
		ctx.searchQuery = q;
		const target = root.querySelector('#search-results');
		if (!q.trim()) {
			target.innerHTML = emptyState({
				icon: 'search',
				title: 'Enter a search term',
				description: 'Search uses the records you have created.',
			});
			return;
		}
		const results = await searchRecords(q);
		target.innerHTML =
			results.length ?
				`<div class="between" style="margin-bottom:12px"><span class="muted" style="font-size:11px">${results.length} result${results.length === 1 ? '' : 's'} for “${escapeHTML(q)}”</span></div><section class="panel"><div class="list-stack">${results
					.map(
						({ store, record }) =>
							`<button class="list-row" data-open-store="${store}" data-open-id="${record.id}" style="width:100%;text-align:left;border-top:0;border-left:0;border-right:0;background:transparent;color:inherit;cursor:pointer"><span class="mini-avatar"><i data-lucide="${
								store === 'transactions' ? 'wallet'
								: store === 'tasks' ? 'check-square'
								: store === 'projects' ? 'layers-3'
								: 'file-text'
							}"></i></span><span class="list-row-main"><strong>${escapeHTML(record.name || record.title || record.description || record.email || 'Untitled record')}</strong><p>${escapeHTML(labels[store] || store)} · ${escapeHTML(record.status || record.category || record.type || 'Record')}${record.updatedAt ? ' · Updated ' + formatDate(record.updatedAt) : ''}</p></span><i data-lucide="arrow-up-right" style="width:15px;color:var(--muted)"></i></button>`,
					)
					.join('')}</div></section>`
			:	emptyState({
					icon: 'search-x',
					title: 'No matching records',
					description:
						'Try another keyword. Search only includes records that exist in this workspace.',
				});
		globalThis.lucide?.createIcons({ root });
		target.querySelectorAll('[data-open-store]').forEach((b) =>
			b.addEventListener('click', () => {
				const store = b.dataset.openStore;
				location.hash = store === 'transactions' ? 'finance' : store;
			}),
		);
	};
	root.querySelector('#global-search-form').addEventListener('submit', (e) => {
		e.preventDefault();
		run(root.querySelector('#global-search-input').value);
	});
	if (query) run(query);
}

