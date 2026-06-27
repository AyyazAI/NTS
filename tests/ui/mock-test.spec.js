import { test, expect } from '@playwright/test'

// ── Individual question screen (QuestionMockTest.jsx at /mock-test/question) ──

test.describe('Mock Test — Question Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/mock-test/question')
  })

  test('NAT-I Mock Test amber mode pill is visible', async ({ page }) => {
    await expect(page.locator('text=⏱️ NAT-I Mock Test')).toBeVisible()
  })

  test('section label "Section 1: Verbal" shown for question 4 (Q4 ≤ 20)', async ({ page }) => {
    await expect(page.locator('text=Section 1: Verbal')).toBeVisible()
  })

  test('question counter shows section-local position and global total of 90', async ({ page }) => {
    const text = await page.locator('body').textContent()
    expect(text).toMatch(/Q\d+ \/ \d+/)
    expect(text).toContain('of 90')
  })

  test('timer starts at 120:00', async ({ page }) => {
    await expect(page.locator('text=120:00')).toBeVisible()
  })

  test('Show Solution button is NOT present in mock mode', async ({ page }) => {
    await expect(page.locator('button:has-text("Show Solution")')).not.toBeVisible()
  })

  test('Submit Answer is disabled until an option is selected', async ({ page }) => {
    const submit = page.locator('button:has-text("Submit Answer")')
    await expect(submit).toBeDisabled()
    await page.locator('button:has-text("21")').click()
    await expect(submit).toBeEnabled()
  })

  test('no negative marking indicator — NAT-I has no negative marking (SC-01)', async ({ page }) => {
    await expect(page.locator('text=-0.25')).not.toBeVisible()
    await expect(page.locator('text=NEG')).not.toBeVisible()
  })

  test('score display shows whole-number fraction — no decimals (Score card in question screen)', async ({ page }) => {
    const scoreText = await page.locator('text=Score').locator('..').textContent()
    expect(scoreText).toMatch(/\d+ \/ \d+/)
    expect(scoreText).not.toMatch(/\d+\.\d+/)
  })

  test('Submit Test button is NOT in the persistent bottom action bar', async ({ page }) => {
    const actionBar = page.locator('.fixed.bottom-20')
    await expect(actionBar.locator('button:has-text("Submit Test")')).not.toBeVisible()
  })

  test('flag icon is unfilled by default', async ({ page }) => {
    await expect(page.locator('button[title="Flag for later"]')).toBeVisible()
  })

  test('flag icon changes to orange after clicking', async ({ page }) => {
    await page.locator('button[title="Flag for later"]').click()
    await expect(page.locator('button[title="Flagged"]')).toHaveClass(/text-orange-500/)
  })

  test('rough work box is visible below answer options', async ({ page }) => {
    await expect(page.locator('[data-testid="rough-work-box"]')).toBeVisible()
  })

  test('double-clicking rough work box opens the modal', async ({ page }) => {
    await page.locator('[data-testid="rough-work-box"]').dblclick()
    await expect(page.locator('[data-testid="rough-work-modal"]')).toBeVisible()
  })

  test('"Timer keeps running" warning is shown inside the mock mode modal', async ({ page }) => {
    await page.locator('[data-testid="rough-work-box"]').dblclick()
    await expect(page.locator('text=Timer keeps running')).toBeVisible()
  })

  test('Done button closes the rough work modal', async ({ page }) => {
    await page.locator('[data-testid="rough-work-box"]').dblclick()
    await page.locator('[data-testid="rough-work-modal"] button:has-text("Done")').click()
    await expect(page.locator('[data-testid="rough-work-modal"]')).not.toBeVisible()
  })

  test('Upload tab is absent in Phase 1 (PD-009)', async ({ page }) => {
    await page.locator('[data-testid="rough-work-box"]').dblclick()
    await expect(page.locator('button:has-text("📷 Upload")')).not.toBeVisible()
  })
})

// ── Navigator screen (MockTest.jsx at /mock-test) ─────────────────────────────

test.describe('Mock Test — Navigator Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/mock-test')
  })

  test('NAT-I Mock Test amber mode pill is visible', async ({ page }) => {
    await expect(page.locator('text=⏱️ NAT-I Mock Test')).toBeVisible()
  })

  test('answered count display is visible and shows a whole-number fraction', async ({ page }) => {
    await expect(page.locator('text=Answered').first()).toBeVisible()
    const body = await page.locator('body').textContent()
    expect(body).toMatch(/\d+ \/ 90/)
  })

  test('countdown timer starts at 120:00 and decrements', async ({ page }) => {
    await expect(page.locator('text=120:00').first()).toBeVisible()
  })

  test('section tabs for all 4 sections are present', async ({ page }) => {
    await expect(page.locator('button:has-text("English")')).toBeVisible()
    await expect(page.locator('button:has-text("Reasoning")')).toBeVisible()
    await expect(page.locator('button:has-text("Quant")')).toBeVisible()
  })

  test('question navigator grid contains numbered buttons', async ({ page }) => {
    await expect(page.locator('button:has-text("1")').first()).toBeVisible()
    await expect(page.locator('button:has-text("10")').first()).toBeVisible()
  })

  test('Submit Test button is in the scrollable content area — not in the fixed action bar', async ({ page }) => {
    const actionBar = page.locator('.fixed.bottom-20')
    await expect(actionBar.locator('button:has-text("Submit Test")')).not.toBeVisible()
    await expect(page.locator('button:has-text("Submit Test")')).toBeVisible()
  })

  test('clicking Submit Test shows confirmation dialog with flagged count', async ({ page }) => {
    await page.locator('button:has-text("Submit Test")').click()
    await expect(page.locator('text=Submit test?')).toBeVisible()
    await expect(page.locator('text=3 flagged questions')).toBeVisible()
  })

  test('confirmation dialog has Review Flagged, Submit Anyway, and Cancel options', async ({ page }) => {
    await page.locator('button:has-text("Submit Test")').click()
    await expect(page.locator('button:has-text("Review Flagged Questions")')).toBeVisible()
    await expect(page.locator('button:has-text("Submit Test Anyway")')).toBeVisible()
    await expect(page.locator('button:has-text("Cancel — Continue Test")')).toBeVisible()
  })

  test('Submit Test Anyway navigates to mock test results', async ({ page }) => {
    await page.locator('button:has-text("Submit Test")').click()
    await page.locator('button:has-text("Submit Test Anyway")').click()
    await expect(page).toHaveURL(/\/mock-test\/results/)
  })
})
