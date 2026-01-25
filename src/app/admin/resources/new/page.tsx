'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { fetchAPI } from '@/lib/api';
import { toast } from 'sonner';

export default function NewResourcePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [estates, setEstates] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    fileType: 'PDF',
    sortOrder: 0,
    estateId: '',
  });

  useEffect(() => {
    fetchAPI('/admin/estates', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(setEstates)
      .catch(() => setEstates([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetchAPI('/admin/resources', {
        method: 'POST',
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
      toast.success('Resource created');
      router.push('/admin/resources');
    } catch (error: any) {
      toast.error('Failed to create resource', { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Add Resource</h1>

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
              {loading ? 'Creating...' : 'Create Resource'}
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
