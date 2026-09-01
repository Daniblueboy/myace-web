import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Building2, Users, FileText, HeadphonesIcon } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      icon: Building2,
      title: 'Property Sales',
      description: 'Buy land and apartments across Nigeria with transparent pricing and secure documentation',
      features: [
        'Verified property titles',
        'Flexible payment plans',
        'Government-approved estates',
        'Free site inspection',
      ],
    },
    {
      icon: Users,
      title: 'Real Estate Consultation',
      description: 'Expert guidance on property investment and portfolio building',
      features: [
        'Market analysis',
        'Investment advice',
        'Location scouting',
        'ROI projections',
      ],
    },
    {
      icon: FileText,
      title: 'Documentation Support',
      description: 'Complete assistance with property documentation and legal processes',
      features: [
        'Title verification',
        'Survey plans',
        'C of O processing',
        'Legal documentation',
      ],
    },
    {
      icon: HeadphonesIcon,
      title: 'After-Sales Support',
      description: 'Ongoing support after your purchase',
      features: [
        'Property management',
        'Development updates',
        'Customer support',
        'Community integration',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive real estate solutions tailored to your needs across Nigeria
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service) => (
            <Card key={service.title} className="p-8 hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-6">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#E01C24] to-[#B5161C] rounded-lg shadow-lg p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Let us help you find the perfect property or provide expert consultation for your real estate needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/estates">
              <Button size="lg" variant="secondary">
                Explore Estates
              </Button>
            </Link>
            <Link href="/book-inspection">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Book Inspection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
