import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Accueil</h1>
      <p>
        <Link href="/dashboard">Dashboard</Link>
      </p>
      <p>
        <Link href="/login">Login</Link>
      </p>
    </div>
  );
}
