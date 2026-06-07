const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = '/usr/bin/google-chrome';
const LOCAL_HTML_URL = 'file:///home/deepakraj29/Desktop/intern/task 1/index.html';
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');

async function captureLocal() {
  console.log('Launching browser for local Task 1 screenshots...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--allow-file-access-from-files'],
    defaultViewport: { width: 1280, height: 800 }
  });

  try {
    const page = await browser.newPage();

    console.log(`Navigating to local HTML: ${LOCAL_HTML_URL}...`);
    await page.goto(LOCAL_HTML_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));

    // Capture Local Hero
    console.log('Capturing Local Hero...');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'local_home_hero.png') });

    // Scroll to Local About section
    console.log('Scrolling to local About section...');
    await page.evaluate(() => {
      const el = document.getElementById('about');
      if (el) {
        el.scrollIntoView();
      } else {
        window.scrollTo(0, 750);
      }
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'local_home_about.png') });

    // Switch to Mobile Viewport to capture responsive contact cards
    console.log('Switching to mobile view for local layout check...');
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    
    // Reload local page to trigger responsive CSS/JS correctly
    await page.goto(LOCAL_HTML_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to contact section on local mobile
    console.log('Scrolling to local mobile footer/contact...');
    await page.evaluate(() => {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView();
      } else {
        window.scrollTo(0, document.body.scrollHeight - 1200);
      }
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'local_mobile_contact.png') });

    console.log('Local screenshots capture complete!');

  } catch (error) {
    console.error('Error in capturing local screenshots:', error);
  } finally {
    await browser.close();
  }
}

captureLocal();
