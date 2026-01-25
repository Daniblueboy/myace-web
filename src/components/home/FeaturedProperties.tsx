'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Property } from '@/shared';
import { useEffect, useState } from 'react';
import { fetchAPI } from '@/lib/api';
import { PropertyCard } from '@/components/properties/PropertyCard';

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // Fetch featured properties
        // For now fetching all, ideally backend has ?featured=true
        const data = await fetchAPI('/properties?featured=true&take=3');
        setProperties(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
     return <div className="container py-12 text-center">Loading featured properties...</div>;
  }

  return (
    <section className="container py-16">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Featured Estate Offerings</h2>
          <p className="text-slate-500 mt-2">
            Curated land allocations and apartment options within our estates.
          </p>
        </div>
        <Link href="/properties">
          <Button variant="outline">View All</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((prop) => (
          <PropertyCard key={prop.id} property={prop} />
        ))}
      </div>
    </section>
  );
}
