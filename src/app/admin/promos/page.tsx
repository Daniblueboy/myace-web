'use client';

import { useEffect, useState } from 'react';
import { fetchAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useAdminModal } from '@/components/admin/AdminModalProvider';

export default function AdminPromosPage() {
  const [promos, setPromos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { confirmAction, showAlert } = useAdminModal();

  useEffect(() => {
    loadPromos();
  }, []);

  async function loadPromos() {
    try {
      setLoading(true);
      const data = await fetchAPI('/admin/promos', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPromos(data);
    } catch (error) {
      toast.error('Failed to load promos');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = await confirmAction({
      title: 'Delete this promo?',
      description: 'This action cannot be undone.',
      confirmText: 'Delete',
    });
    if (!confirmed) return;
    try {
      await fetchAPI(`/admin/promos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success('Promo deleted');
      loadPromos();
    } catch (error: any) {
      await showAlert({
        title: 'Failed to delete promo',
        description: error.message,
      });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-3xl font-bold tracking-tight">Promotions</h2>
           <p className="text-muted-foreground">Manage banners and promotional content.</p>
        </div>
        <Link href="/admin/promos/new">
          <Button><Plus className="w-4 h-4 mr-2"/> Add Promo</Button>
        </Link>
      </div>

      <div className="border rounded-lg bg-white overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-3 font-medium text-slate-500">Title</th>
              <th className="px-6 py-3 font-medium text-slate-500">Placement</th>
              <th className="px-6 py-3 font-medium text-slate-500">Status</th>
              <th className="px-6 py-3 font-medium text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">Loading...</td>
              </tr>
            ) : promos.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">No promos found.</td>
              </tr>
            ) : promos.map((promo) => (
                <tr key={promo.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">{promo.title}</td>
                  <td className="px-6 py-4">{promo.placement}</td>
                  <td className="px-6 py-4">
                    <Badge variant={promo.active ? 'default' : 'secondary'}>
                      {promo.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link href={`/admin/promos/${promo.id}/edit`}>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(promo.id)}>
                      <Trash className="w-4 h-4 text-red-500"/>
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
