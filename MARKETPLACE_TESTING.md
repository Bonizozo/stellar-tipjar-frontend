os
- Browser and OS information
- Console errors

---

## Next Steps After Testing

1. Fix any bugs found
2. Implement missing features
3. Connect to real database
4. Set up payment processing
5. Configure email notifications
6. Add monitoring and analytics
7. Deploy to staging environment
8. Conduct user acceptance testing
9. Deploy to production
Chrome Mobile (Android)

---

## Known Issues & Limitations

1. **Mock Data**: Currently using mock data. Replace with real API calls.
2. **File Upload**: Image upload not implemented yet.
3. **Email Notifications**: Not configured yet.
4. **Payment Processing**: Stripe integration is placeholder.
5. **Real-time Updates**: WebSocket integration needed for live order updates.

---

## Bug Reporting

If you find issues, please report with:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots/vide## Screen Reader Testing
- [ ] All images have alt text
- [ ] Form labels are associated
- [ ] ARIA labels are present
- [ ] Error messages are announced
- [ ] Status updates are announced

### Color Contrast
- [ ] Text meets WCAG AA standards
- [ ] Interactive elements are distinguishable
- [ ] Focus indicators are visible
- [ ] Error states are clear

---

## Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] rome DevTools
# Run Lighthouse audit on:
# - /marketplace
# - /store/alice
# - /marketplace/create
# - /dashboard/marketplace
```

### Load Testing
```bash
# Test with multiple concurrent users
# Use tools like Apache Bench or k6
ab -n 1000 -c 10 http://localhost:3000/marketplace
```

---

## Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Enter/Space activates buttons
- [ ] Escape closes modals
- [ ] Arrow keys work in dropdowns
- [ ] Focus indicators are visible

#:**
```bash
# Navigate through all marketplace pages
# Test wallet connection
# Switch themes
# Use browser back/forward buttons
# Refresh pages
```

---

## Automated Testing

### Run Unit Tests
```bash
npm test -- marketplace
```

### Run Integration Tests
```bash
npm test -- marketplace-integration
```

### Run E2E Tests (if configured)
```bash
npm run test:e2e -- marketplace
```

---

## Performance Testing

### Lighthouse Audit
```bash
# Run Lighthouse on marketplace pages
npm run build
npm start

# Open ChORD-001 \
  -H "Content-Type: application/json" \
  -d '{"status": "shipped"}'
```

---

### 10. Navigation & Integration

#### Test Cases:
- [ ] Marketplace link appears in navbar
- [ ] Clicking marketplace link navigates correctly
- [ ] Wallet integration works
- [ ] Theme switching works on all pages
- [ ] Currency switcher works
- [ ] Language switcher works (if applicable)
- [ ] Toast notifications appear for actions
- [ ] Back button navigation works
- [ ] Browser refresh maintains state

**How to Testders API:**
```bash
# Get all orders
curl http://localhost:3000/api/marketplace/orders

# Get orders by creator
curl http://localhost:3000/api/marketplace/orders?creatorId=creator1

# Get orders by status
curl http://localhost:3000/api/marketplace/orders?status=processing

# Create order
curl -X POST http://localhost:3000/api/marketplace/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [...],
    "totalXLM": 500
  }'

# Update order
curl -X PATCH http://localhost:3000/api/marketplace/orders/st:3000/api/marketplace/products

# Get products by creator
curl http://localhost:3000/api/marketplace/products?creatorId=creator1

# Get products by category
curl http://localhost:3000/api/marketplace/products?category=digital

# Create product
curl -X POST http://localhost:3000/api/marketplace/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "Test",
    "price": 99.99,
    "inventory": 10,
    "category": "digital",
    "type": "digital"
  }'
```

**Orn date shows
- [ ] Progress bar updates
- [ ] Download limit enforcement works
- [ ] Expired downloads show proper message
- [ ] "Limit reached" message appears when applicable
- [ ] Help text displays

**How to Test:**
```bash
# Create order with digital product
# View order details
# Click download button
# Verify download count increases
# Test with expired download
# Test with limit reached
```

---

### 9. API Endpoints

#### Test Cases:

**Products API:**
```bash
# Get all products
curl http://localhoys
- [ ] Digital downloads section appears for digital products
- [ ] Status update buttons work (for creators)
- [ ] Close button closes modal
- [ ] Click outside closes modal

**How to Test:**
```bash
# Open order details from order management
# Verify all sections display
# Try updating order status
# Close modal
```

---

### 8. Digital Delivery

#### Test Cases:
- [ ] Download section appears for digital products
- [ ] Download buttons are enabled
- [ ] Download count displays correctly
- [ ] Expiratiodata
- [ ] "Add Product" button navigates correctly

**How to Test:**
```bash
# Navigate to http://localhost:3000/dashboard/marketplace
# Switch between Products and Orders tabs
# Search for specific orders
# Filter by status
# Click on an order
```

---

### 7. Order Details Modal

