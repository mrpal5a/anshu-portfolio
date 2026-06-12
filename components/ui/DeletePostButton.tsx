'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeletePostButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm('Delete this post? This cannot be undone.')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data?.error || 'Failed to delete post');
      } else {
        router.refresh();
      }
    } catch {
      alert('Failed to delete post');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="btn-outline !py-1.5 !px-3 text-xs text-red-400"
      disabled={loading}
    >
      {loading ? 'Deleting…' : 'Delete'}
    </button>
  );
}
