# Creator Marketplace

A comprehensive marketplace system that allows creators to sell digital products, physical merchandise, and services directly to their supporters using Stellar (XLM) payments.

## Features

### 1. Product Listings
- **Multiple Product Types**: Physical products, digital downloads, and services
- **Rich Product Details**: Images, descriptions, pricing, inventory management
- **Categories**: Apparel, posters, digital content, courses, ebooks, music, videos, consulting
- **SKU Management**: Automatic SKU generation and tracking
- **Tags**: Flexible tagging system for better discoverability

### 2. Shopping Cart
- **Real-time Updates**: Add, remove, and update quantities
- **Price Calculations**: Automatic subtotal, tax, and shipping calculations
- **XLM Conversion**: Real-time USD to XLM price conversion
- **Free Shipping**: Automatic free shipping for orders over $100
- **Persistent Cart**: Cart data persists across sessions

### 3. Checkout Flow
- **Multi-step Process**: Cart review → Shipping → Payment → Confirmation
- **Shipping Address**: Complete address collection for physical products
- **Payment Methods**: 
  - Stellar (XLM) payments via Freighter wallet
  - Credit/debit card support (placeholder for integration)
- **Order Summary**: Clear breakdown of costs
- **Transaction Tracking**: Stellar transaction hash recording

### 4. Digital Delivery
- **Automatic Delivery**: Digital products delivered immediately after purchase
- **Download Management**: 
  - Configurable download limits per product
  - Expiration dates for security
  - Download tracking and progress indicators
- **Secure Links**: Time-limited download URLs
- **Multiple Downloads**: Support for multiple digital items per order

### 5. Order Management
- **Order Tracking**: Real-time order status updates
- **Status Workflow**: Pending → Processing → Shipped → Delivered
- **Search & Filter**: Find orders by ID, status, or date
- **Order Details**: Complete order information including:
  - Items purchased
  - Shipping address
  - Payment details
  - Tracking numbers
  - Digital downloads
- **Creator Dashboard**: Manage all orders from a single interface

### 6. Creator Dashboard
- **Analytics**: 
  - Total products
  - Total sales
  - Revenue tracking
  - Active orders count
- **Product Management**: View and manage all product listings
- **Order Processing**: Update order statuses and add tracking information
- **Performance Metrics**: Sales per product, views, and revenue

## File Structure

```
src/
├── app/
│   ├── marketplace/
│   │   ├── page.tsx                    # Main marketplace browse page
│   │   └── create/
│   │       └── page.tsx                # Create product listing page
│   ├── dashboard/
│   │   └── marketplace/
│   │       └── page.tsx                # Creator marketplace dashboard
│   └── api/
│       └── marketplace/
│           ├── products/
│           │   └── route.ts            # Product API endpoints
│           └── orders/
│               ├── route.ts            # Order API endpoints
│               └── [orderId]/
│                   └── route.ts        # Individual order endpoints
├── components/
│   └── marketplace/
│       ├── CreatorStoreCard.tsx        # Store card component
│       ├── MarketplaceFilters.tsx      # Search and filter UI
│       ├── ProductListingForm.tsx      # Product creation form
│       ├── CheckoutFlow.tsx            # Multi-step checkout
│       ├── ShippingAddressForm.tsx     # Shipping form
│       ├── PaymentMethod.tsx           # Payment selection
│       ├── OrderSummary.tsx            # Order summary sidebar
│       ├── OrderManagement.tsx         # Order list and management
│       ├── OrderDetailsModal.tsx       # Order details popup
│       └── DigitalDelivery.tsx         # Digital download UI
├── hooks/
│   ├── useMarketplace.ts               # Marketplace data hook
│   └── useCreatorMarketplace.ts        # Creator dashboard hook
└── types/
    └── marketplace.ts                  # TypeScript types

```

## Usage

### For Buyers

1. **Browse Marketplace**
   ```
   Navigate to /marketplace
   ```
   - Browse all creator stores
   - Filter by category
   - Search for specific creators

