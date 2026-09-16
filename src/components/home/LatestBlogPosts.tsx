import Link from 'next/link';
import { fallbackBlogPosts } from '@/lib/fallback-data';
import { Calendar } from 'lucide-react';

export default function LatestBlogPosts() {
  const posts = fallbackBlogPosts.slice(0, 3);

  return (
    <section className="py-12 md:py-28 bg-white dark:bg-slate-950">
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

        <div className="flex gap-4 overflow-x-auto scroll-hide snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:overflow-visible lg:gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="glass-card backdrop-blur-lg group shrink-0 w-[82%] snap-center rounded-xl border bg-slate-50 dark:bg-slate-900 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:w-auto lg:shrink"
            >
              {post.coverImageUrl && (
                <div className="h-44 overflow-hidden">
                  <img
                    src={post.coverImageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>
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
