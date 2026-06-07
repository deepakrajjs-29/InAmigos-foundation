const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = '/usr/bin/google-chrome';
const HTML_FILE_PATH = 'file://' + path.join(__dirname, 'report.html');
const OUTPUT_PDF_PATH = path.join(__dirname, 'Website_Improvement_Analysis_Report.pdf');

async function compilePDF() {
  console.log('Launching browser to compile PDF...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--allow-file-access-from-files']
  });

  try {
    const page = await browser.newPage();
    console.log(`Navigating to report HTML: ${HTML_FILE_PATH}...`);
    await page.goto(HTML_FILE_PATH, { waitUntil: 'networkidle0', timeout: 60000 });
    
    // Give extra second to make sure images are fully painted
    await new Promise(r => setTimeout(r, 2000));

    console.log('Generating PDF...');
    await page.pdf({
      path: OUTPUT_PDF_PATH,
      format: 'A4',
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 7px; font-family: 'Arial', sans-serif; color: #888; width: 100%; display: flex; justify-content: space-between; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin-left: 15mm; margin-right: 15mm; box-sizing: border-box;">
          <span style="font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">InAmigos Foundation | Website Analysis & Improvement Report</span>
          <span>CONFIDENTIAL</span>
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 7px; font-family: 'Arial', sans-serif; color: #888; width: 100%; display: flex; justify-content: space-between; border-top: 1px solid #e5e7eb; padding-top: 4px; margin-left: 15mm; margin-right: 15mm; box-sizing: border-box;">
          <span>Prepared by Product Development Intern</span>
          <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
      `,
      margin: {
        top: '25mm',
        bottom: '25mm',
        left: '15mm',
        right: '15mm'
      },
      printBackground: true
    });

    console.log(`PDF successfully generated at: ${OUTPUT_PDF_PATH}`);

  } catch (error) {
    console.error('Error compiling PDF:', error);
  } finally {
    await browser.close();
  }
}

compilePDF();
