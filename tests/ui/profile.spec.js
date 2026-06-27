import { test, expect } from '@playwright/test'

// ── View Mode ─────────────────────────────────────────────────────────────────

test.describe('Profile Screen — View Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/profile')
  })

  test('days to NAT test countdown is visible', async ({ page }) => {
    await expect(page.locator('text=days to your NAT test')).toBeVisible()
  })

  test('Edit Profile button is present', async ({ page }) => {
    await expect(page.locator('button:has-text("Edit Profile")')).toBeVisible()
  })

  test('Practice Stats are NOT on Profile — they belong on the Progress screen', async ({ page }) => {
    await expect(page.locator('text=Questions attempted')).not.toBeVisible()
    await expect(page.locator('text=Solutions viewed')).not.toBeVisible()
    await expect(page.locator('text=Topics covered')).not.toBeVisible()
    await expect(page.locator('text=Accuracy')).not.toBeVisible()
  })

  test('Mock Test Stats block is NOT on Profile — belongs on Progress screen', async ({ page }) => {
    await expect(page.locator('text=Mock Test Stats')).not.toBeVisible()
  })

  test('no Target University field — feature was dropped (PD-008)', async ({ page }) => {
    await expect(page.locator('text=Target university')).not.toBeVisible()
    await expect(page.locator('text=University')).not.toBeVisible()
  })

  test('streak calendar is visible with helper text', async ({ page }) => {
    await expect(page.locator('text=Streak').first()).toBeVisible()
    await expect(page.locator('text=Practice questions count toward your streak')).toBeVisible()
  })

  test('Goal Tracker section is visible', async ({ page }) => {
    await expect(page.locator('text=Goal Tracker')).toBeVisible()
  })

  test('NAT-I Category is shown in the test details section', async ({ page }) => {
    await expect(page.locator('text=Category')).toBeVisible()
  })
})

// ── Edit Mode ─────────────────────────────────────────────────────────────────

test.describe('Profile Screen — Edit Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/profile')
    await page.click('button:has-text("Edit Profile")')
  })

  test('"Editing" badge is visible when edit mode is active', async ({ page }) => {
    await expect(page.locator('text=Editing')).toBeVisible()
  })

  test('"Your Name" label is used — not "Full Name"', async ({ page }) => {
    await expect(page.locator('text=Your Name')).toBeVisible()
    await expect(page.locator('text=Full Name')).not.toBeVisible()
  })

  test('NAT-I Category is readonly — shows "Contact support to change your category"', async ({ page }) => {
    await expect(page.locator('text=Contact support to change your category')).toBeVisible()
    await expect(page.locator('select[name*="category"]')).not.toBeVisible()
  })

  test('no Target University field in edit mode', async ({ page }) => {
    await expect(page.locator('text=Target university')).not.toBeVisible()
    await expect(page.locator('text=University')).not.toBeVisible()
  })

  test('test date shows NTS preset radio options — no free-text date picker', async ({ page }) => {
    await expect(page.locator('text=July 12, 2026').first()).toBeVisible()
    await expect(page.locator('text=August 16, 2026').first()).toBeVisible()
    await expect(page.locator('input[type="date"]')).not.toBeVisible()
  })

  test('target score slider minimum is 50 — NAT-I passing mark', async ({ page }) => {
    const min = await page.locator('input[type="range"]').getAttribute('min')
    expect(min).toBe('50')
  })

  test('Cancel without any changes returns to view mode immediately — no dialog', async ({ page }) => {
    await page.click('button:has-text("Cancel")')
    await expect(page.locator('button:has-text("Edit Profile")')).toBeVisible()
  })

  test('modifying a field shows "You have unsaved changes" warning banner', async ({ page }) => {
    await page.fill('input[maxlength="50"]', 'New Name')
    await expect(page.locator('text=You have unsaved changes')).toBeVisible()
  })

  test('Cancel with unsaved changes shows Discard dialog', async ({ page }) => {
    await page.fill('input[maxlength="50"]', 'Changed Name')
    await page.click('button:has-text("Cancel")')
    await expect(page.locator('text=Discard changes?')).toBeVisible()
    await expect(page.locator('button:has-text("Keep Editing")')).toBeVisible()
    await expect(page.locator('button:has-text("Discard Changes")')).toBeVisible()
  })
})
