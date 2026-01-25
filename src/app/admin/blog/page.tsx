'use client';

import { useEffect, useState } from 'react';
import { fetchAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import { useAdminModal } from '@/components/admin/AdminModalProvider';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { confirmAction, showAlert } = useAdminModal();

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      setLoading(true);
      const data = await fetchAPI('/admin/blog?take=50', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPosts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = await confirmAction({
      title: 'Delete this blog post?',
      description: 'This action cannot be undone.',
      confirmText: 'Delete',
    });
    if (!confirmed) return;
    try {
      await fetchAPI(`/admin/blog/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPosts(posts.filter(p => p.id !== id));
    } catch (e) {
      console.error('Failed to delete', e);
      await showAlert({ title: 'Failed to delete post' });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-3xl font-bold tracking-tight">Blog Posts</h2>
           <p className="text-muted-foreground">Manage your articles and content.</p>
        </div>
        <Link href="/admin/blog/new">
          <Button><Plus className="w-4 h-4 mr-2"/> Add Post</Button>
        </Link>
      </div>

      <div className="border rounded-lg bg-white overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-3 font-medium text-slate-500">Title</th>
              <th className="px-6 py-3 font-medium text-slate-500">Date</th>
              <th className="px-6 py-3 font-medium text-slate-500">Status</th>
              <th className="px-6 py-3 font-medium text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">Loading...</td>
              </tr>
            ) : posts.length === 0 ? (
               <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">No blog posts found.</td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">
                     <div className="flex flex-col">
                       <span>{post.title}</span>
                       <span className="text-xs text-slate-400">{post.slug}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4">{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <Badge variant={post.published ? 'default' : 'secondary'}>
                      {post.published ? 'Published' : 'Draft'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link href={`/admin/blog/${post.id}/edit`}>
                       <Button variant="ghost" size="icon"><Edit className="w-4 h-4 text-blue-500"/></Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)}>
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
