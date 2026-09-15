import { CheckCircle2, Award, Shield, type LucideIcon } from 'lucide-react';
import { fallbackComplianceItems } from '@/lib/fallback-data';

// Was individual cards — with item 2 missing a registrationNo/issuedBy the
// other two had, the cards visibly didn't match. These are trust facts, not
// comparable product features, so a plain icon+text row communicates it
// better anyway: no boxes to keep equal, no empty space where a badge
// would've been.
export default function ComplianceSection() {
  const items = fallbackComplianceItems.filter((item) => item.displayOnHome && item.active);

  const iconMap: Record<string, LucideIcon> = {
    CAC_REGISTRATION: Shield,
    DATA_PROTECTION: Shield,
    GOVT_CERTIFICATE: Award,
    LEGAL_DOCUMENT: CheckCircle2,
    AWARD: Award,
    OTHER: CheckCircle2,
  };

  return (
    <section className="py-12 md:py-28 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted & Certified</h2>
          <p className="text-muted-foreground">
            Fully registered and compliant with Nigerian regulations
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-8 sm:grid-cols-3">
          {items.map((item) => {
            const Icon = iconMap[item.type] || CheckCircle2;
            return (
              <div key={item.id} className="flex flex-col items-center text-center gap-3">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full shrink-0">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
