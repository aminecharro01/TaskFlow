import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Ctx) {
  const { id } = await params;
  const db = readDB();
  const project = db.projects.find((p) => p.id === id);
  if (!project) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function PUT(request: Request, { params }: Ctx) {
  const { id } = await params;
  const body = await request.json();
  const db = readDB();
  const i = db.projects.findIndex((p) => p.id === id);
  if (i === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  db.projects[i] = {
    ...db.projects[i],
    name: body.name ?? db.projects[i].name,
    color: body.color ?? db.projects[i].color,
  };
  writeDB(db);
  return NextResponse.json(db.projects[i]);
}

export async function DELETE(_request: Request, { params }: Ctx) {
  const { id } = await params;
  const db = readDB();
  const before = db.projects.length;
  db.projects = db.projects.filter((p) => p.id !== id);
  if (db.projects.length === before) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  writeDB(db);
  return new NextResponse(null, { status: 204 });
}
