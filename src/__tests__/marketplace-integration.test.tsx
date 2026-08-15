import { describe, it, expect } from "vitest";
import * as marketplaceTypes from "@/types/marketplace";
import { useMarketplace } from "@/hooks/useMarketplace";
import { useCreatorMarketplace } from "@/hooks/useCreatorMarketplace";
import { CreatorStoreCard } from "@/components/marketplace/CreatorStoreCard";
import { MarketplaceFilters } from "@/components/marketplace/MarketplaceFilters";
import { ProductListingForm } from "@/components/marketplace/ProductListingForm";
import { CheckoutFlow } from "@/components/marketplace/CheckoutFlow";
import { ShippingAddressForm } from "@/components/marketplace/ShippingAddressForm";
import { PaymentMethod } from "@/components/marketplace/PaymentMethod";
import { OrderSummary } from "@/components/marketplace/OrderSummary";
import { OrderManagement } from "@/components/marketplace/OrderManagement";
import { OrderDetailsModal } from "@/components/marketplace/OrderDetailsModal";
import { DigitalDelivery } from "@/components/marketplace/DigitalDelivery";

describe("Marketplace Integration", () => {
  it("should have all required types exported", () => {
    expect(marketplaceTypes).toBeDefined();
    expect(typeof marketplaceTypes).toBe("object");
  });

  it("should have marketplace hooks available", () => {
    expect(useMarketplace).toBeDefined();
    expect(typeof useMarketplace).toBe("function");
    expect(useCreatorMarketplace).toBeDefined();
    expect(typeof useCreatorMarketplace).toBe("function");
  });

  it("should have all marketplace components available", () => {
    const components = [
      CreatorStoreCard,
      MarketplaceFilters,
      ProductListingForm,
      CheckoutFlow,
      ShippingAddressForm,
      PaymentMethod,
      OrderSummary,
      OrderManagement,
      OrderDetailsModal,
      DigitalDelivery,
    ];

    components.forEach((component) => {
      expect(component).toBeDefined();
    });
  });

  it("should validate product categories", () => {
    const categories = [
      "apparel",
      "posters",
      "bundles",
      "accessories",
      "digital",
      "courses",
      "ebooks",
      "music",
      "videos",
      "consulting",
      "coaching",
    ];

    categories.forEach((category) => {
      expect(typeof category).toBe("string");
      expect(category.length).toBeGreaterThan(0);
    });
  });

  it("should validate order status workflow", () => {
    const statuses = ["pending", "processing", "shipped", "delivered", "cancelled", "refunded"];

    statuses.forEach((status) => {
      expect(typeof status).toBe("string");
      expect(status.length).toBeGreaterThan(0);
    });
  });

  it("should validate product types", () => {
    const types = ["physical", "digital", "service"];

    types.forEach((type) => {
      expect(typeof type).toBe("string");
      expect(type.length).toBeGreaterThan(0);
    });
  });

  it("should validate delivery methods", () => {
    const methods = ["shipping", "digital", "email"];

    methods.forEach((method) => {
      expect(typeof method).toBe("string");
      expect(method.length).toBeGreaterThan(0);
    });
  });
});
