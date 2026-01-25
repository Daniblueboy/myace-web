'use client';

import { BlogForm } from '@/components/admin/BlogForm';
import { fetchAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAdminModal } from '@/components/admin/AdminModalProvider';
import { Button } from '@/components/ui/button';

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAdminModal();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await fetchAPI('/admin/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(values),
      });
      router.push('/admin/blog');
    } catch (e) {
      console.error(e);
      await showAlert({ title: 'Failed to create post' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Create Blog Post</h2>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>
      <BlogForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
