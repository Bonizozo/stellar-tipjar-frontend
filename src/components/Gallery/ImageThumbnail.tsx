'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { GalleryImage } from '@/hooks/useGallery';

interface ImageThumbnailProps {
  image: GalleryImage;
  index: number;
  onClick: (index: number) => void;
}

export const ImageThumbnail = ({ image, index, onClick }: ImageThumbnailProps) => {
  return (
    <motion.div
      className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
      whileHover={{ scale: 1.05 }}
      onClick={() => onClick(index)}
    >
      <Image
        src={image.thumbnail}
        alt={image.caption || `Gallery image ${index + 1}`}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-300"
        placeholder="blur"
        blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%23f3f4f6' width='400' height='400'/%3E%3C/svg%3E"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
    </motion.div>
  );
};
