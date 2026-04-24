'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { GalleryImage } from '@/hooks/useGallery';

interface LightboxProps {
  isOpen: boolean;
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const Lightbox = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
}: LightboxProps) => {
  const [zoom, setZoom] = useState(1);
  const currentImage = images[currentIndex];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrevious();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious]);

  useEffect(() => {
    setZoom(1);
  }, [currentIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Image container */}
          <motion.div
            className="relative w-full h-full max-w-4xl max-h-[90vh] flex items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="relative w-full h-full">
              <Image
                src={currentImage.src}
                alt={currentImage.caption || `Image ${currentIndex + 1}`}
                fill
                className="object-contain"
                style={{ transform: `scale(${zoom})` }}
              />
            </div>
          </motion.div>

          {/* Navigation buttons */}
          <button
            onClick={onPrevious}
            className="absolute left-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={onNext}
            className="absolute right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Zoom controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/10 rounded-full p-2">
            <button
              onClick={() => setZoom(Math.max(1, zoom - 0.2))}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-5 h-5 text-white" />
            </button>
            <span className="px-3 py-2 text-white text-sm">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom(Math.min(3, zoom + 0.2))}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Caption */}
          {currentImage.caption && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg max-w-md text-center">
              {currentImage.caption}
            </div>
          )}

          {/* Counter */}
          <div className="absolute top-4 left-4 text-white text-sm bg-white/10 px-3 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
