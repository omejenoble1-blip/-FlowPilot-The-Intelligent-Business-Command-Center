import { initializeDatabase } from './initialize-database.js';
import { applyTheme,getInitialTheme } from '../modules/settings/theme-settings.js';
export async function initializeApp(){const database=await initializeDatabase();const theme=applyTheme(getInitialTheme());return {database,theme};}
