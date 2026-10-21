import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import db from './database.js';

const migrationsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'migrations');

db.exec(`
    CREATE TABLE IF NOT EXISTS _migrations (
        name       TEXT PRIMARY KEY,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
`);

const applied = new Set(
    db.prepare('SELECT name FROM _migrations').all().map(row => row.name)
);

const files = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort();

const applyMigration = db.transaction((name, sql) => {
    db.exec(sql);
    db.prepare('INSERT INTO _migrations (name) VALUES (?)').run(name);
});

let count = 0;

for (const file of files) {
    if (applied.has(file)) continue;

    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');

    applyMigration(file, sql);
    count += 1;
    console.log(`Đã áp dụng migration: ${file}`);
}

console.log(count === 0 ? 'Không có migration mới.' : `Hoàn tất ${count} migration.`);
