import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import DeleteProjectButton from '@/components/ui/DeleteProjectButton';
import type { Project } from '@/types/database';

export default async function AdminProjectsPage() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('order_index') as { data: Project[] | null };

  return (
    <div className="min-h-screen px-6 md:px-12 py-12 max-w-[900px] mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <Link href="/admin" className="font-mono text-xs text-text-muted hover:text-accent mb-2 block">← Dashboard</Link>
          <h1 className="font-display text-3xl">Projects</h1>
        </div>
        <Link href="/admin/projects/new" className="btn-primary">+ Add Project</Link>
      </div>

      {(!projects || projects.length === 0) ? (
        <div className="text-center py-20 border border-dashed border-border rounded-sm">
          <p className="text-text-muted mb-4">No projects added yet.</p>
          <Link href="/admin/projects/new" className="btn-primary">Add First Project</Link>
        </div>
      ) : (
        <div className="space-y-0 divide-y divide-border border-t border-b border-border">
          {projects.map(p => (
            <div key={p.id} className="flex items-center justify-between py-4 gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-text truncate">{p.title}</h3>
                  {p.featured && <span className="meta-tag text-accent border-accent/30">Featured</span>}
                </div>
                {p.tech_stack && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {p.tech_stack.slice(0, 3).map((t: string) => (
                      <span key={t} className="font-mono text-[0.65rem] text-text-subtle">{t}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link href={`/admin/projects/${p.id}`} className="btn-outline !py-1.5 !px-3 text-xs">Edit</Link>
                <DeleteProjectButton id={p.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
