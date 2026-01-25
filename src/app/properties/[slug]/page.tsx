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

// Dynamically import map to avoid SSR issues with Leaflet
const PropertyMap = dynamic(() => import('@/components/properties/PropertyMap'), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-slate-200 rounded-lg animate-pulse" />,
});

export default function PropertyDetailPage() {
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
    <div className="min-h-screen bg-slate-50 pb-20">
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

      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex gap-2 mb-3">
              <Badge variant="secondary" className="bg-primary text-white">
                {property.status}
              </Badge>
              <Badge variant="outline">{property.type}</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{property.title}</h1>
            <div className="flex items-center text-slate-600 text-lg">
              <MapPin className="w-5 h-5 mr-2" />
              {property.address}, {property.city}, {property.state}
            </div>
            {property.estate && (
              <div className="mt-2 text-sm text-slate-500">
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
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center p-4 bg-slate-50 rounded-lg">
                  <Bed className="w-6 h-6 text-primary mb-2" />
                  <span className="font-bold text-lg">{property.bedrooms || 'N/A'}</span>
                  <span className="text-sm text-slate-500">Bedrooms</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-slate-50 rounded-lg">
                  <Bath className="w-6 h-6 text-primary mb-2" />
                  <span className="font-bold text-lg">{property.bathrooms || 'N/A'}</span>
                  <span className="text-sm text-slate-500">Bathrooms</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-slate-50 rounded-lg">
                  <Square className="w-6 h-6 text-primary mb-2" />
                  <span className="font-bold text-lg">{property.size || 'N/A'}</span>
                  <span className="text-sm text-slate-500">Sq Meters</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {variants.length > 0 && (
            <Card>
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
                        <p className="text-sm text-slate-500">
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
                    <div className="rounded-lg border p-4 text-slate-500">
                      No outright pricing options listed.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {property.description}
              </p>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="location">
            <TabsList>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="payment">Payment Plan</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
            </TabsList>
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
              <Card>
                <CardContent className="p-6">
                  {property.amenities && property.amenities.length > 0 ? (
                    <ul className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                      {property.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-primary" />
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-500">No amenities listed for this property.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="faqs" className="mt-4">
              {property.faqs && property.faqs.length > 0 ? (
                <Card>
                  <CardContent className="p-6 space-y-4">
                    {property.faqs.map((faq: any) => (
                      <div key={faq.id}>
                        <h4 className="font-semibold mb-2">{faq.question}</h4>
                        <p className="text-slate-600">{faq.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center text-slate-500">
                    No FAQs available for this property
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="resources" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  {property.resources && property.resources.length > 0 ? (
                    <div className="space-y-3">
                      {property.resources.map((resource: any) => (
                        <a
                          key={resource.id}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between rounded-lg border p-4 hover:bg-slate-50 transition-colors"
                        >
                          <div>
                            <p className="font-medium">{resource.title}</p>
                            <p className="text-sm text-slate-500">{resource.fileType}</p>
                          </div>
                          <FileText className="w-5 h-5 text-slate-400" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500">No resources available for this property.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="payment" className="mt-4 space-y-4">
              {paymentFlyers.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {paymentFlyers.map((item: any, index: number) => (
                      <div
                        key={item.id}
                        className="rounded-lg border bg-white p-4 text-left hover:shadow-md transition-shadow"
                      >
                        <div className="mb-3">
                          <p className="font-semibold">{item.title || 'Payment Plan'}</p>
                          <p className="text-sm text-slate-500">{item.type}</p>
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
                <Card>
                  <CardContent className="p-6 space-y-4">
                    {installmentVariants.map((variant: any) => (
                      <div key={variant.id} className="rounded-lg border p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <p className="font-semibold">{variant.label}</p>
                            <p className="text-sm text-slate-500">
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
                <Card>
                  <CardContent className="p-6 text-center text-slate-500">
                    No payment plan available for this property.
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="media" className="mt-4 space-y-6">
              {property.panoramaUrl && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">360° Virtual Tour</h3>
                  <PropertyPanorama panoramaUrl={property.panoramaUrl} />
                </div>
              )}
              {property.videoUrl && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Video Tour</h3>
                  <div className="aspect-video rounded-lg overflow-hidden border">
                    {property.videoUrl.includes('youtube') || property.videoUrl.includes('vimeo') ? (
                      <iframe
                        src={property.videoUrl}
                        title={`Video tour for ${property.title}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video controls className="w-full h-full">
                        <source src={property.videoUrl} />
                      </video>
                    )}
                  </div>
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
                          <p className="text-sm text-slate-500">{item.type}</p>
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
                        <div className="aspect-video rounded-lg overflow-hidden border mt-4">
                          {item.url.includes('youtube') || item.url.includes('vimeo') ? (
                            <iframe
                              src={item.url}
                              title={`Video for ${property.title}`}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <video controls className="w-full h-full">
                              <source src={item.url} />
                            </video>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {!property.panoramaUrl &&
                !property.videoUrl &&
                (!property.media ||
                  property.media.filter((item: any) => item.type !== 'FLYER' && item.type !== 'BROCHURE').length === 0) && (
                <Card>
                  <CardContent className="p-6 text-center text-slate-500">
                    No media available for this property.
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          {related.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Related Properties</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((item) => (
                  <Link key={item.id} href={`/properties/${item.slug}`} className="block">
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-slate-500">
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

        {/* Sidebar */}
        <div>
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
          <div className="w-full max-w-5xl rounded-lg bg-white shadow-lg overflow-hidden">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h4 className="text-sm font-semibold">{docTitle}</h4>
              <button
                type="button"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
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
