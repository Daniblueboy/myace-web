'use client';

import { useState } from 'react';
import { fallbackPartners } from '@/lib/fallback-data';
import { useAutoScrollRow } from '@/hooks/useAutoScrollRow';

type Partner = (typeof fallbackPartners)[number] & { websiteUrl?: string | null };

// A fixed light card behind every logo — regardless of site theme — since
// partner logos are designed for a range of backgrounds (some carry dark
// text meant for white, some are white-only artwork meant for a dark
// badge); a uniform light tile is the only surface all of them read
// correctly on, in both light and dark mode.
function PartnerLogo({ partner }: { partner: Partner }) {
  const [failed, setFailed] = useState(false);

  const content = failed ? (
    <div className="flex h-16 items-center justify-center px-3 text-xs font-semibold text-slate-600">
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

  return partner.websiteUrl ? (
    <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : (
    content
  );
}

export default function PartnersSection() {
  const partners = fallbackPartners;
  const { ref, handlers } = useAutoScrollRow<HTMLDivElement>({ itemCount: partners.length });

  return (
    <section className="py-12 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Partners</h2>
          <p className="text-muted-foreground">
            Trusted by leading organizations in Nigeria and beyond
          </p>
        </div>

        <div
          ref={ref}
          {...handlers}
          className="flex gap-6 overflow-x-auto scroll-hide snap-x snap-mandatory -mx-4 px-4 items-center lg:mx-0"
        >
          {partners.map((partner) => (
            <div key={partner.id} className="group shrink-0 w-[38%] snap-center md:w-52">
              <div className="flex h-24 items-center justify-center rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition-shadow duration-300 group-hover:shadow-md">
                <PartnerLogo partner={partner} />
              </div>
              <p className="mt-2 text-center text-xs font-medium text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {partner.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
