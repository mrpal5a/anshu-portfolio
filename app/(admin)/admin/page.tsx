import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export default async function AdminDashboard() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch counts
  let postCount = 0, projectCount = 0, messageCount = 0, unreadCount = 0;
  try {
    const [{ count: pc }, { count: prc }, { count: mc }, { count: uc }] = await Promise.all([
      supabase.from('posts').select('*', { count: 'exact', head: true }),
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase.from('messages').select('*', { count: 'exact', head: true }),
      supabase.from('messages').select('*', { count: 'exact', head: true }).eq('read', false),
    ]);
    postCount = pc ?? 0;
    projectCount = prc ?? 0;
    messageCount = mc ?? 0;
    unreadCount = uc ?? 0;
  } catch {}

  const stats = [
    { label: 'Blog Posts', value: postCount, href: '/admin/posts', action: 'Manage Posts' },
    { label: 'Projects', value: projectCount, href: '/admin/projects', action: 'Manage Projects' },
    { label: 'Messages', value: messageCount, href: '/admin/messages', action: 'View Messages', badge: unreadCount },
  ];

  return (
    <div className="min-h-screen px-6 md:px-12 py-12">
      <div className="max-w-[900px] mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="font-display text-3xl mb-1">Dashboard</h1>
            <p className="text-text-muted text-sm">Welcome back, Anshu.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="btn-outline !py-2 !px-4 text-xs" target="_blank">
              View Site ↗
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {stats.map(s => (
            <div key={s.label} className="bg-bg-2 border border-border rounded-sm p-6">
              <div className="font-display text-4xl text-accent mb-1 flex items-start gap-2">
                {s.value}
                {s.badge ? (
                  <span className="text-xs bg-accent text-bg px-1.5 py-0.5 rounded font-mono font-normal mt-1">
                    {s.badge} new
                  </span>
                ) : null}
              </div>
              <div className="font-mono text-xs text-text-muted uppercase tracking-[0.1em] mb-4">{s.label}</div>
              <Link href={s.href} className="text-xs text-accent hover:text-accent-light transition-colors font-mono tracking-[0.08em]">
                {s.action} →
              </Link>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="bg-bg-2 border border-border rounded-sm p-6">
          <h2 className="font-mono text-xs text-text-muted uppercase tracking-[0.15em] mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/posts/new" className="btn-primary !py-2 !px-5 text-xs">+ New Blog Post</Link>
            <Link href="/admin/projects/new" className="btn-outline !py-2 !px-5 text-xs">+ New Project</Link>
            <Link href="/admin/messages" className="btn-outline !py-2 !px-5 text-xs">View Messages</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoutButton() {
  return (
    <form action="/api/auth/logout" method="POST">
      <button type="submit" className="btn-outline !py-2 !px-4 text-xs">Sign Out</button>
    </form>
  );
}
