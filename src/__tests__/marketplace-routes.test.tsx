import { describe, it, expect } from "vitest";
import MarketplacePage from "@/app/marketplace/page";
import CreatePage from "@/app/marketplace/create/page";
import DashboardPage from "@/app/dashboard/marketplace/page";
import * as productsRoute from "@/app/api/marketplace/products/route";
import * as ordersRoute from "@/app/api/marketplace/orders/route";
import * as orderDetailRoute from "@/app/api/marketplace/orders/[orderId]/route";

describe("Marketplace Routes", () => {
  it("should have marketplace page component", () => {
    expect(MarketplacePage).toBeDefined();
    expect(typeof MarketplacePage).toBe("function");
  });

  it("should have create product page component", () => {
    expect(CreatePage).toBeDefined();
    expect(typeof CreatePage).toBe("function");
  });

  it("should have creator dashboard page component", () => {
    expect(DashboardPage).toBeDefined();
    expect(typeof DashboardPage).toBe("function");
  });

  it("should have products API route", () => {
    expect(productsRoute.GET).toBeDefined();
    expect(productsRoute.POST).toBeDefined();
    expect(typeof productsRoute.GET).toBe("function");
    expect(typeof productsRoute.POST).toBe("function");
  });

  it("should have orders API route", () => {
    expect(ordersRoute.GET).toBeDefined();
    expect(ordersRoute.POST).toBeDefined();
    expect(typeof ordersRoute.GET).toBe("function");
    expect(typeof ordersRoute.POST).toBe("function");
  });

  it("should have order detail API route", () => {
    expect(orderDetailRoute.GET).toBeDefined();
    expect(orderDetailRoute.PATCH).toBeDefined();
    expect(typeof orderDetailRoute.GET).toBe("function");
    expect(typeof orderDetailRoute.PATCH).toBe("function");
  });
});
