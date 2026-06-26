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

  test('Practice Mode and Mock Test toggle are present', async ({ page }) => {
    await expect(page.locator('button:has-text("📚 Practice Mode")')).toBeVisible()
    await expect(page.locator('button:has-text("⏱️ Mock Test")')).toBeVisible()
  })

  test('Practice Mode shows 4 topic cards including Engineering (NAT-IE)', async ({ page }) => {
    await expect(page.locator('text=English')).toBeVisible()
    await expect(page.locator('text=Quantitative Reasoning').first()).toBeVisible()
    await expect(page.locator('text=Analytical Reasoning').first()).toBeVisible()
    await expect(page.locator('text=Engineering (NAT-IE)')).toBeVisible()
  })

  test('Analytical Reasoning card is present — not just "Reasoning"', async ({ page }) => {
    await expect(page.locator('text=Analytical Reasoning').first()).toBeVisible()
    // Bare "Reasoning" heading should not appear as a standalone topic card
    await expect(page.locator('p.font-bold:text-is("Reasoning")')).not.toBeVisible()
  })

  test('Engineering card shows X of 30 not X of 20', async ({ page }) => {
    await expect(page.locator('text=of 30 questions attempted')).toBeVisible()
  })

  test('attempted count is never higher than section total', async ({ page }) => {
    // All "X of Y" progress labels should have X <= Y
    const labels = page.locator('text=/\\d+ of \\d+ questions attempted/')
    const count  = await labels.count()
    for (let i = 0; i < count; i++) {
      const txt = await labels.nth(i).textContent()
      const [attempted, total] = txt.match(/(\d+) of (\d+)/).slice(1).map(Number)
      expect(attempted).toBeLessThanOrEqual(total)
    }
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
