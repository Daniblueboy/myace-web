import Link from 'next/link';
import { Home, Award, Users, BadgeCheck, Zap, Shield, Headset } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Condensed from the About page's "Our Story" copy (src/app/about/page.tsx)
// rather than written fresh, so the two pages stay consistent. Stats match
// the About page's own TODO note: only figures Daniel has actually
// confirmed (estates/states/offices) — do not add a vanity stat here either
// without a verified number.
const stats = [
  { icon: Home, label: 'Active Estates', value: '7' },
  { icon: Award, label: 'States We Operate In', value: '5' },
  { icon: Users, label: 'Physical Offices', value: '3' },
];

// Was a separate "Why Choose Aceroyal?" section right after this one —
// folded in here instead since two consecutive "about the company" blocks
// read as repeating themselves. Copy is still unverified scaffold
// boilerplate, not sourced from the live site or confirmed by Aceroyal
// (unlike the partnership/compliance claims elsewhere, which ARE real
// live-site content just pending validation) — softened from stronger,
// SLA-sounding claims ("within 24 hours", "bank-grade security", "24/7") to
// something defensible without a concrete guarantee behind it.
const differentiators = [
  { icon: BadgeCheck, title: 'Verified Listings', desc: 'Property documentation is reviewed as part of every sale.' },
  { icon: Zap, title: 'Guided Process', desc: 'A structured, transparent path from selection to allocation.' },
  { icon: Shield, title: 'Secure Processes', desc: 'Structured, trusted channels for payments and documentation.' },
  { icon: Headset, title: 'Dedicated Support', desc: 'A customer success team on hand throughout your journey.' },
];

export function WhoWeAreSection() {
  return (
    <section className="py-12 md:py-28 bg-white dark:bg-slate-950">
      <div className="container max-w-3xl mx-auto text-center space-y-6">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Who We Are</p>
        <h2 className="text-3xl md:text-4xl font-bold">Building Confidence Into Property Ownership</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Aceroyal Estates — a subsidiary of Aceroyalpro Services — was established to make quality
          real estate opportunities more accessible while helping buyers navigate one of the most
          important financial decisions they will make. Today, the company operates across multiple
          locations in Nigeria, providing residential land, homes and real estate services supported
          by structured documentation, professional guidance and after-sales support.
        </p>

        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto pt-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border bg-slate-50 dark:bg-slate-900 dark:border-slate-800 p-4">
              <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button variant="outline" asChild>
            <Link href="/about">Learn More About Us</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/services">Our Services</Link>
          </Button>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto pt-14 md:pt-20">
        <h3 className="text-xl font-semibold text-center mb-8">Why Choose Aceroyal</h3>
        <div className="flex gap-4 overflow-x-auto scroll-hide snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 md:grid md:overflow-visible md:gap-6 md:grid-cols-2 lg:grid-cols-4">
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
      </div>
    </section>
  );
}
