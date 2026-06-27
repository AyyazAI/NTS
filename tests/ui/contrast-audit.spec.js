import { test, expect } from '@playwright/test'

// GOV-RULE-012: No light gray text on white/light backgrounds.
// This test visits every route and flags text elements that have:
//   - near-white effective background (all RGB channels > 245)
//   - neutral gray text (RGB channels within 30 of each other)
//   - WCAG contrast ratio < 4.5:1

const ROUTES = [
  '/',
  '/onboarding',
  '/practice',
  '/practice/question',
  '/mock-test',
  '/mock-test/question',
  '/mock-test/results',
  '/solution/wrong',
  '/solution/correct',
  '/progress',
  '/profile',
]

function getEffectiveBg(el) {
  // Walk up DOM tree to find the first non-transparent background
  let node = el
  while (node && node !== document.body.parentElement) {
    const bg = window.getComputedStyle(node).backgroundColor
    if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
      const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
      if (m) {
        const [r, g, b] = [+m[1], +m[2], +m[3]]
        // Check alpha if present
        const alphaMatch = bg.match(/rgba\(\d+,\s*\d+,\s*\d+,\s*([\d.]+)/)
        const alpha = alphaMatch ? parseFloat(alphaMatch[1]) : 1
        if (alpha > 0.05) return { r, g, b }
      }
    }
    node = node.parentElement
  }
  return { r: 255, g: 255, b: 255 } // default white
}

function relativeLuminance(r, g, b) {
  const sRGB = [r, g, b].map(c => {
    const v = c / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
}

function contrastRatio(fg, bg) {
  const L1 = relativeLuminance(fg.r, fg.g, fg.b)
  const L2 = relativeLuminance(bg.r, bg.g, bg.b)
  const lighter = Math.max(L1, L2)
  const darker  = Math.min(L1, L2)
  return (lighter + 0.05) / (darker + 0.05)
}

function isNearWhite(c) {
  return c.r > 245 && c.g > 245 && c.b > 245
}

function isNeutralGray(c) {
  const avg = (c.r + c.g + c.b) / 3
  return Math.abs(c.r - avg) < 30 && Math.abs(c.g - avg) < 30 && Math.abs(c.b - avg) < 30
}

async function findContrastViolations(page) {
  return page.evaluate(() => {
    function getEffectiveBg(el) {
      let node = el
      while (node && node !== document.body.parentElement) {
        const bg = window.getComputedStyle(node).backgroundColor
        if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
          const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
          if (m) {
            const [r, g, b] = [+m[1], +m[2], +m[3]]
            const alphaMatch = bg.match(/rgba\(\d+,\s*\d+,\s*\d+,\s*([\d.]+)/)
            const alpha = alphaMatch ? parseFloat(alphaMatch[1]) : 1
            if (alpha > 0.05) return { r, g, b }
          }
        }
        node = node.parentElement
      }
      return { r: 255, g: 255, b: 255 }
    }

    function relativeLuminance(r, g, b) {
      const sRGB = [r, g, b].map(c => {
        const v = c / 255
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
      })
      return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
    }

    function contrastRatio(fg, bg) {
      const L1 = relativeLuminance(fg.r, fg.g, fg.b)
      const L2 = relativeLuminance(bg.r, bg.g, bg.b)
      const lighter = Math.max(L1, L2)
      const darker  = Math.min(L1, L2)
      return (lighter + 0.05) / (darker + 0.05)
    }

    function isNearWhite(c) {
      return c.r > 245 && c.g > 245 && c.b > 245
    }

    function isNeutralGray(c) {
      const avg = (c.r + c.g + c.b) / 3
      return Math.abs(c.r - avg) < 30 && Math.abs(c.g - avg) < 30 && Math.abs(c.b - avg) < 30
    }

    const violations = []
    const textEls = document.querySelectorAll('p, span, label, button, h1, h2, h3, h4, li, td, th, a, div')

    for (const el of textEls) {
      // Only check leaf nodes with actual visible text
      if (!el.textContent.trim()) continue
      if (el.children.length > 0) {
        let hasTextNode = false
        for (const child of el.childNodes) {
          if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
            hasTextNode = true
            break
          }
        }
        if (!hasTextNode) continue
      }

      const style = window.getComputedStyle(el)
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue
      if (parseInt(style.fontSize) < 8) continue

      const colorStr = style.color
      const m = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
      if (!m) continue
      const fg = { r: +m[1], g: +m[2], b: +m[3] }

      // Only flag neutral gray text (not colorful text — teal, red, amber are fine)
      if (!isNeutralGray(fg)) continue

      const bg = getEffectiveBg(el)
      if (!isNearWhite(bg)) continue  // only check on white/near-white backgrounds

      const ratio = contrastRatio(fg, bg)
      if (ratio < 4.5) {
        violations.push({
          tag: el.tagName,
          text: el.textContent.trim().slice(0, 60),
          fg: `rgb(${fg.r},${fg.g},${fg.b})`,
          bg: `rgb(${bg.r},${bg.g},${bg.b})`,
          ratio: Math.round(ratio * 100) / 100,
        })
      }
    }

    return violations
  })
}

// Use a single test per route for clarity
for (const route of ROUTES) {
  test(`GOV-RULE-012 contrast check: ${route}`, async ({ page }) => {
    // Set up localStorage so pages that need student data don't show error states
    await page.addInitScript(() => {
      localStorage.setItem('student_name', 'Test Student')
      localStorage.setItem('student_nat_category', 'NAT-IE')
      localStorage.setItem('student_test_date', '2026-07-12')
      localStorage.setItem('student_target_score', '70')
    })

    await page.goto(route)
    await page.waitForLoadState('networkidle')

    const violations = await findContrastViolations(page)

    if (violations.length > 0) {
      const details = violations
        .map(v => `  "${v.text}" — fg:${v.fg} bg:${v.bg} ratio:${v.ratio}:1`)
        .join('\n')
      // Report as soft assertion — log details but allow test suite to continue
      console.warn(`GOV-RULE-012 violations on ${route}:\n${details}`)
    }

    // Hard limit: no more than 0 violations
    expect(violations, `${violations.length} contrast violation(s) on ${route}:\n${violations.map(v => `"${v.text}" (${v.ratio}:1)`).join(', ')}`).toHaveLength(0)
  })
}
