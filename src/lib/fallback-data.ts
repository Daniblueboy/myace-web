import type { Estate, Property, TeamMember, Testimonial } from '@/shared';

const now = '2026-01-01T00:00:00.000Z';
const brochureUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

const estateImages = {
  gardens: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80',
  plains: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  haven: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
};

export const fallbackEstates: Estate[] = [
  {
    id: 'fallback-estate-gardens',
    name: 'Aceroyal Gardens',
    slug: 'aceroyal-gardens',
    description: 'Secure gated estate with modern infrastructure, green spaces, and flexible land ownership options.',
    state: 'Lagos',
    city: 'Lekki',
    address: 'Lekki Phase 1',
    coverImage: estateImages.gardens,
    brochureUrl,
    gallery: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    ],
    status: 'ACTIVE',
    amenities: ['Perimeter Fence', 'Street Lights', 'Estate Security', 'Good Road Access'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-estate-plains',
    name: 'Aceroyal Plains',
    slug: 'aceroyal-plains',
    description: 'Affordable serviced plots with clear title documentation and an estate development roadmap.',
    state: 'Abuja',
    city: 'Gwarinpa',
    address: 'Gwarinpa Extension',
    coverImage: estateImages.plains,
    brochureUrl,
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    ],
    status: 'ACTIVE',
    amenities: ['Motorable Roads', 'Survey Plan', 'Clear Titles'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-estate-haven',
    name: 'Aceroyal Haven',
    slug: 'aceroyal-haven',
    description: 'Modern apartment options within a serene residential enclave for families and investors.',
    state: 'Ogun',
    city: 'Mowe',
    address: 'Redemption Camp Road',
    coverImage: estateImages.haven,
    brochureUrl,
    gallery: [
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    ],
    status: 'ACTIVE',
    amenities: ['24/7 Power', 'Central Security', 'Recreational Areas'],
    createdAt: now,
    updatedAt: now,
  },
];

export const fallbackProperties: Property[] = [
  {
    id: 'fallback-property-duplex',
    title: 'Luxury 4 Bedroom Duplex',
    slug: 'luxury-4-bedroom-duplex-lekki',
    description: 'A modern duplex offering generous living spaces, estate security, backup power, and easy access to Lekki business corridors.',
    type: 'APARTMENT',
    status: 'AVAILABLE',
    price: 150000000,
    currency: 'NGN',
    state: 'Lagos',
    city: 'Lekki',
    address: 'Admiralty Way, Lekki Phase 1',
    bedrooms: 4,
    bathrooms: 5,
    size: '450sqm',
    amenities: ['Swimming Pool', 'CCTV', 'Backup Power', 'Security'],
    featured: true,
    latitude: 6.4474,
    longitude: 3.4723,
    images: [
      {
        id: 'fallback-property-duplex-image',
        url: estateImages.gardens,
        altText: 'Luxury duplex exterior',
      },
    ],
    variants: [
      {
        id: 'fallback-duplex-variant-4bed',
        label: '4 Bedroom Duplex',
        price: 150000000,
        currency: 'NGN',
        bedrooms: 4,
        bathrooms: 5,
        size: '450sqm',
        sizeUnit: 'SQM',
        paymentType: 'OUTRIGHT',
        active: true,
      },
      {
        id: 'fallback-duplex-installment',
        label: '4 Bedroom Duplex Payment Plan',
        price: 165000000,
        currency: 'NGN',
        bedrooms: 4,
        bathrooms: 5,
        size: '450sqm',
        sizeUnit: 'SQM',
        paymentType: 'INSTALLMENT',
        upfrontPercent: 30,
        installmentMonths: 12,
        installmentAmount: 9600000,
        active: true,
      },
    ],
    faqs: [
      {
        id: 'fallback-property-faq-1',
        question: 'Can I schedule an inspection?',
        answer: 'Yes. Use the booking form or contact the sales team to confirm the next inspection slot.',
      },
    ],
    resources: [
      {
        id: 'fallback-property-resource-1',
        title: 'Property Brochure',
        fileType: 'PDF',
        url: brochureUrl,
      },
    ],
    estateId: 'fallback-estate-gardens',
    estate: fallbackEstates[0],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-property-land',
    title: 'Prime Estate Land',
    slug: 'prime-estate-land-abuja',
    description: 'Serviced estate plots suitable for residential development, with access roads and documentation support.',
    type: 'LAND',
    status: 'AVAILABLE',
    price: 25000000,
    currency: 'NGN',
    state: 'Abuja',
    city: 'Gwarinpa',
    address: 'Plot 45, Gwarinpa Estate',
    bedrooms: null,
    bathrooms: null,
    size: '500sqm',
    amenities: ['Gated Estate', 'Good Road Access', 'Survey Plan'],
    featured: true,
    latitude: 9.109,
    longitude: 7.404,
    images: [
      {
        id: 'fallback-property-land-image',
        url: estateImages.plains,
        altText: 'Prime estate land',
      },
    ],
    variants: [
      {
        id: 'fallback-land-variant-plot',
        label: '500sqm Plot',
        price: 25000000,
        currency: 'NGN',
        size: '500sqm',
        sizeUnit: 'SQM',
        paymentType: 'OUTRIGHT',
        active: true,
      },
    ],
    faqs: [
      {
        id: 'fallback-land-faq-1',
        question: 'Are payment plans available?',
        answer: 'Yes. Payment-plan availability depends on the estate phase and allocation size.',
      },
    ],
    resources: [
      {
        id: 'fallback-land-resource-1',
        title: 'Estate Brochure',
        fileType: 'PDF',
        url: brochureUrl,
      },
    ],
    estateId: 'fallback-estate-plains',
    estate: fallbackEstates[1],
    createdAt: now,
    updatedAt: now,
  },
];

