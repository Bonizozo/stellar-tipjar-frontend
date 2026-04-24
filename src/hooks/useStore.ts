import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  inventory: number;
  category: string;
  sku: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
  updatedAt: Date;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Limited Edition Hoodie',
    description: 'Exclusive creator merchandise hoodie',
    price: 49.99,
    image: '/images/hoodie.jpg',
    inventory: 50,
    category: 'apparel',
    sku: 'HOODIE-001',
  },
  {
    id: '2',
    name: 'Signed Poster',
    description: 'Autographed 24x36 poster',
    price: 29.99,
    image: '/images/poster.jpg',
    inventory: 100,
    category: 'posters',
    sku: 'POSTER-001',
  },
  {
    id: '3',
    name: 'Creator Bundle Pack',
    description: 'Bundle of exclusive merchandise',
    price: 99.99,
    image: '/images/bundle.jpg',
    inventory: 30,
    category: 'bundles',
    sku: 'BUNDLE-001',
  },
];

export const useStore = (creatorUsername?: string) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);

  // Fetch products for creator
  const {
    data: products = mockProducts,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useQuery({
    queryKey: ['products', creatorUsername],
    queryFn: async () => {
      if (!creatorUsername) return mockProducts;

      // In a real app, this would fetch from your API
      // const response = await fetch(`/api/stores/${creatorUsername}/products`);
      // return response.json();

      return mockProducts;
    },
  });

  // Fetch orders
  const {
    data: orders = [],
    isLoading: isLoadingOrders,
    error: ordersError,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ['orders', creatorUsername],
    queryFn: async () => {
      if (!creatorUsername) return [];

      // In a real app, fetch from API
      // const response = await fetch(`/api/stores/${creatorUsername}/orders`);
      // return response.json();

      return [];
    },
  });

  // Create order mutation
  const createOrderMutation = useMutation({
    mutationFn: async (cartItems: CartItem[]) => {
      setIsLoadingCheckout(true);

      // In a real app, this would call your backend
      // const response = await fetch(`/api/stores/${creatorUsername}/orders`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ items: cartItems }),
      // });
      // return response.json();

      // Mock delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return { id: 'ORDER-' + Date.now(), items: cartItems, status: 'processing' };
    },
    onSuccess: (data) => {
      setCart([]);
      refetchOrders();
      setIsLoadingCheckout(false);
    },
    onError: () => {
      setIsLoadingCheckout(false);
    },
  });

  // Add to cart
  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.inventory) }
            : item
        );
      }

      return [...prevCart, { product, quantity: Math.min(quantity, product.inventory) }];
    });
  }, []);

  // Remove from cart
  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  }, []);

  // Update quantity
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            return { ...item, quantity: Math.max(0, quantity) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  }, []);

  // Clear cart
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Calculate totals
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Checkout
  const checkout = useCallback(async () => {
    if (cart.length === 0) return;
    await createOrderMutation.mutateAsync(cart);
  }, [cart, createOrderMutation]);

  // Get inventory for product
  const getProductInventory = useCallback(
    (productId: string) => {
      const product = products.find((p) => p.id === productId);
      return product?.inventory || 0;
    },
    [products]
  );

  return {
    // Products
    products,
    isLoadingProducts,
    productsError,

    // Orders
    orders,
    isLoadingOrders,
    ordersError,

    // Cart operations
    cart,
    cartTotal,
    cartItemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getProductInventory,

    // Checkout
    checkout,
    isCheckingOut: isLoadingCheckout,
    checkoutError: createOrderMutation.error,
  };
};
