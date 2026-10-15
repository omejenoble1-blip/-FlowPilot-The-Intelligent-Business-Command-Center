export function money(value,currency='NGN'){const n=Number(value);return new Intl.NumberFormat(undefined,{style:'currency',currency:currency||'NGN',maximumFractionDigits:2}).format(Number.isFinite(n)?n:0);}
export function number(value,maximumFractionDigits=1){return new Intl.NumberFormat(undefined,{maximumFractionDigits}).format(Number.isFinite(Number(value))?Number(value):0);}
export function initials(value='U'){return String(value).trim().split(/\s+/).slice(0,2).map(x=>x[0]?.toUpperCase()||'').join('')||'U';}
export function escapeHTML(value=''){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
export function slug(value=''){return String(value).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g);}
export function titleCase(value=''){return String(value).replace(/([A-Z])/g,' $1').replace(/^./,x=>x.toUpperCase());}
