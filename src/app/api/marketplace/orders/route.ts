import { NextRequest, NextResponse } from "next/server";

// Mock database
const orders = new Map();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const creatorId = searchParams.get("creatorId");
  const buyerId = searchParams.get("buyerId");
  const status = searchParams.get("status");

  let results = Array.from(orders.values());

  if (creatorId) {
    results = results.filter((o: any) => o.creatorId === creatorId);
  }

  if (buyerId) {
    results = results.filter((o: any) => o.buyerId === buyerId);
  }

  if (status && status !== "all") {
    results = results.filter((o: any) => o.status === status);
  }

  return NextResponse.json(results);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Order must contain at least one item" },
        { status: 400 }
      );
    }

    // Generate order ID
    const orderId = `ORD-${Date.now()}`;

    // Calculate totals
    const subtotal = body.items.reduce(
      (sum: number, item: any) => sum + item.product.price * item.quantity,
      0
    );
    const tax = subtotal * 0.1;
    const hasPhysicalItems = body.items.some((item: any) => item.product.type === "physical");
    const shipping = hasPhysicalItems ? (subtotal > 100 ? 0 : 10) : 0;
    const total = subtotal + tax + shipping;

    // Generate digital downloads for digital products
    const digitalDownloads = body.items
      .filter((item: any) => item.product.type === "digital")
      .map((item: any) => ({
        productId: item.product.id,
        downloadUrl: `https://example.com/download/${orderId}/${item.product.id}`,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        downloadCount: 0,
        maxDownloads: item.product.downloadLimit || 3,
      }));

    const order = {
      id: orderId,
      creatorId: body.creatorId || "default-creator",
      buyerId: body.buyerId || "anonymous",
      items: body.items,
      subtotal,
      tax,
      shipping,
      total,
      totalXLM: body.totalXLM || 0,
      txHash: body.txHash,
      status: "pending",
      shippingAddress: body.shippingAddress,
      billingAddress: body.billingAddress,
      digitalDownloads: digitalDownloads.length > 0 ? digitalDownloads : undefined,
      notes: body.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    orders.set(orderId, order);

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
