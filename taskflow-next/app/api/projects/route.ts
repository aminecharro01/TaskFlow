import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET() {
  const db = readDB();
  return NextResponse.json(db.projects);
}

export async function POST(request: Request) {
  const body = await request.json();
  const db = readDB();
  const newProject = {
    id: String(Date.now()),
    name: body.name,
    color: body.color,
  };
  db.projects.push(newProject);
  writeDB(db);
  return NextResponse.json(newProject, { status: 201 });
}
