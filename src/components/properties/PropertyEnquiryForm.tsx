'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { fetchAPI } from '@/lib/api';
import { toast } from 'sonner';

interface PropertyEnquiryFormProps {
  propertyId: string;
  propertyTitle: string;
  variants?: Array<{
    id: string;
    label: string;
    price: number;
    currency: string;
  }>;
}

export default function PropertyEnquiryForm({
  propertyId,
  propertyTitle,
  variants,
}: PropertyEnquiryFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    variantId: '',
    message: `I'm interested in ${propertyTitle}`,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetchAPI('/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: 'PROPERTY_ENQUIRY',
          enquiryType: 'INSPECTION',
          propertyId,
          message: formData.variantId
            ? `${formData.message}\nVariant: ${variants?.find((v) => v.id === formData.variantId)?.label || 'Selected option'}`
            : formData.message,
        }),
      });

      toast.success('Enquiry sent successfully!', {
        description: `We'll contact you soon. Reference: ${response.id || 'N/A'}`,
      });

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        variantId: '',
        message: '',
      });
    } catch (error: any) {
      toast.error('Failed to send enquiry', {
        description: error.message || 'Please try again later',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 sticky top-4">
      <h3 className="text-xl font-bold mb-4">Request Property Inspection</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name *</label>
          <Input
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <Input
            required
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone *</label>
          <Input
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+234 xxx xxx xxxx"
          />
        </div>

        {variants && variants.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-2">Property Option</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-slate-900"
              value={formData.variantId}
              onChange={(e) => setFormData({ ...formData, variantId: e.target.value })}
            >
              <option value="">Select an option</option>
              {variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.label} - {variant.currency} {Number(variant.price).toLocaleString()}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <Textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Any specific questions or requirements..."
            className="min-h-[100px]"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Sending...' : 'Request Inspection'}
        </Button>
      </form>
    </Card>
  );
}
