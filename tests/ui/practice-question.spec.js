import { test, expect } from '@playwright/test'

test.describe('Practice Question Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/practice/question')
  })

  // ── Mode and display ────────────────────────────────────────────────────────

  test('Practice Mode pill is visible', async ({ page }) => {
    await expect(page.locator('text=📚 Practice Mode')).toBeVisible()
  })

  test('question text is displayed in the question card', async ({ page }) => {
    await expect(page.locator('text=A committee of 5 people')).toBeVisible()
  })

  test('topic and sub-topic tag is shown', async ({ page }) => {
    await expect(page.locator('text=Analytical Reasoning').first()).toBeVisible()
    await expect(page.locator('text=Combinations').first()).toBeVisible()
  })

  test('4 answer options are displayed', async ({ page }) => {
    await expect(page.locator('button:has-text("21")')).toBeVisible()
    await expect(page.locator('button:has-text("35")')).toBeVisible()
    await expect(page.locator('button:has-text("42")')).toBeVisible()
    await expect(page.locator('button:has-text("15")')).toBeVisible()
  })

  // ── Answer selection behaviour ──────────────────────────────────────────────

  test('Submit Answer is disabled until an option is selected', async ({ page }) => {
    const submit = page.locator('button:has-text("Submit Answer")')
    await expect(submit).toBeDisabled()
    await page.locator('button:has-text("21")').click()
    await expect(submit).toBeEnabled()
  })

  test('"Select an answer above to submit" helper text is visible before selection', async ({ page }) => {
    await expect(page.locator('text=Select an answer above to submit')).toBeVisible()
  })

  test('helper text disappears after an option is selected', async ({ page }) => {
    await page.locator('button:has-text("21")').click()
    await expect(page.locator('text=Select an answer above to submit')).not.toBeVisible()
  })

  test('unselected answer option has bg-blue-100 background', async ({ page }) => {
    const optionBtn = page.locator('button:has-text("21")')
    await expect(optionBtn).toHaveClass(/bg-blue-100/)
  })

  test('selected answer option changes to bg-teal-600 background', async ({ page }) => {
    await page.locator('button:has-text("21")').click()
    await expect(page.locator('button:has-text("21")')).toHaveClass(/bg-teal-600/)
  })

  // ── Answer routing — both correct and wrong go to /solution ────────────────

  test('correct answer (A = 21) routes to /solution', async ({ page }) => {
    await page.locator('button:has-text("21")').click()
    await page.locator('button:has-text("Submit Answer")').click()
    await expect(page).toHaveURL(/\/solution/)
  })

  test('wrong answer (B = 35) routes to /solution', async ({ page }) => {
    await page.locator('button:has-text("35")').click()
    await page.locator('button:has-text("Submit Answer")').click()
    await expect(page).toHaveURL(/\/solution/)
  })

  // ── Navigation ──────────────────────────────────────────────────────────────

  test('back arrow (‹) is hidden on Question 1', async ({ page }) => {
    await expect(page.locator('button:has-text("‹")')).not.toBeVisible()
  })

  test('Show Solution button is present in practice mode', async ({ page }) => {
    await expect(page.locator('button:has-text("Show Solution")')).toBeVisible()
  })

  test('Show Solution navigates to /solution', async ({ page }) => {
    await page.locator('button:has-text("Show Solution")').click()
    await expect(page).toHaveURL(/\/solution/)
  })

  test('"← Back to Practice" shown on solution page when accessed via Show Solution', async ({ page }) => {
    await page.locator('button:has-text("Show Solution")').click()
    await expect(page).toHaveURL(/\/solution/)
    await expect(page.locator('button:has-text("← Back to Practice")')).toBeVisible()
  })

  // ── Flag ────────────────────────────────────────────────────────────────────

  test('flag icon is unfilled by default (title "Flag for later")', async ({ page }) => {
    await expect(page.locator('button[title="Flag for later"]')).toBeVisible()
  })

  test('flag icon changes to orange (title "Flagged") after clicking', async ({ page }) => {
    await page.locator('button[title="Flag for later"]').click()
    await expect(page.locator('button[title="Flagged"]')).toHaveClass(/text-orange-500/)
  })

  // ── Rough work (canvas) ─────────────────────────────────────────────────────

  test('rough work box is always visible below answer options', async ({ page }) => {
    await expect(page.locator('[data-testid="rough-work-box"]')).toBeVisible()
  })

  test('double-clicking rough work box opens the bottom-sheet modal', async ({ page }) => {
    await page.locator('[data-testid="rough-work-box"]').dblclick()
    await expect(page.locator('[data-testid="rough-work-modal"]')).toBeVisible()
  })

  test('Draw and Type tabs are present inside the rough work modal', async ({ page }) => {
    await page.locator('[data-testid="rough-work-box"]').dblclick()
    await expect(page.locator('button:has-text("✏️ Draw")')).toBeVisible()
    await expect(page.locator('button:has-text("⌨️ Type")')).toBeVisible()
  })

  test('Upload tab is absent in Phase 1 (PD-009)', async ({ page }) => {
    await page.locator('[data-testid="rough-work-box"]').dblclick()
    await expect(page.locator('button:has-text("📷 Upload")')).not.toBeVisible()
  })

  test('HTML5 canvas element is present inside the rough work modal', async ({ page }) => {
    await page.locator('[data-testid="rough-work-box"]').dblclick()
    await expect(page.locator('canvas')).toBeVisible()
  })

  test('Done button closes the rough work modal', async ({ page }) => {
    await page.locator('[data-testid="rough-work-box"]').dblclick()
    await page.locator('[data-testid="rough-work-modal"] button:has-text("Done")').click()
    await expect(page.locator('[data-testid="rough-work-modal"]')).not.toBeVisible()
  })

  test('canvas drawing persists — preview image appears in rough work box after Done', async ({ page }) => {
    await page.locator('[data-testid="rough-work-box"]').dblclick()
    const canvas = page.locator('canvas')
    const box = await canvas.boundingBox()
    await page.mouse.move(box.x + 50, box.y + 50)
    await page.mouse.down()
    await page.mouse.move(box.x + 150, box.y + 100)
    await page.mouse.up()
    await page.locator('[data-testid="rough-work-modal"] button:has-text("Done")').click()
    await expect(page.locator('[data-testid="rough-work-modal"]')).not.toBeVisible()
    await expect(page.locator('[data-testid="rough-work-box"] img')).toBeVisible()
  })
})
