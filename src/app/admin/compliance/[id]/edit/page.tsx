'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { fetchAPI } from '@/lib/api';
import { toast } from 'sonner';

export default function EditCompliancePage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    type: 'CAC_REGISTRATION',
    title: '',
    description: '',
    registrationNo: '',
    issuedBy: '',
    issueDate: '',
    expiryDate: '',
    fileUrl: '',
    externalLink: '',
    displayOnHome: true,
    displayOrder: 1,
    active: true,
  });

  useEffect(() => {
    async function loadItem() {
      try {
        const data = await fetchAPI(`/admin/compliance/${params.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setFormData({
          type: data.type || 'CAC_REGISTRATION',
          title: data.title || '',
          description: data.description || '',
          registrationNo: data.registrationNo || '',
          issuedBy: data.issuedBy || '',
          issueDate: data.issueDate ? data.issueDate.split('T')[0] : '',
          expiryDate: data.expiryDate ? data.expiryDate.split('T')[0] : '',
          fileUrl: data.fileUrl || '',
          externalLink: data.externalLink || '',
          displayOnHome: data.displayOnHome ?? true,
          displayOrder: data.displayOrder || 1,
          active: data.active ?? true,
        });
      } catch (error) {
        toast.error('Failed to load compliance item');
      } finally {
        setFetching(false);
      }
    }
    if (params.id) loadItem();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetchAPI(`/admin/compliance/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      toast.success('Compliance item updated successfully');
      router.push('/admin/compliance');
    } catch (error: any) {
      toast.error('Failed to update item', { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Edit Compliance Item</h1>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>Type *</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CAC_REGISTRATION">CAC Registration</SelectItem>
                <SelectItem value="GOVT_CERTIFICATE">Government Certificate</SelectItem>
                <SelectItem value="LEGAL_DOCUMENT">Legal Document</SelectItem>
                <SelectItem value="AWARD">Award</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Title *</Label>
            <Input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Registration Number</Label>
              <Input
                value={formData.registrationNo}
                onChange={(e) => setFormData({ ...formData, registrationNo: e.target.value })}
              />
            </div>
            <div>
              <Label>Issued By</Label>
              <Input
                value={formData.issuedBy}
                onChange={(e) => setFormData({ ...formData, issuedBy: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Issue Date</Label>
              <Input
                type="date"
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
              />
            </div>
            <div>
              <Label>Expiry Date</Label>
              <Input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label>File URL</Label>
            <Input
              type="url"
              value={formData.fileUrl}
              onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
            />
          </div>

          <div>
            <Label>External Link</Label>
            <Input
              type="url"
              value={formData.externalLink}
              onChange={(e) => setFormData({ ...formData, externalLink: e.target.value })}
            />
          </div>

          <div>
            <Label>Display Order</Label>
            <Input
              type="number"
              value={formData.displayOrder}
              onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="displayOnHome">Display on Homepage</Label>
            <Switch
              id="displayOnHome"
              checked={formData.displayOnHome}
              onCheckedChange={(checked) => setFormData({ ...formData, displayOnHome: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="active">Active</Label>
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Item'}
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
