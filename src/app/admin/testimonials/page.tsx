'use client';

import { useEffect, useState } from 'react';
import { fetchAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Plus, Trash, Edit } from 'lucide-react';
import Link from 'next/link';
import { useAdminModal } from '@/components/admin/AdminModalProvider';

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { confirmAction, showAlert } = useAdminModal();

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      setLoading(true);
      const data = await fetchAPI('/admin/testimonials', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setItems(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = await confirmAction({
      title: 'Delete this testimonial?',
      description: 'This action cannot be undone.',
      confirmText: 'Delete',
    });
    if (!confirmed) return;
    try {
      await fetchAPI(`/admin/testimonials/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setItems(items.filter((item) => item.id !== id));
    } catch (e) {
      await showAlert({ title: 'Failed to delete testimonial' });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Testimonials</h2>
          <p className="text-muted-foreground">Manage customer testimonials on the homepage.</p>
        </div>
        <Link href="/admin/testimonials/new">
          <Button><Plus className="w-4 h-4 mr-2" /> Add Testimonial</Button>
        </Link>
      </div>

      <div className="border rounded-lg bg-white overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-3 font-medium text-slate-500">Name</th>
              <th className="px-6 py-3 font-medium text-slate-500">Message</th>
              <th className="px-6 py-3 font-medium text-slate-500">Rating</th>
              <th className="px-6 py-3 font-medium text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-500">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-500">No testimonials found.</td></tr>
            ) : items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium">{item.name}</td>
                <td className="px-6 py-4 truncate max-w-md">{item.message}</td>
                <td className="px-6 py-4">{item.rating || '-'}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Link href={`/admin/testimonials/${item.id}/edit`}>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4 text-blue-500" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                    <Trash className="w-4 h-4 text-red-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
