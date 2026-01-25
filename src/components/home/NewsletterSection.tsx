"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fetchAPI } from '@/lib/api';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetchAPI('/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-slate-950">
      <div className="container">
        <div className="rounded-3xl border bg-slate-50 dark:bg-slate-900 dark:border-slate-800 p-8 md:p-12 grid gap-6 md:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Newsletter</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Get estate updates and new launch alerts
            </h2>
            <p className="text-muted-foreground text-lg">
              Subscribe to receive payment plan flyers, inspection dates, and early access to new estates.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white dark:bg-slate-900"
            />
            <Button type="submit" className="w-full">Subscribe</Button>
            {status === 'success' && (
              <p className="text-sm text-muted-foreground">
                Thanks for subscribing. We will keep you updated.
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm text-destructive">
                Unable to subscribe right now. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
