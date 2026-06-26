import { test, expect } from '@playwright/test'

test.describe('Section Naming Consistency', () => {
  test('Home: third section card says "Analytical Reasoning" not "Reasoning"', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Analytical Reasoning').first()).toBeVisible()
    await expect(page.locator('p.font-bold:text-is("Reasoning")')).not.toBeVisible()
  })

  test('Practice question screen: topic sub-tag does not say bare "Reasoning"', async ({ page }) => {
    await page.goto('/practice/question')
    // The topic pill/tag should say "Analytical Reasoning" not "Reasoning"
    await expect(page.locator('text=Analytical Reasoning').first()).toBeVisible()
  })

  test('Mock test question: Section 3 is labeled Quantitative Reasoning not Quantitative', async ({ page }) => {
    await page.goto('/mock-test/question')
    // The Quantitative tab label in the section navigation should say "Quantitative" (short form)
    // and the section info text should say "Quantitative Reasoning" when that section is active.
    // The key check: bare "Section 3: Quantitative" (without Reasoning) must NOT appear in the DOM.
    const allText = await page.locator('body').textContent()
    expect(allText).not.toContain('Section 3: Quantitative\n')
    expect(allText).not.toMatch(/Section 3: Quantitative[^R]/)
  })

  test('Progress screen: accordion uses "Analytical Reasoning" not "Reasoning"', async ({ page }) => {
    await page.goto('/progress')
    await expect(page.locator('button').filter({ hasText: 'Analytical Reasoning' }).first()).toBeVisible()
  })

  test('Mock Test Results: section breakdown uses "Quantitative Reasoning" not "Quantitative"', async ({ page }) => {
    await page.goto('/mock-test/results')
    await expect(page.locator('text=Quantitative Reasoning').first()).toBeVisible()
    // Bare "Quantitative" as a section name label should not appear on its own
    const allText = await page.locator('body').textContent()
    expect(allText).not.toMatch(/^Quantitative$/m)
  })
})
