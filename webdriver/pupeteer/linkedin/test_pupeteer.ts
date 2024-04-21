import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
dotenv.config();

let LINKEDIN_PASSWORD: string
let LINKEDIN_HOME_URL: string
let LINKEDIN_HOME_JOBS: string
let LINKEDIN_EMAIL: string
let LINKEDIN_JOBS_SEARCH: string

const load_env = () => {
    LINKEDIN_PASSWORD = process.env.LINKEDIN_PASSWORD || '';
    LINKEDIN_HOME_URL = process.env.LINKEDIN_HOME_URL || '';
    LINKEDIN_HOME_JOBS = process.env.LINKEDIN_HOME_JOBS || '';
    LINKEDIN_EMAIL = process.env.LINKEDIN_EMAIL || '';
    LINKEDIN_JOBS_SEARCH = process.env.LINKEDIN_JOBS_SEARCH || '';
};

const app = async () => {
    load_env();
    // Launch Puppeteer with specific options
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        userDataDir: 'Users/manginav/Library/Application Support/Google/Chrome/Default',
        args: ['--window-size=1200,800']
    });

    // Open a new page
    const page = await browser.newPage();

    console.log(LINKEDIN_HOME_URL)
    // Navigate to Google Photos login page
    await page.goto(LINKEDIN_HOME_URL);

    // Add delays before performing actions (optional)
    await delay(2000);
    await linked_login(page);

    // Log the user agent
    console.log(await browser.userAgent());

    // Close the browser
    await browser.close();
};

// // Function to introduce delay
const delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));





// // Function to perform Google Photos login
const linked_login = async (page: any) => {
    if (await page.$('input#session_key')) {
        await page.click('input#session_key');
        await delay(5000);
        await page.type('input#session_key', LINKEDIN_EMAIL);
        await delay(2000);
        await page.click('input#session_password');
        await page.type('input#session_password', LINKEDIN_PASSWORD);
        await delay(3000);
        await page.click('button[type="submit"]');
        await delay(5000);
    }
    await linkedin_jobs(page, "embedded systems", 0);
};

const linkedin_jobs = async (page: any, job: string, page_number: number) => {
    const url = `${LINKEDIN_JOBS_SEARCH}?keywords="${job}"&location=United%20States&start=${page_number}`
    console.log(url)
    await page.goto(url)
    await delay(2000)
    await get_job_details(page)
}

const get_job_details = async (page: any) => {
    await page.waitForSelector('ul.scaffold-layout__list-container');
    const ulElement = await page.$('ul.scaffold-layout__list-container');
    await delay(2000);
    console.log(ulElement)
    const liElements = await ulElement.$$('li.jobs-search-results__list-item');
    await delay(2000);

    for (let i = 0; i < liElements.length; i++) {
        const liElement = liElements[i];
        await liElement.click()
        await liElement.waitForSelector('div.artdeco-entity-lockup__title strong');
        const strongElement = await liElement.$('div.artdeco-entity-lockup__title strong');
        if (strongElement) {
            const strongText = await page.evaluate((element: any) => element.textContent, strongElement);
            console.log(strongText);
        } else {
            console.log(strongElement)
            console.log(liElement)
            console.log('No strong element found', i);
        }

        await liElement.waitForSelector('span.job-card-container__primary-description')
        const companyElement = await liElement.$('span.job-card-container__primary-description'); // Assuming the time element is represented by the <time> tag
        if (companyElement) {
            const companyName = await page.evaluate((element:any) => element.textContent, companyElement);
            console.log('Company Name:', String(companyName).trim());
        } else {
            console.log('No companyName element found in the li element');
        }

        await liElement.waitForSelector('div.artdeco-entity-lockup__caption > ul > li.job-card-container__metadata-item')
        const jobLocationElement = await liElement.$('div.artdeco-entity-lockup__caption > ul > li');
        if (jobLocationElement) {
            const jobLocation = await page.evaluate((element:any) => element.textContent, jobLocationElement);
            console.log('jobLocation:', String(jobLocation).trim());
        } else {
            console.log('No jobLocation element found in the li element');
        }

        await liElement.waitForSelector('time')
        const timeElement = await liElement.$('time'); // Assuming the time element is represented by the <time> tag
        if (timeElement) {
            const timeValue = await page.evaluate((element:any) => element.getAttribute('datetime'), timeElement);
            console.log('Time:', timeValue);
        } else {
            console.log('No time element found in the li element');
        }

        await delay(1000);
    }
}

app()