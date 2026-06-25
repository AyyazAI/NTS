import { test, expect } from '@playwright/test'

test.describe('Practice Question Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/practice/question')
  })

  test('Practice Mode pill is visible', async ({ page }) => {
    await expect(page.locator('text=📚 Practice Mode')).toBeVisible()
  })

  test('Submit Answer is greyed out until an option is selected', async ({ page }) => {
    const submit = page.locator('button:has-text("Submit Answer")')
    await expect(submit).toBeDisabled()
    // Select an option then button should activate
    await page.locator('button:has-text("21")').click()
    await expect(submit).toBeEnabled()
  })

  test('Show Solution button is present', async ({ page }) => {
    await expect(page.locator('button:has-text("Show Solution")')).toBeVisible()
  })

  test('back arrow is hidden on Question 1 (Q1 shows placeholder, not button)', async ({ page }) => {
    // Static page is Q4 — back arrow IS rendered because isFirst = false.
    // This test documents the intended Q1 behaviour: the ‹ button should not exist.
    // On Q4 the selector finds the button, so this intentionally fails to surface the gap.
    const backBtn = page.locator('button:has-text("‹")')
    await expect(backBtn).not.toBeVisible()
  })

  test('canvas tabs Draw, Type and Upload are all present', async ({ page }) => {
    await expect(page.locator('button:has-text("✏️ Draw")')).toBeVisible()
    await expect(page.locator('button:has-text("⌨️ Type")')).toBeVisible()
    await expect(page.locator('button:has-text("📷 Upload")')).toBeVisible()
  })

  test('flag icon is present on the question card', async ({ page }) => {
    await expect(page.locator('button[title="Flag this question"]')).toBeVisible()
  })
})
