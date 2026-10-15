import { database } from '../../services/database.js';
import { bus } from '../../core/event-bus.js';
export async function listRecords(store){return database.getAll(store);}
export async function saveRecord(store,record){const saved=await database.put(store,record);await database.put('activity',{title:record.id?'Record updated':'Record created',detail:`${store} record “${record.name||record.title||record.description||record.email||'Untitled'}” saved.`,date:new Date().toISOString(),type:store});bus.emit('data:changed',{store,record:saved});return saved;}
export async function removeRecord(store,id){await database.delete(store,id);await database.put('activity',{title:'Record deleted',detail:`A record was removed from ${store}.`,date:new Date().toISOString(),type:store});bus.emit('data:changed',{store,id,deleted:true});}
export async function loadChoices(){
 const [allProjects,team]=await Promise.all([database.getAll('projects'),database.getAll('team')]);
 const projects=allProjects.filter(p=>!p.archived);
 const nameCounts=new Map();
 projects.forEach(p=>{const key=String(p.name||'Untitled project').trim().toLocaleLowerCase();nameCounts.set(key,(nameCounts.get(key)||0)+1);});
 const seen=new Map();
 const projectChoices=projects.map(p=>{
  const name=String(p.name||'Untitled project').trim();
  const key=name.toLocaleLowerCase();
  const duplicate=(nameCounts.get(key)||0)>1;
  const meta=[p.category,p.status].filter(Boolean).join(' · ');
  let label=duplicate&&meta?`${name} — ${meta}`:name;
  const normalized=label.toLocaleLowerCase();
  const count=(seen.get(normalized)||0)+1;seen.set(normalized,count);
  if(count>1||duplicate&&!meta){label=`${label} · ${count}`;}
  return {id:p.id,name,label,category:p.category||'',status:p.status||'',dueDate:p.dueDate||''};
 });
 return {project:projectChoices,member:team.map(t=>({id:t.id,name:t.name}))};
}
