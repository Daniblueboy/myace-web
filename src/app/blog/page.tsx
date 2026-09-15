import type { Metadata } from 'next';
import { fetchAPI } from '@/lib/api';
import { BlogPostsList } from '@/components/blog/BlogPostsList';

export const dynamic = 'force-dynamic';

const TITLE = 'Blog & Insights | Aceroyal Estates';
const DESCRIPTION = 'Real estate news, investment guides and updates from Aceroyal Estates.';

export const metadata: Metadata = {
  title: 'Blog & Insights',
  description: DESCRIPTION,
  alternates: { canonical: '/blog' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/blog' },
  twitter: { title: TITLE, description: DESCRIPTION },
};

const PAGE_SIZE = 9;

export default async function BlogPage() {
  const data = await fetchAPI(`/blog?take=${PAGE_SIZE}&skip=0`).catch(() => ({ items: [], total: 0 }));
  const posts = data?.items || (Array.isArray(data) ? data : []);
  const total = typeof data?.total === 'number' ? data.total : posts.length;

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-lg text-muted-foreground">Insights, news, and updates from Aceroyal Estates.</p>
      </div>

      <BlogPostsList initialPosts={posts} total={total} pageSize={PAGE_SIZE} />
    </div>
  );
}
