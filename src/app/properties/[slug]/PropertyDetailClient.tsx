'use client';

import { useEffect, useMemo, useState } from 'react';
import { fetchAPI } from '@/lib/api';
import { Property } from '@/shared';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Square, ArrowLeft, FileText } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import dynamic from 'next/dynamic';
import PropertyGallery from '@/components/properties/PropertyGallery';
import PropertyEnquiryForm from '@/components/properties/PropertyEnquiryForm';
import PropertyPanorama from '@/components/properties/PropertyPanorama';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { AdaptiveVideoPlayer } from '@/components/media/AdaptiveVideoPlayer';

// Dynamically import map to avoid SSR issues with Leaflet
const PropertyMap = dynamic(() => import('@/components/properties/PropertyMap'), {
  ssr: false,
  loading: () => <div className="h-[400px] rounded-lg bg-slate-100 dark:bg-slate-800" />,
});

// Converts a YouTube/Vimeo watch URL into its embeddable form and adds
// autoplay+mute params — browsers block non-muted autoplay outright, and
// starting muted (with controls still available to unmute) is what lets
// the video draw attention the moment this section scrolls into view.
function getAutoplayEmbedUrl(url: string) {
  if (!url) return url;
  if (url.includes('youtube.com/embed/')) return `${url}${url.includes('?') ? '&' : '?'}autoplay=1&mute=1&playsinline=1`;
  if (url.includes('player.vimeo.com')) return `${url}${url.includes('?') ? '&' : '?'}autoplay=1&muted=1`;
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1]?.split(/[?&]/)[0];
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&playsinline=1` : url;
  }
  if (url.includes('youtube.com/watch')) {
    const id = new URL(url).searchParams.get('v');
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&playsinline=1` : url;
  }
  if (url.includes('vimeo.com/')) {
    const id = url.split('vimeo.com/')[1]?.split(/[?&]/)[0];
    return id ? `https://player.vimeo.com/video/${id}?autoplay=1&muted=1` : url;
  }
  return url;
}

