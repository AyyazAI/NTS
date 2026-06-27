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

  test('Show Solution navigates to /solution/wrong (dedicated page)', async ({ page }) => {
    await page.locator('button:has-text("Show Solution")').click()
    await expect(page).toHaveURL(/\/solution\/wrong/)
  })

  test('solution page shows Back to Practice button when accessed via Show Solution', async ({ page }) => {
    await page.locator('button:has-text("Show Solution")').click()
    await expect(page).toHaveURL(/\/solution\/wrong/)
    await expect(page.locator('button:has-text("← Back to Practice")')).toBeVisible()
  })

  test('back arrow is hidden on Question 1', async ({ page }) => {
    const backBtn = page.locator('button:has-text("‹")')
    await expect(backBtn).not.toBeVisible()
  })

  test('rough work box is always visible below answer options', async ({ page }) => {
    await expect(page.locator('[data-testid="rough-work-box"]')).toBeVisible()
  })

  test('double-clicking rough work box opens bottom-sheet modal', async ({ page }) => {
    await page.locator('[data-testid="rough-work-box"]').dblclick()
    await expect(page.locator('[data-testid="rough-work-modal"]')).toBeVisible()
  })

  test('canvas Draw and Type tabs are present inside rough work modal', async ({ page }) => {
    await page.locator('[data-testid="rough-work-box"]').dblclick()
    await expect(page.locator('button:has-text("✏️ Draw")')).toBeVisible()
    await expect(page.locator('button:has-text("⌨️ Type")')).toBeVisible()
  })

  test('Upload tab is NOT present in Phase 1', async ({ page }) => {
    await expect(page.locator('button:has-text("📷 Upload")')).not.toBeVisible()
  })

  test('canvas draw area is a real HTML5 canvas element inside modal', async ({ page }) => {
    await page.locator('[data-testid="rough-work-box"]').dblclick()
    await expect(page.locator('canvas')).toBeVisible()
  })

  test('Done button closes the rough work modal', async ({ page }) => {
    await page.locator('[data-testid="rough-work-box"]').dblclick()
    await expect(page.locator('[data-testid="rough-work-modal"]')).toBeVisible()
    await page.locator('[data-testid="rough-work-modal"] button:has-text("Done")').click()
    await expect(page.locator('[data-testid="rough-work-modal"]')).not.toBeVisible()
  })

  test('canvas drawing persists when rough work modal is closed and reopened', async ({ page }) => {
    await page.locator('[data-testid="rough-work-box"]').dblclick()
    await expect(page.locator('[data-testid="rough-work-modal"]')).toBeVisible()
    // Draw on canvas
    const canvas = page.locator('canvas')
    const box = await canvas.boundingBox()
    await page.mouse.move(box.x + 50, box.y + 50)
    await page.mouse.down()
    await page.mouse.move(box.x + 150, box.y + 100)
    await page.mouse.up()
    // Close modal
    await page.locator('[data-testid="rough-work-modal"] button:has-text("Done")').click()
    await expect(page.locator('[data-testid="rough-work-modal"]')).not.toBeVisible()
    // Preview box should now show canvas image
    const preview = page.locator('[data-testid="rough-work-box"] img')
    await expect(preview).toBeVisible()
    // Reopen — canvas should restore
    await page.locator('[data-testid="rough-work-box"]').dblclick()
    await expect(page.locator('canvas')).toBeVisible()
  })

  test('flag icon is present on the question card — unfilled by default', async ({ page }) => {
    const flagBtn = page.locator('button[title="Flag for later"]')
    await expect(flagBtn).toBeVisible()
  })

  test('flag icon changes to orange when tapped', async ({ page }) => {
    const flagBtn = page.locator('button[title="Flag for later"]')
    await flagBtn.click()
    const flaggedBtn = page.locator('button[title="Flagged"]')
    await expect(flaggedBtn).toHaveClass(/text-orange-500/)
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
