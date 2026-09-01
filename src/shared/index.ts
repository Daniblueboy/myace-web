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
  panoramaUrl?: string | null;
  gallery?: string[];
  brochureUrl?: string | null;
  status?: string;
  amenities?: string[];
  properties?: Property[];
  faqs?: EstateFAQ[];
  createdAt: string;
  updatedAt: string;
}

export interface EstateFAQ {
  id: string;
  question: string;
  answer: string;
  sortOrder?: number;
}
