import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import type { Project } from '@/types/database';
import EditProjectForm from '../EditProjectForm';

export default async function AdminEditProjectPage({ params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .maybeSingle();

  const project = data as Project | null;

  if (error || !project) redirect('/admin/projects');

  return (
    <div className="min-h-screen px-6 md:px-12 py-12 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <Link href="/admin/projects" className="font-mono text-xs text-text-muted hover:text-accent mb-2 block">← Back to projects</Link>
          <h1 className="font-display text-3xl">Edit Project</h1>
        </div>
        <span className="font-mono text-xs text-text-muted">Project ID: {project.id}</span>
      </div>
      <EditProjectForm project={project} />
    </div>
  );
}
