import { fetchAPI } from '@/lib/api';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Award, Shield } from 'lucide-react';

export default async function ComplianceSection() {
  const items = await fetchAPI('/compliance?displayOnHome=true');

  if (!items || items.length === 0) return null;

  const iconMap: any = {
    CAC_REGISTRATION: Shield,
    GOVT_CERTIFICATE: Award,
    LEGAL_DOCUMENT: CheckCircle2,
    AWARD: Award,
    OTHER: CheckCircle2,
  };

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted & Certified</h2>
          <p className="text-muted-foreground">
            Fully registered and compliant with Nigerian regulations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item: any) => {
            const Icon = iconMap[item.type] || CheckCircle2;
            return (
              <Card key={item.id} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                {item.registrationNo && (
                  <Badge variant="secondary" className="mb-2">
                    {item.registrationNo}
                  </Badge>
                )}
                {item.description && (
                  <p className="text-sm text-muted-foreground mb-3">
                    {item.description}
                  </p>
                )}
                {item.issuedBy && (
                  <p className="text-xs text-muted-foreground">
                    Issued by: {item.issuedBy}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
