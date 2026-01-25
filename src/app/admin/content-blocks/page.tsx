'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { fetchAPI } from '@/lib/api';
import { toast } from 'sonner';
import { useAdminModal } from '@/components/admin/AdminModalProvider';

export default function AdminContentBlocksPage() {
  const router = useRouter();
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { confirmAction, showAlert } = useAdminModal();

  useEffect(() => {
    loadBlocks();
  }, []);

  async function loadBlocks() {
    try {
      const data = await fetchAPI('/admin/content-blocks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setBlocks(data);
    } catch (error) {
      toast.error('Failed to load content blocks');
    } finally {
      setLoading(false);
    }
  }

  async function deleteBlock(id: string) {
    const confirmed = await confirmAction({
      title: 'Delete this content block?',
      description: 'This action cannot be undone.',
      confirmText: 'Delete',
    });
    if (!confirmed) return;

    try {
      await fetchAPI(`/admin/content-blocks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      toast.success('Content block deleted');
      loadBlocks();
    } catch (error: any) {
      await showAlert({
        title: 'Failed to delete block',
        description: error.message,
      });
    }
  }

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Content Blocks</h1>
          <p className="text-muted-foreground mt-2">Manage editable page sections</p>
        </div>
        <Button onClick={() => router.push('/admin/content-blocks/new')}>Add Content Block</Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Key</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blocks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No content blocks found.
                </TableCell>
              </TableRow>
            ) : (
              blocks.map((block) => (
                <TableRow key={block.id}>
                  <TableCell className="font-mono text-sm">{block.key}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{block.section}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{block.title}</TableCell>
                  <TableCell>{block.displayOrder}</TableCell>
                  <TableCell>
                    <Badge variant={block.active ? 'default' : 'secondary'}>
                      {block.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/admin/content-blocks/${block.id}/edit`)}
                      >
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteBlock(block.id)}>
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
