import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import LogoutButton from './components/LogoutButton';
import './globals.css';

export const metadata: Metadata = {
  title: 'TaskFlow',
  description: 'TaskFlow',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  let user: { name?: string } | null = null;
  if (session?.value) {
    try {
      user = JSON.parse(session.value);
    } catch {
      user = null;
    }
  }

  return (
    <html lang="fr">
      <body>
        <header
          style={{
            background: '#1B8C3E',
            color: 'white',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
            <h2 style={{ margin: 0 }}>TaskFlow</h2>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {user && <span>{user.name}</span>}
            {user && <LogoutButton />}
            {!user && (
              <a href="/login" style={{ color: 'white' }}>
                Login
              </a>
            )}
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
