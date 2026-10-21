import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import Database from 'better-sqlite3';

import { env } from '../config/env.js';

const serverRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const dbFile = path.resolve(serverRoot, env.dbPath);

fs.mkdirSync(path.dirname(dbFile), { recursive: true });

const db = new Database(dbFile);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

export { dbFile };
export default db;
