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
    await expect(page.locator('text=Section')).toBeVisible()
  })

  test('score display is visible', async ({ page }) => {
    await expect(page.locator('text=Score')).toBeVisible()
  })

  test('no negative marking indicator — NAT-I has no negative marking', async ({ page }) => {
    await expect(page.locator('text=NEG')).not.toBeVisible()
  })

  test('Submit Test button is NOT in the persistent bottom bar', async ({ page }) => {
    const actionBar = page.locator('.fixed.bottom-20')
    await expect(actionBar.locator('button:has-text("Submit Test")')).not.toBeVisible()
  })

  test('flag icon is present on question card', async ({ page }) => {
    const flagBtn = page.locator('button[title="Flag this question"]')
    await expect(flagBtn).toBeVisible()
  })

  test('flag icon changes to amber when tapped', async ({ page }) => {
    const flagBtn = page.locator('button[title="Flag this question"]')
    await flagBtn.click()
    // After flagging, button should have amber styling
    await expect(flagBtn).toHaveClass(/text-amber-500/)
  })
})
