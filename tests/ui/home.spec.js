import { test, expect } from '@playwright/test'

test.describe('Home — without saved profile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('TaleemiMarkaz logo and NTS Prep label are in the header', async ({ page }) => {
    await expect(page.locator('header').locator('text=Taleemi').first()).toBeVisible()
    await expect(page.locator('header').locator('text=NTS Prep')).toBeVisible()
  })

  test('generic greeting is shown when no student name in localStorage', async ({ page }) => {
    await expect(page.locator('text=Welcome! 👋')).toBeVisible()
  })

  test('Practice Mode and Mock Test toggle are present', async ({ page }) => {
    await expect(page.locator('button:has-text("📚 Practice Mode")')).toBeVisible()
    await expect(page.locator('button:has-text("⏱️ Mock Test")')).toBeVisible()
  })

  test('Practice Mode is default — 4 topic cards visible including Engineering (NAT-IE)', async ({ page }) => {
    await expect(page.locator('text=English')).toBeVisible()
    await expect(page.locator('text=Quantitative Reasoning').first()).toBeVisible()
    await expect(page.locator('text=Analytical Reasoning').first()).toBeVisible()
    await expect(page.locator('text=Engineering (NAT-IE)')).toBeVisible()
  })

  test('Analytical Reasoning is the full label — bare "Reasoning" is not a topic card', async ({ page }) => {
    await expect(page.locator('text=Analytical Reasoning').first()).toBeVisible()
    await expect(page.locator('p.font-bold:text-is("Reasoning")')).not.toBeVisible()
  })

  test('Engineering (NAT-IE) card shows "of 30 questions attempted" — not 20', async ({ page }) => {
    await expect(page.locator('text=of 30 questions attempted')).toBeVisible()
  })

  test('Mock Test mode hides topic cards and shows 90 MCQs full test CTA', async ({ page }) => {
    await page.click('button:has-text("⏱️ Mock Test")')
    await expect(page.locator('text=English')).not.toBeVisible()
    await expect(page.locator('text=90 MCQs · 120 min')).toBeVisible()
  })

  test('bottom nav has all 5 items', async ({ page }) => {
    const nav = page.locator('nav').last()
    await expect(nav.locator('text=Home')).toBeVisible()
    await expect(nav.locator('text=Practice')).toBeVisible()
    await expect(nav.locator('text=Mock')).toBeVisible()
    await expect(nav.locator('text=Progress')).toBeVisible()
    await expect(nav.locator('text=Profile')).toBeVisible()
  })
})

test.describe('Home — with saved student name', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('student_name', 'Fatima')
    })
    await page.goto('/')
  })

  test('personalised greeting includes student name from localStorage', async ({ page }) => {
    await expect(page.locator('text=Welcome, Fatima! 👋')).toBeVisible()
  })
})