2. **Visit Creator Store**
   ```
   Navigate to /store/[username]
   ```
   - View all products from a creator
   - Filter by category
   - Add items to cart

3. **Checkout**
   - Review cart items
   - Enter shipping address (for physical products)
   - Choose payment method (Stellar XLM or card)
   - Complete purchase

4. **Access Digital Products**
   - View orders in the Orders tab
   - Download digital products with download limits
   - Track physical product shipments

### For Creators

1. **Create Product Listing**
   ```
   Navigate to /marketplace/create
   ```
   - Fill in product details
   - Set pricing and inventory
   - Choose product type and delivery method
   - Add tags for discoverability

2. **Manage Products**
   ```
   Navigate to /dashboard/marketplace
   ```
   - View all your products
   - See sales and revenue statistics
   - Monitor product performance

3. **Process Orders**
   - View incoming orders
   - Update order status
   - Add tracking numbers for shipments
   - Manage digital deliveries

## API Endpoints

### Products

```typescript
// Get all products
GET /api/marketplace/products?creatorId=xxx&category=xxx

// Create product
POST /api/marketplace/products
Body: {
  name: string;
  description: string;
  price: number;
  inventory: number;
  category: string;
  type: "physical" | "digital" | "service";
  deliveryMethod: "shipping" | "digital" | "email";
  // ... other fields
}
```

### Orders

```typescript
// Get orders
GET /api/marketplace/orders?creatorId=xxx&buyerId=xxx&status=xxx

// Create order
POST /api/marketplace/orders
Body: {
  items: CartItem[];
  shippingAddress?: ShippingAddress;
  txHash?: string;
  // ... other fields
}

// Update order
PATCH /api/marketplace/orders/[orderId]
Body: {
  status?: OrderStatus;
  trackingNumber?: string;
  // ... other fields
}
```

## Integration with Stellar

The marketplace integrates with Stellar blockchain for payments:

1. **Wallet Connection**: Uses Freighter wallet for authentication
2. **Price Conversion**: Real-time USD to XLM conversion
3. **Transaction Signing**: Secure transaction signing via Freighter
4. **Transaction Recording**: Stores transaction hash for verification
5. **Balance Checking**: Validates sufficient XLM balance before checkout

## Digital Product Delivery

Digital products are delivered automatically:

1. **Purchase Completion**: Order created with "processing" status
2. **Download Generation**: Secure download URLs generated
3. **Email Notification**: Buyer receives email with download links
4. **Access Control**: 
   - Download limits enforced
   - Expiration dates checked
   - Download count tracked

## Security Features

- **Secure Downloads**: Time-limited, signed URLs for digital products
- **Transaction Verification**: Stellar transaction hash validation
- **Wallet Authentication**: Freighter wallet integration
- **Download Limits**: Prevent unauthorized sharing
- **Address Validation**: Shipping address verification

## Future Enhancements

- [ ] Subscription products
- [ ] Product reviews and ratings
- [ ] Bulk discounts
- [ ] Coupon codes
- [ ] Affiliate program
- [ ] Advanced analytics
- [ ] Email notifications
- [ ] Refund processing
- [ ] Inventory alerts
- [ ] Multi-currency support
- [ ] Product variants (sizes, colors)
- [ ] Wishlist functionality
- [ ] Gift purchases

## Testing

```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Test checkout flow
npm run test:e2e -- --grep "checkout"
```

## Configuration

Environment variables needed:

```env
# Stellar Network
NEXT_PUBLIC_STELLAR_NETWORK=TESTNET
NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org

# Payment Processing
STRIPE_SECRET_KEY=sk_test_xxx  # For card payments
STRIPE_PUBLISHABLE_KEY=pk_test_xxx

# File Storage (for digital products)
AWS_S3_BUCKET=your-bucket
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx

# Email Service
SENDGRID_API_KEY=xxx
```

## Support

For issues or questions:
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)
- Documentation: [Full docs](https://docs.stellar-tipjar.app)
- Discord: [Join our community](https://discord.gg/stellar-tipjar)
