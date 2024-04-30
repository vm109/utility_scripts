import { chromium } from 'playwright';

const app = async () => {
    // Launch Playwright with specific options
    const browser = await chromium.launch({
        
    });

    // Open a new page
    const page = await browser.newPage();

    // Navigate to Google Photos login page
    await page.goto('https://photos.google.com/login');

    // Add delays before performing actions (optional)
    await delay(2000);
    await google_photos_login(page);

    // Close the browser
    await browser.close();
};

// Function to introduce delay
const delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

// Function to perform Google Photos login
const google_photos_login = async (page: any) => {
    await page.click('input#identifierId');
    await delay(5000);
    await page.type('input#identifierId', 'anu.mangina');
    await delay(2000);
    await page.click('div#identifierNext');
    await delay(3000);
};

app();
