import { ComplianceList } from '@/components/home/ComplianceSection';
import { PartnersRow } from '@/components/home/PartnersSection';

// Registration facts and partner logos make the same point (credibility),
// so they share one section instead of two back-to-back ones.
export default function TrustSection() {
  return (
    <section className="py-12 md:py-28 bg-slate-50 dark:bg-slate-900">
      <div className="container">
        <div className="text-center mb-8 md:mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Trusted & Certified</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Registered, Compliant and Well Partnered</h2>
          <p className="mt-4 text-muted-foreground">
            Fully registered and compliant with Nigerian regulations, and trusted by leading organisations
            in Nigeria and beyond.
          </p>
        </div>

        <ComplianceList />

        <div className="mt-12 border-t pt-10 md:mt-16 md:pt-12">
          <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Our Partners
          </h3>
          <PartnersRow />
        </div>
      </div>
    </section>
  );
}
