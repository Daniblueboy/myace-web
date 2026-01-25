'use client';

import { useEffect, useState } from 'react';
import { fetchAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Plus, Trash, Edit } from 'lucide-react';
import Link from 'next/link';
import { useAdminModal } from '@/components/admin/AdminModalProvider';

export default function AdminEstatesPage() {
  const [estates, setEstates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;
  const { confirmAction, showAlert } = useAdminModal();

  useEffect(() => {
    loadEstates();
  }, [page]);

  async function loadEstates() {
    try {
      setLoading(true);
      const data = await fetchAPI(`/admin/estates?skip=${(page - 1) * limit}&take=${limit}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEstates(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = await confirmAction({
      title: 'Delete this estate?',
      description: 'This action cannot be undone.',
      confirmText: 'Delete',
    });
    if (!confirmed) return;
    try {
      await fetchAPI(`/admin/estates/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEstates(estates.filter((item) => item.id !== id));
    } catch (e) {
      await showAlert({ title: 'Failed to delete estate' });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Estates</h2>
          <p className="text-muted-foreground">Manage estate developments and locations.</p>
        </div>
        <Link href="/admin/estates/new">
          <Button><Plus className="w-4 h-4 mr-2" /> Add Estate</Button>
        </Link>
      </div>

      <div className="border rounded-lg bg-white overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-3 font-medium text-slate-500">Name</th>
              <th className="px-6 py-3 font-medium text-slate-500">Location</th>
              <th className="px-6 py-3 font-medium text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr><td colSpan={3} className="px-6 py-12 text-center text-slate-500">Loading...</td></tr>
            ) : estates.length === 0 ? (
              <tr><td colSpan={3} className="px-6 py-12 text-center text-slate-500">No estates found.</td></tr>
            ) : estates.map((estate) => (
              <tr key={estate.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium">{estate.name}</td>
                <td className="px-6 py-4">{estate.city}, {estate.state}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Link href={`/admin/estates/${estate.id}/edit`}>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4 text-blue-500" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(estate.id)}>
                    <Trash className="w-4 h-4 text-red-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">Page {page}</span>
        <Button variant="outline" onClick={() => setPage((prev) => prev + 1)} disabled={estates.length < limit}>
          Next
        </Button>
      </div>
    </div>
  );
}
