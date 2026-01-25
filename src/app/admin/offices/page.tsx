'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { fetchAPI } from '@/lib/api';
import { toast } from 'sonner';
import { useAdminModal } from '@/components/admin/AdminModalProvider';

export default function AdminOfficesPage() {
  const router = useRouter();
  const [offices, setOffices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { confirmAction, showAlert } = useAdminModal();

  useEffect(() => {
    loadOffices();
  }, []);

  async function loadOffices() {
    try {
      const data = await fetchAPI('/admin/offices', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setOffices(data);
    } catch (error) {
      toast.error('Failed to load offices');
    } finally {
      setLoading(false);
    }
  }

  async function deleteOffice(id: string) {
    const confirmed = await confirmAction({
      title: 'Delete this office?',
      description: 'This action cannot be undone.',
      confirmText: 'Delete',
    });
    if (!confirmed) return;

    try {
      await fetchAPI(`/admin/offices/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success('Office deleted successfully');
      loadOffices();
    } catch (error: any) {
      await showAlert({
        title: 'Failed to delete office',
        description: error.message,
      });
    }
  }

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Office Locations</h1>
          <p className="text-muted-foreground mt-2">Manage your office locations across Nigeria</p>
        </div>
        <Button onClick={() => router.push('/admin/offices/new')}>Add New Office</Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No offices found. Click "Add New Office" to create one.
                </TableCell>
              </TableRow>
            ) : (
              offices.map((office) => (
                <TableRow key={office.id}>
                  <TableCell className="font-mono text-sm">{office.id}</TableCell>
                  <TableCell className="font-medium">{office.state}</TableCell>
                  <TableCell className="max-w-xs truncate">{office.address}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{office.emails?.[0] || 'N/A'}</div>
                      <div className="text-muted-foreground">{office.phones?.[0] || 'N/A'}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">Active</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/admin/offices/${office.id}/edit`)}
                      >
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteOffice(office.id)}>
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
