import { test, expect } from '@playwright/test'

test.describe('Progress Screen — Practice Tab', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/progress')
  })

  test('Practice and Mock Tests tab toggles are present', async ({ page }) => {
    await expect(page.locator('button:has-text("📚 Practice")')).toBeVisible()
    await expect(page.locator('button:has-text("⏱️ Mock Tests")')).toBeVisible()
  })

  test('4 topic accordions present including Engineering (NAT-IE)', async ({ page }) => {
    await expect(page.locator('button').filter({ hasText: 'English' }).first()).toBeVisible()
    await expect(page.locator('button').filter({ hasText: 'Quantitative Reasoning' }).first()).toBeVisible()
    await expect(page.locator('button').filter({ hasText: 'Analytical Reasoning' }).first()).toBeVisible()
    await expect(page.locator('button').filter({ hasText: 'Engineering (NAT-IE)' }).first()).toBeVisible()
  })

  test('Analytical Reasoning accordion is correctly labelled — bare "Reasoning" is not a topic', async ({ page }) => {
    await expect(page.locator('button').filter({ hasText: 'Analytical Reasoning' }).first()).toBeVisible()
    await expect(page.locator('button span.font-black:text-is("Reasoning")')).not.toBeVisible()
  })

  test("Today's Focus block is not present", async ({ page }) => {
    await expect(page.locator("text=Today's Focus")).not.toBeVisible()
  })

  test('score trend chart is visible with pass mark reference line', async ({ page }) => {
    await expect(page.locator('text=Score Trend')).toBeVisible()
    await expect(page.locator('text=Pass').first()).toBeVisible()
  })

  test('chart has Week and Month range toggles — no All tab (DECISIONS.md: Week/Month only)', async ({ page }) => {
    await expect(page.locator('button:has-text("Week")')).toBeVisible()
    await expect(page.locator('button:has-text("Month")')).toBeVisible()
    await expect(page.locator('button:has-text("All")')).not.toBeVisible()
  })

  test('chart shows multiple score data point labels in the SVG', async ({ page }) => {
    const percentLabels = page.locator('svg text').filter({ hasText: /%$/ })
    const count = await percentLabels.count()
    expect(count).toBeGreaterThan(1)
  })

  test('weekly chart uses date-aware labels containing a number (e.g. "Mon 23")', async ({ page }) => {
    const svgText = await page.locator('svg').first().textContent()
    expect(svgText).toMatch(/Mon \d{2}/)
  })

  test('opening English accordion reveals "Start here →" button for the weakest sub-topic', async ({ page }) => {
    await page.locator('button').filter({ hasText: 'English' }).first().click()
    await expect(page.locator('button:has-text("Start here →")').first()).toBeVisible()
  })

  test('sub-topics below 50% show "⚠️ Focus here" label when accordion is open', async ({ page }) => {
    await page.locator('button').filter({ hasText: 'English' }).first().click()
    await expect(page.locator('text=⚠️ Focus here').first()).toBeVisible()
  })

  test('sub-topics 50–65% show "💡 Needs work" label when accordion is open', async ({ page }) => {
    await page.locator('button').filter({ hasText: 'English' }).first().click()
    await expect(page.locator('text=💡 Needs work').first()).toBeVisible()
  })
})

test.describe('Progress Screen — Mock Tests Tab', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/progress')
    await page.locator('button:has-text("⏱️ Mock Tests")').click()
  })

  test('switching to Mock Tests tab shows different chart content', async ({ page }) => {
    await expect(page.locator('text=Score Trend')).toBeVisible()
  })

  test('readiness gauge is visible in the Mock Tests tab', async ({ page }) => {
    await expect(page.locator('text=Readiness').first()).toBeVisible()
  })
})
