'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin } from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import { toast } from 'sonner';

export const dynamic = 'force-dynamic';

function ContactContent() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    officeState: '',
    enquiryType: 'GENERAL',
    propertyId: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [offices, setOffices] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchAPI('/offices').then(setOffices).catch(() => []);
    fetchAPI('/properties?take=50').then(setProperties).catch(() => []);
  }, []);

  useEffect(() => {
    const enquiry = searchParams.get('enquiry');
    const propertyId = searchParams.get('propertyId');
    const allowed = ['GENERAL', 'INSPECTION', 'PURCHASE', 'SUPPORT'];
    if (enquiry && allowed.includes(enquiry)) {
      setFormData((prev) => ({ ...prev, enquiryType: enquiry }));
    }
    if (propertyId) {
      setFormData((prev) => ({ ...prev, propertyId }));
    }
  }, [searchParams]);

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
        }),
      });
      
      toast.success('Message sent successfully!', {
        description: `Reference ID: ${response.id || 'N/A'}`,
      });
      
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        officeState: '',
        enquiryType: 'GENERAL',
        propertyId: '',
        message: '',
      });
    } catch (error: any) {
      toast.error('Failed to send message', {
        description: error.message || 'Please try again later',
      });
    } finally {
      setLoading(false);
    }
  };

  const stateOptions = [...new Set(offices.map((o: any) => o.state))];
  const officesByState = stateOptions.map((state) => ({
    state,
    offices: offices.filter((office) => office.state === state),
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
            <p className="text-lg text-muted-foreground">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

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
                  <label className="block text-sm font-medium mb-2">Property of Interest</label>
                  <Select
                    value={formData.propertyId}
                    onValueChange={(value) => setFormData({ ...formData, propertyId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property (optional)" />
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
                  <label className="block text-sm font-medium mb-2">Enquiry Type</label>
                  <Select
                    value={formData.enquiryType}
                    onValueChange={(value) => setFormData({ ...formData, enquiryType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GENERAL">General Enquiry</SelectItem>
                      <SelectItem value="INSPECTION">Property Inspection</SelectItem>
                      <SelectItem value="PURCHASE">Purchase Enquiry</SelectItem>
                      <SelectItem value="SUPPORT">Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your requirements..."
                    className="min-h-[150px]"
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-muted-foreground">0201 330 0287, 0915 654 9709</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">customercare@aceroyalestates.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Offices</h3>
                      {offices.length > 0 ? (
                        <div className="space-y-4">
                          {officesByState.map((group) => (
                            <div key={group.state}>
                              <h4 className="text-sm font-semibold">{group.state}</h4>
                              <div className="space-y-2 text-sm text-muted-foreground">
                                {group.offices.map((office: any) => (
                                  <div key={office.id}>
                                    {office.address}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Loading offices...</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#E01C24] to-[#B5161C] rounded-lg shadow-lg p-8 text-white">
                <h3 className="text-xl font-bold mb-3">Ready to find your dream property?</h3>
                <p className="mb-4 opacity-90">
                  Explore our estates and the land or apartment options within each.
                </p>
                <Button variant="secondary" className="w-full" asChild>
                  <Link href="/estates">Explore Estates</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-16 text-center">Loading contact form...</div>}>
      <ContactContent />
    </Suspense>
  );
}
