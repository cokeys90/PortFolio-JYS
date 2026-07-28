import puppeteer from 'puppeteer-core'
import { PDFDocument } from 'pdf-lib'
import { writeFileSync } from 'node:fs'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = 'https://portfolio-jys.web.app'
const OUT = process.argv[2] || 'portfolio.pdf'

const PAGES = [
  '/',
  '/about',
  '/projects/pass-license',
  '/projects/pocketmapgo',
  '/projects/achakey-android',
  '/projects/seat-ai',
]

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--force-color-profile=srgb'],
})

const merged = await PDFDocument.create()

for (const path of PAGES) {
  const page = await browser.newPage()
  // 라이트 테마 강제 + light prefers
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }])
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('portfolio-theme', 'light')
  })
  const url = BASE + path
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
  // 폰트/이미지 안정화
  await new Promise((r) => setTimeout(r, 1200))

  const buf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '12mm', bottom: '12mm', left: '10mm', right: '10mm' },
  })
  const doc = await PDFDocument.load(buf)
  const copied = await merged.copyPages(doc, doc.getPageIndices())
  copied.forEach((p) => merged.addPage(p))
  console.log(`ok ${path} -> ${doc.getPageCount()}p`)
  await page.close()
}

await browser.close()
writeFileSync(OUT, await merged.save())
console.log(`saved ${OUT} (${merged.getPageCount()} pages total)`)
