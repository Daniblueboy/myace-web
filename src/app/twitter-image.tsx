import { ImageResponse } from 'next/og';
import { ShareImage } from '@/lib/brand-images';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function TwitterImage() {
  return new ImageResponse(<ShareImage />, size);
}
