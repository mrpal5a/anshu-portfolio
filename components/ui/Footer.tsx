import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="px-6 md:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div>
        <Link href="/" className="font-display text-lg" style={{ color: 'var(--text)' }}>
          Anshu<span style={{ color: 'var(--accent)' }}>.</span>
        </Link>
        <p className="text-xs mt-1" style={{ color: 'var(--subtle)' }}>Built with Next.js & Supabase. Hosted on Vercel.</p>
      </div>
      <p className="text-xs" style={{ color: 'var(--muted)' }}>© {year} Anshu. All rights reserved.</p>
      <ul className="flex gap-6">
        {[
          { label: 'About',   href: '#about' },
          { label: 'Work',    href: '#projects' },
          { label: 'Blog',    href: '/blog' },
          { label: 'Contact', href: '#contact' },
        ].map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-xs transition-colors hover:text-[color:var(--text)]" style={{ color: 'var(--muted)' }}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
