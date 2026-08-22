export interface PortfolioItem {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video' | 'document';
  thumbnail?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PortfolioGalleryState {
  items: PortfolioItem[];
  selectedItem: PortfolioItem | null;
  isReordering: boolean;
}
