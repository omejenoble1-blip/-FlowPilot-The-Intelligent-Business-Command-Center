export const todayISO=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
export function formatDate(value,style='medium'){if(!value)return '—';const d=new Date(`${String(value).slice(0,10)}T12:00:00`);if(Number.isNaN(d.getTime()))return '—';return new Intl.DateTimeFormat(undefined,style==='short'?{month:'short',day:'numeric'}:style==='long'?{year:'numeric',month:'long',day:'numeric'}:{year:'numeric',month:'short',day:'numeric'}).format(d);}
export function daysUntil(value){if(!value)return null;const target=new Date(`${value}T00:00:00`);const now=new Date();now.setHours(0,0,0,0);return Math.ceil((target-now)/86400000);}
export function isOverdue(value){return !!value&&daysUntil(value)<0;}
export function dateLabel(value){const n=daysUntil(value);if(n===null)return 'No deadline';if(n<0)return `${Math.abs(n)}d overdue`;if(n===0)return 'Due today';if(n===1)return 'Due tomorrow';return `In ${n} days`; }
