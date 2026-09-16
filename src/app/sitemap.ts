import type { MetadataRoute } from 'next';
import { fetchAPI } from '@/lib/api';

const SITE_URL = 'https://aceroyalestates.com';

// Static, next-sitemap's postbuild crawl (removed) only ever saw the static
// route tree — it had no way to know about [slug] routes, so every blog
// post, estate, and property page was invisible to search engines. This
// dynamic sitemap fetches the actual content so they're all included.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [estatesRes, propertiesRes, blogRes] = await Promise.all([
    fetchAPI('/estates?take=1000').catch(() => ({ items: [] })),
    fetchAPI('/properties?take=1000').catch(() => []),
    fetchAPI('/blog?take=1000').catch(() => ({ items: [] })),
  ]);

  const estates = estatesRes?.items || (Array.isArray(estatesRes) ? estatesRes : []);
  const properties = Array.isArray(propertiesRes) ? propertiesRes : propertiesRes?.items || [];
  const posts = blogRes?.items || (Array.isArray(blogRes) ? blogRes : []);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/estates`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/properties`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/gallery`, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${SITE_URL}/blog`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/services`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/careers`, changeFrequency: 'weekly', priority: 0.4 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/faq`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/resources`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/book-inspection`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/terms`, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const estateRoutes: MetadataRoute.Sitemap = estates.map((estate: any) => ({
    url: `${SITE_URL}/estates/${estate.slug}`,
    lastModified: estate.updatedAt ? new Date(estate.updatedAt) : undefined,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const propertyRoutes: MetadataRoute.Sitemap = properties.map((property: any) => ({
    url: `${SITE_URL}/properties/${property.slug}`,
    lastModified: property.updatedAt ? new Date(property.updatedAt) : undefined,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : undefined,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...estateRoutes, ...propertyRoutes, ...blogRoutes];
}
