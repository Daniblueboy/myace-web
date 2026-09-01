'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, MessageCircle, Building2 } from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import { toast } from 'sonner';
import { Reveal } from '@/components/motion/Reveal';

const WHATSAPP_NUMBER = '2349156549709';

export default function ContactForm() {
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

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="py-16 md:py-24 text-center">
        <div className="container">
          <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>
      </section>

      {/* Form + quick contact */}
      <Reveal>
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950">
          <div className="container">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 max-w-5xl mx-auto">
              {/* Contact Form */}
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-8">
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

                  <div className="grid sm:grid-cols-2 gap-4">
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
                          {[...new Set(offices.map((o: any) => o.state))].map((state: string) => (
                            <SelectItem key={state} value={state}>
                              {state}
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
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your requirements..."
                      className="min-h-[140px]"
                    />
                  </div>

                  <Button type="submit" size="lg" disabled={loading} className="w-full">
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>

              {/* Quick contact + CTA */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-8">
                  <h2 className="text-xl font-bold mb-6">Reach Us Directly</h2>
                  <div className="space-y-5">
                    <a href="tel:+2342013300287" className="flex items-start gap-4 group">
                      <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Phone</h3>
                        <p className="text-sm text-muted-foreground">0201 330 0287, 0915 654 9709</p>
                      </div>
                    </a>

                    <a href="mailto:customercare@aceroyalestates.com" className="flex items-start gap-4 group">
                      <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Email</h3>
                        <p className="text-sm text-muted-foreground">customercare@aceroyalestates.com</p>
                      </div>
                    </a>

                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 group"
                    >
                      <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                        <MessageCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">WhatsApp</h3>
                        <p className="text-sm text-muted-foreground">Chat with our team directly</p>
                      </div>
                    </a>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Head Office</h3>
                        <p className="text-sm text-muted-foreground">
                          Providence Plaza, 17 Olokonla Road, Sangotedo, Lekki-Ajah Expressway, Lagos
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#E01C24] to-[#B5161C] rounded-lg shadow-sm p-8 text-white">
                  <h3 className="text-xl font-bold mb-3">Ready to find your dream property?</h3>
                  <p className="mb-4 opacity-90 leading-relaxed">
                    Explore our estates and the land or apartment options within each.
                  </p>
                  <Button variant="secondary" className="w-full" asChild>
                    <Link href="/estates">Explore Estates</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Offices */}
      <Reveal>
        <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Offices</h2>
            {offices.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {offices.map((office: any) => (
                  <div key={office.id} className="bg-slate-50 dark:bg-slate-800 rounded-lg shadow-sm p-6">
                    <div className="inline-flex items-center justify-center w-11 h-11 bg-primary/10 rounded-lg mb-4">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{office.city || office.state} Office</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{office.address}</p>
                    {office.phones?.length > 0 && (
                      <p className="text-sm text-muted-foreground">{office.phones.join(', ')}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">Loading offices...</p>
            )}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
