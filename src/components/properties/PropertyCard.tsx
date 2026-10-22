import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Property } from '@/shared';
import { MapPin, Bed, Bath, Square } from 'lucide-react';
import { propertyTypeLabel } from '@/lib/estate-offerings';
import { EstateImageFallback } from '@/components/estates/EstateImageFallback';

interface PropertyCardProps {
  property: Property;
  /** Flags this specific card as the most recently added property. */
  isNew?: boolean;
  /** Flags this specific card as a fast-selling/featured pick. */
  isFastSelling?: boolean;
}

export function PropertyCard({ property, isNew = false, isFastSelling = false }: PropertyCardProps) {
  const outrightPrices = property.variants
    ?.filter((variant) => !variant.paymentType || variant.paymentType === 'OUTRIGHT')
    .map((variant) => Number(variant.price))
    .filter((price) => !Number.isNaN(price));
  const minVariantPrice =
    outrightPrices && outrightPrices.length > 0 ? Math.min(...outrightPrices) : null;
  const displayPrice = minVariantPrice ?? Number(property.price);

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
         <h3 className="text-xl font-bold truncate" title={property.title}>{property.title}</h3>
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
          {minVariantPrice !== null ? 'From ' : ''}
          {property.currency} {displayPrice.toLocaleString()}
        </div>
        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300 border-t dark:border-slate-800 pt-4">
           <div className="flex items-center gap-1" title="Bedrooms"><Bed className="w-4 h-4"/> {property.bedrooms || '-'}</div>
           <div className="flex items-center gap-1" title="Bathrooms"><Bath className="w-4 h-4"/> {property.bathrooms || '-'}</div>
           <div className="flex items-center gap-1" title="Size"><Square className="w-4 h-4"/> {property.size || '-'}</div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
         <Link href={`/properties/${property.slug}`} className="w-full">
           <Button className="w-full">View Offering</Button>
         </Link>
      </CardFooter>
    </Card>
  );
}
