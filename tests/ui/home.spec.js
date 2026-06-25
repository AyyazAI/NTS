import { test, expect } from '@playwright/test'

test.describe('Home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('TaleemiMarkaz logo is visible', async ({ page }) => {
    // "Taleemi" and "Markaz" render as separate spans in the header
    await expect(page.locator('header').locator('text=Taleemi').first()).toBeVisible()
    await expect(page.locator('header').locator('text=Markaz').first()).toBeVisible()
  })

  test('NTS Prep label is visible in header', async ({ page }) => {
    await expect(page.locator('header').locator('text=NTS Prep')).toBeVisible()
  })

  test('greeting message is visible', async ({ page }) => {
    await expect(page.locator('text=Assalam-o-Alaikum')).toBeVisible()
  })

  test('daily goal card is visible', async ({ page }) => {
    await expect(page.locator('text=Practice 20 questions today')).toBeVisible()
  })

  test('Practice Mode and Mock Test toggle are present', async ({ page }) => {
    await expect(page.locator('button:has-text("📚 Practice Mode")')).toBeVisible()
    await expect(page.locator('button:has-text("⏱️ Mock Test")')).toBeVisible()
  })

  test('Practice Mode shows 4 topic cards including Engineering (NAT-IE)', async ({ page }) => {
    // Practice Mode is selected by default
    await expect(page.locator('text=English')).toBeVisible()
    await expect(page.locator('text=Math')).toBeVisible()
    await expect(page.locator('text=Reasoning')).toBeVisible()
    await expect(page.locator('text=Engineering (NAT-IE)')).toBeVisible()
  })

  test('Engineering card shows X of 30 not X of 20', async ({ page }) => {
    // The subject topic card has total: 30
    await expect(page.locator('text=of 30 questions attempted')).toBeVisible()
  })

  test('Mock Test mode hides topic cards and shows 90 MCQs CTA', async ({ page }) => {
    await page.click('button:has-text("⏱️ Mock Test")')
    // Topic cards should be gone
    await expect(page.locator('text=English')).not.toBeVisible()
    // CTA should appear
    await expect(page.locator('text=90 MCQs · 120 min')).toBeVisible()
  })

  test('bottom nav has all 5 items', async ({ page }) => {
    const nav = page.locator('nav').last()
    await expect(nav.locator('text=Home')).toBeVisible()
    await expect(nav.locator('text=Practice')).toBeVisible()
    await expect(nav.locator('text=Mock')).toBeVisible()
    await expect(nav.locator('text=Progress')).toBeVisible()
    await expect(nav.locator('text=Profile')).toBeVisible()
  })
})
