import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import {
  Award,
  Home,
  Users,
  Building2,
  HardHat,
  Wrench,
  TrendingUp,
  Ruler,
  FileCheck2,
} from 'lucide-react';
import Link from 'next/link';
import { fetchAPI } from '@/lib/api';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import { Reveal } from '@/components/motion/Reveal';
import { TeamGrid } from '@/components/about/TeamGrid';

const TITLE = 'About Aceroyal Estates | Nigerian Real Estate Company';
const DESCRIPTION =
  'Learn about Aceroyal Estates, our mission, leadership, real estate services and commitment to transparent property ownership across Nigeria.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/about' },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default async function AboutPage() {
  // TODO(content): the only figures we can actually back up right now
  // (estates + states + offices are counted from real records). Do not add
  // a fourth "vanity" stat (e.g. years in operation, clients served) until
  // Daniel supplies a verified number.
  const stats = [
    { icon: Home, label: 'Active Estates', value: '10' },
    { icon: Award, label: 'States We Operate In', value: '5' },
    { icon: Users, label: 'Physical Offices', value: '3' },
  ];

  const values = [
    { title: 'Integrity', description: 'Clear information, honest representation and responsible transactions.' },
    { title: 'Customer Commitment', description: 'Supporting clients before, during and after property acquisition.' },
    { title: 'Quality', description: 'Developing and presenting properties to standards that protect long-term value.' },
    { title: 'Innovation', description: 'Using technology and modern processes to improve the property experience.' },
    { title: 'Excellence', description: 'Continuous improvement in service, delivery and professionalism.' },
  ];

  const services = [
    { icon: Building2, title: 'Property Sales & Acquisition', description: 'Land, homes and investment properties.' },
    { icon: HardHat, title: 'Development & Construction', description: 'Residential and commercial development.' },
    { icon: Wrench, title: 'Property & Facility Management', description: 'Upkeep and management of delivered estates.' },
    { icon: TrendingUp, title: 'Real Estate Investment & Advisory', description: 'Guidance for individual and institutional investors.' },
    { icon: Ruler, title: 'Valuation & Survey', description: 'Professional property valuation and land survey.' },
    { icon: FileCheck2, title: 'Property Documentation & Regularisation', description: 'Title processing and regulatory documentation.' },
  ];

  const whyAceroyal = [
    {
      title: 'Clear Documentation',
      description: 'Property documentation and title information are made available for buyer review as part of the purchase process.',
    },
    {
      title: 'Guided Property Purchase',
      description: 'A structured process from selection through allocation, with a team on hand at every step.',
    },
    {
      title: 'Professional Support',
      description: 'Our experienced team provides support throughout your journey and after.',
    },
    {
      title: 'Multiple Property Options',
      description: 'Land and homes across active estates in Lagos, Abuja, Oyo, Enugu and Edo.',
    },
  ];

  const teamMembers = await fetchAPI('/team').catch(() => []);

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="py-16 md:py-24 text-center">
        <div className="container">
          <h1 className="text-5xl font-bold mb-6">About Aceroyal Estates</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Aceroyal Estates is a Nigerian real estate company focused on property development,
            sales, investment and property services. We help individuals, families and investors
            secure land and homes through a transparent, guided ownership process.
          </p>
        </div>
      </section>

      {/* Snapshot */}
      <Reveal>
        <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950">
          <div className="container">
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Our Story */}
      <Reveal>
        <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
          <div className="container max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">The Ultimate Standard of Trust</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Aceroyal Estates, a subsidiary of AceRoyalpro Services, exists to make real estate
              ownership accessible and trustworthy for Nigerians and the diaspora — built on
              clear titling, structured documentation, and a process with no guesswork.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Today, we operate across 5 states — Lagos, Oyo, Enugu, Edo, and Abuja — with 3
              physical offices, and a portfolio spanning residential land, wellness-led
              communities, and commercial developments.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our track record backs the promise: Eko Paragon, a 105-unit development delivered
              with the Lagos State Government in 18 months, and Downtown Lagos Commercial City,
              now expanding along one of Lagos&apos;s fastest-growing corridors. Every new estate
              is held to the same standard.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We offer estate development, property sales &amp; allocation, estate/facility
              management, and diaspora advisory — led by Dr. Endurance Cletus Agonor, CEO and
              Founder.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Mission & Vision */}
      <Reveal>
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">Mission</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To make quality housing and property ownership more accessible through
                  responsible development, transparent transactions and customer-focused real
                  estate solutions.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">Vision</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To become a trusted African real estate brand delivering quality housing and
                  investment opportunities across markets and income levels.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Our Values */}
      <Reveal>
        <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="flex gap-4 overflow-x-auto scroll-hide snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:overflow-visible lg:gap-6 lg:grid-cols-2 xl:grid-cols-3 max-w-5xl lg:mx-auto">
              {values.map((value) => (
                <div key={value.title} className="glass-card backdrop-blur-lg shrink-0 w-[75%] snap-center bg-slate-50 dark:bg-slate-800 rounded-lg shadow-sm p-6 lg:w-auto lg:shrink">
                  <h3 className="text-xl font-semibold mb-2 text-primary">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* What We Do */}
      <Reveal>
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">What We Do</h2>
            <div className="flex gap-4 overflow-x-auto scroll-hide snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:overflow-visible lg:gap-6 lg:grid-cols-2 xl:grid-cols-3 max-w-5xl lg:mx-auto">
              {services.map((service) => (
                <div key={service.title} className="glass-card backdrop-blur-lg shrink-0 w-[75%] snap-center bg-white dark:bg-slate-900 rounded-lg shadow-sm p-6 lg:w-auto lg:shrink">
                  <div className="inline-flex items-center justify-center w-11 h-11 bg-primary/10 rounded-lg mb-4">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/services">
                <Button size="lg" variant="outline">Explore Our Services</Button>
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Leadership */}
      {teamMembers.length > 0 && (
        <Reveal>
          <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
            <div className="container">
              <h2 className="text-3xl font-bold mb-12 text-center">Leadership & Team</h2>
              <TeamGrid members={teamMembers} />
            </div>
          </section>
        </Reveal>
      )}

      {/* Partnerships */}
      <Reveal>
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950">
          <div className="container max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">International Reach</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our partnership with AEON Trisl Group and Emaar Properties Dubai brings
              international development standards into how we plan and build.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Why Aceroyal */}
      <Reveal>
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-[#7d150f] text-white">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Aceroyal Estates?</h2>
            <div className="grid sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
              {whyAceroyal.map((item) => (
                <div key={item.title}>
                  <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                  <p className="opacity-90 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <TestimonialsSection />
      </Reveal>

      {/* CTA */}
      <Reveal>
        <section className="py-16 md:py-24 bg-white dark:bg-slate-900 text-center">
          <div className="container">
            <h2 className="text-3xl font-bold mb-4">Ready to Find the Right Property?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Explore available estates or speak with our team to arrange an inspection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/estates">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Explore Estates
                </Button>
              </Link>
              <Link href="/book-inspection">
                <Button size="lg" className="w-full sm:w-auto">
                  Book Inspection
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
