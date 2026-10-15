const SELECTOR = 'select:not([data-custom-select-ready])';
let observerStarted = false;
let openSelect = null;
let sequence = 0;

function visibleOptions(select) {
  return [...select.options].filter(option => !option.disabled && option.value !== '__separator__');
}

function optionLabel(option) {
  return (option?.textContent || '').trim() || 'Choose an option';
}

function closeSelect(shell, focusButton = false) {
  if (!shell) return;
  shell.classList.remove('is-open');
  const trigger = shell.querySelector('.custom-select-trigger');
  const menu = shell.querySelector('.custom-select-menu');
  trigger?.setAttribute('aria-expanded', 'false');
  menu?.setAttribute('hidden', '');
  if (openSelect === shell) openSelect = null;
  if (focusButton) trigger?.focus();
}

function closeOtherSelects(except) {
  document.querySelectorAll('.custom-select-shell.is-open').forEach(shell => {
    if (shell !== except) closeSelect(shell);
  });
}

function syncSelectUI(select, shell) {
  const trigger = shell.querySelector('.custom-select-trigger');
  const text = shell.querySelector('.custom-select-value');
  const selected = select.selectedOptions?.[0];
  text.textContent = optionLabel(selected);
  trigger.classList.toggle('is-placeholder', !selected || selected.value === '');
  shell.querySelectorAll('[role="option"]').forEach(node => {
    const isSelected = node.dataset.value === select.value;
    node.setAttribute('aria-selected', String(isSelected));
    node.classList.toggle('is-selected', isSelected);
    const check = node.querySelector('.custom-select-check');
    if (check) check.hidden = !isSelected;
  });
}

function chooseOption(select, shell, option) {
  if (!option || option.disabled) return;
  select.value = option.value;
  select.dispatchEvent(new Event('input', { bubbles: true }));
  select.dispatchEvent(new Event('change', { bubbles: true }));
  syncSelectUI(select, shell);
  closeSelect(shell, true);
}

function openSelectMenu(select, shell) {
  closeOtherSelects(shell);
  const trigger = shell.querySelector('.custom-select-trigger');
  const menu = shell.querySelector('.custom-select-menu');
  shell.classList.add('is-open');
  trigger.setAttribute('aria-expanded', 'true');
  menu.hidden = false;
  openSelect = shell;
  const search = shell.querySelector('.custom-select-search');
  if (search) {
    search.value = '';
    filterOptions(shell, '');
    search.focus();
  } else {
    const selected = shell.querySelector('[role="option"].is-selected:not([hidden])') || shell.querySelector('[role="option"]:not([hidden])');
    selected?.focus();
  }
}

function filterOptions(shell, query) {
  const normalized = query.trim().toLocaleLowerCase();
  let shown = 0;
  shell.querySelectorAll('[role="option"]').forEach(option => {
    const match = option.textContent.toLocaleLowerCase().includes(normalized);
    option.hidden = !match;
    if (match) shown += 1;
  });
  const empty = shell.querySelector('.custom-select-no-results');
  if (empty) empty.hidden = shown > 0;
}

