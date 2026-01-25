'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAdminModal } from '@/components/admin/AdminModalProvider';

export default function EditTeamMemberPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<any>(null);
  const { showAlert } = useAdminModal();

  useEffect(() => {
    async function load() {
      const data = await fetchAPI(`/admin/team/${params.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setForm({
        name: data.name || '',
        role: data.role || '',
        bio: data.bio || '',
        photoUrl: data.photoUrl || '',
        email: data.email || '',
        linkedinUrl: data.linkedinUrl || '',
        instagramUrl: data.instagramUrl || '',
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
      await fetchAPI(`/admin/team/${params.id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(form),
      });
      router.push('/admin/team');
    } catch (e) {
      await showAlert({ title: 'Failed to update team member' });
    } finally {
      setLoading(false);
    }
  }

  if (!form) return <div>Loading...</div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-3xl font-bold tracking-tight">Edit Team Member</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input placeholder="Role / Title" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
        <Textarea placeholder="Short bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
        <Input placeholder="Photo URL" value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} />
        <Input placeholder="Email (optional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input placeholder="LinkedIn URL" value={form.linkedinUrl} onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })} />
        <Input placeholder="Instagram URL" value={form.instagramUrl} onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })} />
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
