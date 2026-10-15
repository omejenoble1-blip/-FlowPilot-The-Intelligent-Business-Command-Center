import { database } from '../services/database.js';
import { logger } from '../core/logger.js';
export async function initializeDatabase(){try{const status=await database.ready();if(!status.persistent)logger.warn('IndexedDB is unavailable; using temporary in-memory storage. Data will not persist after closing this page.');return status;}catch(error){logger.error('Database initialization failed',error);throw new Error('FlowPilot could not initialize its local database. Try reloading in a modern browser.');}}
