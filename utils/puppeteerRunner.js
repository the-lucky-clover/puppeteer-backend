const puppeteer = require('puppeteer');

async function runPuppeteer(targetUrl, textPrompt) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  try {
    await page.goto(targetUrl, { waitUntil: 'networkidle2' });

    await page.waitForSelector('#password');
    await page.type('#password', 'SuperSecretPassword!');
    await page.keyboard.press('Enter');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    if (textPrompt) {
      await page.waitForSelector('#chatbot-input');
      await page.type('#chatbot-input', textPrompt);
      await page.keyboard.press('Enter');
    }

    await page.screenshot({ path: 'after_prompt.png' });

    return { success: true, message: 'Prompt submitted and screenshot captured.' };

  } catch (err) {
    console.error('Puppeteer error:', err);
    return { success: false, error: err.message };
  } finally {
    await browser.close();
  }
}

module.exports = runPuppeteer;
