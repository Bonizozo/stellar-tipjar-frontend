import { useState, useCallback } from 'react';

export interface GalleryImage {
  id: string;
  src: string;
  thumbnail: string;
  caption?: string;
}

export const useGallery = (images: GalleryImage[]) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const previousImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  return {
    lightboxOpen,
    currentIndex,
    openLightbox,
    closeLightbox,
    nextImage,
    previousImage,
  };
};
