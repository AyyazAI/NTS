import { test, expect } from '@playwright/test'

// ── Unified Solution page (/solution) ─────────────────────────────────────────

test.describe('Solution — Direct access', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/solution')
  })

  test('"Correct answer" label shown — no wrong/correct framing', async ({ page }) => {
    await expect(page.locator('text=Correct answer')).toBeVisible()
    await expect(page.locator('text=You got it wrong')).not.toBeVisible()
    await expect(page.locator('text=Not quite')).not.toBeVisible()
  })

  test('correct answer A (21) is displayed in a teal pill', async ({ page }) => {
    await expect(page.locator('span:has-text("21")').first()).toBeVisible()
  })

  test('"Three ways to see the solution" heading is present', async ({ page }) => {
    await expect(page.locator('text=Three ways to see the solution')).toBeVisible()
  })

  test('"← Back to Practice" button is always present', async ({ page }) => {
    await expect(page.locator('button:has-text("← Back to Practice")')).toBeVisible()
  })

  test('"Next Question →" button is always present', async ({ page }) => {
    await expect(page.locator('button:has-text("Next Question")')).toBeVisible()
  })

  test('"← Back to Practice" button is in a fixed bar — never scrolls away', async ({ page }) => {
    const btn = page.locator('button:has-text("← Back to Practice")')
    const position = await btn.evaluate(el => {
      let node = el
      while (node && node !== document.body) {
        if (getComputedStyle(node).position === 'fixed') return 'fixed'
        node = node.parentElement
      }
      return 'not-fixed'
    })
    expect(position).toBe('fixed')
  })

  test('YOUR WORKING section is hidden when canvas was not used (canvas_last_tab = null)', async ({ page }) => {
    await page.evaluate(() => localStorage.removeItem('canvas_last_tab'))
    await page.reload()
    await expect(page.locator('text=Your working')).not.toBeVisible()
  })

  test('YOUR WORKING section is shown when canvas draw tab was used', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('canvas_last_tab', 'draw')
    })
    await page.goto('/solution')
    await expect(page.locator('text=Your working')).toBeVisible()
  })
})

test.describe('Solution — accessed via Show Solution', () => {
  test('clicking Show Solution navigates to /solution and shows Back to Practice', async ({ page }) => {
    await page.goto('/practice/question')
    await page.locator('button:has-text("Show Solution")').click()
    await expect(page).toHaveURL(/\/solution/)
    await expect(page.locator('button:has-text("← Back to Practice")')).toBeVisible()
  })
})

test.describe('Solution — accessed via Submit Answer', () => {
  test('submitting any answer navigates to /solution', async ({ page }) => {
    await page.goto('/practice/question')
    await page.locator('button:has-text("21")').click()
    await page.locator('button:has-text("Submit Answer")').click()
    await expect(page).toHaveURL(/\/solution/)
  })

  test('submitting a wrong answer also routes to /solution — no wrong-answer page', async ({ page }) => {
    await page.goto('/practice/question')
    await page.locator('button:has-text("35")').click()
    await page.locator('button:has-text("Submit Answer")').click()
    await expect(page).toHaveURL(/\/solution/)
  })
})
