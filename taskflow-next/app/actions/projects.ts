'use server';

import { revalidatePath } from 'next/cache';

function apiBase() {
  return process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
}

export async function addProject(formData: FormData) {
  const name = formData.get('name') as string;
  const color = formData.get('color') as string;
  await fetch(`${apiBase()}/api/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, color }),
  });
  revalidatePath('/dashboard');
}

export async function renameProject(formData: FormData) {
  const id = formData.get('id') as string;
  const newName = (formData.get('newName') as string)?.trim();
  if (!newName) return;
  const base = apiBase();
  const cur = await fetch(`${base}/api/projects/${id}`);
  if (!cur.ok) return;
  const project = await cur.json();
  await fetch(`${base}/api/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newName, color: project.color }),
  });
  revalidatePath('/dashboard');
}

export async function deleteProject(formData: FormData) {
  const id = formData.get('id') as string;
  await fetch(`${apiBase()}/api/projects/${id}`, { method: 'DELETE' });
  revalidatePath('/dashboard');
}
