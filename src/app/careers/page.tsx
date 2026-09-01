import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  HeartHandshake,
  Lightbulb,
  MapPin,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Careers | Aceroyal Estates',
  description:
    'Build a rewarding career in Nigerian real estate with Aceroyal Estates. Explore our culture, teams, and future opportunities.',
};

const values = [
  {
    icon: HeartHandshake,
    title: 'Work with integrity',
    description:
      'We earn trust through honest communication, responsible advice, and respect for every client.',
  },
  {
    icon: TrendingUp,
    title: 'Grow with the business',
    description:
      'Take ownership of meaningful work and build skills across a fast-moving real estate organisation.',
  },
  {
    icon: Lightbulb,
    title: 'Improve how property works',
    description:
      'Bring ideas that make property discovery, sales, documentation, and customer service simpler.',
  },
];

const teams = [
  'Sales and Business Development',
  'Customer Experience',
  'Property and Project Operations',
  'Marketing and Communications',
  'Legal and Compliance',
  'Finance and Administration',
  'Technology and Digital Products',
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(224,28,36,0.18),transparent_42%)]" />
        <div className="container relative py-12 md:py-16">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Careers at Aceroyal
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Build places, opportunities, and lasting value.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
              Join a team helping people make confident property decisions while shaping a more
              trusted and accessible real estate experience across Nigeria.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="#opportunities">
                  View opportunities <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Learn about Aceroyal</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">How we work</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Do work you can be proud of</h2>
            <p className="mt-4 text-muted-foreground">
              We value people who are thoughtful, accountable, commercially aware, and committed
              to an excellent customer experience.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <article key={value.title} className="rounded-2xl border bg-card p-7 text-card-foreground shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <value.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{value.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-slate-950 py-16 text-white md:py-24">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <Users className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-3xl font-bold md:text-4xl">There is room for many strengths</h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-300">
              Our work brings together commercial, operational, creative, legal, financial, and
              technical expertise. Opportunities may open across these teams as we grow.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {teams.map((team) => (
              <div key={team} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-4">
                <Building2 className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="font-medium">{team}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="opportunities" className="container scroll-mt-24 py-12 md:py-16">
        <div className="mx-auto max-w-4xl rounded-3xl border bg-card p-8 text-center shadow-sm md:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <MapPin className="h-7 w-7 text-primary" aria-hidden="true" />
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Current opportunities
          </p>
          <h2 className="mt-3 text-3xl font-bold">No roles are listed right now</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
            We are building the next version of our careers experience. Check back for openings,
            or contact our team if you would like to introduce yourself for future opportunities.
          </p>
          <Button className="mt-8" size="lg" asChild>
            <Link href="/contact">
              Contact our team <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}