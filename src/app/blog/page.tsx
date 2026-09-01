import { fetchAPI } from '@/lib/api';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 9;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  const data = await fetchAPI(`/blog?take=${PAGE_SIZE}&skip=${skip}`).catch(() => ({ items: [], total: 0 }));
  const posts = data?.items || (Array.isArray(data) ? data : []);
  const total = typeof data?.total === 'number' ? data.total : posts.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-lg text-muted-foreground">Insights, news, and updates from AceRoyal Estates.</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          {page > 1 ? 'No more posts to show.' : 'No blog posts found. Check back later!'}
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <Card key={post.id} className="group h-full flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {post.coverImageUrl && (
                  <div className="h-48 overflow-hidden rounded-t-lg">
                    <img src={post.coverImageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription>{new Date(post.createdAt).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent className="grow">
                  <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt || post.content.substring(0, 100)}...</p>
                  <Button variant="outline" asChild className="w-full mt-auto">
                    <Link href={`/blog/${post.slug}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Blog pagination">
              <Button variant="outline" size="icon" disabled={page <= 1} asChild={page > 1}>
                {page > 1 ? (
                  <Link href={page - 1 === 1 ? '/blog' : `/blog?page=${page - 1}`} aria-label="Previous page">
                    <ChevronLeft className="h-4 w-4" />
                  </Link>
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  variant={p === page ? 'default' : 'outline'}
                  size="icon"
                  asChild={p !== page}
                  aria-current={p === page ? 'page' : undefined}
                >
                  {p === page ? <span>{p}</span> : <Link href={p === 1 ? '/blog' : `/blog?page=${p}`}>{p}</Link>}
                </Button>
              ))}

              <Button variant="outline" size="icon" disabled={page >= totalPages} asChild={page < totalPages}>
                {page < totalPages ? (
                  <Link href={`/blog?page=${page + 1}`} aria-label="Next page">
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
