'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const TIME_SLOTS = [
  { value: 'MORNING', label: 'Morning (9am - 12pm)' },
  { value: 'AFTERNOON', label: 'Afternoon (12pm - 4pm)' },
  { value: 'EVENING', label: 'Evening (4pm - 6pm)' },
];

export default function BookInspectionForm() {
  const searchParams = useSearchParams();
  const estateSlug = searchParams.get('estate');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    officeState: '',
    propertyId: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [offices, setOffices] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [estateName, setEstateName] = useState<string | null>(null);

  useEffect(() => {
    fetchAPI('/offices').then(setOffices).catch(() => []);
    fetchAPI('/properties?take=50').then(setProperties).catch(() => []);
  }, []);

  // Preserve the estate a visitor came from (?estate=slug) instead of making
  // them re-select it. Fetch the estate directly rather than only matching
  // against /properties — some estates (e.g. Alpha Garden City) have no
  // individual Property records yet, and the context badge should still
  // show even when there's no specific unit to pre-select.
  useEffect(() => {
    if (!estateSlug) return;
    fetchAPI(`/estates/${estateSlug}`)
      .then((estate: any) => {
        if (!estate) return;
        setEstateName(estate.name || null);
        setFormData((prev) => ({
          ...prev,
          officeState: prev.officeState || estate.state || prev.officeState,
        }));
      })
      .catch(() => {});
  }, [estateSlug]);

  // Once properties load, pre-select the specific unit if one belongs to
  // the estate the visitor came from.
  useEffect(() => {
    if (!estateSlug || properties.length === 0) return;
    const match = properties.find((p: any) => p.estate?.slug === estateSlug);
    if (match) {
      setFormData((prev) => ({
        ...prev,
        propertyId: prev.propertyId || match.id,
      }));
    }
  }, [estateSlug, properties]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.officeState) {
      toast.error('Please select an office/state');
      return;
    }
    setLoading(true);

    try {
      const message = [
        formData.preferredDate && `Preferred date: ${formData.preferredDate}`,
        formData.preferredTime && `Preferred time: ${TIME_SLOTS.find((t) => t.value === formData.preferredTime)?.label || formData.preferredTime}`,
        formData.message,
      ]
        .filter(Boolean)
        .join('\n');

      const response = await fetchAPI('/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          officeState: formData.officeState,
          propertyId: formData.propertyId,
          message,
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
        preferredDate: '',
        preferredTime: '',
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
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3">Book an Inspection</h1>
            <p className="text-muted-foreground">
              Schedule a site visit with our team. We will confirm your preferred time.
            </p>
            {estateName && (
              <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-medium">
                Booking for {estateName}
              </p>
            )}
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
                  <SelectTrigger className="w-full">
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
                  <SelectTrigger className="w-full">
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

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Inspection Date</label>
                  <Input
                    type="date"
                    min={today}
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Time</label>
                  <Select
                    value={formData.preferredTime}
                    onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a time range" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_SLOTS.map((slot) => (
                        <SelectItem key={slot.value} value={slot.value}>
                          {slot.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Additional Notes</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Anything else we should know before your visit..."
                  className="min-h-[100px]"
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Submitting...' : 'Submit Request'}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                By submitting this form, you agree to our{' '}
                <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>{' '}
                and consent to being contacted regarding your enquiry.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
