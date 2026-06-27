import { test, expect } from '@playwright/test'

test.describe('Mock Test Question Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/mock-test/question')
  })

  test('NAT-I Mock Test amber pill is visible', async ({ page }) => {
    await expect(page.locator('text=⏱️ NAT-I Mock Test')).toBeVisible()
  })

  test('question counter shows section position and global total', async ({ page }) => {
    await expect(page.locator('text=of 90')).toBeVisible()
    // Should show section-local Q number / section total format
    const allText = await page.locator('body').textContent()
    expect(allText).toMatch(/Q\d+ \/ \d+/)
  })

  test('timer starts at 120:00', async ({ page }) => {
    await expect(page.locator('text=120:00')).toBeVisible()
  })

  test('Show Solution button is NOT present in mock mode', async ({ page }) => {
    await expect(page.locator('button:has-text("Show Solution")')).not.toBeVisible()
  })

  test('section label is visible above the question card', async ({ page }) => {
    await expect(page.locator('text=Section')).toBeVisible()
  })

  test('score display shows whole number — no decimals', async ({ page }) => {
    // Score label should be an integer score like "18 / 90" not "18.5 / 90"
    const scoreText = await page.locator('text=Score').locator('..').textContent()
    expect(scoreText).toMatch(/\d+ \/ \d+/)
    expect(scoreText).not.toMatch(/\d+\.\d+/)
  })

  test('no negative marking indicator — NAT-I has no negative marking', async ({ page }) => {
    await expect(page.locator('text=NEG')).not.toBeVisible()
    await expect(page.locator('text=-0.25')).not.toBeVisible()
  })

  test('Submit Test button is NOT in the persistent bottom bar', async ({ page }) => {
    const actionBar = page.locator('.fixed.bottom-20')
    await expect(actionBar.locator('button:has-text("Submit Test")')).not.toBeVisible()
  })

  test('rough work box is visible below answer options', async ({ page }) => {
    await expect(page.locator('[data-testid="rough-work-box"]')).toBeVisible()
  })

  test('double-clicking rough work box opens bottom-sheet modal', async ({ page }) => {
    await page.locator('[data-testid="rough-work-box"]').dblclick()
    await expect(page.locator('[data-testid="rough-work-modal"]')).toBeVisible()
  })

  test('Done button closes the rough work modal', async ({ page }) => {
    await page.locator('[data-testid="rough-work-box"]').dblclick()
    await expect(page.locator('[data-testid="rough-work-modal"]')).toBeVisible()
    await page.locator('[data-testid="rough-work-modal"] button:has-text("Done")').click()
    await expect(page.locator('[data-testid="rough-work-modal"]')).not.toBeVisible()
  })

  test('Upload tab is NOT present in Phase 1', async ({ page }) => {
    await expect(page.locator('button:has-text("📷 Upload")')).not.toBeVisible()
  })

  test('flag icon is present on question card — unfilled by default', async ({ page }) => {
    const flagBtn = page.locator('button[title="Flag for later"]')
    await expect(flagBtn).toBeVisible()
  })

  test('flag icon changes to orange when tapped', async ({ page }) => {
    const flagBtn = page.locator('button[title="Flag for later"]')
    await flagBtn.click()
    const flaggedBtn = page.locator('button[title="Flagged"]')
    await expect(flaggedBtn).toHaveClass(/text-orange-500/)
  })

  test('timer warning visible inside rough work modal in mock mode', async ({ page }) => {
    await page.locator('[data-testid="rough-work-box"]').dblclick()
    await expect(page.locator('[data-testid="rough-work-modal"]')).toBeVisible()
    await expect(page.locator('text=Timer keeps running')).toBeVisible()
  })
})
