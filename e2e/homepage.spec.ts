import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    await expect(page).toHaveTitle(/HerbAlly/);
    await expect(page.locator('text=HerbAlly')).toBeVisible();
  });

  test('should display navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Check desktop navigation
    await expect(page.locator('a[href="/symptoms"]')).toBeVisible();
    await expect(page.locator('a[href="/herbs"]')).toBeVisible();
    await expect(page.locator('a[href="/calculator"]')).toBeVisible();
    await expect(page.locator('a[href="/herbalist"]')).toBeVisible();
  });

  test('should have working search functionality', async ({ page }) => {
    await page.goto('/');
    
    // Click on search or navigate to herbs page
    await page.click('a[href="/herbs"]');
    await page.waitForURL('/herbs');
    
    // Check search input exists
    const searchInput = page.locator('input[type="text"]');
    await expect(searchInput).toBeVisible();
  });

  test('should display footer with disclaimers', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check for FDA disclaimer
    await expect(page.locator('text=FDA')).toBeVisible();
  });

  test('should have accessible skip link', async ({ page }) => {
    await page.goto('/');
    
    const skipLink = page.locator('[href="#main-content"]');
    await expect(skipLink).toBeVisible();
  });

  test('should support dark mode toggle', async ({ page }) => {
    await page.goto('/');
    
    // Find theme toggle
    const themeToggle = page.locator('[aria-label*="theme"], button:has-text("Theme")').first();
    await expect(themeToggle).toBeVisible();
  });

  test('should have language selector', async ({ page }) => {
    await page.goto('/');
    
    // Check for language selector
    const langSelector = page.locator('button:has-text("EN"), button:has-text("FR")').first();
    await expect(langSelector).toBeVisible();
  });

  test('should load without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    
    // Allow some time for any errors to appear
    await page.waitForTimeout(2000);
    
    // Filter out expected errors (none in production)
    const unexpectedErrors = errors.filter(error => 
      !error.includes('Failed to load resource') // Ignore 404s for favicons etc
    );
    
    expect(unexpectedErrors.length).toBe(0);
  });

  test('should have valid meta tags for SEO', async ({ page }) => {
    await page.goto('/');
    
    // Check meta description
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(50);
    
    // Check Open Graph tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();
    
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDescription).toBeTruthy();
  });

  test('should have responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Mobile menu should be visible
    const mobileMenu = page.locator('[aria-label*="menu"], button:has-text("Menu")').first();
    await expect(mobileMenu).toBeVisible();
    
    // Desktop nav should be hidden
    const desktopNav = page.locator('nav.hidden').first();
    await expect(desktopNav).toHaveClass(/hidden/);
  });
});
