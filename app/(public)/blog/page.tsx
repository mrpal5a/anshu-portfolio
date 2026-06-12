import Link from 'next/link';
import { Metadata } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { formatDate, normalizeSupabaseImageUrl } from '@/lib/utils';
import type { Post } from '@/types/database';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on automation, web development, Google Sheets, and building systems for small businesses.',
};

export const revalidate = 60;

export default async function BlogPage() {
  let posts: Post[] = [];
  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false }) as { data: Post[] | null };
    posts = (data ?? []).map((post) => ({
      ...post,
      cover_url: normalizeSupabaseImageUrl(post.cover_url),
    }));
  } catch {}

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-accent" />
            <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">Writing</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl leading-tight tracking-tight mb-4">
            Blog &amp; <em className="text-accent not-italic">Thoughts</em>
          </h1>
          <p className="text-text-muted max-w-lg leading-relaxed">
            Notes on automation, web development, Google Sheets tricks, and building practical
            systems for real businesses.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-border rounded-sm">
            <p className="font-display text-2xl text-text-muted mb-3">Coming soon.</p>
            <p className="text-text-subtle text-sm">First articles being written.</p>
          </div>
        ) : (
          <div className="space-y-0 divide-y divide-border">
            {posts.map((post, i) => (
              <article key={post.id} className="group py-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <span className="font-mono text-xs text-text-subtle w-6 flex-shrink-0 hidden md:block">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {post.cover_url ? (
                  <Link href={`/blog/${post.slug}`} className="block md:w-52 w-full overflow-hidden rounded-[1rem] border border-border bg-bg-2 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                    <img src={post.cover_url} alt={post.title} className="h-28 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                  </Link>
                ) : null}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags?.slice(0, 3).map(t => (
                      <span key={t} className="meta-tag">{t}</span>
                    ))}
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="font-display text-xl md:text-2xl mb-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  {post.excerpt && (
                    <p className="text-text-muted text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                  )}
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  {post.published_at && (
                    <time className="font-mono text-xs text-text-subtle">
                      {formatDate(post.published_at)}
                    </time>
                  )}
                  {post.read_time && (
                    <span className="font-mono text-xs text-text-subtle">{post.read_time} min</span>
                  )}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-mono text-xs text-accent hover:gap-2 transition-all"
                  >
                    Read →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
