'use client';

import { useState, useEffect } from 'react';
import { Property } from '@/shared';
import { API_ENABLED, fetchAPI } from '@/lib/api';
import { fallbackEstates, fallbackProperties } from '@/lib/fallback-data';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useSearchParams } from 'next/navigation';

export default function PropertiesClient() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>(fallbackProperties);
  const [loading, setLoading] = useState(false);
  const [estates, setEstates] = useState<any[]>(fallbackEstates);
  const [filters, setFilters] = useState({
    type: '',
    state: '',
    city: '',
    status: '',
    bedrooms: '',
    minPrice: '',
    maxPrice: '',
    sort: '',
    search: '',
    estate: '',
  });
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchProperties = async (overrideFilters = filters, overridePage = page) => {
    if (API_ENABLED) setLoading(true);
    try {
      const params = new URLSearchParams();
      if (overrideFilters.type && overrideFilters.type !== 'ALL') params.append('type', overrideFilters.type);
      if (overrideFilters.state) params.append('state', overrideFilters.state);
      if (overrideFilters.city) params.append('city', overrideFilters.city);
      if (overrideFilters.status) params.append('status', overrideFilters.status);
      if (overrideFilters.bedrooms) params.append('bedrooms', overrideFilters.bedrooms);
      if (overrideFilters.minPrice) params.append('priceMin', overrideFilters.minPrice);
      if (overrideFilters.maxPrice) params.append('priceMax', overrideFilters.maxPrice);
      if (overrideFilters.sort && overrideFilters.sort !== 'newest') params.append('sort', overrideFilters.sort);
      if (overrideFilters.search) params.append('search', overrideFilters.search);
      if (overrideFilters.estate && overrideFilters.estate !== 'ALL') params.append('estateSlug', overrideFilters.estate);
      params.append('skip', String((overridePage - 1) * limit));
      params.append('take', String(limit));

      const data = await fetchAPI(`/properties?${params.toString()}`);
      setProperties(data);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      if (API_ENABLED) setLoading(false);
    }
  };

  useEffect(() => {
    const initialSearch = searchParams.get('search') || '';
    const initialType = searchParams.get('type') || '';
    const initialState = searchParams.get('state') || '';
    const initialEstate = searchParams.get('estate') || searchParams.get('estateSlug') || '';
    if (initialSearch || initialType || initialState || initialEstate) {
      const nextFilters = {
        ...filters,
        search: initialSearch,
        type: initialType,
        state: initialState,
        estate: initialEstate,
      };
      setFilters(nextFilters);
      setPage(1);
      fetchProperties(nextFilters, 1);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProperties();
  }, [page]);

  useEffect(() => {
    fetchAPI('/estates')
      .then((data) => setEstates(data?.items || data || []))
      .catch(() => setEstates([]));
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      state: '',
      city: '',
      status: '',
      bedrooms: '',
      minPrice: '',
      maxPrice: '',
      sort: '',
      search: '',
      estate: '',
    });
    setPage(1);
  };

  return (
    <div className="container py-20 md:py-28">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Estate Offerings</h1>
          <p className="text-slate-500 mt-1">
            Land allocations and apartment sales within our master-planned estates.
          </p>
        </div>

        <div className="w-full md:w-80">
          <Input
            placeholder="Search by title, city, or keyword..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden w-full">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-6">
                <FilterControls
                  filters={filters}
                  onChange={handleFilterChange}
                  onApply={() => {
                    setPage(1);
                    fetchProperties();
                  }}
                  onClear={clearFilters}
                  estates={estates}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0 space-y-6 sticky top-24 self-start">
          <div className="bg-slate-50 p-6 rounded-lg border">
            <h3 className="font-semibold mb-4 flex items-center"><Filter className="mr-2 h-4 w-4" /> Filters</h3>
            <FilterControls
              filters={filters}
              onChange={handleFilterChange}
              onApply={() => {
                setPage(1);
                fetchProperties();
              }}
              onClear={clearFilters}
              estates={estates}
            />
          </div>
        </aside>

        {/* Properties Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {properties.length} results
            </p>
            <Select value={filters.sort} onValueChange={(val) => handleFilterChange('sort', val)}>
              <SelectTrigger className="w-56">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {loading ? (
            <div className="min-h-64" aria-label="Updating estate offerings" />
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-slate-50 rounded-xl border border-dashed">
              <h3 className="text-lg font-medium text-slate-900">No estate offerings found</h3>
              <p className="text-slate-500 mt-1">Try adjusting your filters or search criteria.</p>
              <Button variant="link" onClick={clearFilters} className="mt-2 text-primary">Clear all filters</Button>
            </div>
          )}

          {(page > 1 || properties.length >= limit) && (
            <div className="flex justify-between items-center mt-10">
              <Button
                variant="outline"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">Page {page}</span>
              <Button
                variant="outline"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={properties.length < limit}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterControls({ filters, onChange, onApply, onClear, estates }: any) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Estate</label>
        <Select value={filters.estate} onValueChange={(val) => onChange('estate', val)}>
          <SelectTrigger>
            <SelectValue placeholder="Any Estate" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Any Estate</SelectItem>
            {estates?.map((estate: any) => (
              <SelectItem key={estate.id} value={estate.slug}>
                {estate.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Property Type</label>
        <Select value={filters.type} onValueChange={(val) => onChange('type', val)}>
          <SelectTrigger>
            <SelectValue placeholder="Any Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Any Type</SelectItem>
            <SelectItem value="APARTMENT">Apartment</SelectItem>
            <SelectItem value="LAND">Land</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">State</label>
        <Select value={filters.state} onValueChange={(val) => onChange('state', val)}>
          <SelectTrigger>
            <SelectValue placeholder="Any State" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Lagos">Lagos</SelectItem>
            <SelectItem value="Abuja">Abuja</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">City / LGA</label>
        <Input
          placeholder="e.g. Lekki"
          value={filters.city}
          onChange={(e) => onChange('city', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Status</label>
        <Select value={filters.status} onValueChange={(val) => onChange('status', val)}>
          <SelectTrigger>
            <SelectValue placeholder="Any Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AVAILABLE">Available</SelectItem>
            <SelectItem value="SOLD">Sold</SelectItem>
            <SelectItem value="UPCOMING">Upcoming</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Bedrooms (Apartments)</label>
        <Input
          type="number"
          placeholder="Bedrooms"
          value={filters.bedrooms}
          onChange={(e) => onChange('bedrooms', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Min Price</label>
        <Input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => onChange('minPrice', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Max Price</label>
        <Input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => onChange('maxPrice', e.target.value)}
        />
      </div>

      <div className="pt-4 flex flex-col gap-2">
        <Button onClick={onApply} className="w-full">Apply Filters</Button>
        <Button variant="ghost" onClick={onClear} className="w-full">Reset</Button>
      </div>
    </div>
  );
}
