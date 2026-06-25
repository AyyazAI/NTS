import { test, expect } from '@playwright/test'

// ── helpers ──────────────────────────────────────────────────────────────────

async function goToStep2(page) {
  await page.goto('/onboarding')
  await page.fill('input[placeholder="Full name"]', 'Hamza Ahmed')
  await page.fill('input[placeholder="03XX-XXXXXXX"]', '03123456789')
  await page.click('button:has-text("Continue →")')
  await expect(page.locator('text=Set your goals')).toBeVisible()
}

// ── Step 1 ───────────────────────────────────────────────────────────────────

test.describe('Onboarding — Step 1', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/onboarding')
  })

  test('name field is mandatory — cannot continue without it', async ({ page }) => {
    // Fill mobile only, leave name empty — should stay on step 1
    await page.fill('input[placeholder="03XX-XXXXXXX"]', '03123456789')
    await page.click('button:has-text("Continue →")')
    await expect(page.locator('text=Welcome to TaleemiMarkaz')).toBeVisible()
  })

  test('mobile field is mandatory — cannot continue without it', async ({ page }) => {
    await page.fill('input[placeholder="Full name"]', 'Hamza Ahmed')
    await page.click('button:has-text("Continue →")')
    await expect(page.locator('text=Enter a valid Pakistani mobile number')).toBeVisible()
  })

  test('invalid mobile format shows inline error', async ({ page }) => {
    await page.fill('input[placeholder="Full name"]', 'Hamza Ahmed')
    await page.fill('input[placeholder="03XX-XXXXXXX"]', '0123456')
    await page.click('button:has-text("Continue →")')
    await expect(page.locator('text=Enter a valid Pakistani mobile number')).toBeVisible()
  })

  test('skip link is present and navigates to home', async ({ page }) => {
    const skip = page.locator('text=Skip setup — take me to practice →')
    await expect(skip).toBeVisible()
    await skip.click()
    await expect(page).toHaveURL('/')
  })
})

// ── Step 2 ───────────────────────────────────────────────────────────────────

test.describe('Onboarding — Step 2', () => {
  test.beforeEach(async ({ page }) => {
    await goToStep2(page)
  })

  test('all 6 NAT-I category cards are present', async ({ page }) => {
    await expect(page.locator('text=Engineering')).toBeVisible()
    await expect(page.locator('text=Medical')).toBeVisible()
    await expect(page.locator('text=Computer Science')).toBeVisible()
    await expect(page.locator('text=Commerce')).toBeVisible()
    await expect(page.locator('text=General Sciences')).toBeVisible()
    await expect(page.locator('text=Arts')).toBeVisible()
  })

  test("Let's go button is disabled until category selected", async ({ page }) => {
    await expect(page.locator("button:has-text(\"Let's go! →\")")).toBeDisabled()
  })

  test("Let's go button is enabled after category selected", async ({ page }) => {
    await page.locator('text=Engineering').first().click()
    await expect(page.locator("button:has-text(\"Let's go! →\")")).toBeEnabled()
  })

  test('test date: past dates rejected — min attribute equals today', async ({ page }) => {
    await page.locator('button:has-text("Yes")').first().click()
    const dateInput = page.locator('input[type="date"]')
    const min = await dateInput.getAttribute('min')
    const today = new Date().toISOString().split('T')[0]
    expect(min).toBe(today)
  })

  test('test date: dates more than 1 year ahead rejected — max attribute set', async ({ page }) => {
    await page.locator('button:has-text("Yes")').first().click()
    const dateInput = page.locator('input[type="date"]')
    const max = await dateInput.getAttribute('max')
    // max should be set to prevent dates beyond 1 year from now
    expect(max).not.toBeNull()
  })

  test('test date: invalid date like 30 Feb is not accepted by date input', async ({ page }) => {
    await page.locator('button:has-text("Yes")').first().click()
    const dateInput = page.locator('input[type="date"]')
    // Browser normalises invalid dates — 2026-02-30 becomes empty or corrected
    await dateInput.fill('2026-02-30')
    const val = await dateInput.inputValue()
    expect(val).not.toBe('2026-02-30')
  })

  test('target score slider minimum is 50 not 40', async ({ page }) => {
    await page.locator('button:has-text("Yes")').nth(1).click()
    const slider = page.locator('input[type="range"]')
    const min = await slider.getAttribute('min')
    expect(min).toBe('50')
  })
})
