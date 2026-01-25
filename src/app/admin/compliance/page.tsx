'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import { toast } from 'sonner';
import Link from 'next/link';
import { useAdminModal } from '@/components/admin/AdminModalProvider';

export default function AdminCompliancePage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { confirmAction, showAlert } = useAdminModal();

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      const data = await fetchAPI('/admin/compliance', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setItems(data);
    } catch (error) {
      toast.error('Failed to load compliance items');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = await confirmAction({
      title: 'Delete this compliance item?',
      description: 'This action cannot be undone.',
      confirmText: 'Delete',
    });
    if (!confirmed) return;

    try {
      await fetchAPI(`/admin/compliance/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success('Item deleted successfully');
      loadItems();
    } catch (error) {
      await showAlert({ title: 'Failed to delete item' });
    }
  }

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Compliance & Certificates</h1>
          <p className="text-muted-foreground mt-2">
            Manage government registrations, certifications, and legal documents
          </p>
        </div>
        <Link href="/admin/compliance/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Add New
          </Button>
        </Link>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Registration No</TableHead>
              <TableHead>Issued By</TableHead>
              <TableHead>Display on Home</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  No compliance items found
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.type.replace('_', ' ')}</Badge>
                  </TableCell>
                  <TableCell>{item.registrationNo || 'N/A'}</TableCell>
                  <TableCell>{item.issuedBy || 'N/A'}</TableCell>
                  <TableCell>
                    {item.displayOnHome ? (
                      <Badge variant="secondary">Yes</Badge>
                    ) : (
                      <span className="text-muted-foreground">No</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.active ? (
                      <Badge className="bg-green-600">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/compliance/${item.id}/edit`}>
                        <Button variant="outline" size="icon">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
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
