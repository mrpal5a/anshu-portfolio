import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <div
          className="font-display leading-none mb-6 select-none"
          style={{ fontSize: '10rem', color: 'rgba(240,237,230,0.05)' }}
        >
          404
        </div>
        <h1 className="font-display text-3xl mb-3">Page not found</h1>
        <p className="text-text-muted mb-8">The page you are looking for does not exist.</p>
        <Link href="/" className="btn-primary">← Go Home</Link>
      </div>
    </div>
  );
}
