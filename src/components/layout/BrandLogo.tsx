import Image from 'next/image';

const SIZES = {
  sm: 'h-7 w-auto',
  lg: 'h-9 w-auto',
} as const;

/**
 * Uses the supplied 2026 wordmark artwork directly. The guide explicitly
 * prohibits rebuilding or altering the wordmark with a substitute font.
 */
export function BrandLogo({
  theme = 'auto',
  size = 'sm',
  className = '',
}: {
  theme?: 'auto' | 'dark';
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const dimensions = SIZES[size];

  if (theme === 'dark') {
    return (
      <Image
        src="/images/aceroyal-wordmark-white-red-a.png"
        alt="Aceroyal"
        width={245}
        height={58}
        className={`${dimensions} object-contain ${className}`}
      />
    );
  }

  return (
    <>
      <Image
        src="/images/aceroyal-wordmark-colour.png"
        alt="Aceroyal"
        width={375}
        height={65}
        className={`${dimensions} object-contain dark:hidden ${className}`}
      />
      <Image
        src="/images/aceroyal-wordmark-white-red-a.png"
        alt=""
        width={245}
        height={58}
        className={`${dimensions} hidden object-contain dark:block ${className}`}
      />
    </>
  );
}
