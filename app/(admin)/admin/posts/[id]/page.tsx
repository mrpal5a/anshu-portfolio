import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import type { Post } from '@/types/database';
import EditPostForm from '../EditPostForm';

export default async function AdminEditPostPage({ params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', params.id)
    .maybeSingle();

  const post = data as Post | null;

  if (error || !post) redirect('/admin/posts');

  return (
    <div className="min-h-screen px-6 md:px-12 py-12 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <Link href="/admin/posts" className="font-mono text-xs text-text-muted hover:text-accent mb-2 block">← Back to posts</Link>
          <h1 className="font-display text-3xl">Edit Blog Post</h1>
        </div>
        <span className="font-mono text-xs text-text-muted">Post ID: {post.id}</span>
      </div>
      <EditPostForm post={post} />
    </div>
  );
}
