'use client';

import { GalleryImage, useGallery } from '@/hooks/useGallery';
import { ImageThumbnail } from './ImageThumbnail';
import { Lightbox } from './Lightbox';

interface GalleryProps {
  images: GalleryImage[];
}

export const Gallery = ({ images }: GalleryProps) => {
  const { lightboxOpen, currentIndex, openLightbox, closeLightbox, nextImage, previousImage } =
    useGallery(images);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <ImageThumbnail key={image.id} image={image} index={index} onClick={openLightbox} />
        ))}
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        images={images}
        currentIndex={currentIndex}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrevious={previousImage}
      />
    </>
  );
};