#### Test Cases:
- [ ] Modal opens when clicking order
- [ ] All order information displays
- [ ] Items list shows correctly
- [ ] Shipping address displays (if applicable)
- [ ] Payment details show
- [ ] Transaction hash displa Try both payment methods
# Test with insufficient balance
# Test form validations
# Complete a successful order
```

---

### 6. Order Management (`/dashboard/marketplace`)

#### Test Cases:
- [ ] Dashboard loads without errors
- [ ] Stats cards display correctly
- [ ] Products tab shows all products
- [ ] Orders tab shows all orders
- [ ] Search orders functionality works
- [ ] Status filter works
- [ ] Order cards display complete information
- [ ] Clicking order opens details modal
- [ ] Empty states show when no [ ] Stellar payment option displays
- [ ] Card payment option displays
- [ ] XLM amount calculates correctly
- [ ] Wallet balance displays when connected
- [ ] Insufficient balance warning shows
- [ ] Card form fields appear when selected
- [ ] "Back" button returns to shipping
- [ ] "Pay" button processes payment

**Step 4: Confirmation**
- [ ] Success message displays
- [ ] Order ID shows
- [ ] Transaction hash displays
- [ ] "View order tracking" link works

**How to Test:**
```bash
# Complete checkout flow
# Click "Proceed to Checkout"
```

---

### 5. Checkout Flow

#### Test Cases:

**Step 1: Cart Review**
- [ ] All cart items display
- [ ] Item details are correct
- [ ] "Continue to Shipping" button works
- [ ] "Cancel" button returns to store

**Step 2: Shipping Address**
- [ ] All address fields are present
- [ ] Required fields are marked
- [ ] Form validation works
- [ ] Country dropdown has options
- [ ] "Back" button returns to cart
- [ ] "Continue to Payment" button works

**Step 3: Payment Method**
- ] Quantity can be increased/decreased
- [ ] Remove button removes items
- [ ] Subtotal calculates correctly
- [ ] Tax (10%) calculates correctly
- [ ] Shipping calculates correctly ($10 or FREE)
- [ ] Total calculates correctly
- [ ] XLM conversion displays
- [ ] Empty cart shows proper message
- [ ] "Continue Shopping" button works
- [ ] "Proceed to Checkout" button works

**How to Test:**
```bash
# Add items to cart from store page
# Navigate to Cart tab
# Change quantities
# Remove items
# Verify calculations
# Tags can be added and removed
- [ ] Form submission works
- [ ] Validation errors display properly
- [ ] Success message appears after creation
- [ ] Wallet warning shows when not connected

**How to Test:**
```bash
# Navigate to http://localhost:3000/marketplace/create
# Fill in all required fields
# Try submitting with missing fields
# Add tags
# Change product type to digital
# Submit form
```

---

### 4. Shopping Cart

#### Test Cases:
- [ ] Cart displays all added items
- [ ] Item images load correctly
- [ Digital product fields appear when type is "digital"
- [ ]e to http://localhost:3000/store/alice
# Add products to cart
# Change quantities
# Switch between tabs (Shop, Cart, Orders)
# Try filtering by category
```

---

### 3. Product Creation (`/marketplace/create`)

#### Test Cases:
- [ ] Form loads with all required fields
- [ ] Product name validation works
- [ ] Price accepts decimal values
- [ ] Inventory accepts integer values
- [ ] Product type dropdown has all options
- [ ] Category dropdown has all options
- [ ] Delivery method dropdown has all options
- [ ] ng notice appears when applicable

**How to Test:**
```bash
# Navigatgrid displays all products
- [ ] Category filter works (all, apparel, digital, etc.)
- [ ] Add to cart button adds items to cart
- [ ] Cart badge updates with item count
- [ ] Quantity selector works correctly
- [ ] Out of stock products show proper badge
- [ ] Switching to Cart tab shows added items
- [ ] Switching to Orders tab shows order history
- [ ] Wallet connector appears when not connected
- [ ] Free shippivigates to `/store/[username]`
- [ ] Empty state shows when no results found
- [ ] Loading skeletons appear during data fetch
- [ ] Responsive design works on mobile/tablet/desktop

**How to Test:**
```bash
# Start dev server
npm run dev

# Navigate to http://localhost:3000/marketplace
# Try searching for "alice"
# Click different category filters
# Click on a creator store card
```

---

### 2. Creator Store Page (`/store/[username]`)

#### Test Cases:
- [ ] Store page loads for valid username
- [ ] Product s work correctly
- [ ] "Create Your Store" button is visible
- [ ] Clicking a store card nade

## Manual Testing Checklist

### 1. Marketplace Browse Page (`/marketplace`)

#### Test Cases:
- [ ] Page loads without errors
- [ ] Stats cards display correctly (stores, products, sales, buyers)
- [ ] Creator store cards render with proper information
- [ ] Search functionality filters creators by name
- [ ] Category filter# Marketplace Testing Gui