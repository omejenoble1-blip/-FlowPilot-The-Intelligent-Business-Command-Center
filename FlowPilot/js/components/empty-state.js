import { escapeHTML } from '../utils/formatters.js';
export function emptyState({icon='inbox',title='Nothing here yet',description='Create your first record to get started.',action='',compact=false}){return `<div class="empty-state ${compact?'compact':''}"><div class="empty-icon"><i data-lucide="${icon}"></i></div><h3>${escapeHTML(title)}</h3><p>${escapeHTML(description)}</p>${action}</div>`;}
