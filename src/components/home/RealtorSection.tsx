'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fetchAPI } from '@/lib/api';

/**
 * NOT mounted on any page yet — built ahead of the Aceroyal Realtor portal
 * going live so the section is ready to drop in. See page.tsx for where
 * this is commented out; uncomment once the realtor portal/app is public.
 */
export default function RealtorSection() {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await fetchAPI('/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'GENERAL',
          enquiryType: 'REALTOR_PARTNERSHIP',
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          message: 'Realtor partnership interest submitted via the Join Aceroyal Realtor form.',
          sourcePage: 'realtor-cta',
        }),
      });
      setStatus('success');
      setForm({ fullName: '', email: '', phone: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-slate-950">
      <div className="container">
        <div className="rounded-3xl border bg-gradient-to-br from-primary/5 to-transparent dark:border-slate-800 p-8 md:p-12 grid gap-8 md:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Aceroyal Realtor</p>
            <h2 className="text-3xl md:text-4xl font-bold">Are you a realtor?</h2>
            <p className="text-muted-foreground text-lg">
              Join Aceroyal Realtor and earn commissions helping clients find their next estate,
              land, or apartment — with real-time listing access, payment tracking, and dedicated
              support.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl bg-white dark:bg-slate-900 border dark:border-slate-800 p-6">
            <Input
              required
              placeholder="Full name"
              value={form.fullName}
              onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
            />
            <Input
              required
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
            <Input
              required
              placeholder="Phone number"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            />
            <Button type="submit" className="w-full" disabled={status === 'loading'}>
              {status === 'loading' ? 'Submitting...' : 'Join Aceroyal Realtor'}
            </Button>
            {status === 'success' && (
              <p className="text-sm text-muted-foreground">
                Thanks — our team will reach out about next steps.
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm text-destructive">Couldn&apos;t submit right now. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
