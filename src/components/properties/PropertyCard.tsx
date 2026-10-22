import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Property } from '@/shared';
import { MapPin, Bed, Ruler } from 'lucide-react';
import { propertyTypeLabel } from '@/lib/estate-offerings';
import { formatPrice, optionPrices } from '@/lib/property-search';
import { EstateImageFallback } from '@/components/estates/EstateImageFallback';

interface PropertyCardProps {
  property: Property;
  /** Flags this specific card as the most recently added property. */
  isNew?: boolean;
  /** Flags this specific card as a fast-selling/featured pick. */
  isFastSelling?: boolean;
}

export function PropertyCard({ property, isNew = false, isFastSelling = false }: PropertyCardProps) {
  const prices = optionPrices(property);
  const displayPrice = Math.min(...prices);
  const hasRange = new Set(prices).size > 1;

  // Only facts the listing actually has: bedrooms for homes, plot sizes for
  // land. (Land used to show blank '-' placeholders here.)
  const variants = property.variants || [];
  const beds = [...new Set([...variants.map((v) => Number(v.bedrooms)), Number(property.bedrooms)].filter((n) => n > 0))].sort((a, b) => a - b);
  const sizes = [...new Set([...variants.map((v) => v.size), property.size].filter((x): x is string => Boolean(x)))];
  const bedLabel =
    beds.length === 0 ? null : beds.length === 1 ? `${beds[0]} bed` : `${beds[0]}–${beds[beds.length - 1]} bed`;
  const sizeLabel = sizes.length === 0 ? null : sizes.slice(0, 2).join(' / ') + (sizes.length > 2 ? ' +' : '');

  return (
    <Card className="overflow-hidden group flex flex-col h-full">
      {/* 7:5 matches the branded estate thumbnails; nothing is laid over the
          image so its own labels stay readable. Badges sit in the header. */}
      <div className="relative aspect-[7/5] overflow-hidden bg-slate-200 dark:bg-slate-800">
         {property.images && property.images[0] ? (
           <img src={property.images[0].url} alt={property.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
         ) : (
           <EstateImageFallback name={property.title} className="w-full h-full" />
         )}
      </div>
      <CardHeader className="p-4 pb-2">
         <div className="mb-2 flex flex-wrap items-center gap-2">
           <span
             className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
               property.status === 'AVAILABLE'
                 ? 'bg-primary text-primary-foreground'
                 : 'bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-white'
             }`}
           >
             {property.status === 'AVAILABLE' ? 'Available' : property.status === 'SOLD' ? 'Sold' : property.status}
           </span>
           <span className="px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wide text-muted-foreground">
             {propertyTypeLabel(property.type)}
           </span>
           {isNew && (
             <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-primary text-primary-foreground">
               New
             </span>
           )}
           {isFastSelling && (
             <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-amber-500 text-white">
               Fast Selling
             </span>
           )}
         </div>
         <h3 className="text-lg font-bold leading-snug line-clamp-2" title={property.title}>{property.title}</h3>
         {property.estate?.name && (
           <p className="text-xs text-muted-foreground">{property.estate.name}</p>
         )}
         <div className="flex items-center text-slate-500 dark:text-muted-foreground text-sm">
           <MapPin className="w-4 h-4 mr-1 shrink-0" />
           <span className="truncate">{property.city}, {property.state}</span>
         </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-4 flex-grow">
        <div className="text-2xl font-bold text-primary">
          {hasRange && <span className="mr-1 text-sm font-medium text-muted-foreground">From</span>}
          {formatPrice(displayPrice, property.currency)}
        </div>
        {(bedLabel || sizeLabel) && (
          <div className="flex flex-wrap gap-x-5 gap-y-1 border-t pt-4 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
            {bedLabel && (
              <span className="flex items-center gap-1.5"><Bed className="h-4 w-4" /> {bedLabel}</span>
            )}
            {sizeLabel && (
              <span className="flex items-center gap-1.5"><Ruler className="h-4 w-4" /> {sizeLabel}</span>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
         <Link href={`/properties/${property.slug}`} className="w-full">
           <Button className="w-full">View Offering</Button>
         </Link>
      </CardFooter>
    </Card>
  );
}