export function enhanceSelect(select) {
  if (!(select instanceof HTMLSelectElement) || select.dataset.customSelectReady === 'true' || select.multiple || select.size > 1) return;
  if (select.closest('.custom-select-shell')) return;
  select.dataset.customSelectReady = 'true';
  sequence += 1;
  const id = `flowpilot-select-${sequence}`;
  const shell = document.createElement('div');
  shell.className = `custom-select-shell${select.classList.contains('filter-select') ? ' custom-select-filter' : ''}`;
  shell.dataset.customSelectShell = 'true';
  if (select.style.width) shell.style.width = select.style.width;
  if (select.style.minWidth) shell.style.minWidth = select.style.minWidth;
  if (select.style.maxWidth) shell.style.maxWidth = select.style.maxWidth;
  const originalStyle = select.getAttribute('style') || '';
  select.classList.add('custom-select-native');
  select.setAttribute('tabindex', '-1');
  select.setAttribute('aria-hidden', 'true');
  select.style.cssText = `${originalStyle};position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;opacity:0!important;pointer-events:none!important;`;
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.id = `${id}-trigger`;
  trigger.className = 'custom-select-trigger';
  trigger.setAttribute('role', 'combobox');
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');
  const accessibleLabel = select.getAttribute('aria-label') || select.labels?.[0]?.textContent?.trim() || 'Choose an option';
  trigger.setAttribute('aria-label', accessibleLabel);
  trigger.setAttribute('aria-controls', `${id}-menu`);
  trigger.innerHTML = `<span class="custom-select-value"></span><svg class="custom-select-chevron" viewBox="0 0 20 20" aria-hidden="true"><path d="m5 7.5 5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const menu = document.createElement('div');
  menu.className = 'custom-select-menu';
  menu.id = `${id}-menu`;
  menu.setAttribute('role', 'listbox');
  menu.hidden = true;
  const options = visibleOptions(select);
  if (options.length > 7) {
    const searchWrap = document.createElement('div');
    searchWrap.className = 'custom-select-search-wrap';
    searchWrap.innerHTML = `<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.7" cy="8.7" r="5.7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m13 13 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg><input class="custom-select-search" type="search" placeholder="Search options…" aria-label="Search ${accessibleLabel.toLowerCase()} options" autocomplete="off">`;
    menu.append(searchWrap);
    searchWrap.querySelector('input').addEventListener('input', event => filterOptions(shell, event.target.value));
  }
  const list = document.createElement('div');
  list.className = 'custom-select-options';
  options.forEach((option, index) => {
    if (option.hidden) return;
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'custom-select-option';
    item.setAttribute('role', 'option');
    item.setAttribute('aria-selected', String(option.value === select.value));
    item.dataset.value = option.value;
    item.tabIndex = -1;
    item.innerHTML = `<span class="custom-select-option-label"></span><svg class="custom-select-check" viewBox="0 0 20 20" aria-hidden="true" ${option.value === select.value ? '' : 'hidden'}><path d="m4 10 4 4 8-8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    item.querySelector('.custom-select-option-label').textContent = optionLabel(option);
    item.addEventListener('click', () => chooseOption(select, shell, option));
    item.addEventListener('keydown', event => {
      const items = [...list.querySelectorAll('[role="option"]:not([hidden])')];
      const at = items.indexOf(item);
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        items[(at + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length]?.focus();
      } else if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        (event.key === 'Home' ? items[0] : items.at(-1))?.focus();
      } else if (event.key === 'Escape') {
        event.preventDefault(); closeSelect(shell, true);
      } else if (event.key === 'Tab') closeSelect(shell);
    });
    list.append(item);
  });
  menu.append(list);
  const noResults = document.createElement('p');
  noResults.className = 'custom-select-no-results';
  noResults.textContent = 'No matching options';
  noResults.hidden = true;
  menu.append(noResults);
  shell.append(trigger, menu);
  select.insertAdjacentElement('beforebegin', shell);
  shell.append(select);
  trigger.addEventListener('click', () => shell.classList.contains('is-open') ? closeSelect(shell) : openSelectMenu(select, shell));
  trigger.addEventListener('keydown', event => {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
      event.preventDefault();
      openSelectMenu(select, shell);
    } else if (event.key === 'Escape') closeSelect(shell);
  });
  select.addEventListener('change', () => syncSelectUI(select, shell));
  select.addEventListener('focus', () => trigger.focus());
  syncSelectUI(select, shell);
}

export function initializeCustomSelects(root = document) {
  root.querySelectorAll?.(SELECTOR).forEach(enhanceSelect);
  if (observerStarted || !document.body) return;
  observerStarted = true;
  document.addEventListener('pointerdown', event => {
    if (!event.target.closest('.custom-select-shell')) closeOtherSelects(null);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && openSelect) closeSelect(openSelect);
  });
  const observer = new MutationObserver(records => {
    for (const record of records) {
      record.addedNodes.forEach(node => {
        if (!(node instanceof Element)) return;
        if (node.matches?.(SELECTOR)) enhanceSelect(node);
        node.querySelectorAll?.(SELECTOR).forEach(enhanceSelect);
      });
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
