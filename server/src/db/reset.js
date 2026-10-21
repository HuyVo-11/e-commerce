import fs from 'node:fs';
import path from 'node:path';

import { env } from '../config/env.js';

const serverRoot = path.resolve(import.meta.dirname, '../..');
const dbFile = path.resolve(serverRoot, env.dbPath);

for (const suffix of ['', '-wal', '-shm']) {
    fs.rmSync(`${dbFile}${suffix}`, { force: true });
}

console.log(`Đã xóa database cũ: ${dbFile}`);

await import('./migrate.js');
await import('./seed.js');
