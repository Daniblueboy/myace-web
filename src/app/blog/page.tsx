import { fetchAPI } from '@/lib/api';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await fetchAPI('/blog?take=20').then(res => res.items || res).catch(() => []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-lg text-muted-foreground">Insights, news, and updates from AceRoyal Estates.</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          No blog posts found. Check back later!
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <Card key={post.id} className="h-full flex flex-col">
              {post.coverImageUrl && (
                <div className="h-48 overflow-hidden rounded-t-lg">
                  <img src={post.coverImageUrl} alt={post.title} className="w-full h-full object-cover transition-transform hover:scale-105" />
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
      )}
    </div>
  );
}
