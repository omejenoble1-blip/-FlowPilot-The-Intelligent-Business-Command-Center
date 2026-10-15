import { database } from '../services/database.js';
import { storage } from '../services/storage-service.js';
import { makeId } from '../utils/ids.js';
export async function createProfile({name,workspace='',email=''}){if(!String(name||'').trim())throw new Error('Enter your full name to continue.');if(!String(workspace||'').trim())throw new Error('Enter a workspace or business name to continue.');const profile={id:makeId('profile'),name:String(name).trim(),workspace:String(workspace).trim(),email:String(email||'').trim(),onboardingCompleted:true,createdAt:new Date().toISOString()};await database.put('profiles',profile);storage.set('activeProfileId',profile.id);return profile;}
export async function getActiveProfile(){const id=storage.get('activeProfileId');if(!id)return null;return database.get('profiles',id);}
export async function listProfiles(){return database.getAll('profiles');}
export async function selectProfile(id){const profile=await database.get('profiles',id);if(!profile)throw new Error('That local profile could not be found.');storage.set('activeProfileId',id);return profile;}
export function signOut(){storage.remove('activeProfileId');}
