import type { Metadata } from 'next';
import { fetchAPI } from '@/lib/api';
import PropertyDetailClient from './PropertyDetailClient';
import { SITE_URL, absoluteUrl, breadcrumbListJsonLd } from '@/lib/json-ld';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await fetchAPI(`/properties/${slug}`).catch(() => null);

  if (!property) {
    return { title: 'Property Not Found' };
  }

  const description =
    (property.description as string | undefined)?.slice(0, 155) ||
    `${property.title} — an Aceroyal Estates property in ${[property.city, property.state].filter(Boolean).join(', ')}.`;

  const title = `${property.title} | Aceroyal Estates`;
  const image = property.images?.[0]?.url;

  return {
    title: property.title,
    description,
    alternates: { canonical: `/properties/${slug}` },
    openGraph: {
      title,
      description,
      url: `/properties/${slug}`,
      images: image ? [image] : undefined,
    },
    twitter: {
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await fetchAPI(`/properties/${slug}`).catch(() => null);

  if (!property) {
    return <PropertyDetailClient />;
  }

  const variants = Array.isArray(property.variants) ? property.variants : [];
  const prices = (variants.length > 0 ? variants : [property])
    .map((item: any) => Number(item.price))
    .filter((price: number) => !Number.isNaN(price) && price > 0);
  const lowPrice = prices.length > 0 ? Math.min(...prices) : undefined;
  const highPrice = prices.length > 0 ? Math.max(...prices) : undefined;
  const image = absoluteUrl(property.images?.[0]?.url);

  const propertyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description || undefined,
    url: `${SITE_URL}/properties/${property.slug}`,
    image: image ? [image] : undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address || undefined,
      addressLocality: property.city,
      addressRegion: property.state,
      addressCountry: 'NG',
    },
    ...(lowPrice !== undefined && {
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: property.currency || 'NGN',
        lowPrice,
        highPrice,
        availability:
          property.status === 'SOLD_OUT' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
      },
    }),
  };

  const breadcrumbJsonLd = breadcrumbListJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: property.title, path: `/properties/${property.slug}` },
  ]);

  return (
    <>
      <script
        id="property-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertyJsonLd) }}
      />
      <script
        id="property-breadcrumb-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PropertyDetailClient />
    </>
  );
}
