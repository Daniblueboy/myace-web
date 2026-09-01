'use client';

import { useState } from 'react';
import { Apple, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fetchAPI } from '@/lib/api';

export default function AppDownloadSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetchAPI('/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, sourcePage: 'app-download-waitlist' }),
      });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="app-download" className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950 scroll-mt-24">
      <div className="container">
        <div className="rounded-3xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-8 md:p-12 grid gap-8 md:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Aceroyal Mobile</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Our apps are launching soon on iOS & Android
            </h2>
            <p className="text-muted-foreground text-lg">
              Track estate updates, view payment plans, and book inspections from your phone.
              Early access drops first for waitlist subscribers.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="gap-2" disabled>
                <Apple className="h-4 w-4" /> App Store (Soon)
              </Button>
              <Button variant="outline" className="gap-2" disabled>
                <Smartphone className="h-4 w-4" /> Google Play (Soon)
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md pt-2">
              <Input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white dark:bg-slate-900"
              />
              <Button type="submit" className="shrink-0">Join the waitlist</Button>
            </form>
            {status === 'success' && (
              <p className="text-sm text-muted-foreground">You&apos;re on the list — we&apos;ll notify you at launch.</p>
            )}
            {status === 'error' && (
              <p className="text-sm text-destructive">Couldn&apos;t join right now. Please try again.</p>
            )}
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-transparent p-6">
            <div className="space-y-3">
              <p className="text-sm font-medium">What you’ll get:</p>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Verified estate updates and new launches</li>
                <li>• Payment plan flyers and brochures</li>
                <li>• Inspection booking and reminders</li>
                <li>• Secure client support messaging</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
