import { database } from '../../services/database.js';
import { STATUSES } from '../../core/constants.js';
import { escapeHTML } from '../../utils/formatters.js';
import { formatDate, isOverdue } from '../../utils/dates.js';
import { toast, showError } from '../../components/toast.js';
import { saveRecord } from '../shared/record-service.js';

function projectLabel(projects, id) {
  const project = projects.find(item => item.id === id);
  if (!project) return 'No project linked';
  const detail = [project.category, project.status].filter(Boolean).join(' · ');
  return detail ? `${project.name} — ${detail}` : project.name;
}

export async function renderKanban(root, ctx) {
  const [allTasks, allProjects] = await Promise.all([
    database.getAll('tasks'),
    database.getAll('projects')
  ]);
  const projects = allProjects.filter(project => !project.archived);
  const query = String(ctx.kanbanQuery || '').trim().toLocaleLowerCase();
  const projectFilter = ctx.kanbanProjectId || '';
  const tasks = allTasks.filter(task => {
    if (projectFilter && task.projectId !== projectFilter) return false;
    if (!query) return true;
    const project = projects.find(item => item.id === task.projectId);
    return [task.title, task.description, task.category, task.priority, project?.name, project?.category]
      .some(value => String(value || '').toLocaleLowerCase().includes(query));
  });

  const projectLabelCounts = new Map();
  const projectOptions = projects.map(project => {
    const duplicateCount = projects.filter(item => String(item.name || '').trim().toLowerCase() === String(project.name || '').trim().toLowerCase()).length;
    const detail = [project.category, project.status].filter(Boolean).join(' · ');
    let label = duplicateCount > 1 && detail ? `${project.name} — ${detail}` : project.name;
    const key = String(label || '').toLocaleLowerCase();
    const count = (projectLabelCounts.get(key) || 0) + 1;
    projectLabelCounts.set(key, count);
    if (count > 1 || (duplicateCount > 1 && !detail)) label = `${label} · ${count}`;
    return { ...project, label };
  });

  root.innerHTML = `
    <div class="page-heading kanban-page-heading">
      <div><p class="eyebrow">WORKSPACE / TASK FLOW</p><h1 class="page-title">Kanban board</h1><p class="page-description">A focused view of work in progress. Move tasks between stages and the same records update across FlowPilot.</p></div>
      <div class="page-heading-actions"><button class="button" data-list><i data-lucide="list-checks"></i>Task list</button><button class="button primary" data-create><i data-lucide="plus"></i>New task</button></div>
    </div>
    <section class="kanban-summary" aria-label="Task workflow summary">
      ${STATUSES.map((status, index) => { const count = tasks.filter(task => (task.status || 'To Do') === status).length; return `<div class="kanban-summary-item"><span class="kanban-summary-dot lane-${index}"></span><div><small>${escapeHTML(status)}</small><strong>${count}</strong></div></div>`; }).join('')}
      <div class="kanban-summary-total"><strong>${tasks.length}</strong><span>visible tasks</span></div>
    </section>
    <div class="toolbar kanban-toolbar">
      <label class="input-icon kanban-search"><i data-lucide="search"></i><input class="toolbar-search" data-kanban-search placeholder="Search tasks or projects…" value="${escapeHTML(ctx.kanbanQuery || '')}" aria-label="Search Kanban tasks"></label>
      <label class="kanban-project-filter"><span>Project</span><select class="filter-select" data-kanban-project aria-label="Filter tasks by project"><option value="">All projects</option>${projectOptions.map(project => `<option value="${escapeHTML(project.id)}" ${projectFilter === project.id ? 'selected' : ''}>${escapeHTML(project.label)}</option>`).join('')}</select></label>
      <button class="button ghost" data-clear-filters ${(!query && !projectFilter) ? 'disabled' : ''}><i data-lucide="x"></i>Clear filters</button>
    </div>
    <div class="kanban-board" aria-label="Kanban workflow columns">
      ${STATUSES.map((status, index) => {
        const rows = tasks.filter(task => (task.status || 'To Do') === status);
        return `<section class="kanban-column lane-${index}" data-status="${escapeHTML(status)}" aria-label="${escapeHTML(status)} tasks">
          <div class="kanban-column-header"><div class="kanban-column-title"><span class="column-dot"></span><span>${escapeHTML(status)}</span></div><span class="badge neutral">${rows.length}</span></div>
          <div class="kanban-dropzone" data-dropzone="${escapeHTML(status)}">
            ${rows.length ? rows.map(task => `<article class="kanban-task" draggable="true" data-task-id="${escapeHTML(task.id)}" tabindex="0" aria-label="Task ${escapeHTML(task.title)}. Use the status selector to move it.">
              <div class="kanban-task-topline"><span class="kanban-task-type"><i data-lucide="check-square-2"></i> TASK</span><button type="button" class="kanban-card-open" data-open-task="${escapeHTML(task.id)}" aria-label="Open task ${escapeHTML(task.title)}" title="Open task"><i data-lucide="arrow-up-right"></i></button></div>
              <h3>${escapeHTML(task.title)}</h3>${task.description ? `<p>${escapeHTML(task.description)}</p>` : ''}
              <div class="kanban-task-tags"><span class="badge ${task.priority === 'Urgent' || task.priority === 'High' ? 'danger' : task.priority === 'Medium' ? 'warning' : 'neutral'}">${escapeHTML(task.priority || 'No priority')}</span>${task.category ? `<span class="kanban-category">${escapeHTML(task.category)}</span>` : ''}</div>
              <div class="kanban-task-footer"><span class="kanban-due ${isOverdue(task.dueDate) && task.status !== 'Completed' ? 'text-danger' : ''}"><i data-lucide="calendar-days"></i>${task.dueDate ? escapeHTML(formatDate(task.dueDate, ctx.dateFormat)) : 'No due date'}</span></div>
              <div class="kanban-project-line"><i data-lucide="folder-kanban"></i><span title="${escapeHTML(projectLabel(projects, task.projectId))}">${escapeHTML(projectLabel(projects, task.projectId))}</span></div>
              <div class="kanban-move-row"><label for="move-${escapeHTML(task.id)}">Move to</label><select id="move-${escapeHTML(task.id)}" class="filter-select" data-move="${escapeHTML(task.id)}" aria-label="Move ${escapeHTML(task.title)} to another status">${STATUSES.map(next => `<option value="${escapeHTML(next)}" ${next === status ? 'selected' : ''}>${escapeHTML(next)}</option>`).join('')}</select></div>
            </article>`).join('') : `<div class="kanban-empty"><span><i data-lucide="inbox"></i></span><strong>${query || projectFilter ? 'No matching tasks' : 'Nothing here yet'}</strong><small>${query || projectFilter ? 'Try another search or project.' : `Tasks moved to ${escapeHTML(status)} will appear here.`}</small></div>`}
          </div>
        </section>`;
      }).join('')}
    </div>
    <p class="kanban-tip"><i data-lucide="lightbulb"></i><span><strong>Quick tip</strong> Drag a task card to move it, or use its “Move to” control. Both methods update the same task record.</span></p>`;

  globalThis.lucide?.createIcons({ root });
  root.querySelector('[data-list]')?.addEventListener('click', () => { location.hash = 'tasks'; });
  root.querySelector('[data-create]')?.addEventListener('click', () => { location.hash = 'tasks'; });
  let searchTimer;
  root.querySelector('[data-kanban-search]')?.addEventListener('input', event => {
    ctx.kanbanQuery = event.target.value;
    const cursor = event.target.selectionStart;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => renderKanban(root, ctx).then(() => {
      const next = root.querySelector('[data-kanban-search]');
      next?.focus();
      if (next && cursor !== null) next.setSelectionRange(cursor, cursor);
    }), 160);
  });
  root.querySelector('[data-kanban-project]')?.addEventListener('change', event => { ctx.kanbanProjectId = event.target.value; renderKanban(root, ctx); });
  root.querySelector('[data-clear-filters]')?.addEventListener('click', () => { ctx.kanbanQuery = ''; ctx.kanbanProjectId = ''; renderKanban(root, ctx); });

  root.querySelectorAll('[data-open-task]').forEach(button => button.addEventListener('click', () => { location.hash = 'tasks'; }));
  root.querySelectorAll('[data-move]').forEach(select => select.addEventListener('change', async () => {
    const task = allTasks.find(item => item.id === select.dataset.move);
    if (!task) return;
    try { await saveRecord('tasks', { ...task, status: select.value }); toast('Task moved', `Task moved to ${select.value}.`); await renderKanban(root, ctx); }
    catch (error) { showError(error); }
  }));

  let dragged = null;
  root.querySelectorAll('.kanban-task[draggable="true"]').forEach(card => {
    card.addEventListener('dragstart', event => { dragged = card.dataset.taskId; event.dataTransfer.setData('text/plain', dragged); event.dataTransfer.effectAllowed = 'move'; card.classList.add('is-dragging'); });
    card.addEventListener('dragend', () => { dragged = null; card.classList.remove('is-dragging'); root.querySelectorAll('.kanban-column').forEach(column => column.classList.remove('drag-over')); });
  });
  root.querySelectorAll('.kanban-column').forEach(column => {
    column.addEventListener('dragover', event => { event.preventDefault(); column.classList.add('drag-over'); });
    column.addEventListener('dragleave', event => { if (!column.contains(event.relatedTarget)) column.classList.remove('drag-over'); });
    column.addEventListener('drop', async event => {
      event.preventDefault(); column.classList.remove('drag-over');
      const id = event.dataTransfer.getData('text/plain') || dragged;
      const task = allTasks.find(item => item.id === id);
      if (!task || task.status === column.dataset.status) return;
      try { await saveRecord('tasks', { ...task, status: column.dataset.status }); toast('Task moved', `Task moved to ${column.dataset.status}.`); await renderKanban(root, ctx); }
      catch (error) { showError(error); }
    });
  });
}
