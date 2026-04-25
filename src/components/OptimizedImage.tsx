"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { getStaticBlurDataUrl } from "@/utils/imageUtils";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

interface OptimizedImageProps extends Omit<ImageProps, "placeholder" | "blurDataURL" | "onError" | "alt"> {
  alt: string;
  fallbackText?: string;
  /** Blur placeholder color — defaults to a soft indigo tint */
  blurColor?: string;
}

/**
 * Drop-in next/image wrapper with:
 * - Automatic lazy loading (disabled for priority images)
 * - Blur-up SVG placeholder
 * - Graceful error fallback via ImagePlaceholder
 * - avif/webp served automatically by Next.js image optimisation
 */
export function OptimizedImage({
  src,
  alt,
  fallbackText,
  priority = false,
  className = "",
  blurColor,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  ...props
}: OptimizedImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <ImagePlaceholder
        className={className}
        fallbackText={fallbackText ?? alt}
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
      blurDataURL={getStaticBlurDataUrl(blurColor)}
      onError={() => setError(true)}
      sizes={sizes}
      className={`object-cover object-center ${className}`}
      {...props}
    />
  );
}

/**
 * Convenience wrapper for circular avatar images with sensible defaults.
 */
interface AvatarImageProps {
  src: string;
  alt: string;
  /** Pixel size of the avatar (renders as width × height square) */
  size?: number;
  className?: string;
  priority?: boolean;
}

export function AvatarImage({ src, alt, size = 48, className = "", priority = false }: AvatarImageProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        priority={priority}
        blurColor="#c7d2fe"
      />
    </div>
  );
}
