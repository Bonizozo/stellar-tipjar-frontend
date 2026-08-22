export type ProductType = "physical" | "digital" | "service";
export type ProductCategory = "apparel" | "posters" | "bundles" | "accessories" | "digital" | "courses" | "ebooks" | "music" | "videos" | "consulting" | "coaching";
export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
export type DeliveryMethod = "shipping" | "digital" | "email";

export interface Product {
  id: string;
  creatorId: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number; // USD
  priceXLM: number; // XLM equivalent
  images: string[];
  inventory: number;
  category: ProductCategory;
  type: ProductType;
  sku: string;
  tags: string[];
  isActive: boolean;
  deliveryMethod: DeliveryMethod;
  digitalFileUrl?: string; // For digital products
  downloadLimit?: number; // Max downloads for digital products
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  creatorId: string;
  buyerId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  totalXLM: number;
  txHash?: string;
  status: OrderStatus;
  shippingAddress?: ShippingAddress;
  billingAddress?: ShippingAddress;
  trackingNumber?: string;
  digitalDownloads?: DigitalDownload[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface DigitalDownload {
  productId: string;
  downloadUrl: string;
  expiresAt: Date;
  downloadCount: number;
  maxDownloads: number;
}

export interface ProductListing {
  product: Product;
  sales: number;
  revenue: number;
  views: number;
}

export interface MarketplaceStats {
  totalProducts: number;
  totalSales: number;
  totalRevenue: number;
  activeOrders: number;
}
