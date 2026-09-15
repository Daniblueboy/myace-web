'use client';

import { BadgeCheck, Zap, Shield, Headset } from 'lucide-react';
import { useAutoScrollRow } from '@/hooks/useAutoScrollRow';

// Copy is still unverified scaffold boilerplate, not sourced from the live
// site or confirmed by Aceroyal — softened from stronger, SLA-sounding
// claims ("within 24 hours", "bank-grade security", "24/7") to something
// defensible without a concrete guarantee behind it.
const differentiators = [
  { icon: BadgeCheck, title: 'Verified Listings', desc: 'Property documentation is reviewed as part of every sale.' },
  { icon: Zap, title: 'Guided Process', desc: 'A structured, transparent path from selection to allocation.' },
  { icon: Shield, title: 'Secure Processes', desc: 'Structured, trusted channels for payments and documentation.' },
  { icon: Headset, title: 'Dedicated Support', desc: 'A customer success team on hand throughout your journey.' },
];

export function WhyChooseAceroyal() {
  const { ref, handlers } = useAutoScrollRow<HTMLDivElement>({ itemCount: differentiators.length });

  return (
    <div
      ref={ref}
      {...handlers}
      className="flex gap-4 overflow-x-auto scroll-hide snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 md:grid md:overflow-visible md:gap-6 md:grid-cols-2 lg:grid-cols-4"
    >
      {differentiators.map((item) => (
        <div
          key={item.title}
          className="glass-card backdrop-blur-lg shrink-0 w-[70%] snap-center bg-slate-50 dark:bg-slate-900 dark:border-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border text-center md:w-auto md:shrink"
        >
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <item.icon className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-lg mb-2">{item.title}</h4>
          <p className="text-muted-foreground text-sm">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
