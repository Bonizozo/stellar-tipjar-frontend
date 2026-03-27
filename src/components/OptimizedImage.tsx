"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { getStaticBlurDataUrl } from "@/utils/imageUtils";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

interface OptimizedImageProps extends Omit<ImageProps, "placeholder" | "blurDataURL" | "onError" | "alt"> {
  alt: string;
  fallbackText?: string;
}

/**
 * A wrapper around next/image that automatically enables lazy loading, 
 * blur-up placeholders, and handles error states gracefully.
 */
export function OptimizedImage({ 
  src, 
  alt, 
  fallbackText,
  priority = false,
  className = "",
  ...props 
}: OptimizedImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <ImagePlaceholder 
        className={className} 
        fallbackText={fallbackText || alt} 
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      placeholder="blur"
      blurDataURL={getStaticBlurDataUrl()}
      onError={() => setError(true)}
      className={`object-cover object-center ${className}`}
      {...props}
    />
  );
}
