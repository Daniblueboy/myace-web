import { Home, Building2, KeyRound, FileText } from 'lucide-react';

export function ServicesSection() {
  const services = [
    {
      icon: Home,
      title: 'Residential Sales',
      description: 'Premium apartments and homes across top Nigerian cities.',
    },
    {
      icon: Building2,
      title: 'Land Acquisition',
      description: 'Secure, verified land titles with transparent documentation.',
    },
    {
      icon: KeyRound,
      title: 'Inspection & Tours',
      description: 'Book guided inspections and virtual tours at your convenience.',
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'End-to-end legal support for safe property transfer.',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-slate-950">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Our Services</h2>
          <p className="text-muted-foreground">
            Full-stack real estate solutions tailored to your goals.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl border bg-slate-50 dark:bg-slate-900 dark:border-slate-800 p-6 hover:shadow-md transition-shadow"
            >
              <service.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
