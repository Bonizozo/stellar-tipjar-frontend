import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductListingForm } from "@/components/marketplace/ProductListingForm";
import { OrderManagement } from "@/components/marketplace/OrderManagement";
import { DigitalDelivery } from "@/components/marketplace/DigitalDelivery";
import { Order, DigitalDownload } from "@/types/marketplace";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("Marketplace Components", () => {
  describe("ProductListingForm", () => {
    it("renders form fields correctly", () => {
      const onSubmit = vi.fn();
      render(<ProductListingForm onSubmit={onSubmit} />, { wrapper });

      expect(screen.getByLabelText(/product name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/short description/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/price \(usd\)/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/inventory/i)).toBeInTheDocument();
    });

    it("submits form with valid data", async () => {
      const onSubmit = vi.fn();
      render(<ProductListingForm onSubmit={onSubmit} />, { wrapper });

      fireEvent.change(screen.getByLabelText(/product name/i), {
        target: { value: "Test Product" },
      });
      fireEvent.change(screen.getByLabelText(/short description/i), {
        target: { value: "Test description" },
      });
      fireEvent.change(screen.getByLabelText(/price \(usd\)/i), {
        target: { value: "99.99" },
      });
      fireEvent.change(screen.getByLabelText(/inventory/i), {
        target: { value: "10" },
      });

      fireEvent.click(screen.getByText(/create listing/i));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            name: "Test Product",
            description: "Test description",
            price: 99.99,
            inventory: 10,
          })
        );
      });
    });

    it("shows digital product fields when type is digital", () => {
      const onSubmit = vi.fn();
      render(<ProductListingForm onSubmit={onSubmit} />, { wrapper });

      const typeSelect = screen.getByLabelText(/product type/i);
      fireEvent.change(typeSelect, { target: { value: "digital" } });

      expect(screen.getByLabelText(/file url/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/download limit/i)).toBeInTheDocument();
    });
  });

  describe("OrderManagement", () => {
    const mockOrders: Order[] = [
      {
        id: "ORD-001",
        creatorId: "creator1",
        buyerId: "buyer1",
        items: [
          {
            product: {
              id: "1",
              creatorId: "creator1",
              name: "Test Product",
              description: "Test",
              price: 99.99,
              priceXLM: 500,
              images: ["/test.jpg"],
              inventory: 10,
              category: "digital",
              type: "digital",
              sku: "TEST-001",
              tags: [],
              isActive: true,
              deliveryMethod: "digital",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            quantity: 1,
          },
        ],
        subtotal: 99.99,
        tax: 10,
        shipping: 0,
        total: 109.99,
        totalXLM: 550,
        status: "processing",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    it("renders orders list", () => {
      render(<OrderManagement orders={mockOrders} />, { wrapper });

      expect(screen.getByText(/order #ORD-001/i)).toBeInTheDocument();
      expect(screen.getByText(/test product/i)).toBeInTheDocument();
      expect(screen.getByText(/\$109\.99/)).toBeInTheDocument();
    });

    it("filters orders by search query", async () => {
      render(<OrderManagement orders={mockOrders} />, { wrapper });

      const searchInput = screen.getByPlaceholderText(/search orders/i);
      fireEvent.change(searchInput, { target: { value: "ORD-001" } });

      expect(screen.getByText(/order #ORD-001/i)).toBeInTheDocument();
    });

    it("shows empty state when no orders", () => {
      render(<OrderManagement orders={[]} />, { wrapper });

      expect(screen.getByText(/no orders found/i)).toBeInTheDocument();
    });
  });

  describe("DigitalDelivery", () => {
    const mockDownloads: DigitalDownload[] = [
      {
        productId: "1",
        downloadUrl: "https://example.com/download/1",
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        downloadCount: 0,
        maxDownloads: 3,
      },
    ];

    it("renders download items", () => {
      const onDownload = vi.fn();
      render(
        <DigitalDelivery
          orderId="ORD-001"
          downloads={mockDownloads}
          onDownload={onDownload}
        />,
        { wrapper }
      );

      expect(screen.getByText(/product #1/i)).toBeInTheDocument();
      expect(screen.getByText(/downloads: 0 \/ 3/i)).toBeInTheDocument();
    });

    it("calls onDownload when download button clicked", async () => {
      const onDownload = vi.fn().mockResolvedValue(undefined);
      render(
        <DigitalDelivery
          orderId="ORD-001"
          downloads={mockDownloads}
          onDownload={onDownload}
        />,
        { wrapper }
      );

      const downloadButton = screen.getByText(/download/i);
      fireEvent.click(downloadButton);

      await waitFor(() => {
        expect(onDownload).toHaveBeenCalledWith("1");
      });
    });

    it("disables download when limit reached", () => {
      const limitReachedDownloads: DigitalDownload[] = [
        {
          ...mockDownloads[0],
          downloadCount: 3,
        },
      ];

      const onDownload = vi.fn();
      render(
        <DigitalDelivery
          orderId="ORD-001"
          downloads={limitReachedDownloads}
          onDownload={onDownload}
        />,
        { wrapper }
      );

      expect(screen.getByText(/limit reached/i)).toBeInTheDocument();
      expect(screen.queryByText(/^download$/i)).not.toBeInTheDocument();
    });

    it("shows empty state when no downloads", () => {
      const onDownload = vi.fn();
      render(
        <DigitalDelivery orderId="ORD-001" downloads={[]} onDownload={onDownload} />,
        { wrapper }
      );

      expect(screen.getByText(/no digital products/i)).toBeInTheDocument();
    });
  });
});
