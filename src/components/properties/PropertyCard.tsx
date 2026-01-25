import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Property } from '@/shared';
import { MapPin, Bed, Bath, Square } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const outrightPrices = property.variants
    ?.filter((variant) => !variant.paymentType || variant.paymentType === 'OUTRIGHT')
    .map((variant) => Number(variant.price))
    .filter((price) => !Number.isNaN(price));
  const minVariantPrice =
    outrightPrices && outrightPrices.length > 0 ? Math.min(...outrightPrices) : null;
  const displayPrice = minVariantPrice ?? Number(property.price);

  return (
    <Card className="overflow-hidden group flex flex-col h-full">
      <div className="relative h-60 bg-slate-200">
         {/* Image Placeholder */}
         {property.images && property.images[0] ? (
           <img src={property.images[0].url} alt={property.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
         ) : (
           <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
         )}
         <div className="absolute top-4 left-4">
           <span className={`px-3 py-1 rounded-full text-xs font-bold ${property.status === 'AVAILABLE' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
             {property.status}
           </span>
         </div>
         <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
           <span className="bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold uppercase tracking-wider text-slate-900">
             {property.type}
           </span>
         </div>
      </div>
      <CardHeader className="p-4 pb-2">
         <h3 className="text-xl font-bold truncate" title={property.title}>{property.title}</h3>
         {property.estate?.name && (
           <p className="text-xs text-muted-foreground">{property.estate.name}</p>
         )}
         <div className="flex items-center text-slate-500 text-sm">
           <MapPin className="w-4 h-4 mr-1 shrink-0" />
           <span className="truncate">{property.city}, {property.state}</span>
         </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-4 flex-grow">
        <div className="text-2xl font-bold text-primary">
          {minVariantPrice !== null ? 'From ' : ''}
          {property.currency} {displayPrice.toLocaleString()}
        </div>
        <div className="flex justify-between text-sm text-slate-600 border-t pt-4">
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
