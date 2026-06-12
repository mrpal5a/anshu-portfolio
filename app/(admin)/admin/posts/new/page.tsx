'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { estimateReadTime, slugify } from '@/lib/utils';

export default function AdminNewPostPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [published, setPublished] = useState(false);
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

    const response = await fetch('/api/admin/posts', {
      method: 'POST',
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
      setError(data.error || 'Could not create post.');
      return;
    }

    router.push('/admin/posts');
    router.refresh();
  };

  return (
    <div className="min-h-screen px-6 md:px-12 py-12 max-w-3xl mx-auto">
      <div className="mb-10">
        <p className="font-mono text-xs text-text-muted uppercase tracking-[0.15em] mb-2">Blog</p>
        <h1 className="font-display text-3xl">Create Blog Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
          <div>
            <label className="label">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="form-input"
              placeholder="Enter post title"
            />
          </div>
          <div>
            <label className="label">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={e => setSlug(e.target.value)}
              className="form-input"
              placeholder={suggestedSlug || 'Auto-generated from title'}
            />
          </div>
        </div>

        <div>
          <label className="label">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
            className="form-input min-h-[120px]"
            placeholder="Short summary for previews"
          />
        </div>

        <div>
          <label className="label">Content</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            className="form-input min-h-[260px]"
            placeholder="Write the full blog content here"
          />
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
            <input
              type="url"
              value={coverUrl}
              onChange={e => setCoverUrl(e.target.value)}
              className="form-input"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <label className="label">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={e => setTags(e.target.value)}
              className="form-input"
              placeholder="comma, separated, tags"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={published}
              onChange={e => setPublished(e.target.checked)}
              className="form-checkbox"
            />
            Publish immediately
          </label>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button type="submit" disabled={loading || uploading} className="btn-primary">
          {loading ? 'Saving...' : uploading ? 'Uploading image...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}
