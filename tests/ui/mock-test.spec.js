import { test, expect } from '@playwright/test'

test.describe('Mock Test Question Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/mock-test/question')
  })

  test('NAT-I Mock Test amber pill is visible', async ({ page }) => {
    await expect(page.locator('text=⏱️ NAT-I Mock Test')).toBeVisible()
  })

  test('question counter shows X of 90 not X of 20', async ({ page }) => {
    await expect(page.locator('text=of 90')).toBeVisible()
  })

  test('timer starts at 120:00', async ({ page }) => {
    await expect(page.locator('text=120:00')).toBeVisible()
  })

  test('Show Solution button is NOT present in mock mode', async ({ page }) => {
    await expect(page.locator('button:has-text("Show Solution")')).not.toBeVisible()
  })

  test('section label is visible above the question card', async ({ page }) => {
    // Section label shows "Section 1: Verbal" for Q1-20
    await expect(page.locator('text=Section')).toBeVisible()
  })

  test('score display is visible', async ({ page }) => {
    await expect(page.locator('text=Score')).toBeVisible()
  })

  test('negative marking display is visible', async ({ page }) => {
    await expect(page.locator('text=NEG')).toBeVisible()
  })
})
