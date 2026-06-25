import { test, expect } from '@playwright/test'

test.describe('Progress Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/progress')
  })

  test('Practice and Mock Tests toggle are present', async ({ page }) => {
    await expect(page.locator('button:has-text("📚 Practice")')).toBeVisible()
    await expect(page.locator('button:has-text("⏱️ Mock Tests")')).toBeVisible()
  })

  test('4 topic sections are present including Engineering', async ({ page }) => {
    // Accordion headers: font-black spans inside buttons — use first() to avoid strict-mode issues
    await expect(page.locator('button').filter({ hasText: 'English' }).first()).toBeVisible()
    await expect(page.locator('button').filter({ hasText: 'Math' }).first()).toBeVisible()
    await expect(page.locator('button').filter({ hasText: 'Reasoning' }).first()).toBeVisible()
    await expect(page.locator('button').filter({ hasText: 'Engineering' }).first()).toBeVisible()
  })

  test("Today's Focus shows a maximum of 3 items", async ({ page }) => {
    const focusSection = page.locator('text=Today\'s Focus').locator('..')
    // Count the Start → buttons — one per focus item
    const startButtons = focusSection.locator('button:has-text("Start →")')
    const count = await startButtons.count()
    expect(count).toBeLessThanOrEqual(3)
  })
})
