'use client';

import { BlogForm } from '@/components/admin/BlogForm';
import { Button } from '@/components/ui/button';
import { fetchAPI } from '@/lib/api';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAdminModal } from '@/components/admin/AdminModalProvider';

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<any | null>(null);
  const { showAlert } = useAdminModal();

  useEffect(() => {
     if (params?.id) {
       fetchAPI(`/admin/blog/${params.id}`, {
         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
       }).then(setPost).catch(console.error);
     }
  }, [params]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      if (!params?.id) return;
      await fetchAPI(`/admin/blog/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(values),
      });
      router.push('/admin/blog');
    } catch (e) {
      console.error(e);
      await showAlert({ title: 'Failed to update post' });
    } finally {
      setLoading(false);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit Blog Post</h2>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>
      <BlogForm initialData={post} onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
