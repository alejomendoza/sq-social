import puppeteer, { Browser } from 'puppeteer'
import handlebars from 'handlebars'
import fs from 'fs/promises'
import path from 'path'

let browser: Browser

export const screenshot = async ({
  set,
  quest,
  reward,
}: any): Promise<string> => {
  try {
    if (!browser) {
      browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
        ],
        headless: true,
      })
    }

    const context = await browser.createIncognitoBrowserContext()
    const page = await context.newPage()
    await page.setViewport({ width: 600, height: 315 })

    const templateFilePath = path.join(
      __dirname,
      '../templates/QuestComplete.hbs',
    )
    const templateFile = await fs.readFile(templateFilePath, {
      encoding: 'utf-8',
    })
    const template = handlebars.compile(templateFile)
    const html = template({
      set,
      quest,
      reward,
    })

    await page.setContent(html)
    const screenshot = await page.screenshot({ encoding: 'base64' })
    await context.close()

    return screenshot as string
  } catch (err) {
    return 'ERROR'
  }
}
