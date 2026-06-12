'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Project } from '@/types/database';
import { slugify } from '@/lib/utils';

export default function EditProjectForm({ project }: { project: Project }) {
  const [title, setTitle] = useState(project.title);
  const [slug, setSlug] = useState(project.slug);
  const [description, setDescription] = useState(project.description || '');
  const [content, setContent] = useState(project.content || '');
  const [techStack, setTechStack] = useState(project.tech_stack?.join(', ') || '');
  const [imageUrl, setImageUrl] = useState(project.image_url || '');
  const [liveUrl, setLiveUrl] = useState(project.live_url || '');
  const [featured, setFeatured] = useState(project.featured);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const suggestedSlug = useMemo(() => slugify(title || ''), [title]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'projects');

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Upload failed.');

      setImageUrl(data.url);
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

    const response = await fetch(`/api/admin/projects/${project.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        slug: slug || suggestedSlug,
        description,
        content,
        tech_stack: techStack,
        image_url: imageUrl,
        live_url: liveUrl,
        featured,
      }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error || 'Could not update project.');
      return;
    }

    router.push('/admin/projects');
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
        <label className="label">Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} className="form-input min-h-[120px]" />
      </div>

      <div>
        <label className="label">Content</label>
        <textarea value={content} onChange={e => setContent(e.target.value)} className="form-input min-h-[220px]" />
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
        <div>
          <label className="label">Tech stack</label>
          <input type="text" value={techStack} onChange={e => setTechStack(e.target.value)} className="form-input" placeholder="React, Supabase, Tailwind" />
        </div>
        <div>
          <label className="label">Image</label>
          <input type="file" accept="image/*" onChange={handleUpload} className="form-input" />
          <p className="text-xs text-text-muted mt-2">Upload an image here, or paste a public URL below.</p>
        </div>
        <div>
          <label className="label">Image URL</label>
          <input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="form-input" placeholder="https://example.com/project.png" />
        </div>
      </div>

      <div>
        <label className="label">Live project URL</label>
        <input type="url" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} className="form-input" placeholder="https://example.com" />
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} className="form-checkbox" />
          Mark as featured
        </label>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
      <button type="submit" disabled={loading || uploading} className="btn-primary">
        {loading ? 'Saving...' : uploading ? 'Uploading image...' : 'Update Project'}
      </button>
    </form>
  );
}
