'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAdminModal } from '@/components/admin/AdminModalProvider';

export default function EditTestimonialPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<any>(null);
  const { showAlert } = useAdminModal();

  useEffect(() => {
    async function load() {
      const data = await fetchAPI(`/admin/testimonials/${params.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setForm({
        name: data.name || '',
        role: data.role || '',
        message: data.message || '',
        rating: data.rating || 5,
        photoUrl: data.photoUrl || '',
        displayOrder: data.displayOrder || 0,
        active: data.active ?? true,
      });
    }
    load();
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetchAPI(`/admin/testimonials/${params.id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(form),
      });
      router.push('/admin/testimonials');
    } catch (e) {
      await showAlert({ title: 'Failed to update testimonial' });
    } finally {
      setLoading(false);
    }
  }

  if (!form) return <div>Loading...</div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-3xl font-bold tracking-tight">Edit Testimonial</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input placeholder="Client name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input placeholder="Role (optional)" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
        <Textarea placeholder="Testimonial message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        <Input
          type="number"
          placeholder="Rating (1-5)"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
        />
        <Input placeholder="Photo URL (optional)" value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} />
        <Input
          type="number"
          placeholder="Display order"
          value={form.displayOrder}
          onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          Active
        </label>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </div>
  );
}
