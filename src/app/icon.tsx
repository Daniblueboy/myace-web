import { ImageResponse } from 'next/og';
import { MarkIcon } from '@/lib/brand-images';

export const runtime = 'nodejs';
export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(<MarkIcon size={512} />, size);
}
