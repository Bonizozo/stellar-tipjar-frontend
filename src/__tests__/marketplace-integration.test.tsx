import { describe, expect, expectTypeOf, it } from "vitest";

import { CheckoutFlow } from "@/components/marketplace/CheckoutFlow";
import { CreatorStoreCard } from "@/components/marketplace/CreatorStoreCard";
import { DigitalDelivery } from "@/components/marketplace/DigitalDelivery";
import { MarketplaceFilters } from "@/components/marketplace/MarketplaceFilters";
import { OrderDetailsModal } from "@/components/marketplace/OrderDetailsModal";
import { OrderManagement } from "@/components/marketplace/OrderManagement";
import { OrderSummary } from "@/components/marketplace/OrderSummary";
import { PaymentMethod } from "@/components/marketplace/PaymentMethod";
import { ProductListingForm } from "@/components/marketplace/ProductListingForm";
import { ShippingAddressForm } from "@/components/marketplace/ShippingAddressForm";
import { useCreatorMarketplace } from "@/hooks/useCreatorMarketplace";
import { useMarketplace } from "@/hooks/useMarketplace";
import type {
  DeliveryMethod,
  OrderStatus,
  ProductCategory,
  ProductType,
} from "@/types/marketplace";

describe("Marketplace Integration", () => {
  it("exports the marketplace domain types", () => {
    expectTypeOf<ProductType>().toEqualTypeOf<"physical" | "digital" | "service">();
    expectTypeOf<OrderStatus>().toMatchTypeOf<string>();
    expectTypeOf<ProductCategory>().toMatchTypeOf<string>();
    expectTypeOf<DeliveryMethod>().toMatchTypeOf<string>();
  });

  it("exports the marketplace hooks", () => {
    expect(useMarketplace).toBeTypeOf("function");
    expect(useCreatorMarketplace).toBeTypeOf("function");
  });

  it("exports all marketplace components", () => {
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

    components.forEach((component) => expect(component).toBeTypeOf("function"));
  });

  it.each([
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
  ] satisfies ProductCategory[])("accepts the %s product category", (category) => {
    expect(category).toBeTypeOf("string");
  });

  it.each([
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
    "refunded",
  ] satisfies OrderStatus[])("accepts the %s order status", (status) => {
    expect(status).toBeTypeOf("string");
  });

  it.each(["physical", "digital", "service"] satisfies ProductType[])(
    "accepts the %s product type",
    (type) => expect(type).toBeTypeOf("string"),
  );

  it.each(["shipping", "digital", "email"] satisfies DeliveryMethod[])(
    "accepts the %s delivery method",
    (method) => expect(method).toBeTypeOf("string"),
  );
});
