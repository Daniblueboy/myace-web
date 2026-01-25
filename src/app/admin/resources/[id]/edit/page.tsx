'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { fetchAPI } from '@/lib/api';
import { toast } from 'sonner';

export default function EditResourcePage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [estates, setEstates] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    fileType: '',
    sortOrder: 0,
    estateId: '',
  });

  useEffect(() => {
    if (!params?.id) return;
    fetchAPI('/admin/estates', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(setEstates)
      .catch(() => setEstates([]));
    fetchAPI(`/admin/resources/${params.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((resource) => {
        setFormData({
          title: resource.title || '',
          url: resource.url || '',
          fileType: resource.fileType || '',
          sortOrder: resource.sortOrder || 0,
          estateId: resource.estateId || '',
        });
      })
      .catch(() => toast.error('Failed to load resource'));
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!params?.id) return;
    setLoading(true);
    try {
      await fetchAPI(`/admin/resources/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          ...formData,
          sortOrder: Number(formData.sortOrder),
          estateId: formData.estateId || null,
        }),
      });
      toast.success('Resource updated');
      router.push('/admin/resources');
    } catch (error: any) {
      toast.error('Failed to update resource', { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Edit Resource</h1>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>Title</Label>
            <Input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <Label>URL</Label>
            <Input
              required
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            />
          </div>
          <div>
            <Label>File Type</Label>
            <Input
              value={formData.fileType}
              onChange={(e) => setFormData({ ...formData, fileType: e.target.value })}
            />
          </div>
          <div>
            <Label>Estate (optional)</Label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.estateId}
              onChange={(e) => setFormData({ ...formData, estateId: e.target.value })}
            >
              <option value="">All Estates</option>
              {estates.map((estate) => (
                <option key={estate.id} value={estate.id}>
                  {estate.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Sort Order</Label>
            <Input
              type="number"
              value={formData.sortOrder}
              onChange={(e) => setFormData({ ...formData, sortOrder: Number(e.target.value) })}
            />
          </div>
          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
