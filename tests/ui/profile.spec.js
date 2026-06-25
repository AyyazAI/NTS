import { test, expect } from '@playwright/test'

test.describe('Profile Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/profile')
  })

  test('days to NAT-I countdown is visible', async ({ page }) => {
    await expect(page.locator('text=days to NAT-I')).toBeVisible()
  })

  test('Edit Profile button is present', async ({ page }) => {
    await expect(page.locator('button:has-text("Edit Profile")')).toBeVisible()
  })

  test('no "Questions attempted / Solutions viewed / Topics covered / Accuracy" stats block', async ({ page }) => {
    await expect(page.locator('text=Questions attempted')).not.toBeVisible()
    await expect(page.locator('text=Solutions viewed')).not.toBeVisible()
    await expect(page.locator('text=Topics covered')).not.toBeVisible()
    await expect(page.locator('text=Accuracy')).not.toBeVisible()
  })

  test('no Mock Test Stats block', async ({ page }) => {
    await expect(page.locator('text=Mock Test Stats')).not.toBeVisible()
  })
})
