'use client';

import { useEffect, useState } from 'react';
import { fetchAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function BookInspectionPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    officeState: '',
    propertyId: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [offices, setOffices] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    fetchAPI('/offices').then(setOffices).catch(() => []);
    fetchAPI('/properties?take=50').then(setProperties).catch(() => []);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.officeState) {
      toast.error('Please select an office/state');
      return;
    }
    setLoading(true);

    try {
      const response = await fetchAPI('/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: 'GENERAL',
          enquiryType: 'INSPECTION',
        }),
      });

      toast.success('Inspection request sent!', {
        description: `Reference ID: ${response.id || 'N/A'}`,
      });

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        officeState: '',
        propertyId: '',
        message: '',
      });
    } catch (error: any) {
      toast.error('Failed to send request', {
        description: error.message || 'Please try again later',
      });
    } finally {
      setLoading(false);
    }
  };

  const stateOptions = [...new Set(offices.map((o: any) => o.state))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3">Book an Inspection</h1>
            <p className="text-muted-foreground">
              Schedule a site visit with our team. We will confirm your preferred time.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
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

              <div>
                <label className="block text-sm font-medium mb-2">Office/State *</label>
                <Select
                  value={formData.officeState}
                  onValueChange={(value) => setFormData({ ...formData, officeState: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {stateOptions.map((state: string) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Estate/Property</label>
                <Select
                  value={formData.propertyId}
                  onValueChange={(value) => setFormData({ ...formData, propertyId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select estate/property (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map((property: any) => (
                      <SelectItem key={property.id} value={property.id}>
                        {property.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Preferred Date / Notes</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share your preferred date/time or questions..."
                  className="min-h-[120px]"
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Submitting...' : 'Submit Request'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
