import { describe, it, expect } from "vitest";

describe("Marketplace Routes", () => {
  it("should have marketplace page component", async () => {
    const MarketplacePage = (await import("@/app/marketplace/page")).default;
    expect(MarketplacePage).toBeDefined();
    expect(typeof MarketplacePage).toBe("function");
  });

  it("should have create product page component", async () => {
    const CreatePage = (await import("@/app/marketplace/create/page")).default;
    expect(CreatePage).toBeDefined();
    expect(typeof CreatePage).toBe("function");
  });

  it("should have creator dashboard page component", async () => {
    const DashboardPage = (await import("@/app/dashboard/marketplace/page")).default;
    expect(DashboardPage).toBeDefined();
    expect(typeof DashboardPage).toBe("function");
  });

  it("should have products API route", async () => {
    const { GET, POST } = await import("@/app/api/marketplace/products/route");
    expect(GET).toBeDefined();
    expect(POST).toBeDefined();
    expect(typeof GET).toBe("function");
    expect(typeof POST).toBe("function");
  });

  it("should have orders API route", async () => {
    const { GET, POST } = await import("@/app/api/marketplace/orders/route");
    expect(GET).toBeDefined();
    expect(POST).toBeDefined();
    expect(typeof GET).toBe("function");
    expect(typeof POST).toBe("function");
  });

  it("should have order detail API route", async () => {
    const { GET, PATCH } = await import("@/app/api/marketplace/orders/[orderId]/route");
    expect(GET).toBeDefined();
    expect(PATCH).toBeDefined();
    expect(typeof GET).toBe("function");
    expect(typeof PATCH).toBe("function");
  });
});
