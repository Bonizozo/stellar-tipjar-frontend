#!/usr/bin/env node

/**
 * Marketplace Implementation Verification Script
 * Checks that all marketplace files are in place and properly structured
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_FILES = [
  // Pages
  'src/app/marketplace/page.tsx',
  'src/app/marketplace/create/page.tsx',
  'src/app/dashboard/marketplace/page.tsx',
  
  // API Routes
  'src/app/api/marketplace/products/route.ts',
  'src/app/api/marketplace/orders/route.ts',
  'src/app/api/marketplace/orders/[orderId]/route.ts',
  
  // Components
  'src/components/marketplace/CreatorStoreCard.tsx',
  'src/components/marketplace/MarketplaceFilters.tsx',
  'src/components/marketplace/ProductListingForm.tsx',
  'src/components/marketplace/CheckoutFlow.tsx',
  'src/components/marketplace/ShippingAddressForm.tsx',
  'src/components/marketplace/PaymentMethod.tsx',
  'src/components/marketplace/OrderSummary.tsx',
  'src/components/marketplace/OrderManagement.tsx',
  'src/components/marketplace/OrderDetailsModal.tsx',
  'src/components/marketplace/DigitalDelivery.tsx',
  
  // Hooks
  'src/hooks/useMarketplace.ts',
  'src/hooks/useCreatorMarketplace.ts',
  
  // Types
  'src/types/marketplace.ts',
  
  // Tests
  'src/__tests__/marketplace.test.tsx',
  'src/__tests__/marketplace-integration.test.tsx',
  
  // Documentation
  'docs/MARKETPLACE.md',
  'docs/MARKETPLACE_MIGRATION.md',
  'docs/MARKETPLACE_TESTING.md',
  'MARKETPLACE_IMPLEMENTATION.md',
];

const REQUIRED_EXPORTS = {
  'src/types/marketplace.ts': [
    'ProductType',
    'ProductCategory',
    'OrderStatus',
    'DeliveryMethod',
    'Product',
    'CartItem',
    'Order',
    'ShippingAddress',
    'DigitalDownload',
  ],
  'src/hooks/useMarketplace.ts': ['useMarketplace', 'CreatorStore', 'MarketplaceStats'],
  'src/hooks/useCreatorMarketplace.ts': ['useCreatorMarketplace'],
};

console.log('🔍 Verifying Marketplace Implementation...\n');

let allPassed = true;
let filesChecked = 0;
let filesMissing = 0;

// Check required files exist
console.log('📁 Checking required files...');
REQUIRED_FILES.forEach((file) => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file}`);
    filesChecked++;
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    filesMissing++;
    allPassed = false;
  }
});

console.log(`\n📊 Files: ${filesChecked} found, ${filesMissing} missing\n`);

// Check exports
console.log('🔧 Checking exports...');
Object.entries(REQUIRED_EXPORTS).forEach(([file, exports]) => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    exports.forEach((exportName) => {
      const hasExport = 
        content.includes(`export interface ${exportName}`) ||
        content.includes(`export type ${exportName}`) ||
        content.includes(`export function ${exportName}`) ||
        content.includes(`export const ${exportName}`);
      
      if (hasExport) {
        console.log(`  ✅ ${file} exports ${exportName}`);
      } else {
        console.log(`  ⚠️  ${file} may not export ${exportName}`);
      }
    });
  }
});

// Check for common issues
console.log('\n🔍 Checking for common issues...');

// Check if marketplace link is in navbar
const navbarPath = path.join(process.cwd(), 'src/components/Navbar.tsx');
if (fs.existsSync(navbarPath)) {
  const navbarContent = fs.readFileSync(navbarPath, 'utf8');
  if (navbarContent.includes('/marketplace')) {
    console.log('  ✅ Marketplace link added to Navbar');
  } else {
    console.log('  ❌ Marketplace link NOT found in Navbar');
    allPassed = false;
  }
}

// Summary
console.log('\n' + '='.repeat(50));
if (allPassed && filesMissing === 0) {
  console.log('✅ All checks passed! Marketplace is ready.');
  console.log('\n📝 Next steps:');
  console.log('  1. Run: npm run dev');
  console.log('  2. Visit: http://localhost:3000/marketplace');
  console.log('  3. Test the features');
  console.log('  4. Run tests: npm test -- marketplace');
  process.exit(0);
} else {
  console.log('❌ Some checks failed. Please review the issues above.');
  process.exit(1);
}
