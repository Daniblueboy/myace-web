'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fetchAPI } from '@/lib/api';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  coverImageUrl?: string;
  createdAt: string;
}

// Load More instead of numbered pages — keeps everything in one
// horizontally-scrollable row (matching the sitewide no-stacking pattern)
// rather than breaking the list across separate page loads, while still
// fetching in batches instead of the whole archive at once.
export function BlogPostsList({
  initialPosts,
  total,
  pageSize,
}: {
  initialPosts: BlogPost[];
  total: number;
  pageSize: number;
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);
  const hasMore = posts.length < total;

  const loadMore = async () => {
    setLoading(true);
    try {
      const data = await fetchAPI(`/blog?take=${pageSize}&skip=${posts.length}`);
      const next: BlogPost[] = data?.items || (Array.isArray(data) ? data : []);
      setPosts((prev) => [...prev, ...next]);
    } catch (error) {
      console.error('Failed to load more posts', error);
    } finally {
      setLoading(false);
    }
  };

  if (posts.length === 0) {
    return <div className="text-center text-muted-foreground py-12">No blog posts found. Check back later!</div>;
  }

  return (
    <>
      <div className="flex gap-4 overflow-x-auto scroll-hide snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:overflow-visible lg:grid-cols-3 lg:gap-6">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="glass-card backdrop-blur-lg group h-full shrink-0 w-[82%] snap-center flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:w-auto lg:shrink"
          >
            {post.coverImageUrl && (
              <div className="h-48 overflow-hidden rounded-t-lg">
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <CardDescription>{new Date(post.createdAt).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent className="grow">
              <p className="text-muted-foreground line-clamp-3 mb-4">
                {post.excerpt || post.content.substring(0, 100)}...
              </p>
              <Button variant="outline" asChild className="w-full mt-auto">
                <Link href={`/blog/${post.slug}`}>Read More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <Button variant="outline" onClick={loadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </>
  );
}
