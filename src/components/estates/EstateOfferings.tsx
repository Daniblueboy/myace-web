'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileImage } from 'lucide-react';

type FlyerItem = {
  url: string;
  title?: string | null;
  type?: string | null;
};

type OptionItem = {
  id: string;
  label: string;
  price: number;
  currency: string;
  propertyTitle: string;
  flyers: FlyerItem[];
  available: boolean;
};

function isImage(url: string) {
  return /\.(png|jpe?g|webp|gif)$/i.test(url);
}

function normalizeLabel(label: string) {
  return label.replace(/\s*\(out(?:right)?\)\s*/gi, '').replace(/\s+outright$/i, '').trim();
}

export default function EstateOfferings({
  properties = [],
  estateSlug,
}: {
  properties: any[];
  estateSlug?: string;
}) {
  const [open, setOpen] = useState(false);
  const [activeUrl, setActiveUrl] = useState('');
  const [activeTitle, setActiveTitle] = useState('');

  const options = useMemo<OptionItem[]>(() => {
    const items: OptionItem[] = [];
    properties.forEach((property) => {
      const propertyFlyers = (property.media || []).filter(
        (item: any) => item.type === 'FLYER' || item.type === 'BROCHURE'
      );
      const allVariants = property.variants || [];
      const outrightVariants = allVariants.filter(
        (variant: any) => !variant.paymentType || variant.paymentType === 'OUTRIGHT'
      );
      // Most properties always have at least one outright-priced variant, but
      // a purely installment/flexible-plan property (no lump-sum option at
      // all) has none — fall back to showing its installment variants
      // directly instead of collapsing them into one property-level card.
      const displayVariants = outrightVariants.length > 0 ? outrightVariants : allVariants;

      if (displayVariants.length > 0) {
        displayVariants.forEach((variant: any) => {
          // A variant with its own media (e.g. a size-specific pricing
          // flyer) shows only that — not every flyer the property has —
          // so a 500sqm option doesn't display a 1-acre payment plan.
          const variantFlyers = variant.media
            ? variant.media.filter((item: any) => item.type === 'FLYER' || item.type === 'BROCHURE')
            : propertyFlyers;
          items.push({
            id: variant.id,
            label: normalizeLabel(variant.label || property.title),
            price: Number(variant.price),
            currency: variant.currency || property.currency || 'NGN',
            propertyTitle: property.title,
            flyers: variantFlyers,
            available: variant.active !== false,
    });
        });
      } else {
        items.push({
          id: property.id,
          label: normalizeLabel(property.title),
          price: Number(property.price),
          currency: property.currency || 'NGN',
          propertyTitle: property.title,
          flyers: propertyFlyers,
          available: property.status !== 'SOLD',
        });
      }
    });
    return items;
  }, [properties]);

  if (options.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-white dark:bg-slate-900 dark:border-slate-800 p-8 text-muted-foreground">
        No active offerings listed yet. Book an inspection to get early access.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4 overflow-x-auto scroll-hide snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:overflow-visible lg:gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {options.map((option) => (
          <div
            key={option.id}
            className={`glass-card backdrop-blur-lg shrink-0 w-[82%] max-w-sm snap-center rounded-2xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-5 space-y-4 lg:w-auto lg:max-w-none lg:shrink ${option.available ? '' : 'opacity-60'}`}
          >
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Available Option</p>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold">{option.label}</h3>
                {!option.available && (
                  <span className="text-xs uppercase tracking-widest bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 px-2 py-1 rounded-full">
                    Sold Out
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{option.propertyTitle}</p>
            </div>
            <div className="text-2xl font-bold text-primary">
              {option.currency} {Number(option.price).toLocaleString()}
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium">Click to view payment plan</p>
              {option.flyers.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {option.flyers.map((flyer) => (
                    <button
                      key={flyer.url}
                      type="button"
                      className="relative h-20 w-full overflow-hidden rounded-lg border bg-slate-50 dark:bg-slate-800"
                      onClick={() => {
                        setActiveUrl(flyer.url);
                        setActiveTitle(flyer.title || option.label);
                        setOpen(true);
                      }}
                    >
                      {isImage(flyer.url) ? (
                        <img
                          src={flyer.url}
                          alt={flyer.title || option.label}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                          <FileImage className="h-5 w-5" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No flyers uploaded yet.</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button asChild className="flex-1 min-w-0 whitespace-normal h-auto py-2" disabled={!option.available}>
                <Link href={`/contact${estateSlug ? `?estate=${estateSlug}&enquiry=PURCHASE` : '?enquiry=PURCHASE'}`}>
                  Enquire to Purchase
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex-1 min-w-0 whitespace-normal h-auto py-2" disabled={!option.available}>
                <Link href={estateSlug ? `/book-inspection?estate=${estateSlug}` : '/book-inspection'}>
                  Book Inspection
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
          <div className="max-w-3xl w-full rounded-2xl bg-white dark:bg-slate-900 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">{activeTitle}</h4>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden border bg-slate-50 dark:bg-slate-800">
              {isImage(activeUrl) ? (
                <img src={activeUrl} alt={activeTitle} className="w-full h-auto" />
              ) : (
                <iframe title={activeTitle} src={activeUrl} className="w-full h-[70vh]" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
