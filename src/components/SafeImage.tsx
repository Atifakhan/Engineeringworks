import React, { useState } from 'react';
import { Wrench } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  fallbackTitle?: string;
}

export function SafeImage({
  src,
  alt,
  className = '',
  style,
  loading = 'lazy',
  fallbackTitle,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] p-4 text-center dark:from-[#17263B] dark:to-[#111C2E]"
      >
        <Wrench className="h-7 w-7 text-[#2563EB] dark:text-[#60A5FA]" />
        <p className="mt-2 font-display text-xs font-semibold text-[#0F2B46] dark:text-[#F8FAFC]">
          {fallbackTitle || alt}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      style={style}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
