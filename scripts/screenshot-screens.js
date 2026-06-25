import puppeteer from 'puppeteer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const BASE_URL = 'http://localhost:5175'
const OUT_DIR  = path.join(__dirname, '..', 'screenshots')

const SCREENS = [
  { name: '01-home',                path: '/'                  },
  { name: '02-onboarding',          path: '/onboarding'        },
  { name: '03-practice',            path: '/practice'          },
  { name: '04-practice-question',   path: '/practice/question' },
  { name: '05-mock-test',           path: '/mock-test'         },
  { name: '06-mock-test-question',  path: '/mock-test/question'},
  { name: '07-mock-test-results',   path: '/mock-test/results' },
  { name: '08-solution-wrong',      path: '/solution/wrong'    },
  { name: '09-solution-correct',    path: '/solution/correct'  },
  { name: '10-progress',            path: '/progress'          },
  { name: '11-profile',             path: '/profile'           },
  { name: '12-admin',               path: '/admin'             },
]

;(async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page    = await browser.newPage()
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 })

  for (const screen of SCREENS) {
    const url = `${BASE_URL}${screen.path}`
    console.log(`→ ${screen.name}  (${url})`)
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 })
      await new Promise(r => setTimeout(r, 1500))
      const file = path.join(OUT_DIR, `${screen.name}.png`)
      await page.screenshot({ path: file, fullPage: true })
      console.log(`  ✓ saved ${screen.name}.png`)
    } catch (err) {
      console.error(`  ✗ ${screen.name}: ${err.message}`)
    }
  }

  await browser.close()
  console.log('\nDone. Screenshots saved to:', OUT_DIR)
})()
