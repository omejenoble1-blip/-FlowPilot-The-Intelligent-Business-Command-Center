import { readdir,readFile } from 'node:fs/promises';
import { resolve,relative } from 'node:path';
const root=resolve('.');let count=0;const errors=[];
async function walk(dir){for(const ent of await readdir(dir,{withFileTypes:true})){const p=resolve(dir,ent.name);if(ent.isDirectory())await walk(p);else if(p.endsWith('.js')){count++;const src=await readFile(p,'utf8');for(const match of src.matchAll(/(?:from\s*|import\s*\()\s*['"](\.[^'"]+)['"]/g)){const target=resolve(p,'..',match[1]);try{await readFile(target);}catch{errors.push(`${relative(root,p)}: missing import ${match[1]}`);}}}}}
await walk(resolve('js'));if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`Checked ${count} JavaScript modules for local import targets.`);
