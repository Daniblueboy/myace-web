'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchAPI } from '@/lib/api';
import { toast } from 'sonner';
import { useAdminModal } from '@/components/admin/AdminModalProvider';

export default function AdminResourcesPage() {
  const router = useRouter();
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { confirmAction, showAlert } = useAdminModal();

  useEffect(() => {
    loadResources();
  }, []);

  async function loadResources() {
    try {
      const data = await fetchAPI('/admin/resources', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setResources(data);
    } catch (error) {
      toast.error('Failed to load resources');
    } finally {
      setLoading(false);
    }
  }

  async function deleteResource(id: string) {
    const confirmed = await confirmAction({
      title: 'Delete this resource?',
      description: 'This action cannot be undone.',
      confirmText: 'Delete',
    });
    if (!confirmed) return;

    try {
      await fetchAPI(`/admin/resources/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success('Resource deleted');
      loadResources();
    } catch (error: any) {
      await showAlert({
        title: 'Failed to delete resource',
        description: error.message,
      });
    }
  }

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Resources</h1>
          <p className="text-muted-foreground mt-2">Manage downloadable resources and guides</p>
        </div>
        <Button onClick={() => router.push('/admin/resources/new')}>Add Resource</Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Estate</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  No resources found.
                </TableCell>
              </TableRow>
            ) : (
              resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">{resource.title}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {resource.estate?.name || 'All Estates'}
                  </TableCell>
                  <TableCell>{resource.fileType}</TableCell>
                  <TableCell>{resource.sortOrder}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/admin/resources/${resource.id}/edit`)}
                      >
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteResource(resource.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
