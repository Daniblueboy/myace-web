import type { Estate, Property, TeamMember, Testimonial } from '@/shared';

const now = '2026-01-01T00:00:00.000Z';
const brochureUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

// TODO(content): most estates below still use placeholder/stock imagery.
// Real photography exists on the live site but is inconsistently organized
// (mixed with generic stock photos even there) — needs sourcing from Daniel
// rather than scraped, so galleries/coverImage are approximate for now.
const estateImages = {
  alphaGardenCity: 'https://aceroyalestates.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-18-at-12.31.46-1024x1024.jpeg',
  placeholder1: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80',
  placeholder2: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  placeholder3: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
};

export const fallbackEstates: Estate[] = [
  {
    id: 'fallback-estate-alpha-garden-city',
    name: 'Alpha Garden City',
    slug: 'alpha-garden-city',
    description:
      'Alpha Garden City is a thoughtfully planned, nature-forward residential community in Ibadan, built around orchard-style landscapes, wellness-focused amenities, and low-density planning. Every acre is enriched with 10-15 fruit-bearing trees, and the estate features a Central Wellness Village (holistic spa, wellness clinics, fitness studios), an integrated golf course, and a low-density model of roughly one home per acre. Residential options include wellness villas, eco lodges, retirement homes, and serviced apartments.',
    state: 'Oyo',
    city: 'Ibadan',
    address: 'Ibadan, Oyo State',
    coverImage: estateImages.alphaGardenCity,
    brochureUrl: 'https://aceroyalestates.com/wp-content/uploads/2026/05/Alpha-Garden-City-Brochure-Plus.pdf',
    gallery: [estateImages.alphaGardenCity],
    status: 'ACTIVE',
    amenities: ['Golf Course', 'Central Wellness Village', 'Nature Walking Trails', 'Yoga & Meditation Platforms', 'Cycling Paths'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-estate-heritage',
    name: 'Heritage Estate',
    slug: 'heritage-estate',
    description:
      'Heritage Estate (Obodo Oma) is a premium residential and commercial estate in Ekwegbe Nike, Enugu State, with an approved layout and registered survey. Less than 5 minutes from Maduka University, Police Quarters, the Bio-Research Institute, and Ugwugo Roundabout, and about 15 minutes from Nike Lake.',
    state: 'Enugu',
    city: 'Nike',
    address: 'Ekwegbe Nike, Enugu State',
    coverImage: estateImages.placeholder1,
    videoUrl: 'https://aceroyalestates.com/wp-content/uploads/2026/01/Heritage-Enugu.mp4',
    brochureUrl: 'https://aceroyalestates.com/wp-content/uploads/2026/01/The-Heritage-Estate-Brochure.pdf',
    gallery: [],
    status: 'ACTIVE',
    amenities: ['Approved Layout', 'Registered Survey'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-estate-edo-mega-city',
    name: 'Edo Mega City',
    slug: 'edo-mega-city',
    description:
      'Edo Mega City is the biggest and most secured private residential estate in Edo State, located on the Aduduwa By-Pass and heavily guarded by the Army. Available in 100ft x 100ft (900sqm) duplex plots and one-acre (3,500sqm) country home mansion plots, titled C of O.',
    state: 'Edo',
    city: 'Benin City',
    address: 'Aduduwa By-Pass, Benin City, Edo State',
    coverImage: estateImages.placeholder2,
    brochureUrl: null,
    gallery: [],
    status: 'ACTIVE',
    amenities: ['Army-Guarded Security', 'C of O Title'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-estate-downtown-lagos-phase-2',
    name: 'Downtown Lagos Commercial City — Phase 2',
    slug: 'downtown-lagos-phase-2',
    description:
      'Downtown Commercial City Phase 2 follows the sold-out Phase 1, in Labour City, Ibeju-Lekki, on the Coastal Road — near the Lekki Free Trade Zone, Dangote Refinery, Lekki Deep Sea Port, and Lekki-Epe International Airport. Titled C of O / Government Allocation.',
    state: 'Lagos',
    city: 'Ibeju-Lekki',
    address: 'Labour City, Ibeju-Lekki, Coastal Road, Lagos State',
    coverImage: estateImages.placeholder3,
    brochureUrl: 'https://aceroyalestates.com/wp-content/uploads/2025/03/Downtown-Brochure.pdf',
    gallery: [],
    status: 'ACTIVE',
    amenities: ['Near Lekki Free Trade Zone', 'Near Lekki Deep Sea Port', 'Near Lekki-Epe International Airport'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-estate-downtown-lagos',
    name: 'Downtown Lagos Commercial City — Phase 1',
    slug: 'downtown-lagos',
    description:
      'Downtown Lagos is a master-planned "city within a city" in the heart of Lagos, combining premium residential apartments and smart homes, a state-of-the-art business district, world-class shopping and entertainment, and green spaces and waterways. Phase 1 has sold out.',
    state: 'Lagos',
    city: 'Lagos',
    address: 'Lekki Coastal Road, Lagos',
    coverImage: estateImages.placeholder1,
    brochureUrl: 'https://aceroyalestates.com/wp-content/uploads/2025/03/Downtown-Brochure.pdf',
    gallery: [],
    status: 'SOLD_OUT',
    amenities: ['Business District', 'Green Spaces & Waterways', '24/7 Power', 'High-Speed Internet'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-estate-eko-paragon',
    name: 'Eko Paragon Residence',
    slug: 'eko-paragon-residence',
    description:
      'Eko Paragon Residence is a premium hotel-residence development in Abijo G.R.A., Lagos, developed in partnership with the Lagos State Development & Property Corporation (LSDPC). Unit types include 1-bedroom business suites, 2-bedroom signature suites, and 3-bedroom presidential terrace duplexes with BQ.',
    state: 'Lagos',
    city: 'Abijo',
    address: 'Abijo G.R.A., Lagos',
    coverImage: estateImages.placeholder2,
    brochureUrl: 'https://aceroyalestates.com/wp-content/uploads/2026/01/EKO-PARAGON-MAIN-BROCHURE-1.pdf',
    gallery: [],
    status: 'ACTIVE',
    amenities: ['Fitness Center', 'Swimming Pool', '24/7 Security', 'Uninterrupted Power Supply', 'Bio-Digester Waste System'],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fallback-estate-prime-annex',
    name: 'Prime Boulevard Annex',
    slug: 'prime-annex',
    description:
      'Prime Boulevard Annex sits behind Prime Boulevard 1 in Gwagwalada, Abuja, close to the University of Abuja, Nnamdi Azikiwe International Airport, and the University of Abuja Teaching Hospital. Available for residential (300sqm & 500sqm) and commercial (1000sqm) purposes, titled C of O.',
    state: 'Abuja',
    city: 'Gwagwalada',
    address: 'Gwagwalada, Abuja (tarred road behind Prime Boulevard 1)',
    coverImage: estateImages.placeholder3,
    brochureUrl: null,
    gallery: [],
    status: 'ACTIVE',
    amenities: ['Perimeter Fencing', 'Maximum Security', 'Stable Electricity', 'Shopping Complex'],
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
        url: estateImages.placeholder2,
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
    estateId: 'fallback-estate-eko-paragon',
    estate: fallbackEstates.find((e) => e.slug === 'eko-paragon-residence'),
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
        url: estateImages.placeholder3,
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
    estateId: 'fallback-estate-prime-annex',
    estate: fallbackEstates.find((e) => e.slug === 'prime-annex'),
    createdAt: now,
    updatedAt: now,
  },
];

fallbackEstates.forEach((estate) => {
  estate.properties = fallbackProperties.filter((p) => p.estateId === estate.id);
});

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

// TODO(content): logos not sourced yet — using the Aceroyal mark as a
// placeholder until real partner logos are provided.
export const fallbackPartners = [
  {
    id: 'fallback-partner-aeon-trisl',
    name: 'AEON Trisl Group',
    logoUrl: '/images/cropped-cropped-logo-jpeg.jpg',
    category: 'PARTNER',
    active: true,
  },
  {
    id: 'fallback-partner-emaar',
    name: 'Emaar Properties',
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
    imageUrl: estateImages.placeholder1,
    linkUrl: '/book-inspection',
    placement: 'SECTION_CARD',
    priority: 1,
    active: true,
  },
];

// Real "Consent Form and FAQs" PDFs linked from each estate's page on the
// live site. Note: the live site's own Alpha Garden City page links to the
// Downtown Lagos PDF by mistake (likely a copy-paste template bug) — not
// reproduced here; flagged to Daniel instead of propagating the error.
export const fallbackResources = [
  {
    id: 'fallback-resource-heritage-faq',
    title: 'Heritage Estate — Consent Form & FAQs',
    url: 'https://aceroyalestates.com/wp-content/uploads/2026/01/HERITAGE-ESTATES-CONSENT-FORM-AND-FAQS.pdf',
    fileType: 'PDF',
    estateId: 'fallback-estate-heritage',
    estate: fallbackEstates.find((e) => e.slug === 'heritage-estate'),
  },
  {
    id: 'fallback-resource-edo-faq',
    title: 'Edo Mega City — Consent Form & FAQs',
    url: 'https://aceroyalestates.com/wp-content/uploads/2026/01/Edo-Mega-City-FAQ-Consent-Form-2.pdf',
    fileType: 'PDF',
    estateId: 'fallback-estate-edo-mega-city',
    estate: fallbackEstates.find((e) => e.slug === 'edo-mega-city'),
  },
  {
    id: 'fallback-resource-downtown-lagos-faq',
    title: 'Downtown Lagos — Consent Form & FAQs',
    url: 'https://aceroyalestates.com/wp-content/uploads/2025/03/DOWNTOWN-LAGOS-CONSENT-FORM-AND-FAQS-2.pdf',
    fileType: 'PDF',
    estateId: 'fallback-estate-downtown-lagos',
    estate: fallbackEstates.find((e) => e.slug === 'downtown-lagos'),
  },
  {
    id: 'fallback-resource-downtown-lagos-phase2-faq',
    title: 'Downtown Lagos Phase 2 — Consent Form & FAQs',
    url: 'https://aceroyalestates.com/wp-content/uploads/2026/03/DOWNTOWN-LAGOS-PHASE-2.pdf',
    fileType: 'PDF',
    estateId: 'fallback-estate-downtown-lagos-phase-2',
    estate: fallbackEstates.find((e) => e.slug === 'downtown-lagos-phase-2'),
  },
  {
    id: 'fallback-resource-eko-paragon-faq',
    title: 'Eko Paragon Residence — Consent Form & FAQs',
    url: 'https://aceroyalestates.com/wp-content/uploads/2025/01/EKO-PARAGON-CONSENT-FORM-AND-FAQss.pdf',
    fileType: 'PDF',
    estateId: 'fallback-estate-eko-paragon',
    estate: fallbackEstates.find((e) => e.slug === 'eko-paragon-residence'),
  },
  {
    id: 'fallback-resource-prime-annex-faq',
    title: 'Prime Boulevard Annex — Consent Form & FAQs',
    url: 'https://aceroyalestates.com/wp-content/uploads/2026/01/PRIME-BOULEVARD-ANNEX-CONSENT-FORM-AND-FAQS.pdf',
    fileType: 'PDF',
    estateId: 'fallback-estate-prime-annex',
    estate: fallbackEstates.find((e) => e.slug === 'prime-annex'),
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
    id: 'fallback-office-lagos',
    state: 'Lagos',
    city: 'Lekki',
    address: 'Providence Plaza, 17 Olokonla Road, Sangotedo, Lekki-Ajah Expressway, Lagos, Nigeria.',
    phones: ['02013300287', '09156549709'],
    emails: ['customercare@aceroyalestates.com'],
    openingHours: 'Mon-Fri: 9am - 5pm',
  },
  {
    id: 'fallback-office-abuja',
    state: 'Abuja',
    city: 'Gwarimpa',
    address: 'House A, 45 Road off Navy Quarters, By First Avenue, Gwarimpa, Abuja.',
    phones: ['02013300287', '09156549709'],
    emails: ['customercare@aceroyalestates.com'],
    openingHours: 'Mon-Fri: 9am - 5pm',
  },
  {
    id: 'fallback-office-benin',
    state: 'Edo',
    city: 'Benin City',
    address: 'No 2 New Lagos Road, Off 2nd Junction, by Akpakpava, Benin City.',
    phones: ['02013300287', '09156549709'],
    emails: ['customercare@aceroyalestates.com'],
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
