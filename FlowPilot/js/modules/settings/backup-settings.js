import { database,STORE_NAMES } from '../../services/database.js';
import { parseBackup } from '../../services/import-service.js';
import { exportJSON } from '../../services/export-service.js';
export async function downloadBackup(){const data=Object.fromEntries(await Promise.all(STORE_NAMES.map(async n=>[n,await database.getAll(n)])));exportJSON(data);}
export async function importBackup(file){const data=await parseBackup(file);await database.replaceAll(data);return Object.values(data).reduce((s,rows)=>s+rows.length,0);}
