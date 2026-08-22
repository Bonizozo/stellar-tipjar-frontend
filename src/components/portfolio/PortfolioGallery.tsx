'use client';

import { useState } from 'react';
import { PortfolioItem } from '@/types/portfolio';
import { GripVertical, Trash2, Edit2 } from 'lucide-react';
import Image from 'next/image';
import { Lightbox } from '../Gallery/Lightbox';
import { GalleryImage } from '@/hooks/useGallery';

interface PortfolioGalleryProps {
  items: PortfolioItem[];
  isEditable?: boolean;
  onReorder?: (items: PortfolioItem[]) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: PortfolioItem) => void;
}

export const PortfolioGallery = ({
  items,
  isEditable = false,
  onReorder,
  onDelete,
  onEdit,
}: PortfolioGalleryProps) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [orderedItems, setOrderedItems] = useState(items);

  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: string) => {
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIdx = orderedItems.findIndex((i) => i.id === draggedItem);
    const targetIdx = orderedItems.findIndex((i) => i.id === targetId);

    const newItems = [...orderedItems];
    [newItems[draggedIdx], newItems[targetIdx]] = [newItems[targetIdx], newItems[draggedIdx]];

    setOrderedItems(newItems);
    onReorder?.(newItems);
    setDraggedItem(null);
  };

  const galleryImages: GalleryImage[] = orderedItems
    .filter((item) => item.mediaType === 'image')
    .map((item) => ({
      id: item.id,
      src: item.mediaUrl,
      thumbnail: item.thumbnail || item.mediaUrl,
      caption: item.title,
    }));

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {orderedItems.map((item, index) => (
          <div
            key={item.id}
            draggable={isEditable}
            onDragStart={() => handleDragStart(item.id)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(item.id)}
            className={`relative group rounded-lg overflow-hidden bg-gray-100 ${
              isEditable ? 'cursor-move' : 'cursor-pointer'
            }`}
          >
            {item.mediaType === 'image' && (
              <Image
                src={item.thumbnail || item.mediaUrl}
                alt={item.title}
                width={300}
                height={300}
                className="w-full h-48 object-cover"
                onClick={() => {
                  setSelectedIndex(index);
                  setLightboxOpen(true);
                }}
              />
            )}

            {item.mediaType === 'video' && (
              <video
                src={item.mediaUrl}
                className="w-full h-48 object-cover bg-black"
                onClick={() => {
                  setSelectedIndex(index);
                  setLightboxOpen(true);
                }}
              />
            )}

            {item.mediaType === 'document' && (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 text-sm">Document</span>
              </div>
            )}

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />

            {isEditable && (
              <>
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="w-5 h-5 text-white" />
                </div>

                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit?.(item)}
                    className="p-1 bg-blue-500 hover:bg-blue-600 rounded text-white"
                    aria-label="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete?.(item.id)}
                    className="p-1 bg-red-500 hover:bg-red-600 rounded text-white"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
              <p className="text-white text-sm font-medium truncate">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {galleryImages.length > 0 && (
        <Lightbox
          isOpen={lightboxOpen}
          images={galleryImages}
          currentIndex={selectedIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={() => setSelectedIndex((i) => (i + 1) % galleryImages.length)}
          onPrevious={() => setSelectedIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length)}
        />
      )}
    </>
  );
};
