import Link from 'next/link';
import AddProjectForm from './AddProjectForm';
import { deleteProject, renameProject } from '../actions/projects';

function apiBase() {
  return process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
}

export default async function DashboardPage() {
  const res = await fetch(`${apiBase()}/api/projects`, { cache: 'no-store' });
  const projects = await res.json();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <AddProjectForm />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {projects.map((p: { id: string; name: string; color: string }) => (
          <li
            key={p.id}
            style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: p.color,
                display: 'inline-block',
              }}
            />
            <Link href={`/projects/${p.id}`}>{p.name}</Link>
            <form action={renameProject} style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <input type="hidden" name="id" value={p.id} />
              <input
                name="newName"
                defaultValue={p.name}
                required
                style={{ padding: 4, borderRadius: 4, border: '1px solid #ccc' }}
              />
              <button type="submit" style={{ padding: '4px 8px', cursor: 'pointer' }}>
                Renommer
              </button>
            </form>
            <form action={deleteProject} style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={p.id} />
              <button
                type="submit"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                aria-label="Supprimer"
              >
                🗑
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
