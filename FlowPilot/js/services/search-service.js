import { database } from './database.js';
const SEARCHABLE={projects:['name','description','category','status'],tasks:['title','description','category','status','priority'],transactions:['description','category','type','notes'],budgets:['name','category','notes'],goals:['title','description','keyResult','status'],team:['name','email','role','department'],risks:['title','description','mitigation','status']};
export async function searchRecords(query){const q=String(query||'').trim().toLowerCase();if(!q)return [];const result=[];for(const [store,fields] of Object.entries(SEARCHABLE)){for(const record of await database.getAll(store)){if(fields.some(field=>String(record[field]??'').toLowerCase().includes(q)))result.push({store,record});}}return result;}
export { SEARCHABLE };
