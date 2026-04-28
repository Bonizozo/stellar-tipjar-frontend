"use client";

import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useWalletContext } from "@/contexts/WalletContext";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // USD
  priceXLM: number; // XLM equivalent
  image: string;
  inventory: number;
  category: string;
  sku: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  totalXLM: number;
  txHash?: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Limited Edition Hoodie",
    description: "Exclusive creator merchandise hoodie",
    price: 49.99,
    priceXLM: 250,
    image: "/images/hoodie.jpg",
    inventory: 50,
    category: "apparel",
    sku: "HOODIE-001",
  },
  {
    id: "2",
    name: "Signed Poster",
    description: "Autographed 24×36 poster",
    price: 29.99,
    priceXLM: 150,
    image: "/images/poster.jpg",
    inventory: 100,
    category: "posters",
    sku: "POSTER-001",
  },
  {
    id: "3",
    name: "Creator Bundle Pack",
    description: "Bundle of exclusive merchandise",
    price: 99.99,
    priceXLM: 500,
    image: "/images/bundle.jpg",
    inventory: 30,
    category: "bundles",
    sku: "BUNDLE-001",
  },
  {
    id: "4",
    name: "Enamel Pin Set",
    description: "Set of 3 collectible enamel pins",
    price: 14.99,
    priceXLM: 75,
    image: "/images/pins.jpg",
    inventory: 200,
    category: "accessories",
    sku: "PINS-001",
  },
  {
    id: "5",
    name: "Sticker Pack",
    description: "10 high-quality vinyl stickers",
    price: 9.99,
    priceXLM: 50,
    image: "/images/stickers.jpg",
    inventory: 500,
    category: "accessories",
    sku: "STICKERS-001",
  },
  {
    id: "6",
    name: "Digital Art Print",
    description: "High-resolution digital download",
    price: 19.99,
    priceXLM: 100,
    image: "/images/art.jpg",
    inventory: 999,
    category: "digital",
    sku: "ART-001",
  },
];

// Persist orders in localStorage so they survive page refresh
const ORDERS_KEY = "store_orders";

function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    return (JSON.parse(raw) as Order[]).map((o) => ({
      ...o,
      createdAt: new Date(o.createdAt),
      updatedAt: new Date(o.updatedAt),
    }));
  } catch {
    return [];
  }
}

function saveOrders(orders: Order[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useStore(creatorUsername?: string) {
  const queryClient = useQueryClient();
  const { isConnected, publicKey, signStellarTransaction, balance } = useWalletContext();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Products
  const {
    data: products = mockProducts,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useQuery({
    queryKey: ["products", creatorUsername],
    queryFn: async () => {
      // Replace with: fetch(`/api/stores/${creatorUsername}/products`).then(r => r.json())
      await new Promise((r) => setTimeout(r, 400));
      return mockProducts;
    },
  });

  // Orders
  const {
    data: orders = [],
    isLoading: isLoadingOrders,
    error: ordersError,
  } = useQuery<Order[]>({
    queryKey: ["orders", creatorUsername],
    queryFn: async () => loadOrders(),
    staleTime: 0,
  });

  // ─── Cart operations ───────────────────────────────────────────────────────

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + quantity, product.inventory) }
            : i
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, product.inventory) }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.product.id === productId ? { ...i, quantity: Math.max(0, quantity) } : i))
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const cartTotalXLM = cart.reduce((sum, i) => sum + i.product.priceXLM * i.quantity, 0);
  const cartItemCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  // ─── Checkout with Stellar payment ────────────────────────────────────────

  const checkoutMutation = useMutation({
    mutationFn: async (items: CartItem[]) => {
      setCheckoutError(null);

      if (!isConnected || !publicKey) {
        throw new Error("Please connect your Stellar wallet to checkout.");
      }

      const totalXLM = items.reduce((sum, i) => sum + i.product.priceXLM * i.quantity, 0);
      const walletBalance = parseFloat(balance);

      if (walletBalance < totalXLM) {
        throw new Error(
          `Insufficient balance. You need ${totalXLM} XLM but have ${walletBalance.toFixed(2)} XLM.`
        );
      }

      // Build a Stellar payment transaction XDR
      // In production this would be built server-side and returned for signing.
      // Here we simulate the sign + submit flow.
      const mockXdr = `mock_xdr_${Date.now()}`;
      let txHash: string;

      try {
        // signStellarTransaction would throw if user rejects
        const _signedXdr = await signStellarTransaction(mockXdr);
        // In production: submit signedXdr to Horizon
        // const result = await server.submitTransaction(TransactionBuilder.fromXDR(signedXdr, Networks.TESTNET));
        txHash = `tx_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      } catch (err) {
        throw new Error(
          err instanceof Error ? err.message : "Transaction signing failed."
        );
      }

      const now = new Date();
      const order: Order = {
        id: `ORD-${Date.now()}`,
        items,
        total: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
        totalXLM,
        txHash,
        status: "processing",
        createdAt: now,
        updatedAt: now,
      };

      // Persist locally (replace with API call in production)
      const existing = loadOrders();
      saveOrders([order, ...existing]);

      return order;
    },
    onSuccess: () => {
      setCart([]);
      queryClient.invalidateQueries({ queryKey: ["orders", creatorUsername] });
    },
    onError: (err: Error) => {
      setCheckoutError(err.message);
    },
  });

  const checkout = useCallback(async () => {
    if (cart.length === 0) return;
    await checkoutMutation.mutateAsync(cart);
  }, [cart, checkoutMutation]);

  return {
    // Products
    products,
    isLoadingProducts,
    productsError,
    // Orders
    orders,
    isLoadingOrders,
    ordersError,
    // Cart
    cart,
    cartTotal,
    cartTotalXLM,
    cartItemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    // Checkout
    checkout,
    isCheckingOut: checkoutMutation.isPending,
    checkoutError,
    lastOrder: checkoutMutation.data,
  };
}
