import { Button } from '@/components/ui/button';
import { Award, Users, Home, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { fetchAPI } from '@/lib/api';

export default async function AboutPage() {
  // TODO(content): these are the only stats we can actually back up right now
  // (estates + states are counted from real listings). Client-facing numbers
  // like "properties sold" or "happy clients" need real figures from Daniel —
  // do not invent them.
  const stats = [
    { icon: Home, label: 'Active Estates', value: '7' },
    { icon: Award, label: 'States We Operate In', value: '5' },
    { icon: Users, label: 'Physical Offices', value: '3' },
    { icon: TrendingUp, label: 'Service Categories', value: '9+' },
  ];
  const values = [
    { title: 'Integrity', description: 'Clear titles, honest communication, and no hidden surprises.' },
    { title: 'Customer-First', description: 'We design estates and services around real client needs.' },
    { title: 'Quality', description: 'Premium infrastructure, verified documentation, and lasting value.' },
    { title: 'Innovation', description: 'Modern tools and processes that simplify ownership.' },
    { title: 'Accountability', description: 'We keep our promises and deliver on schedule.' },
  ];
  const teamMembers = await fetchAPI('/team').catch(() => []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">About Aceroyal Estates</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Aceroyal Estate is a subsidiary of ACEROYALPRO SERVICES, and one of the fastest growing
              and most reliable commercial real estate firms in Lagos, Nigeria.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {values.map((value) => (
                <div key={value.title} className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-2 text-primary">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What We Do & Partnerships */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">What We Do</h2>
              <p className="text-muted-foreground leading-relaxed">
                A wide range of real estate services, including Sales, Lease, Estate/Facility Management,
                Renovation, Development/Construction, Investment/Consultation Brokerage, Valuation, Survey,
                and Ratification.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Global Partnerships</h2>
              <p className="text-muted-foreground leading-relaxed">
                Aceroyal Estate is the only Nigerian partner of the AEON Trisl Group (headquartered in Dubai,
                with branches in London, Karachi, Lahore, and Gujrat), and partners with Emaar Properties
                Dubai to deliver some of the best property prices to Africa and Africans in the diaspora.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-gradient-to-r from-[#E01C24] to-[#B5161C] rounded-lg shadow-lg p-12 text-white mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Aceroyal Estates?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-xl mb-3">Verified Listings</h3>
                <p className="opacity-90">
                  All properties are thoroughly verified to ensure authenticity and quality.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-3">Expert Guidance</h3>
                <p className="opacity-90">
                  Our experienced team provides professional support throughout your journey.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-3">Transparent Process</h3>
                <p className="opacity-90">
                  No hidden fees or surprises. Clear communication at every step.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-white dark:bg-slate-800 rounded-lg shadow-lg p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Explore our extensive collection of properties or get in touch with our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/estates">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Estates
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          {teamMembers.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member: any) => (
                  <div key={member.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
                    {member.photoUrl && (
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="h-32 w-32 rounded-full object-cover mx-auto mb-4"
                      />
                    )}
                    <h3 className="text-xl font-semibold text-center">{member.name}</h3>
                    <p className="text-sm text-muted-foreground text-center mb-3">{member.role}</p>
                    {member.bio && (
                      <p className="text-sm text-muted-foreground text-center">{member.bio}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
