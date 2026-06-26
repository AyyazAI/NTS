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
    await page.locator('button:has-text("21")').click()
    await expect(submit).toBeEnabled()
  })

  test('Show Solution button is present', async ({ page }) => {
    await expect(page.locator('button:has-text("Show Solution")')).toBeVisible()
  })

  test('back arrow is hidden on Question 1', async ({ page }) => {
    const backBtn = page.locator('button:has-text("‹")')
    await expect(backBtn).not.toBeVisible()
  })

  test('canvas Draw and Type tabs are present (Phase 1)', async ({ page }) => {
    await expect(page.locator('button:has-text("✏️ Draw")')).toBeVisible()
    await expect(page.locator('button:has-text("⌨️ Type")')).toBeVisible()
  })

  test('Upload tab is NOT present in Phase 1', async ({ page }) => {
    await expect(page.locator('button:has-text("📷 Upload")')).not.toBeVisible()
  })

  test('canvas draw area is a real HTML5 canvas element', async ({ page }) => {
    await expect(page.locator('canvas')).toBeVisible()
  })

  test('flag icon is present on the question card', async ({ page }) => {
    await expect(page.locator('button[title="Flag this question"]')).toBeVisible()
  })

  test('correct answer routes to solution/correct screen', async ({ page }) => {
    // Option A is the correct answer in static data
    await page.locator('button:has-text("21")').click()
    await page.locator('button:has-text("Submit Answer")').click()
    await expect(page).toHaveURL(/\/solution\/correct/)
  })

  test('wrong answer routes to solution/wrong screen', async ({ page }) => {
    // Option B is wrong
    await page.locator('button:has-text("35")').click()
    await page.locator('button:has-text("Submit Answer")').click()
    await expect(page).toHaveURL(/\/solution\/wrong/)
  })
})
