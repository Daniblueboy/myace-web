'use client';

import { useState } from 'react';
import { fallbackPartners } from '@/lib/fallback-data';
import { useAutoScrollRow } from '@/hooks/useAutoScrollRow';

type Partner = (typeof fallbackPartners)[number] & { websiteUrl?: string | null };

// A fixed light card behind every logo — regardless of site theme — since
// partner logos are designed for a range of backgrounds (some carry dark
// text meant for white, some are white-only artwork meant for a dark
// badge); a uniform light tile is the only surface all of them read
// correctly on, in both light and dark mode. Logos that already carry
// their own solid background (ownBackground: true) fill the card edge to
// edge instead of being padded onto white — padding them would double-box
// the logo (a visible white ring around its own colored square).
function PartnerLogo({ partner }: { partner: Partner }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-24 items-center justify-center rounded-xl bg-white px-3 text-xs font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200">
        {partner.name}
      </div>
    );
  }

  const img = (
    <img
      src={partner.logoUrl}
      alt={partner.name}
      onError={() => setFailed(true)}
      className={partner.ownBackground ? 'h-24 w-full rounded-xl object-cover' : 'max-h-16 w-auto object-contain'}
    />
  );

  const card = partner.ownBackground ? (
    img
  ) : (
    <div className="flex h-24 items-center justify-center rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition-shadow duration-300 group-hover:shadow-md">
      {img}
    </div>
  );

  return partner.websiteUrl ? (
    <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="block">
      {card}
    </a>
  ) : (
    card
  );
}

/** Partner logo row — rendered inside TrustSection. */
export function PartnersRow() {
  const partners = fallbackPartners;
  const { ref, handlers } = useAutoScrollRow<HTMLDivElement>({ itemCount: partners.length });

  return (
    <div
          ref={ref}
          {...handlers}
          className="flex gap-6 overflow-x-auto scroll-hide snap-x snap-mandatory -mx-4 px-4 items-center lg:mx-0 lg:px-0 lg:justify-center"
        >
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="group shrink-0 w-[38%] snap-center grayscale transition-all duration-300 hover:grayscale-0 md:w-52 lg:w-44"
            >
              <PartnerLogo partner={partner} />
              <p className="mt-2 h-4 truncate text-center text-xs font-medium text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {partner.name}
              </p>
            </div>
          ))}
    </div>
  );
}
