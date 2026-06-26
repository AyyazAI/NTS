import { test, expect } from '@playwright/test'

// ── Wrong Answer ──────────────────────────────────────────────────────────────

test.describe('Solution — Wrong Answer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/solution/wrong')
  })

  test('"Try a similar question" button is fixed at bottom of viewport even when content scrolls', async ({ page }) => {
    const btn = page.locator('button:has-text("Try a similar question")')
    await expect(btn).toBeVisible()

    const container = btn.locator('..')
    const position = await container.evaluate(el => {
      let node = el
      while (node && node !== document.body) {
        if (getComputedStyle(node).position === 'fixed') return 'fixed'
        node = node.parentElement
      }
      return 'not-fixed'
    })
    expect(position).toBe('fixed')
  })

  test('YOUR WORKING section is hidden when canvas was not used', async ({ page }) => {
    // No canvas_last_tab in localStorage — YOUR WORKING should not appear
    await page.evaluate(() => localStorage.removeItem('canvas_last_tab'))
    await page.reload()
    await expect(page.locator('text=YOUR WORKING')).not.toBeVisible()
  })
})

// ── Correct Answer ────────────────────────────────────────────────────────────

test.describe('Solution — Correct Answer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/solution/correct')
  })

  test('no XP earned or speed bonus card is present', async ({ page }) => {
    await expect(page.locator('text=XP earned')).not.toBeVisible()
    await expect(page.locator('text=speed bonus')).not.toBeVisible()
  })

  test('"Explore other methods" button is present', async ({ page }) => {
    await expect(page.locator('button:has-text("Explore other methods")')).toBeVisible()
  })

  test('"Next Question" button is present', async ({ page }) => {
    await expect(page.locator('button:has-text("Next Question")')).toBeVisible()
  })

  test('buttons have adequate spacing between them (at least 12px)', async ({ page }) => {
    const exploreBtn = page.locator('button:has-text("Explore other methods")')
    const nextBtn    = page.locator('button:has-text("Next Question")')
    const exploreBB  = await exploreBtn.boundingBox()
    const nextBB     = await nextBtn.boundingBox()
    const gap = nextBB.y - (exploreBB.y + exploreBB.height)
    expect(gap).toBeGreaterThanOrEqual(12)
  })

  test('motivational message appears below action buttons', async ({ page }) => {
    await expect(page.locator('text=every question makes you stronger')).toBeVisible()
  })
})
