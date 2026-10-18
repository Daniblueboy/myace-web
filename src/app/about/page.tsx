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
import { Stagger } from '@/components/motion/Stagger';
import { CountUp } from '@/components/motion/CountUp';

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

// Full seated portraits for the two leaders shown as feature cards above the
// team grid. Keyed by team-member id; anyone not listed stays in the grid.
const FEATURED_PORTRAITS: Record<string, string> = {
  'fallback-team-ceo': '/images/team/endurance-agonor-seated.jpg',
  'fallback-team-coo': '/images/team/racheal-agonor-seated.jpg',
};

export default async function AboutPage() {
  // TODO(content): the only figures we can actually back up right now
  // (estates + states + offices are counted from real records). Do not add
  // a fourth "vanity" stat (e.g. years in operation, clients served) until
  // Daniel supplies a verified number.
  const stats = [
    { icon: Home, label: 'Active Estates', value: '8' },
    { icon: Award, label: 'States We Operate In', value: '5' },
    { icon: Users, label: 'Physical Offices', value: '3' },
  ];

  // Core values as approved by Aceroyal — titles only, no added descriptions.
  const values = ['Interconnectedness', 'Passion', 'Integrity', 'Effectiveness', 'Quality'];

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
  const featuredLeaders = teamMembers.filter((member: { id: string }) => FEATURED_PORTRAITS[member.id]);
  const otherMembers = teamMembers.filter((member: { id: string }) => !FEATURED_PORTRAITS[member.id]);

  return (
    <div>
      {/* Hero */}
      <section className="py-16 md:py-24 text-center">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Aceroyal Estates</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Aceroyal Estates is a Nigerian real estate company focused on property development,
            sales, investment and property services. We help individuals, families and investors
            secure land and homes through a transparent, guided ownership process.
          </p>
          <img
            src="/images/brand/aceroyal-team.jpg"
            alt="The Aceroyal Estates team"
            width={1800}
            height={1440}
            className="mt-12 w-full max-w-5xl mx-auto aspect-[4/3] md:aspect-[16/9] rounded-3xl object-cover object-center shadow-xl"
          />
        </div>
      </section>

      {/* Snapshot */}
      <Reveal>
        <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-950">
          <div className="container">
            <Stagger className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold mb-2"><CountUp value={Number(stat.value)} /></div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </Stagger>
          </div>
        </section>
      </Reveal>

      {/* Our Story */}
      <Reveal>
        <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
          <div className="container max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">The Ultimate Standard of Trust</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Real estate ownership should be built on more than a promise. It requires trust,
              clear documentation, and the confidence that what you invest in is truly yours.
              That is the standard Aceroyal was built to uphold.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              A subsidiary of AceRoyalpro Services, Aceroyal Estates makes property ownership
              accessible and trustworthy for Nigerians at home and in the diaspora through
              transparent processes, clear titling, and structured documentation.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Operating across Lagos, Oyo, Enugu, Edo, and Abuja, with three physical offices, our
              portfolio spans residential land, homes, wellness-led communities, and commercial
              developments. Our projects include Villa Nova Bungalows, Eko Paragon Residence,
              Downtown Lagos Commercial City, Alpha Garden City Resort, Edo Mega City, Heritage
              Estates, Legacy Garden City and Prime Boulevard Annex.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our track record includes Eko Paragon Residence, a 105-unit development delivered in
              partnership with the Lagos State Government within 18 months, and Downtown Lagos
              Commercial City, expanding along one of Lagos&apos;s emerging growth corridors. Our
              services cover estate development, property sales and allocation, estate and
              facility management, and diaspora real estate advisory. Led by Dr. Endurance Cletus
              Agonor, GCEO and Chairman, we are creating opportunities for people to own with
              confidence, invest with clarity, and build lasting value.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Mission & Vision */}
      <Reveal>
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">Mission</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To create affordable housing for all and reduce the global housing deficit in
                  line with the United Nations Sustainable Development Goals. As we believe
                  everyone deserves a decent place to call home.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">Vision</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To deliver quality-assured housing for all, irrespective of income. Our dream
                  is to see dreams come true.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Core Values</h2>
            <Stagger as="ul" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <li
                  key={value}
                  className={`flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 shadow-sm px-4 py-6 text-center ${
                    index === values.length - 1 ? 'col-span-2 sm:col-span-1' : ''
                  }`}
                >
                  <h3 className="text-lg font-semibold text-primary break-words">{value}</h3>
                </li>
              ))}
            </Stagger>
          </div>
        </section>
      </Reveal>

      {/* What We Do */}
      <Reveal>
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What We Do</h2>
            <Stagger className="grid gap-4 md:grid-cols-2 lg:gap-6 lg:grid-cols-2 xl:grid-cols-3 max-w-5xl lg:mx-auto">
              {services.map((service) => (
                <div key={service.title} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6">
                  <div className="inline-flex items-center justify-center w-11 h-11 bg-primary/10 rounded-lg mb-4">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              ))}
            </Stagger>
            <div className="text-center mt-10">
              <Link href="/services">
                <Button size="lg" variant="outline">Explore Our Services</Button>
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Leadership — the GCEO and COO lead with full seated portraits; the
          rest of the team follows as matching headshots. */}
      {teamMembers.length > 0 && (
        <Reveal>
          <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
            <div className="container">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Leadership & Team</h2>
              {featuredLeaders.length > 0 && (
                <Stagger className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
                  {featuredLeaders.map((leader: { id: string; name: string; role: string }) => (
                    <figure
                      key={leader.id}
                      className="overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-800 shadow-sm"
                    >
                      <img
                        src={FEATURED_PORTRAITS[leader.id]}
                        alt={`${leader.name} - ${leader.role}`}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover object-top"
                      />
                      <figcaption className="p-5 text-center">
                        <p className="text-lg font-semibold">{leader.name}</p>
                        <p className="text-sm text-muted-foreground">{leader.role}</p>
                      </figcaption>
                    </figure>
                  ))}
                </Stagger>
              )}
              <TeamGrid members={otherMembers} />
            </div>
          </section>
        </Reveal>
      )}

      {/* Partnerships */}
      <Reveal>
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950">
          <div className="container max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">International Reach</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our partnership with AEON Trisl Group and Emaar Properties Dubai brings
              international development standards into how we plan and build.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Why Aceroyal */}
      <Reveal>
        <section className="py-16 md:py-24 bg-primary text-white">
          <div className="container grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Aceroyal Estates?</h2>
              <Stagger as="ul" className="divide-y divide-white/20">
                {whyAceroyal.map((item) => (
                  <li key={item.title} className="py-5 first:pt-0 last:pb-0">
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <p className="opacity-90 leading-relaxed">{item.description}</p>
                  </li>
                ))}
              </Stagger>
            </div>
            <img
              src="/images/brand/aceroyal-team-trio.jpg"
              alt="Aceroyal Estates team members"
              width={1000}
              height={1250}
              loading="lazy"
              className="mx-auto aspect-[4/5] w-full max-w-sm rounded-3xl object-cover object-top shadow-xl md:max-w-none"
            />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find the Right Property?</h2>
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
