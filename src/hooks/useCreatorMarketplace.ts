"use client";

import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Order, OrderStatus, ProductListing, MarketplaceStats } from "@/types/marketplace";

// Mock data
const mockProducts: ProductListing[] = [
  {
    product: {
      id: "1",
      creatorId: "creator1",
      name: "Premium Course Bundle",
      description: "Complete web development course",
      price: 99.99,
      priceXLM: 500,
      images: ["/images/course.jpg"],
      inventory: 999,
      category: "courses",
      type: "digital",
      sku: "COURSE-001",
      tags: ["web", "development", "javascript"],
      isActive: true,
      deliveryMethod: "digital",
      digitalFileUrl: "https://example.com/course.zip",
      downloadLimit: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    sales: 45,
    revenue: 4499.55,
    views: 1234,
  },
];

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    creatorId: "creator1",
    buyerId: "buyer1",
    items: [
      {
        product: mockProducts[0].product,
        quantity: 1,
      },
    ],
    subtotal: 99.99,
    tax: 10.0,
    shipping: 0,
    total: 109.99,
    totalXLM: 550,
    txHash: "abc123def456",
    status: "processing",
    digitalDownloads: [
      {
        productId: "1",
        downloadUrl: "https://example.com/download/abc123",
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        downloadCount: 0,
        maxDownloads: 3,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockStats: MarketplaceStats = {
  totalProducts: 12,
  totalSales: 156,
  totalRevenue: 8934.45,
  activeOrders: 8,
};

export function useCreatorMarketplace() {
  const queryClient = useQueryClient();

  // Fetch products
  const {
    data: products = mockProducts,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useQuery({
    queryKey: ["creator", "marketplace", "products"],
    queryFn: async () => {
      // Replace with: fetch("/api/creator/marketplace/products").then(r => r.json())
      await new Promise((r) => setTimeout(r, 500));
      return mockProducts;
    },
  });

  // Fetch orders
  const {
    data: orders = mockOrders,
    isLoading: isLoadingOrders,
    error: ordersError,
  } = useQuery({
    queryKey: ["creator", "marketplace", "orders"],
    queryFn: async () => {
      // Replace with: fetch("/api/creator/marketplace/orders").then(r => r.json())
      await new Promise((r) => setTimeout(r, 500));
      return mockOrders;
    },
  });

  // Fetch stats
  const { data: stats = mockStats } = useQuery({
    queryKey: ["creator", "marketplace", "stats"],
    queryFn: async () => {
      // Replace with: fetch("/api/creator/marketplace/stats").then(r => r.json())
      await new Promise((r) => setTimeout(r, 300));
      return mockStats;
    },
  });

  // Update order status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: OrderStatus }) => {
      // Replace with: fetch(`/api/creator/marketplace/orders/${orderId}`, { method: "PATCH", body: JSON.stringify({ status }) })
      await new Promise((r) => setTimeout(r, 500));
      return { orderId, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["creator", "marketplace", "orders"] });
    },
  });

  const updateOrderStatus = useCallback(
    (orderId: string, status: OrderStatus) => {
      updateStatusMutation.mutate({ orderId, status });
    },
    [updateStatusMutation]
  );

  return {
    products,
    orders,
    stats,
    isLoading: isLoadingProducts || isLoadingOrders,
    productsError,
    ordersError,
    updateOrderStatus,
  };
}
