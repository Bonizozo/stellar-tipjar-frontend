import { describe, expect, it } from "vitest";

import {
  GET as getOrder,
  PATCH as patchOrder,
} from "@/app/api/marketplace/orders/[orderId]/route";
import {
  GET as getOrders,
  POST as createOrder,
} from "@/app/api/marketplace/orders/route";
import {
  GET as getProducts,
  POST as createProduct,
} from "@/app/api/marketplace/products/route";
import CreatorMarketplaceDashboard from "@/app/dashboard/marketplace/page";
import CreateStorePage from "@/app/marketplace/create/page";
import MarketplacePage from "@/app/marketplace/page";

describe("Marketplace Routes", () => {
  it.each([
    ["marketplace", MarketplacePage],
    ["create product", CreateStorePage],
    ["creator dashboard", CreatorMarketplaceDashboard],
  ])("exports the %s page", (_name, page) => {
    expect(page).toBeTypeOf("function");
  });

  it("exports the products API handlers", () => {
    expect(getProducts).toBeTypeOf("function");
    expect(createProduct).toBeTypeOf("function");
  });

  it("exports the orders API handlers", () => {
    expect(getOrders).toBeTypeOf("function");
    expect(createOrder).toBeTypeOf("function");
  });

  it("exports the order-detail API handlers", () => {
    expect(getOrder).toBeTypeOf("function");
    expect(patchOrder).toBeTypeOf("function");
  });
});
