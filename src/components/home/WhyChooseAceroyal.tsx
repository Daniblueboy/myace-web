import { BadgeCheck, Zap, Shield, Headset } from 'lucide-react';
import { Stagger } from '@/components/motion/Stagger';

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

/** The four reasons as a divided list — sits beside a team photo in
 * WhyChooseSection rather than as a row of icon cards. */
export function WhyChooseAceroyal() {
  return (
    <Stagger as="ul" className="divide-y divide-border">
      {differentiators.map((item) => (
        <li key={item.title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <item.icon className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-1 text-muted-foreground">{item.desc}</p>
          </div>
        </li>
      ))}
    </Stagger>
  );
}
