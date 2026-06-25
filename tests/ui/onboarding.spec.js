import { test, expect } from '@playwright/test'

async function goToStep2(page) {
  await page.goto('/onboarding')
  await page.fill('input[placeholder="Name"]', 'Hamza Ahmed')
  await page.fill('input[placeholder="03XX-XXXXXXX"]', '03123456789')
  await page.click('button:has-text("Continue →")')
  await expect(page.locator('text=Welcome aboard, Hamza Ahmed!')).toBeVisible()
}

// ── Step 1 ───────────────────────────────────────────────────────────────────

test.describe('Onboarding — Step 1', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/onboarding')
  })

  test('no skip link — onboarding is mandatory', async ({ page }) => {
    await expect(page.locator('text=Skip setup')).not.toBeVisible()
  })

  test('name field is mandatory — cannot continue without it', async ({ page }) => {
    await page.click('button:has-text("Continue →")')
    await expect(page.locator('text=Please enter your name')).toBeVisible()
    await expect(page.locator('text=Welcome to TaleemiMarkaz')).toBeVisible()
  })

  test('name field rejects numbers', async ({ page }) => {
    await page.fill('input[placeholder="Name"]', 'Hamza123')
    await page.locator('input[placeholder="Name"]').blur()
    await expect(page.locator('text=Name should only contain letters')).toBeVisible()
  })

  test('name field rejects special characters', async ({ page }) => {
    await page.fill('input[placeholder="Name"]', 'Hamza@#$')
    await page.locator('input[placeholder="Name"]').blur()
    await expect(page.locator('text=Name should only contain letters')).toBeVisible()
  })

  test('mobile and email contact choice buttons are present', async ({ page }) => {
    await expect(page.locator('button:has-text("Mobile number")')).toBeVisible()
    await expect(page.locator('button:has-text("Email")')).toBeVisible()
  })

  test('invalid mobile format shows inline error', async ({ page }) => {
    await page.fill('input[placeholder="Name"]', 'Hamza Ahmed')
    await page.fill('input[placeholder="03XX-XXXXXXX"]', '0123456')
    await page.click('button:has-text("Continue →")')
    await expect(page.locator('text=Enter a valid Pakistani mobile number')).toBeVisible()
  })

  test('valid name with no mobile proceeds to step 2', async ({ page }) => {
    await page.fill('input[placeholder="Name"]', 'Hamza Ahmed')
    await page.click('button:has-text("Continue →")')
    await expect(page.locator('text=Welcome aboard, Hamza Ahmed!')).toBeVisible()
  })
})

// ── Step 2 ───────────────────────────────────────────────────────────────────

test.describe('Onboarding — Step 2', () => {
  test.beforeEach(async ({ page }) => {
    await goToStep2(page)
  })

  test('heading shows welcome with entered name', async ({ page }) => {
    await expect(page.locator('text=Welcome aboard, Hamza Ahmed!')).toBeVisible()
  })

  test('all 6 NAT-I category pills are present', async ({ page }) => {
    await expect(page.locator('text=Engineering').first()).toBeVisible()
    await expect(page.locator('text=Medical').first()).toBeVisible()
    await expect(page.locator('text=Computer Science').first()).toBeVisible()
    await expect(page.locator('text=Commerce').first()).toBeVisible()
    await expect(page.locator('text=General Sciences').first()).toBeVisible()
    await expect(page.locator('text=Arts').first()).toBeVisible()
  })

  test('NTS preset test dates are shown as radio options (not a date picker)', async ({ page }) => {
    await expect(page.locator('text=15 Aug 2026')).toBeVisible()
    await expect(page.locator('text=12 Sep 2026')).toBeVisible()
    await expect(page.locator('text=10 Oct 2026')).toBeVisible()
    await expect(page.locator('text=14 Nov 2026')).toBeVisible()
  })

  test('no free text date picker input on step 2', async ({ page }) => {
    await expect(page.locator('input[type="date"]')).not.toBeVisible()
  })

  test('target score defaults to Yes with 60/90', async ({ page }) => {
    await expect(page.locator('text=I want to score 60/90')).toBeVisible()
  })

  test('target score slider minimum is 50', async ({ page }) => {
    const slider = page.locator('input[type="range"]')
    const min = await slider.getAttribute('min')
    expect(min).toBe('50')
  })

  test('target score slider step is 5', async ({ page }) => {
    const slider = page.locator('input[type="range"]')
    const step = await slider.getAttribute('step')
    expect(step).toBe('5')
  })

  test("Let's go button is disabled until category selected", async ({ page }) => {
    await expect(page.locator("button:has-text(\"Let's go! →\")")).toBeDisabled()
  })

  test("Let's go button is enabled after category selected", async ({ page }) => {
    await page.locator('text=Engineering').first().click()
    await expect(page.locator("button:has-text(\"Let's go! →\")")).toBeEnabled()
  })
})
