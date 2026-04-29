# Marketplace Migration Guide

This guide helps you integrate the marketplace feature into your existing Stellar Tip Jar application.

## Prerequisites

- Node.js 20+
- Existing Stellar Tip Jar installation
- Freighter wallet extension
- Database (PostgreSQL recommended for production)

## Installation Steps

### 1. Install Dependencies

All required dependencies are already included in the main `package.json`. No additional packages needed.

### 2. Database Schema

If using a database, create the following tables:

```sql
-- Products table
CREATE TABLE products (
  id VARCHAR(255) PRIMARY KEY,
  creator_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  long_description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  price_xlm DECIMAL(20, 7) NOT NULL,
  images JSONB DEFAULT '[]',
  inventory INTEGER DEFAULT 0,
  category VARCHAR(50) NOT NULL,
  type VARCHAR(20) NOT NULL,
  sku VARCHAR(100) UNIQUE NOT NULL,
  tags JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  delivery_method VARCHAR(20) NOT NULL,
  digital_file_url TEXT,
  download_limit INTEGER DEFAULT 3,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_creator (creator_id),
  INDEX idx_category (category),
  INDEX idx_active (is_active)
);

-- Orders table
CREATE TABLE orders (
  id VARCHAR(255) PRIMARY KEY,
  creator_id VARCHAR(255) NOT NULL,
  buyer_id VARCHAR(255) NOT NULL,
  items JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) NOT NULL,
  shipping DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  total_xlm DECIMAL(20, 7) NOT NULL,
  tx_hash VARCHAR(255),
  status VARCHAR(20) NOT NULL,
  shipping_address JSONB,
  billing_address JSONB,
  tracking_number VARCHAR(255),
  digital_downloads JSONB,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_creator (creator_id),
  INDEX idx_buyer (buyer_id),
  INDEX idx_status (status),
  INDEX idx_created (created_at)
);

-- Digital downloads tracking
CREATE TABLE download_logs (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(255) NOT NULL,
  product_id VARCHAR(255) NOT NULL,
  buyer_id VARCHAR(255) NOT NULL,
  download_url TEXT NOT NULL,
  downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent TEXT,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

### 3. Environment Variables

Add to your `.env` file:

```env
# Marketplace Settings
MARKETPLACE_ENABLED=true
MARKETPLACE_COMMISSION_RATE=0.05  # 5% platform fee

# File Storage (for digital products)
AWS_S3_BUCKET=your-marketplace-bucket
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

# Payment Processing
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Email Notifications
SENDGRID_API_KEY=SG.xxx
MARKETPLACE_EMAIL_FROM=marketplace@stellar-tipjar.app

# XLM Price Feed
XLM_PRICE_API_URL=https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=usd
```

### 4. Update API Routes

Replace the mock API routes with real database queries:

```typescript
// src/app/api/marketplace/products/route.ts
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const creatorId = searchParams.get("creatorId");
  const category = searchParams.get("category");

  let query = db.select().from("products").where({ is_active: true });

  if (creatorId) {
    query = query.where({ creator_id: creatorId });
  }

  if (category && category !== "all") {
    query = query.where({ category });
  }

  const products = await query;
  return NextResponse.json(products);
}
```

### 5. Configure File Upload

For digital products, set up S3 or similar storage:

```typescript
// src/lib/storage.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadDigitalProduct(
  file: File,
  productId: string
): Promise<string> {
  const key = `products/${productId}/${file.name}`;
  
  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
      Body: file,
      ContentType: file.type,
    })
  );

  return key;
}

export async function generateDownloadUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
}
```

### 6. Set Up Email Notifications

Configure email templates for order confirmations:

```typescript
// src/lib/email.ts
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendOrderConfirmation(order: Order) {
  const msg = {
    to: order.buyerEmail,
    from: process.env.MARKETPLACE_EMAIL_FROM!,
    subject: `Order Confirmation #${order.id}`,
    html: `
      <h1>Thank you for your order!</h1>
      <p>Order #${order.id}</p>
      <p>Total: $${order.total.toFixed(2)}</p>
      ${order.digitalDownloads ? `
        <h2>Your Downloads</h2>
        ${order.digitalDownloads.map(d => `
          <p><a href="${d.downloadUrl}">Download ${d.productId}</a></p>
        `).join('')}
      ` : ''}
    `,
  };

  await sgMail.send(msg);
}
```

### 7. Implement Stellar Payments

Update the checkout flow to handle real Stellar transactions:

```typescript
// src/lib/stellar-payments.ts
import { Server, Networks, TransactionBuilder, Operation, Asset } from "@stellar/stellar-sdk";

const server = new Server(process.env.NEXT_PUBLIC_HORIZON_URL!);

export async function createPaymentTransaction(
  buyerPublicKey: string,
  creatorPublicKey: string,
  amountXLM: string
) {
  const account = await server.loadAccount(buyerPublicKey);
  
  const transaction = new TransactionBuilder(account, {
    fee: "100",
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(
      Operation.payment({
        destination: creatorPublicKey,
        asset: Asset.native(),
        amount: amountXLM,
      })
    )
    .setTimeout(180)
    .build();

  return transaction.toXDR();
}

export async function submitTransaction(signedXDR: string) {
  const transaction = TransactionBuilder.fromXDR(signedXDR, Networks.TESTNET);
  const result = await server.submitTransaction(transaction);
  return result.hash;
}
```

### 8. Add Webhook Handlers

For Stripe payments (optional):

```typescript
// src/app/api/webhooks/stripe/route.ts
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new Response("Webhook signature verification failed", { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    // Update order status
    await updateOrderStatus(paymentIntent.metadata.orderId, "processing");
  }

  return new Response(JSON.stringify({ received: true }));
}
```

## Testing

### 1. Test Product Creation

```bash
curl -X POST http://localhost:3000/api/marketplace/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "Test description",
    "price": 99.99,
    "inventory": 10,
    "category": "digital",
    "type": "digital"
  }'
```

### 2. Test Order Creation

```bash
curl -X POST http://localhost:3000/api/marketplace/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [...],
    "totalXLM": 500
  }'
```

### 3. Run Test Suite

```bash
npm test -- marketplace
```

## Production Checklist

- [ ] Database migrations applied
- [ ] S3 bucket configured with proper CORS
- [ ] Stripe account set up and verified
- [ ] Email templates tested
- [ ] Stellar mainnet configuration
- [ ] SSL certificates installed
- [ ] Rate limiting configured
- [ ] Monitoring and logging set up
- [ ] Backup strategy implemented
- [ ] Security audit completed

## Troubleshooting

### Products not showing
- Check database connection
- Verify `is_active` flag is true
- Check API endpoint logs

### Checkout failing
- Verify Freighter wallet is connected
- Check XLM balance
- Review transaction logs

### Digital downloads not working
- Verify S3 credentials
- Check file permissions
- Review signed URL expiration

## Support

For migration assistance:
- GitHub Discussions: [Ask a question](https://github.com/your-repo/discussions)
- Discord: [Join #marketplace channel](https://discord.gg/stellar-tipjar)
- Email: support@stellar-tipjar.app
