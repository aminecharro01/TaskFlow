import Link from 'next/link';
import { notFound } from 'next/navigation';

function apiBase() {
  return process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(`${apiBase()}/api/projects/${id}`, { cache: 'no-store' });
  if (res.status === 404) notFound();
  const p = await res.json();

  return (
    <div style={{ padding: '2rem' }}>
      <p>
        <Link href="/dashboard">← Dashboard</Link>
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: p.color,
            display: 'inline-block',
          }}
        />
        <h1 style={{ margin: 0 }}>{p.name}</h1>
      </div>
      <p>ID : {p.id}</p>
    </div>
  );
}
