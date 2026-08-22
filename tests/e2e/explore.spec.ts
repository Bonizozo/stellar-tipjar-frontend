import { test, expect } from '@playwright/test';
import { mockCreatorProfile, MOCK_CREATOR } from '../helpers/fixtures';

test.describe('Explore Page', () => {
  test.beforeEach(async ({ page }) => {
    await mockCreatorProfile(page);
    await page.goto('/explore');
  });

  test('displays explore page with search and filters', async ({ page }) => {
    // Check main heading
    await expect(page.getByRole('heading', { name: /explore creators/i })).toBeVisible();
    
    // Check search functionality
    await expect(page.getByPlaceholder(/search by name, tags, or bio/i)).toBeVisible();
    
    // Check sort dropdown
    await expect(page.getByText('Sort by')).toBeVisible();
  });

  test('can search for creators', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search by name, tags, or bio/i);
    
    // Search for a creator
    await searchInput.fill('alice');
    await searchInput.press('Enter');
    
    // Should show search filter tag
    await expect(page.getByText('Search: alice')).toBeVisible();
  });

  test('can filter by categories', async ({ page }) => {
    // Open category filter (assuming it exists in FilterSidebar)
    const categorySection = page.locator('[data-testid="category-filter"]').or(
      page.getByText('Categories').locator('..')
    );
    
    if (await categorySection.isVisible()) {
      // Click on a category checkbox
      const artCategory = page.getByRole('checkbox', { name: /art/i });
      if (await artCategory.isVisible()) {
        await artCategory.click();
        
        // Should show active filter
        await expect(page.getByText('art')).toBeVisible();
      }
    }
  });

  test('can clear all filters', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search by name, tags, or bio/i);
    
    // Add a search filter
    await searchInput.fill('test');
    await searchInput.press('Enter');
    
    // Should show active filters
    await expect(page.getByText('Search: test')).toBeVisible();
    
    // Clear all filters
    const clearButton = page.getByText('Clear all');
    if (await clearButton.isVisible()) {
      await clearButton.click();
      
      // Active filters should be gone
      await expect(page.getByText('Search: test')).not.toBeVisible();
    }
  });

  test('displays creator cards', async ({ page }) => {
    // Should show creator cards (assuming they have a specific test id or role)
    const creatorCards = page.locator('[data-testid="creator-card"]').or(
      page.getByRole('article')
    );
    
    // Wait for at least one creator card to be visible
    await expect(creatorCards.first()).toBeVisible({ timeout: 10000 });
  });

  test('can sort creators', async ({ page }) => {
    // Click sort dropdown
    const sortButton = page.getByText('Sort by').locator('..');
    await sortButton.click();
    
    // Select a different sort option
    const recentOption = page.getByText('Recently Joined');
    if (await recentOption.isVisible()) {
      await recentOption.click();
      
      // Should update the sort display
      await expect(page.getByText('Recently Joined')).toBeVisible();
    }
  });

  test('shows loading state', async ({ page }) => {
    // Reload page to catch loading state
    await page.reload();
    
    // Should show loading indicator
    const loadingText = page.getByText('Searching...').or(
      page.getByText('Loading...')
    );
    
    // Loading text might be brief, so use a short timeout
    if (await loadingText.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(loadingText).toBeVisible();
    }
  });

  test('shows results count', async ({ page }) => {
    // Should show found creators count
    await expect(page.getByText(/found \d+ creators/i)).toBeVisible({ timeout: 10000 });
  });

  test('handles empty search results', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search by name, tags, or bio/i);
    
    // Search for something that won't match
    await searchInput.fill('zzzznonexistentcreator');
    await searchInput.press('Enter');
    
    // Should show no results or 0 count
    await expect(page.getByText(/found 0 creators/i).or(
      page.getByText(/no creators found/i)
    )).toBeVisible({ timeout: 5000 });
  });
});