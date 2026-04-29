import { NextRequest, NextResponse } from "next/server";

// Mock database (in production, use a real database)
const orders = new Map();

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const order = orders.get(params.orderId);

  if (!order) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(order);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const body = await request.json();
    const order = orders.get(params.orderId);

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Update order fields
    const updatedOrder = {
      ...order,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    orders.set(params.orderId, updatedOrder);

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
