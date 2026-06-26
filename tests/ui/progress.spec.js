import { test, expect } from '@playwright/test'

test.describe('Progress Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/progress')
  })

  test('Practice and Mock Tests toggle are present', async ({ page }) => {
    await expect(page.locator('button:has-text("📚 Practice")')).toBeVisible()
    await expect(page.locator('button:has-text("⏱️ Mock Tests")')).toBeVisible()
  })

  test('4 topic sections are present including Engineering (NAT-IE)', async ({ page }) => {
    await expect(page.locator('button').filter({ hasText: 'English' }).first()).toBeVisible()
    await expect(page.locator('button').filter({ hasText: 'Quantitative Reasoning' }).first()).toBeVisible()
    await expect(page.locator('button').filter({ hasText: 'Analytical Reasoning' }).first()).toBeVisible()
    await expect(page.locator('button').filter({ hasText: 'Engineering (NAT-IE)' }).first()).toBeVisible()
  })

  test('subject accordion shows full category label with ID — Engineering (NAT-IE)', async ({ page }) => {
    await expect(page.locator('button').filter({ hasText: 'Engineering (NAT-IE)' }).first()).toBeVisible()
  })

  test('Analytical Reasoning accordion is labeled correctly — not just "Reasoning"', async ({ page }) => {
    await expect(page.locator('button').filter({ hasText: 'Analytical Reasoning' }).first()).toBeVisible()
    // Bare "Reasoning" as a full topic name should not appear
    const bare = page.locator('button span.font-black:text-is("Reasoning")')
    await expect(bare).not.toBeVisible()
  })

  test("Today's Focus block is removed — not visible", async ({ page }) => {
    await expect(page.locator("text=Today's Focus")).not.toBeVisible()
  })

  test('score trend chart is visible with pass mark reference', async ({ page }) => {
    await expect(page.locator('text=Score Trend')).toBeVisible()
    await expect(page.locator('text=Pass').first()).toBeVisible()
  })

  test('chart shows all data point labels — not just last point', async ({ page }) => {
    // The SVG should have multiple score % labels, not just one
    const percentLabels = page.locator('svg text').filter({ hasText: /%$/ })
    const count = await percentLabels.count()
    expect(count).toBeGreaterThan(1)
  })

  test('weekly chart uses date-aware labels (e.g. Mon 23) not bare day names', async ({ page }) => {
    // Week labels should contain a number after the day name
    const svgText = await page.locator('svg').first().textContent()
    expect(svgText).toMatch(/Mon \d{2}/)
  })

  test('topic accordion shows Start here button for weakest sub-topic only', async ({ page }) => {
    await page.locator('button').filter({ hasText: 'English' }).first().click()
    await expect(page.locator('button:has-text("Start here →")').first()).toBeVisible()
  })

  test('sub-topics below 50% show "Focus here" label', async ({ page }) => {
    // Open English (Comprehension at 48% should trigger Focus here)
    await page.locator('button').filter({ hasText: 'English' }).first().click()
    await expect(page.locator('text=⚠️ Focus here').first()).toBeVisible()
  })

  test('sub-topics 50-65% show "Needs work" label', async ({ page }) => {
    await page.locator('button').filter({ hasText: 'English' }).first().click()
    await expect(page.locator('text=💡 Needs work').first()).toBeVisible()
  })
})
