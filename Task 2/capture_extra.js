const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = '/usr/bin/google-chrome';
const BASE_URL = 'https://inamigosfoundation.org.in';
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');

async function capture() {
  console.log('Launching browser for extra pages...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
    defaultViewport: { width: 1280, height: 800 }
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    const subpages = [
      { name: 'about', url: `${BASE_URL}/page/About-Us` },
      { name: 'gallery', url: `${BASE_URL}/gallery` },
      { name: 'events', url: `${BASE_URL}/events` },
      { name: 'blog', url: `${BASE_URL}/blog` }
    ];

    for (const sub of subpages) {
      try {
        console.log(`Navigating to subpage: ${sub.name} (${sub.url})...`);
        await page.goto(sub.url, { waitUntil: 'networkidle2', timeout: 30000 });
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, `desktop_${sub.name}_full.png`), fullPage: true });
        console.log(`Captured ${sub.name}!`);
      } catch (err) {
        console.error(`Error capturing ${sub.name}:`, err.message);
      }
    }

    console.log('Extra capture complete!');

  } catch (error) {
    console.error('Error in capture process:', error);
  } finally {
    await browser.close();
  }
}

capture();
