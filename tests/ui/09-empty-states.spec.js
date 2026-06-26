import { test, expect } from '@playwright/test'

test.describe('Empty States', () => {
  test('Mock Test Results: coverage warning shown when attempted < 60', async ({ page }) => {
    await page.goto('/mock-test/results')
    // Static ATTEMPTED = 28 which is < 60 — coverage warning must appear
    await expect(page.locator('text=Low Coverage')).toBeVisible()
    await expect(page.locator('text=28 of 90')).toBeVisible()
  })

  test('Mock Test Results: coverage warning mentions unattempted = 0 marks', async ({ page }) => {
    await page.goto('/mock-test/results')
    await expect(page.locator('text=Unattempted questions score 0')).toBeVisible()
  })

  test('Mock Test Results: score is displayed as whole number', async ({ page }) => {
    await page.goto('/mock-test/results')
    // Score should be "67" not "67.0" or "66.7"
    const scoreText = await page.locator('p.text-6xl').textContent()
    expect(scoreText.trim()).toMatch(/^\d+$/)
  })

  test('Mock Test Results: refers to "mock test" not just "test" in improvement text', async ({ page }) => {
    await page.goto('/mock-test/results')
    await expect(page.locator('text=last mock test')).toBeVisible()
  })

  test('Mock Test Results: weakest section recommendation card is shown', async ({ page }) => {
    await page.goto('/mock-test/results')
    await expect(page.locator('text=Focus Next On')).toBeVisible()
  })

  test('Progress: Practice tab chart uses Week labels with dates (Mon 23 format)', async ({ page }) => {
    await page.goto('/progress')
    const svgContent = await page.locator('svg').first().textContent()
    // Should contain date-aware labels
    expect(svgContent).toMatch(/Mon \d{2}/)
  })

  test('Profile edit: streak helper text is visible', async ({ page }) => {
    await page.goto('/profile')
    await expect(page.locator('text=Practice questions count toward your streak')).toBeVisible()
  })
})
