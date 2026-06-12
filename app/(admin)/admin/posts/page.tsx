import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { formatDate } from '@/lib/utils';
import DeletePostButton from '@/components/ui/DeletePostButton';
import type { Post } from '@/types/database';

export default async function AdminPostsPage() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

const { data: posts } = await supabase
  .from('posts')
  .select('id, title, slug, published, published_at, tags, read_time')
  .order('created_at', { ascending: false }) as { data: Post[] | null };
  return (
    <div className="min-h-screen px-6 md:px-12 py-12 max-w-[900px] mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <Link href="/admin" className="font-mono text-xs text-text-muted hover:text-accent mb-2 block">← Dashboard</Link>
          <h1 className="font-display text-3xl">Blog Posts</h1>
        </div>
        <Link href="/admin/posts/new" className="btn-primary">+ New Post</Link>
      </div>

      {(!posts || posts.length === 0) ? (
        <div className="text-center py-20 border border-dashed border-border rounded-sm">
          <p className="text-text-muted mb-4">No posts yet.</p>
          <Link href="/admin/posts/new" className="btn-primary">Write First Post</Link>
        </div>
      ) : (
        <div className="space-y-0 divide-y divide-border border-t border-b border-border">
          {posts.map(post => (
            <div key={post.id} className="flex items-center justify-between py-4 gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-text truncate">{post.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`font-mono text-xs ${post.published ? 'text-green-400' : 'text-text-muted'}`}>
                    {post.published ? '● Published' : '○ Draft'}
                  </span>
                  {post.published_at && (
                    <span className="font-mono text-xs text-text-subtle">{formatDate(post.published_at)}</span>
                  )}
                  {post.read_time && (
                    <span className="font-mono text-xs text-text-subtle">{post.read_time} min</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {post.published && (
                  <Link href={`/blog/${post.slug}`} target="_blank" className="font-mono text-xs text-text-muted hover:text-accent">
                    View ↗
                  </Link>
                )}
                <Link href={`/admin/posts/${post.id}`} className="btn-outline !py-1.5 !px-3 text-xs">
                  Edit
                </Link>
                <DeletePostButton id={post.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