export default function PropertyDetailClient() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState<Property[]>([]);
  const [flyerOpen, setFlyerOpen] = useState(false);
  const [flyerIndex, setFlyerIndex] = useState(0);
  const [docOpen, setDocOpen] = useState(false);
  const [docUrl, setDocUrl] = useState('');
  const [docTitle, setDocTitle] = useState('');

  const variants = property?.variants || [];
  const outrightVariants = variants.filter((variant: any) => !variant.paymentType || variant.paymentType === 'OUTRIGHT');
  const installmentVariants = variants.filter((variant: any) => variant.paymentType === 'INSTALLMENT');
  const outrightPrices = outrightVariants
    .map((variant: any) => Number(variant.price))
    .filter((price: number) => !Number.isNaN(price));
  const minOutrightPrice = outrightPrices.length > 0 ? Math.min(...outrightPrices) : null;
  const paymentFlyers = useMemo(
    () =>
      (property?.media || []).filter(
        (item: any) => item.type === 'FLYER' || item.type === 'BROCHURE'
      ),
    [property?.media]
  );
  const imageFlyers = paymentFlyers.filter((item: any) => /\.(png|jpe?g|webp)$/i.test(item.url));
  const flyerSlides = imageFlyers.map((item: any) => ({ src: item.url, alt: item.title || 'Payment plan' }));

  useEffect(() => {
    async function load() {
      if (!params || !params.slug) return;
      try {
        const data = await fetchAPI(`/properties/${params.slug}`);
        setProperty(data);
      } catch (error) {
        console.error('Failed to load property', error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params, router]);

  useEffect(() => {
    if (!property?.state) return;
    fetchAPI(`/properties?state=${encodeURIComponent(property.state)}&take=3`)
      .then((data) => {
        const filtered = data.filter((item: Property) => item.id !== property.id);
        setRelated(filtered);
      })
      .catch(() => setRelated([]));
  }, [property]);

  if (loading) return <div className="container py-24 text-center">Loading property details...</div>;
  if (!property) return <div className="container py-24 text-center">Property not found.</div>;

  return (
    <div className="min-h-screen pb-20">
      {/* Back Button */}
      <div className="container py-4">
        <Link href="/properties">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Estate Offerings
          </Button>
        </Link>
      </div>

      {/* Gallery */}
      <div className="container mb-8">
        <PropertyGallery images={property.images || []} />
      </div>

      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content — ordered after the enquiry sidebar on mobile (see
            below) so the enquiry CTA is the first thing a visitor reaches,
            not something buried at the bottom of a long stacked page. */}
        <div className="order-2 md:order-1 md:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex gap-2 mb-3">
              <Badge variant="secondary" className="bg-primary text-white">
                {property.status}
              </Badge>
              <Badge variant="outline">
                {property.type === 'LAND' ? 'Land' : property.type === 'APARTMENT' ? 'Apartment' : property.type}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{property.title}</h1>
            <div className="flex items-center text-slate-600 dark:text-slate-300 text-lg">
              <MapPin className="w-5 h-5 mr-2" />
              {property.address}, {property.city}, {property.state}
            </div>
            {property.estate && (
              <div className="mt-2 text-sm text-slate-500 dark:text-muted-foreground">
                Estate: <Link href={`/estates/${property.estate.slug}`} className="text-primary font-medium">
                  {property.estate.name}
                </Link>
              </div>
            )}
            {property.estate && (
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/estates/${property.estate.slug}`}>Explore Estate</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/book-inspection">Book Inspection</Link>
                </Button>
              </div>
            )}
            <div className="text-3xl font-bold text-primary mt-4">
              {minOutrightPrice !== null ? 'From ' : ''}
              {property.currency} {Number(minOutrightPrice ?? property.price).toLocaleString()}
            </div>
          </div>

          {/* Overview Stats */}
          <Card className="glass-card backdrop-blur-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <Bed className="w-6 h-6 text-primary mb-2" />
                  <span className="font-bold text-lg">{property.bedrooms || 'N/A'}</span>
                  <span className="text-sm text-slate-500 dark:text-muted-foreground">Bedrooms</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <Bath className="w-6 h-6 text-primary mb-2" />
                  <span className="font-bold text-lg">{property.bathrooms || 'N/A'}</span>
                  <span className="text-sm text-slate-500 dark:text-muted-foreground">Bathrooms</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <Square className="w-6 h-6 text-primary mb-2" />
                  <span className="font-bold text-lg">{property.size || 'N/A'}</span>
                  <span className="text-sm text-slate-500 dark:text-muted-foreground">Sq Meters</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {variants.length > 0 && (
            <Card className="glass-card backdrop-blur-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Pricing Options</h2>
                <div className="space-y-3">
                  {outrightVariants.map((variant: any) => (
                    <div
                      key={variant.id}
                      className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 rounded-lg border p-4"
                    >
                      <div>
                        <p className="font-semibold">{variant.label}</p>
                        <p className="text-sm text-slate-500 dark:text-muted-foreground">
                          {variant.bedrooms ? `${variant.bedrooms} bed` : null}
                          {variant.bathrooms ? ` · ${variant.bathrooms} bath` : null}
                          {variant.size ? ` · ${variant.size}` : null}
                        </p>
                      </div>
                      <div className="text-lg font-bold text-primary">
                        {variant.currency} {Number(variant.price).toLocaleString()}
                      </div>
                    </div>
                  ))}
                  {outrightVariants.length === 0 && (
                    <div className="rounded-lg border p-4 text-slate-500 dark:text-muted-foreground">
                      No outright pricing options listed.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Description */}
          <Card className="glass-card backdrop-blur-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                {property.description}
              </p>
            </CardContent>
          </Card>

          {/* Video & Virtual Tour — promoted out of the Media tab to right
              after Description (was previously the last of six tabs, easy
              to miss) since video is what actually catches attention; the
              video autoplays (muted, per browser autoplay rules) for that
              reason. Only rendered when there's real media, and only shown
              here in one place — the Media tab below it is gone. */}
          {(property.panoramaUrl ||
            property.videoUrl ||
            (property.media &&
              property.media.filter((item: any) => item.type !== 'FLYER' && item.type !== 'BROCHURE').length > 0)) && (
            <Card className="glass-card backdrop-blur-lg">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-2xl font-bold">Video &amp; Virtual Tour</h2>

                {property.videoUrl && (
                  <AdaptiveVideoPlayer
                    src={property.videoUrl}
                    embedSrc={
                      property.videoUrl.includes('youtube') || property.videoUrl.includes('vimeo')
                        ? getAutoplayEmbedUrl(property.videoUrl)
                        : null
                    }
                    title={`Video tour for ${property.title}`}
                  />
                )}

                {property.panoramaUrl && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">360° Virtual Tour</h3>
                    <PropertyPanorama panoramaUrls={[property.panoramaUrl]} />
                  </div>
                )}

                {property.media &&
                  property.media.filter((item: any) => item.type !== 'FLYER' && item.type !== 'BROCHURE').length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Additional Media</h3>
                    {property.media
                      .filter((item: any) => item.type !== 'FLYER' && item.type !== 'BROCHURE')
                      .map((item: any) => (
                      <div key={item.id} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-medium">{item.title || item.type}</p>
                            <p className="text-sm text-slate-500 dark:text-muted-foreground">{item.type}</p>
                          </div>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary text-sm font-medium"
                          >
                            Open
                          </a>
                        </div>
                        {item.type === 'VIDEO' && (
                          <div className="mt-4">
                            <AdaptiveVideoPlayer
                              src={item.url}
                              embedSrc={
                                item.url.includes('youtube') || item.url.includes('vimeo')
                                  ? getAutoplayEmbedUrl(item.url)
                                  : null
                              }
                              title={`Video for ${property.title}`}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <Link href={property.estate ? `/book-inspection?estate=${property.estate.slug}` : '/book-inspection'}>
                    Book Inspection
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Tabs */}
          <Tabs defaultValue="location">
            {/* TabsList is w-fit by design (shadcn default) and doesn't wrap
                its 6 labels — on mobile that's wider than the viewport, and
                with nothing to contain it the overflow leaks into the whole
                page body instead of just this row. Scope the scroll here. */}
            <div className="overflow-x-auto scroll-hide -mx-4 px-4 md:mx-0 md:px-0">
              <TabsList>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="faqs">FAQs</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="payment">Payment Plan</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="location" className="mt-4">
              <PropertyMap
                latitude={property.latitude}
                longitude={property.longitude}
                mapEmbedUrl={property.mapEmbedUrl}
                title={property.title}
                address={`${property.address}, ${property.city}`}
              />
              <div className="mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${property.latitude || 6.5244},${property.longitude || 3.3792}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Google Maps
                  </a>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="amenities" className="mt-4">
              <Card className="glass-card backdrop-blur-lg">
                <CardContent className="p-6">
                  {property.amenities && property.amenities.length > 0 ? (
                    <ul className="grid grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-300">
                      {property.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-primary" />
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-500 dark:text-muted-foreground">No amenities listed for this property.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="faqs" className="mt-4">
              {property.faqs && property.faqs.length > 0 ? (
                <Card className="glass-card backdrop-blur-lg">
                  <CardContent className="p-6 space-y-4">
                    {property.faqs.map((faq: any) => (
                      <div key={faq.id}>
                        <h4 className="font-semibold mb-2">{faq.question}</h4>
                        <p className="text-slate-600 dark:text-slate-300">{faq.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ) : (
                <Card className="glass-card backdrop-blur-lg">
                  <CardContent className="p-6 text-center text-slate-500 dark:text-muted-foreground">
                    No FAQs available for this property
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="resources" className="mt-4">
              <Card className="glass-card backdrop-blur-lg">
                <CardContent className="p-6">
                  {property.resources && property.resources.length > 0 ? (
                    <div className="space-y-3">
                      {property.resources.map((resource: any) => (
                        <a
                          key={resource.id}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between rounded-lg border p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          <div>
                            <p className="font-medium">{resource.title}</p>
                            <p className="text-sm text-slate-500 dark:text-muted-foreground">{resource.fileType}</p>
                          </div>
                          <FileText className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 dark:text-muted-foreground">No resources available for this property.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="payment" className="mt-4 space-y-4">
              {paymentFlyers.length > 0 ? (
                <div className="flex gap-4 overflow-x-auto scroll-hide snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:overflow-visible lg:gap-6 lg:grid-cols-2">
                  {paymentFlyers.map((item: any, index: number) => (
                      <div
                        key={item.id}
                        className="glass-card backdrop-blur-lg shrink-0 w-[82%] snap-center rounded-lg border bg-white dark:bg-slate-900 dark:border-slate-800 p-4 text-left hover:shadow-md transition-shadow lg:w-auto lg:shrink"
                      >
                        <div className="mb-3">
                          <p className="font-semibold">{item.title || 'Payment Plan'}</p>
                          <p className="text-sm text-slate-500 dark:text-muted-foreground">{item.type}</p>
                        </div>
                        {/\.(png|jpe?g|webp)$/i.test(item.url) ? (
                          <button
                            type="button"
                            className="w-full"
                            onClick={() => {
                              const imageIndex = imageFlyers.findIndex((img: any) => img.id === item.id);
                              if (imageIndex >= 0) {
                                setFlyerIndex(imageIndex);
                                setFlyerOpen(true);
                              }
                            }}
                          >
                            <img
                              src={item.url}
                              alt={item.title || 'Payment plan'}
                              className="w-full rounded-lg border object-cover"
                            />
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="aspect-[4/3] w-full rounded-lg border overflow-hidden"
                            onClick={() => {
                              setDocTitle(item.title || 'Payment plan');
                              setDocUrl(item.url);
                              setDocOpen(true);
                            }}
                          >
                            <iframe
                              src={item.url}
                              title={item.title || 'Payment plan'}
                              className="w-full h-full"
                            />
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              ) : installmentVariants.length > 0 ? (
                <Card className="glass-card backdrop-blur-lg">
                  <CardContent className="p-6 space-y-4">
                    {installmentVariants.map((variant: any) => (
                      <div key={variant.id} className="rounded-lg border p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <p className="font-semibold">{variant.label}</p>
                            <p className="text-sm text-slate-500 dark:text-muted-foreground">
                              Upfront {variant.upfrontPercent || 0}% · {variant.installmentMonths || '-'} months ·
                              {` ${variant.currency} ${Number(variant.installmentAmount || 0).toLocaleString()}/mo`}
                            </p>
                          </div>
                          <div className="text-lg font-bold text-primary">
                            {variant.currency} {Number(variant.price).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ) : (
                <Card className="glass-card backdrop-blur-lg">
                  <CardContent className="p-6 text-center text-slate-500 dark:text-muted-foreground">
                    No payment plan available for this property.
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          {related.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Related Properties</h2>
              <div className="flex gap-4 overflow-x-auto scroll-hide snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:overflow-visible lg:grid-cols-2 lg:gap-6">
                {related.map((item) => (
                  <Link key={item.id} href={`/properties/${item.slug}`} className="shrink-0 w-[82%] max-w-sm snap-center lg:w-auto lg:max-w-none lg:shrink">
                    <Card className="glass-card backdrop-blur-lg overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-muted-foreground">
                          {item.city}, {item.state}
                        </p>
                        <p className="text-sm font-medium text-primary mt-2">
                          {item.currency} {Number(item.price).toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar — moved ahead of Main Content in visual order on mobile
            (order-1 vs Main Content's order-2) so the enquiry form is the
            top of the page there; unchanged on desktop where it's already
            the visible right-hand column. */}
        <div className="order-1 md:order-2">
          <PropertyEnquiryForm
            propertyId={property.id}
            propertyTitle={property.title}
            variants={property.variants}
          />
        </div>
      </div>
      {flyerSlides.length > 0 && (
        <Lightbox
          open={flyerOpen}
          close={() => setFlyerOpen(false)}
          index={flyerIndex}
          slides={flyerSlides}
        />
      )}
      {docOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
        >
          <div className="w-full max-w-5xl rounded-lg bg-white dark:bg-slate-900 shadow-lg overflow-hidden">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h4 className="text-sm font-semibold">{docTitle}</h4>
              <button
                type="button"
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                onClick={() => setDocOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="h-[70vh]">
              <iframe src={docUrl} title={docTitle} className="w-full h-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
