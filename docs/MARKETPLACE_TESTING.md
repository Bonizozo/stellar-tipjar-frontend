# Marketplace Testing Guide

## Quick Start Testing

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test Main Pages

**Marketplace Browse:**
- Navigate to `http://localhost:3000/marketplace`
- Verify creator stores display
- Test search and filters

**Creator Store:**
- Navigate to `http://localhost:3000/store/alice`
- Add products to cart
- Test checkout flow

**Product Creation:**
- Navigate to `http://localhost:3000/marketplace/create`
- Fill form and create product

**Creator Dashboard:**
- Navigate to `http://localhost:3000/dashboard/marketplace`
- View products and orders

## API Testing

```bash
# Test Products API
curl http://localhost:3000/api/marketplace/products

# Test Orders API
curl http://localhost:3000/api/marketplace/orders
```

## Run Automated Tests

```bash
# Run all marketplace tests
npm test -- marketplace

# Run integration tests
npm test -- marketplace-integration
```

## Key Features to Verify

✅ Product listings display correctly  
✅ Shopping cart calculations work  
✅ Checkout flow completes  
✅ Digital delivery shows downloads  
✅ Order management works  
✅ Search and filters function  
✅ Wallet integration works  
✅ Responsive design on mobile  

## Common Issues

**Issue**: Products not showing  
**Fix**: Check mock data in `useMarketplace` hook

**Issue**: Checkout fails  
**Fix**: Ensure wallet is connected

**Issue**: TypeScript errors  
**Fix**: Run `npm run typecheck`

## Report Issues

Found a bug? Check console for errors and report with:
- Steps to reproduce
- Expected vs actual behavior
- Screenshots
- Browser/OS info
