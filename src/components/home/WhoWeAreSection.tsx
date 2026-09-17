import Link from 'next/link';
import { Home, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Condensed from the About page's "Our Story" copy (src/app/about/page.tsx)
// rather than written fresh, so the two pages stay consistent. Stats match
// the About page's own TODO note: only figures Daniel has actually
// confirmed (estates/states/offices) — do not add a vanity stat here either
// without a verified number.
const stats = [
  { icon: Home, label: 'Active Estates', value: '8' },
  { icon: Award, label: 'States We Operate In', value: '5' },
  { icon: Users, label: 'Physical Offices', value: '3' },
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
    </section>
  );
}
