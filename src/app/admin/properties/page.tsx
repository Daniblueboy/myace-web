'use client';

import { useEffect, useState } from 'react';
import { Property } from '@/shared';
import { fetchAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useAdminModal } from '@/components/admin/AdminModalProvider';

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { confirmAction, showAlert } = useAdminModal();

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    try {
      setLoading(true);
      const data = await fetchAPI('/admin/properties', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProperties(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = await confirmAction({
      title: 'Delete this offering?',
      description: 'This action cannot be undone.',
      confirmText: 'Delete',
    });
    if (!confirmed) return;
    try {
      await fetchAPI(`/admin/properties/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProperties(properties.filter(p => p.id !== id));
    } catch (e) {
      console.error('Failed to delete', e);
      await showAlert({ title: 'Failed to delete offering' });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-3xl font-bold tracking-tight">Offerings</h2>
           <p className="text-muted-foreground">Manage estate offerings and unit types.</p>
        </div>
        <Link href="/admin/properties/new">
          <Button><Plus className="w-4 h-4 mr-2"/> Add Offering</Button>
        </Link>
      </div>

      <div className="border rounded-lg bg-white overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-3 font-medium text-slate-500">Title</th>
              <th className="px-6 py-3 font-medium text-slate-500">Location</th>
              <th className="px-6 py-3 font-medium text-slate-500">Type</th>
              <th className="px-6 py-3 font-medium text-slate-500">Status</th>
              <th className="px-6 py-3 font-medium text-slate-500">Price</th>
              <th className="px-6 py-3 font-medium text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">Loading...</td>
              </tr>
            ) : properties.length === 0 ? (
               <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">No properties found.</td>
              </tr>
            ) : (
              properties.map((prop) => (
                <tr key={prop.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">
                     <div className="flex flex-col">
                       <span>{prop.title}</span>
                       <span className="text-xs text-slate-400">{prop.slug}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4">{prop.city}, {prop.state}</td>
                  <td className="px-6 py-4"><Badge variant="outline">{prop.type}</Badge></td>
                  <td className="px-6 py-4">
                    <Badge variant={prop.status === 'AVAILABLE' ? 'default' : 'secondary'}>
                      {prop.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">{prop.currency} {Number(prop.price).toLocaleString()}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link href={`/properties/${prop.slug}`} target="_blank">
                       <Button variant="ghost" size="icon"><ExternalLink className="w-4 h-4"/></Button>
                    </Link>
                    <Link href={`/admin/properties/${prop.id}/edit`}>
                       <Button variant="ghost" size="icon"><Edit className="w-4 h-4 text-blue-500"/></Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(prop.id)}>
                      <Trash className="w-4 h-4 text-red-500"/>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
