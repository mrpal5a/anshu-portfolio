'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Post } from '@/types/database';
import { estimateReadTime, slugify } from '@/lib/utils';

export default function EditPostForm({ post }: { post: Post }) {
  const [title, setTitle] = useState(post.title);
  const [slug, setSlug] = useState(post.slug);
  const [excerpt, setExcerpt] = useState(post.excerpt || '');
  const [content, setContent] = useState(post.content);
  const [tags, setTags] = useState(post.tags?.join(', ') || '');
  const [coverUrl, setCoverUrl] = useState(post.cover_url || '');
  const [published, setPublished] = useState(post.published);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const suggestedSlug = useMemo(() => slugify(title || ''), [title]);
  const readTime = useMemo(() => estimateReadTime(content || ''), [content]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'blogs');

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Upload failed.');

      setCoverUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const response = await fetch(`/api/admin/posts/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        slug: slug || suggestedSlug,
        excerpt,
        content,
        cover_url: coverUrl,
        tags,
        published,
      }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error || 'Could not update post.');
      return;
    }

    router.push('/admin/posts');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
        <div>
          <label className="label">Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="form-input" />
        </div>
        <div>
          <label className="label">Slug</label>
          <input type="text" value={slug} onChange={e => setSlug(e.target.value)} className="form-input" placeholder={suggestedSlug || 'Auto-generated from title'} />
        </div>
      </div>

      <div>
        <label className="label">Excerpt</label>
        <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} className="form-input min-h-[120px]" />
      </div>

      <div>
        <label className="label">Content</label>
        <textarea value={content} onChange={e => setContent(e.target.value)} required className="form-input min-h-[260px]" />
        <p className="text-xs text-text-muted mt-2">Estimated read time: {readTime} min</p>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
        <div>
          <label className="label">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleUpload} className="form-input" />
          <p className="text-xs text-text-muted mt-2">Upload an image here, or paste a public URL below.</p>
        </div>
        <div>
          <label className="label">Cover Image URL</label>
          <input type="url" value={coverUrl} onChange={e => setCoverUrl(e.target.value)} className="form-input" />
        </div>
        <div>
          <label className="label">Tags</label>
          <input type="text" value={tags} onChange={e => setTags(e.target.value)} className="form-input" placeholder="comma, separated, tags" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} className="form-checkbox" />
          Publish immediately
        </label>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
      <button type="submit" disabled={loading || uploading} className="btn-primary">
        {loading ? 'Saving...' : uploading ? 'Uploading image...' : 'Update Post'}
      </button>
    </form>
  );
}
