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

  test('scratch pad trigger button is visible below answer options', async ({ page }) => {
    await expect(page.locator('button:has-text("Open scratch pad")')).toBeVisible()
  })

  test('scratch pad overlay opens when trigger is tapped', async ({ page }) => {
    await page.locator('button:has-text("Open scratch pad")').click()
    await expect(page.locator('button:has-text("Done ✓")')).toBeVisible()
  })

  test('Done button closes the scratch pad overlay', async ({ page }) => {
    await page.locator('button:has-text("Open scratch pad")').click()
    await page.locator('button:has-text("Done ✓")').click()
    await expect(page.locator('button:has-text("Done ✓")')).not.toBeVisible()
  })

  test('Upload tab is NOT present in Phase 1', async ({ page }) => {
    await expect(page.locator('button:has-text("📷 Upload")')).not.toBeVisible()
  })

  test('flag icon is present on question card', async ({ page }) => {
    const flagBtn = page.locator('button[title="Flag this question"]')
    await expect(flagBtn).toBeVisible()
  })

  test('flag icon changes to amber when tapped', async ({ page }) => {
    const flagBtn = page.locator('button[title="Flag this question"]')
    await flagBtn.click()
    await expect(flagBtn).toHaveClass(/text-amber-500/)
  })

  test('canvas footer shows timer warning in mock mode', async ({ page }) => {
    await page.locator('button:has-text("Open scratch pad")').click()
    await expect(page.locator('text=Timer keeps running')).toBeVisible()
  })

  test('canvas footer does not show navigation saved message in mock mode', async ({ page }) => {
    await expect(page.locator('text=Your work is saved if you navigate away')).not.toBeVisible()
  })
})
