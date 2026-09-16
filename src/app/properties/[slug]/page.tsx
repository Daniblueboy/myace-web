import type { Metadata } from 'next';
import { fetchAPI } from '@/lib/api';
import PropertyDetailClient from './PropertyDetailClient';

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

export default function PropertyDetailPage() {
  return <PropertyDetailClient />;
}
