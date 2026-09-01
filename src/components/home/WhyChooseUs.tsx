import { BadgeCheck, Zap, Shield, Headset } from 'lucide-react';

export function WhyChooseUs() {
  const features = [
    { icon: BadgeCheck, title: 'Verified Listings', desc: 'Every property is thoroughly vetted for authenticity.' },
    { icon: Zap, title: 'Fast Processes', desc: 'Seamless documentation and allocation within 24 hours.' },
    { icon: Shield, title: 'Secure Transactions', desc: 'Bank-grade security for all financial dealings.' },
    { icon: Headset, title: '24/7 Support', desc: 'Dedicated customer success team at your service.' },
  ];

  return (
    <section className="bg-slate-50 dark:bg-slate-950 py-20 md:py-28">
      <div className="container text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose AceRoyal?</h2>
        <p className="text-slate-500 max-w-2xl mx-auto mb-12">We are redefining the real estate experience in Nigeria with transparency, speed, and integrity.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 dark:border-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
