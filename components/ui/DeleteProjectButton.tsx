'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteProjectButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data?.error || 'Failed to delete project.');
      } else {
        router.refresh();
      }
    } catch {
      alert('Failed to delete project.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="btn-outline !py-1.5 !px-3 text-xs text-red-400"
      disabled={loading}
    >
      {loading ? 'Deleting…' : 'Delete'}
    </button>
  );
}
