import { NextRequest, NextResponse } from "next/server";

// Mock database
const products = new Map();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const creatorId = searchParams.get("creatorId");
  const category = searchParams.get("category");

  let results = Array.from(products.values());

  if (creatorId) {
    results = results.filter((p: any) => p.creatorId === creatorId);
  }

  if (category && category !== "all") {
    results = results.filter((p: any) => p.category === category);
  }

  return NextResponse.json(results);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate product ID
    const productId = `PROD-${Date.now()}`;

    // Calculate XLM price (mock conversion rate)
    const xlmPrice = 0.20;
    const priceXLM = (body.price / xlmPrice).toFixed(2);

    const product = {
      id: productId,
      creatorId: body.creatorId || "default-creator",
      name: body.name,
      description: body.description,
      longDescription: body.longDescription || "",
      price: parseFloat(body.price),
      priceXLM: parseFloat(priceXLM),
      images: body.images || [],
      inventory: parseInt(body.inventory) || 0,
      category: body.category,
      type: body.type || "digital",
      sku: body.sku || `SKU-${Date.now()}`,
      tags: body.tags || [],
      isActive: true,
      deliveryMethod: body.deliveryMethod || "digital",
      digitalFileUrl: body.digitalFileUrl,
      downloadLimit: body.downloadLimit || 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    products.set(productId, product);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
