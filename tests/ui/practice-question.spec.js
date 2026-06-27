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

  test('scratch pad trigger button is visible below answer options', async ({ page }) => {
    await expect(page.locator('button:has-text("Open scratch pad")')).toBeVisible()
  })

  test('scratch pad overlay opens when trigger is tapped', async ({ page }) => {
    await page.locator('button:has-text("Open scratch pad")').click()
    await expect(page.locator('button:has-text("Done ✓")')).toBeVisible()
  })

  test('canvas Draw and Type tabs are present inside overlay (Phase 1)', async ({ page }) => {
    await page.locator('button:has-text("Open scratch pad")').click()
    await expect(page.locator('button:has-text("✏️ Draw")')).toBeVisible()
    await expect(page.locator('button:has-text("⌨️ Type")')).toBeVisible()
  })

  test('Upload tab is NOT present in Phase 1', async ({ page }) => {
    await expect(page.locator('button:has-text("📷 Upload")')).not.toBeVisible()
  })

  test('canvas draw area is a real HTML5 canvas element inside overlay', async ({ page }) => {
    await page.locator('button:has-text("Open scratch pad")').click()
    await expect(page.locator('canvas')).toBeVisible()
  })

  test('Done button closes the scratch pad overlay', async ({ page }) => {
    await page.locator('button:has-text("Open scratch pad")').click()
    await page.locator('button:has-text("Done ✓")').click()
    await expect(page.locator('button:has-text("Done ✓")')).not.toBeVisible()
  })

  test('flag icon is present on the question card', async ({ page }) => {
    await expect(page.locator('button[title="Flag this question"]')).toBeVisible()
  })

  test('flag icon has solid teal colour when unflagged — not near-invisible opacity', async ({ page }) => {
    const flagBtn = page.locator('button[title="Flag this question"]')
    await expect(flagBtn).toHaveClass(/text-teal-300/)
  })

  test('helper text "Select an answer above to submit" is visible when no answer selected', async ({ page }) => {
    await expect(page.locator('text=Select an answer above to submit')).toBeVisible()
  })

  test('helper text disappears after selecting an answer', async ({ page }) => {
    await page.locator('button:has-text("21")').click()
    await expect(page.locator('text=Select an answer above to submit')).not.toBeVisible()
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
