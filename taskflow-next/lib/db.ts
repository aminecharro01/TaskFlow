import fs from 'fs';
import path from 'path';

export type ProjectRow = { id: string; name: string; color: string };

export type DbShape = {
  projects: ProjectRow[];
  columns: { id: string; title: string; tasks: string[] }[];
  users?: { id: string; email: string; password: string; name: string }[];
};

const DB_PATH = path.join(process.cwd(), 'db.json');

export function readDB(): DbShape {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

export function writeDB(data: DbShape) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}