fallbackEstates[0].properties = [fallbackProperties[0]];
fallbackEstates[1].properties = [fallbackProperties[1]];
fallbackEstates[2].properties = [];

fallbackEstates.forEach((estate) => {
  estate.faqs = [
    {
      id: `${estate.id}-faq-1`,
      question: 'Are documents available for review?',
      answer: 'Yes. The sales team can provide brochure, title, and payment-plan details during enquiry or inspection.',
      sortOrder: 0,
    },
  ];
});

export const fallbackBlogPosts = [
  {
    id: 'fallback-blog-investment',
    title: 'Why Invest in Nigerian Real Estate?',
    slug: 'why-invest-nigerian-real-estate',
    excerpt: 'A practical look at demand, population growth, and long-term estate value.',
    content:
      'Nigeria continues to see strong demand for secure housing and documented land. Well-planned estates with clear infrastructure plans can give buyers better confidence and stronger resale value over time.\n\nBefore buying, review the title documents, estate layout, development timeline, and payment structure. A site inspection remains one of the best ways to compare location quality and surrounding growth.',
    coverImageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    published: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-blog-locations',
    title: 'Top Locations for Estate Buyers',
    slug: 'top-locations-estate-buyers',
    excerpt: 'How to compare access, infrastructure, title, and long-term growth potential.',
    content:
      'Location drives both convenience and long-term value. Buyers should compare access roads, nearby commercial activity, drainage, security, and planned infrastructure.\n\nThe right estate should balance affordability, documentation, and realistic development timelines.',
    coverImageUrl: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
    published: true,
    createdAt: now,
    updatedAt: now,
  },
];

export const fallbackTeamMembers: TeamMember[] = [
  {
    id: 'fallback-team-ceo',
    name: 'Aceroyal Estates Team',
    role: 'Sales and Client Advisory',
    bio: 'Our team supports buyers from enquiry to inspection, documentation, allocation, and after-sales guidance.',
    photoUrl: '/images/cropped-cropped-logo-jpeg.jpg',
    active: true,
  },
];

export const fallbackTestimonials: Testimonial[] = [
  {
    id: 'fallback-testimonial-1',
    name: 'Prospective Buyer',
    role: 'Property Investor',
    message: 'The inspection process and payment information made it easier to understand the available estate options.',
    rating: 5,
    active: true,
  },
  {
    id: 'fallback-testimonial-2',
    name: 'Family Buyer',
    role: 'Home Seeker',
    message: 'The team explained the estate documents and helped us compare options by location and budget.',
    rating: 5,
    active: true,
  },
];

export const fallbackComplianceItems = [
  {
    id: 'fallback-compliance-cac',
    type: 'CAC_REGISTRATION',
    title: 'Registered Real Estate Brand',
    description: 'Company registration and supporting documentation are available for buyer review.',
    registrationNo: 'Available on request',
    issuedBy: 'Corporate Affairs Commission',
    displayOnHome: true,
    active: true,
  },
  {
    id: 'fallback-compliance-docs',
    type: 'LEGAL_DOCUMENT',
    title: 'Documented Estate Process',
    description: 'Brochures, payment details, and title information are shared during enquiry and inspection.',
    displayOnHome: true,
    active: true,
  },
];

export const fallbackPartners = [
  {
    id: 'fallback-partner-1',
    name: 'Aceroyal Estates',
    logoUrl: '/images/cropped-cropped-logo-jpeg.jpg',
    category: 'PARTNER',
    active: true,
  },
];

