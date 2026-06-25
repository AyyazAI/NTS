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
    await expect(page.locator('button').filter({ hasText: 'English' }).first()).toBeVisible()
    await expect(page.locator('button').filter({ hasText: 'Quantitative Reasoning' }).first()).toBeVisible()
    await expect(page.locator('button').filter({ hasText: 'Reasoning' }).first()).toBeVisible()
    await expect(page.locator('button').filter({ hasText: 'Engineering' }).first()).toBeVisible()
  })

  test("Today's Focus block is removed — not visible", async ({ page }) => {
    await expect(page.locator("text=Today's Focus")).not.toBeVisible()
  })

  test('score trend chart is visible with pass mark reference', async ({ page }) => {
    await expect(page.locator('text=Score Trend')).toBeVisible()
    // SVG pass mark label
    await expect(page.locator('text=Pass').first()).toBeVisible()
  })

  test('topic accordion shows Start here button for weakest sub-topic', async ({ page }) => {
    // Open English accordion
    await page.locator('button').filter({ hasText: 'English' }).first().click()
    await expect(page.locator('button:has-text("Start here →")').first()).toBeVisible()
  })
})
