import { ImageResponse } from 'next/og';
import { MarkIcon } from '@/lib/brand-images';

export const runtime = 'nodejs';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(<MarkIcon size={180} />, size);
}