export const fallbackPromos = [
  {
    id: 'fallback-promo-1',
    title: 'Estate Inspection Slots Open',
    message: 'Book an inspection to review available plots, apartments, and payment plans.',
    details: 'Limited weekly inspection slots are available for Lagos and Abuja estate enquiries.',
    imageUrl: estateImages.gardens,
    linkUrl: '/book-inspection',
    placement: 'SECTION_CARD',
    priority: 1,
    active: true,
  },
];

export const fallbackResources = [
  {
    id: 'fallback-resource-1',
    title: 'Estate Purchase Guide',
    url: brochureUrl,
    fileType: 'PDF',
    estateId: fallbackEstates[0].id,
    estate: fallbackEstates[0],
  },
  {
    id: 'fallback-resource-2',
    title: 'Payment Plan Overview',
    url: brochureUrl,
    fileType: 'PDF',
    estateId: fallbackEstates[1].id,
    estate: fallbackEstates[1],
  },
];

export const fallbackFaqs = [
  {
    id: 'fallback-faq-1',
    question: 'Can I inspect before payment?',
    answer: 'Yes. We recommend booking an inspection before making a purchase decision.',
    sortOrder: 0,
  },
  {
    id: 'fallback-faq-2',
    question: 'Are payment plans available?',
    answer: 'Payment-plan availability depends on the estate and unit type. Contact the team for the current schedule.',
    sortOrder: 1,
  },
];

export const fallbackOffices = [
  {
    id: 'fallback-office-1',
    state: 'Lagos',
    address: 'Lagos office details available on enquiry',
    phones: ['+234 000 000 0000'],
    emails: ['info@aceroyalestates.com'],
    openingHours: 'Mon-Fri: 9am - 5pm',
  },
];

function filterProperties(params: URLSearchParams) {
  return fallbackProperties.filter((property) => {
    const type = params.get('type');
    const status = params.get('status');
    const state = params.get('state');
    const city = params.get('city');
    const featured = params.get('featured');
    const search = params.get('search')?.toLowerCase();
    const estateSlug = params.get('estateSlug');
    const priceMin = Number(params.get('priceMin') || 0);
    const priceMax = Number(params.get('priceMax') || 0);

    if (type && property.type !== type) return false;
    if (status && property.status !== status) return false;
    if (state && !property.state.toLowerCase().includes(state.toLowerCase())) return false;
    if (city && !property.city.toLowerCase().includes(city.toLowerCase())) return false;
    if (featured !== null && property.featured !== (featured === 'true')) return false;
    if (estateSlug && property.estate?.slug !== estateSlug) return false;
    if (priceMin && property.price < priceMin) return false;
    if (priceMax && property.price > priceMax) return false;
    if (search) {
      const haystack = `${property.title} ${property.description} ${property.city} ${property.address}`.toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    return true;
  });
}

function paginate<T>(items: T[], params: URLSearchParams) {
  const skip = Number(params.get('skip') || 0);
  const take = Number(params.get('take') || items.length);
  return items.slice(skip, skip + take);
}

export function getFallbackData(endpoint: string, method = 'GET') {
  if (method !== 'GET') return undefined;

  const url = new URL(endpoint.startsWith('/') ? endpoint : `/${endpoint}`, 'https://fallback.local');
  const pathname = url.pathname;
  const params = url.searchParams;

  if (pathname === '/estates') {
    const items = paginate(fallbackEstates, params);
    return { items, total: fallbackEstates.length };
  }

  if (pathname.startsWith('/estates/')) {
    const slug = pathname.split('/')[2];
    return fallbackEstates.find((estate) => estate.slug === slug) || null;
  }

  if (pathname === '/properties') {
    let items = filterProperties(params);
    const sort = params.get('sort');
    if (sort === 'price_asc') items = [...items].sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') items = [...items].sort((a, b) => b.price - a.price);
    return paginate(items, params);
  }

  if (pathname.startsWith('/properties/')) {
    const slug = pathname.split('/')[2];
    return fallbackProperties.find((property) => property.slug === slug) || null;
  }

  if (pathname === '/blog') {
    return { items: paginate(fallbackBlogPosts, params), total: fallbackBlogPosts.length };
  }

  if (pathname.startsWith('/blog/')) {
    const slug = pathname.split('/')[2];
    return fallbackBlogPosts.find((post) => post.slug === slug) || null;
  }

  if (pathname === '/team') return fallbackTeamMembers;
  if (pathname === '/testimonials') return fallbackTestimonials;
  if (pathname === '/compliance') return fallbackComplianceItems;
  if (pathname === '/partners') return fallbackPartners;
  if (pathname === '/promos') return fallbackPromos;
  if (pathname === '/resources') return fallbackResources;
  if (pathname === '/faqs') return fallbackFaqs;
  if (pathname === '/offices') return fallbackOffices;

  return undefined;
}
