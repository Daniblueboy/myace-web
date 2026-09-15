'use client';

import { useState } from 'react';
import { fallbackPartners } from '@/lib/fallback-data';

type Partner = (typeof fallbackPartners)[number] & { websiteUrl?: string | null };

function PartnerLogo({ partner }: { partner: Partner }) {
  const [failed, setFailed] = useState(false);

  const content = failed ? (
    <div className="h-12 min-w-[120px] rounded-lg bg-slate-100 text-slate-600 dark:bg-[#191919] dark:text-[#d0ccc6] text-xs font-semibold flex items-center justify-center px-3">
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
  const partners = fallbackPartners;

  return (
    <section className="py-12 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Partners & Clients</h2>
          <p className="text-muted-foreground">
            Trusted by leading organizations across Nigeria
          </p>
        </div>

        <div className="flex gap-8 overflow-x-auto scroll-hide snap-x snap-mandatory -mx-4 px-4 items-center lg:mx-0">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex shrink-0 w-[30%] snap-center items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 md:w-40"
            >
              <PartnerLogo partner={partner} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
