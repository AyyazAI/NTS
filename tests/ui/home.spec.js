import { test, expect } from '@playwright/test'

test.describe('Home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('TaleemiMarkaz logo is visible', async ({ page }) => {
    await expect(page.locator('header').locator('text=Taleemi').first()).toBeVisible()
    await expect(page.locator('header').locator('text=Markaz').first()).toBeVisible()
  })

  test('NTS Prep label is visible in header', async ({ page }) => {
    await expect(page.locator('header').locator('text=NTS Prep')).toBeVisible()
  })

  test('greeting says Welcome not Assalam-o-Alaikum', async ({ page }) => {
    await expect(page.locator('text=Welcome')).toBeVisible()
    await expect(page.locator('text=Assalam-o-Alaikum')).not.toBeVisible()
  })

  test('practice prompt text is visible', async ({ page }) => {
    await expect(page.locator('text=Ready to practice')).toBeVisible()
  })

  test('Practice Mode and Mock Test toggle are present', async ({ page }) => {
    await expect(page.locator('button:has-text("📚 Practice Mode")')).toBeVisible()
    await expect(page.locator('button:has-text("⏱️ Mock Test")')).toBeVisible()
  })

  test('Practice Mode shows 4 topic cards including Engineering (NAT-IE)', async ({ page }) => {
    await expect(page.locator('text=English')).toBeVisible()
    await expect(page.locator('text=Quantitative Reasoning')).toBeVisible()
    await expect(page.locator('p.font-bold:text-is("Reasoning")')).toBeVisible()
    await expect(page.locator('text=Engineering (NAT-IE)')).toBeVisible()
  })

  test('Engineering card shows X of 30 not X of 20', async ({ page }) => {
    await expect(page.locator('text=of 30 questions attempted')).toBeVisible()
  })

  test('Mock Test mode hides topic cards and shows 90 MCQs CTA', async ({ page }) => {
    await page.click('button:has-text("⏱️ Mock Test")')
    await expect(page.locator('text=English')).not.toBeVisible()
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
