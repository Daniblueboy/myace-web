'use client';

import { useEffect, useState } from 'react';
import { fetchAPI } from '@/lib/api';

function PartnerLogo({ partner }: { partner: any }) {
  const [failed, setFailed] = useState(false);

  const content = failed ? (
    <div className="h-12 min-w-[120px] rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold flex items-center justify-center px-3">
      {partner.name}
    </div>
  ) : (
    <img
      src={partner.logoUrl}
      alt={partner.name}
      className="max-h-16 w-auto object-contain"
      onError={() => setFailed(true)}
    />
  );

  if (partner.websiteUrl) {
    return (
      <a
        href={partner.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
}

export default function PartnersSection() {
  const [partners, setPartners] = useState<any[]>([]);

  useEffect(() => {
    fetchAPI('/partners')
      .then((data) => setPartners(data))
      .catch(() => setPartners([]));
  }, []);

  if (!partners || partners.length === 0) return null;

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Partners & Clients</h2>
          <p className="text-muted-foreground">
            Trusted by leading organizations across Nigeria
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner: any) => (
            <div
              key={partner.id}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
            >
              <PartnerLogo partner={partner} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
