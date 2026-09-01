import { fetchAPI } from '@/lib/api';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DOMPurify from 'isomorphic-dompurify';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let post: any = null;
  let related: any[] = [];
  try {
    post = await fetchAPI(`/blog/${resolvedParams.slug}`);
    const relatedData = await fetchAPI('/blog?take=3');
    const items = relatedData?.items || relatedData || [];
    related = items.filter((item: any) => item.slug !== resolvedParams.slug).slice(0, 3);
  } catch {
    post = null;
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link href="/blog">
            <Button variant="outline">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:opacity-80 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <article className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
            {post.coverImageUrl && (
              <div className="aspect-video bg-gradient-to-r from-primary/80 to-primary/40 relative">
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                {post.published && <Badge>Published</Badge>}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

              {post.excerpt && (
                <p className="text-xl text-muted-foreground mb-8 italic border-l-4 border-primary pl-4">
                  {post.excerpt}
                </p>
              )}

              <div className="prose prose-lg dark:prose-invert max-w-none">
                {/<\/?[a-z][\s\S]*>/i.test(post.content) ? (
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />
                ) : (
                  post.content.split('\n').map((line: string, index: number) => {
                    const imageMatch = line.match(/^!\[(.*)\]\((.+)\)$/);
                    if (imageMatch) {
                      const alt = imageMatch[1] || 'Blog image';
                      const url = imageMatch[2];
                      return (
                        <img
                          key={`img-${index}`}
                          src={url}
                          alt={alt}
                          className="w-full rounded-xl border"
                        />
                      );
                    }

                    const videoMatch = line.match(/^\[video\]\((.+)\)$/i);
                    if (videoMatch) {
                      const url = videoMatch[1];
                      const isEmbed = url.includes('youtube') || url.includes('vimeo');
                      return (
                        <div key={`video-${index}`} className="aspect-video rounded-xl overflow-hidden border">
                          {isEmbed ? (
                            <iframe
                              src={url}
                              title={`Blog video ${index + 1}`}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <video controls playsInline preload="metadata" className="w-full h-full">
                              <source src={url} type="video/mp4" />
                            </video>
                          )}
                        </div>
                      );
                    }

                    return (
                      <p key={`p-${index}`} className="mb-4">
                        {line}
                      </p>
                    );
                  })
                )}
              </div>
            </div>
          </article>

          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">More Insights</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.slug}`}
                    className="rounded-xl border bg-slate-50 dark:bg-slate-900 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {item.coverImageUrl && (
                      <img
                        src={item.coverImageUrl}
                        alt={item.title}
                        className="h-40 w-full object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      {item.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link href="/blog">
              <Button variant="outline">View More Posts</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
