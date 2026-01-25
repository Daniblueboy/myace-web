import Link from 'next/link';
import { fetchAPI } from '@/lib/api';
import { Calendar } from 'lucide-react';

export default async function LatestBlogPosts() {
  const data = await fetchAPI('/blog?take=3').catch(() => ({ items: [] }));
  const posts = data?.items || data || [];

  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-16 bg-white dark:bg-slate-950">
      <div className="container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Latest Insights</h2>
            <p className="text-muted-foreground">
              Market updates and property tips from our team.
            </p>
          </div>
          <Link href="/blog" className="text-primary font-medium hover:underline">
            View all
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post: any) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="rounded-xl border bg-slate-50 dark:bg-slate-900 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow"
            >
              {post.coverImageUrl && (
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="h-44 w-full object-cover"
                />
              )}
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
