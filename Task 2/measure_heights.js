const puppeteer = require('puppeteer-core');
const path = require('path');

async function measure() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  const fileUrl = 'file://' + path.join(__dirname, 'report.html');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  const heights = await page.evaluate(() => {
    const pages = document.querySelectorAll('.page');
    return Array.from(pages).map((p, idx) => ({
      index: idx + 1,
      id: p.querySelector('h2')?.innerText || 'Cover',
      height: p.offsetHeight,
      scrollHeight: p.scrollHeight
    }));
  });
  console.log(JSON.stringify(heights, null, 2));
  await browser.close();
}
measure();
