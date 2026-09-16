export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  status: string;
  price: number;
  currency: string;
  address: string;
  city: string;
  state: string;
  latitude?: number | null;
  longitude?: number | null;
  mapEmbedUrl?: string | null;
  videoUrl?: string | null;
  panoramaUrl?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  size?: string | null;
  amenities?: string[];
  featured: boolean;
  images?: PropertyImage[];
  faqs?: PropertyFAQ[];
  resources?: PropertyResource[];
  variants?: PropertyVariant[];
  media?: PropertyMedia[];
  estateId?: string | null;
  estate?: Estate | null;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyImage {
  id: string;
  url: string;
  altText?: string | null;
}

export interface PropertyFAQ {
  id: string;
  question: string;
  answer: string;
}

export interface PropertyResource {
  id: string;
  title: string;
  fileType: string;
  url: string;
}

export interface PropertyVariant {
  id: string;
  label: string;
  price: number;
  currency: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  size?: string | null;
  sizeUnit?: string | null;
  paymentType?: string | null;
  upfrontPercent?: number | null;
  installmentMonths?: number | null;
  installmentAmount?: number | null;
  sortOrder?: number;
  active?: boolean;
  /** Flyers specific to this variant (e.g. a size's own pricing/payment-plan
   * image) — shown instead of the property's full media list on the
   * Available Options card, so a 500sqm option doesn't show a 1-acre
   * flyer. Falls back to the property's own media when a variant has none. */
  media?: PropertyMedia[];
}

export interface PropertyMedia {
  id: string;
  type: string;
  title?: string | null;
  url: string;
  sortOrder?: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  thumbnailUrl?: string | null;
  estateName?: string | null;
  eventDate?: string | null;
  active?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string | null;
  photoUrl?: string | null;
  email?: string | null;
  linkedinUrl?: string | null;
  instagramUrl?: string | null;
  displayOrder?: number;
  active?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string | null;
  message: string;
  rating?: number | null;
  photoUrl?: string | null;
  /** Larger showcase image — e.g. from an allocation or inspection event. */
  imageUrl?: string | null;
  /** Direct video file or YouTube/Vimeo URL for a video testimonial. */
  videoUrl?: string | null;
  displayOrder?: number;
  active?: boolean;
}

export interface Estate {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  state: string;
  city: string;
  address?: string | null;
  coverImage?: string | null;
  videoUrl?: string | null;
  virtualTourUrl?: string | null;
  panoramaUrls?: string[];
  gallery?: string[];
  brochureUrl?: string | null;
  status?: string;
  amenities?: string[];
  properties?: Property[];
  faqs?: EstateFAQ[];
  /** "LAND" | "APARTMENT" — what this estate sells, for estates that don't
   * (yet) have priced Property records catalogued. Used as a fallback for
   * the offering badge when `properties` derivation finds nothing. */
  offeringType?: string | null;
  /** Marks a fast-selling pick, shown as a "Fast Selling" tag on the
   * homepage's Our Developments cards (the newest estate there gets "New"
   * instead, regardless of this flag). */
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EstateFAQ {
  id: string;
  question: string;
  answer: string;
  sortOrder?: number;
}
