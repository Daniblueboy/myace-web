import { fetchAPI } from '@/lib/api';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Award, Shield } from 'lucide-react';

export default async function ComplianceSection() {
  const items = await fetchAPI('/compliance?displayOnHome=true').catch(() => []);

  if (!items || items.length === 0) return null;

  const iconMap: any = {
    CAC_REGISTRATION: Shield,
    DATA_PROTECTION: Shield,
    GOVT_CERTIFICATE: Award,
    LEGAL_DOCUMENT: CheckCircle2,
    AWARD: Award,
    OTHER: CheckCircle2,
  };

  return (
    <section className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted & Certified</h2>
          <p className="text-muted-foreground">
            Fully registered and compliant with Nigerian regulations
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {items.map((item: any) => {
            const Icon = iconMap[item.type] || CheckCircle2;
            return (
              <Card
                key={item.id}
                className="h-full flex flex-col items-center text-center p-8 gap-4 hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                {item.registrationNo && <Badge variant="secondary">{item.registrationNo}</Badge>}
                {item.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                )}
                {item.issuedBy && (
                  <p className="text-xs text-muted-foreground mt-auto pt-2">Issued by: {item.issuedBy}</p>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
