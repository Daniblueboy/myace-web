'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import WysiwygEditor from '@/components/admin/WysiwygEditor';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { fetchAPI } from '@/lib/api';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EditPromoPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    details: '',
    imageUrl: '',
    videoUrl: '',
    linkUrl: '',
    placement: 'SECTION_CARD',
    priority: 0,
    active: true,
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    if (!params?.id) return;
    fetchAPI(`/admin/promos/${params.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((promo) => {
        setFormData({
          title: promo.title || '',
          message: promo.message || '',
          details: promo.details || '',
          imageUrl: promo.imageUrl || '',
          videoUrl: promo.videoUrl || '',
          linkUrl: promo.linkUrl || '',
          placement: promo.placement || 'SECTION_CARD',
          priority: promo.priority || 0,
          active: promo.active ?? true,
          startDate: promo.startDate ? promo.startDate.split('T')[0] : '',
          endDate: promo.endDate ? promo.endDate.split('T')[0] : '',
        });
      })
      .catch(() => toast.error('Failed to load promo'));
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!params?.id) return;
    setLoading(true);
    try {
      await fetchAPI(`/admin/promos/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          ...formData,
          priority: Number(formData.priority),
          startDate: formData.startDate ? new Date(formData.startDate) : null,
          endDate: formData.endDate ? new Date(formData.endDate) : null,
        }),
      });
      toast.success('Promo updated');
      router.push('/admin/promos');
    } catch (error: any) {
      toast.error('Failed to update promo', { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Edit Promo</h1>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>Title</Label>
            <Input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <Label>Message</Label>
            <Textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
          <div>
            <Label>Details (modal content)</Label>
            <WysiwygEditor
              value={formData.details}
              placeholder="Add full announcement details here..."
              onChange={(value) => setFormData({ ...formData, details: value })}
            />
          </div>
          <div>
            <Label>Image URL</Label>
            <Input
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
          </div>
          <div>
            <Label>Video URL (optional)</Label>
            <Input
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
            />
          </div>
          <div>
            <Label>Link URL</Label>
            <Input
              value={formData.linkUrl}
              onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
            />
          </div>
          <div>
            <Label>Placement</Label>
            <Select
              value={formData.placement}
              onValueChange={(value) => setFormData({ ...formData, placement: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HERO_BANNER">Hero Banner</SelectItem>
                <SelectItem value="TOP_STRIP">Top Strip</SelectItem>
                <SelectItem value="POPUP">Popup</SelectItem>
                <SelectItem value="SECTION_CARD">Section Card</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Priority</Label>
              <Input
                type="number"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label>Active</Label>
              <Select
                value={formData.active ? 'true' : 'false'}
                onValueChange={(value) => setFormData({ ...formData, active: value === 'true' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
