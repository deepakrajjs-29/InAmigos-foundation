const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = '/usr/bin/google-chrome';
const BASE_URL = 'https://inamigosfoundation.org.in';
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function capture() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
    defaultViewport: { width: 1280, height: 800 }
  });

  try {
    const page = await browser.newPage();
    
    // Set a common user agent to avoid bot detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    console.log(`Navigating to ${BASE_URL}...`);
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 60000 });
    
    // Wait an extra 3 seconds for sliders/fonts to load
    await new Promise(r => setTimeout(r, 3000));

    // Discover navigation links
    const links = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a'));
      return anchors.map(a => ({
        text: a.innerText.trim(),
        href: a.href
      })).filter(item => item.href.startsWith('https://inamigosfoundation.org') && item.text.length > 0);
    });
    
    console.log('Discovered links:', links);
    fs.writeFileSync(path.join(__dirname, 'discovered_links.json'), JSON.stringify(links, null, 2));

    // Capture desktop Home Hero
    console.log('Capturing Desktop Home Hero...');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'desktop_home_hero.png') });

    // Capture desktop Home Full Page
    console.log('Capturing Desktop Home Full...');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'desktop_home_full.png'), fullPage: true });

    // Let's scroll down to About Us section and take a screenshot
    console.log('Scrolling to About section...');
    await page.evaluate(() => {
      // Find element containing "Get to Know Us Better" or similar, or scroll down a bit
      window.scrollTo(0, 800);
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'desktop_home_about.png') });

    // Let's scroll down to causes / stats section
    console.log('Scrolling to Stats section...');
    await page.evaluate(() => {
      window.scrollTo(0, 1800);
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'desktop_home_causes.png') });

    // Switch to Mobile Viewport
    console.log('Switching to Mobile view...');
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise(r => setTimeout(r, 2000));

    console.log('Capturing Mobile Home Hero...');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile_home_hero.png') });
    
    console.log('Capturing Mobile Full Page...');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile_home_full.png'), fullPage: true });

    // Scroll to contact section on mobile to capture cramped layout
    console.log('Scrolling to footer/contact on mobile...');
    await page.evaluate(() => {
      // Scroll to bottom
      window.scrollTo(0, document.body.scrollHeight - 1500);
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile_contact_cramped.png') });

    // Reset view port to desktop
    await page.setViewport({ width: 1280, height: 800 });

    // Navigate to key subpages if they exist
    const subpages = [
      { name: 'about', url: `${BASE_URL}/about` },
      { name: 'causes', url: `${BASE_URL}/causes` },
      { name: 'volunteers', url: `${BASE_URL}/volunteers` },
      { name: 'contact', url: `${BASE_URL}/contact` }
    ];

    for (const sub of subpages) {
      try {
        console.log(`Navigating to subpage: ${sub.name} (${sub.url})...`);
        await page.goto(sub.url, { waitUntil: 'networkidle2', timeout: 30000 });
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, `desktop_${sub.name}_full.png`), fullPage: true });
      } catch (err) {
        console.error(`Error capturing ${sub.name}:`, err.message);
      }
    }

    console.log('Capture complete!');

  } catch (error) {
    console.error('Error in capture process:', error);
  } finally {
    await browser.close();
  }
}

capture();
