'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAdminModal } from '@/components/admin/AdminModalProvider';

export default function EditEstatePage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<any>(null);
  const { showAlert } = useAdminModal();

  useEffect(() => {
    async function load() {
      const data = await fetchAPI(`/admin/estates/${params.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setForm({
        name: data.name || '',
        slug: data.slug || '',
        description: data.description || '',
        state: data.state || '',
        city: data.city || '',
        address: data.address || '',
        coverImage: data.coverImage || '',
        videoUrl: data.videoUrl || '',
        brochureUrl: data.brochureUrl || '',
        gallery: data.gallery ? data.gallery.join(', ') : '',
        amenities: data.amenities ? data.amenities.join(', ') : '',
        status: data.status || 'ACTIVE',
        faqs: data.faqs && data.faqs.length > 0
          ? data.faqs.map((faq: any) => ({ question: faq.question, answer: faq.answer }))
          : [{ question: '', answer: '' }],
      });
    }
    load();
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetchAPI(`/admin/estates/${params.id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({
          ...form,
          gallery: form.gallery ? form.gallery.split(',').map((item: string) => item.trim()).filter(Boolean) : [],
          amenities: form.amenities ? form.amenities.split(',').map((item: string) => item.trim()).filter(Boolean) : [],
          faqs: form.faqs
            .filter((item: any) => item.question && item.answer)
            .map((item: any, index: number) => ({
              question: item.question,
              answer: item.answer,
              sortOrder: index,
            })),
        }),
      });
      router.push('/admin/estates');
    } catch (e) {
      await showAlert({ title: 'Failed to update estate' });
    } finally {
      setLoading(false);
    }
  }

  if (!form) return <div>Loading...</div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit Estate</h2>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input placeholder="Estate name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input placeholder="Slug (optional)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
          <Input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        </div>
        <Input placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <Input placeholder="Cover image URL" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} />
        <Input placeholder="Estate video URL" value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} />
        <Input placeholder="Brochure URL" value={form.brochureUrl} onChange={(e) => setForm({ ...form, brochureUrl: e.target.value })} />
        <Input placeholder="Gallery URLs (comma-separated)" value={form.gallery} onChange={(e) => setForm({ ...form, gallery: e.target.value })} />
        <Input placeholder="Amenities (comma-separated)" value={form.amenities} onChange={(e) => setForm({ ...form, amenities: e.target.value })} />
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="ACTIVE">Active</option>
          <option value="COMING_SOON">Coming Soon</option>
          <option value="SOLD_OUT">Sold Out</option>
        </select>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Estate FAQs</h3>
            <Button
              type="button"
              variant="outline"
              onClick={() => setForm({ ...form, faqs: [...form.faqs, { question: '', answer: '' }] })}
            >
              Add FAQ
            </Button>
          </div>
          {form.faqs.map((faq: any, index: number) => (
            <div key={index} className="rounded-lg border p-4 space-y-3">
              <Input
                placeholder="Question"
                value={faq.question}
                onChange={(e) => {
                  const next = [...form.faqs];
                  next[index].question = e.target.value;
                  setForm({ ...form, faqs: next });
                }}
              />
              <Textarea
                placeholder="Answer"
                value={faq.answer}
                onChange={(e) => {
                  const next = [...form.faqs];
                  next[index].answer = e.target.value;
                  setForm({ ...form, faqs: next });
                }}
              />
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setForm({ ...form, faqs: form.faqs.filter((_: any, i: number) => i !== index) })}
                >
                  Remove FAQ
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </div>
  );
}
