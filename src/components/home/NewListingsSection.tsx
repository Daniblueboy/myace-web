import { fetchAPI } from '@/lib/api';
import { PropertyCard } from '@/components/properties/PropertyCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default async function NewListingsSection() {
  const properties = await fetchAPI('/properties?take=6');

  if (!properties || properties.length === 0) return null;

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">New Estate Offerings</h2>
            <p className="text-muted-foreground">
              Fresh land and apartment opportunities across our estates
            </p>
          </div>
          <Link href="/properties">
            <Button variant="outline">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property: any) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
