const puppeteer = require("puppeteer");
require("dotenv").config();

const windowSet = (page, name, value) =>
  page.evaluateOnNewDocument(`
    Object.defineProperty(window, '${name}', {
      get() {
        return '${value}'
      }
    })
  `);

const setup = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  windowSet(page, "LINKEDIN_USERNAME", process.env.LINKEDIN_USERNAME);
  windowSet(page, "LINKEDIN_PASSWORD", process.env.LINKEDIN_PASSWORD);

  return { browser, page };
};

(async () => {
  const { browser, page } = await setup();

  // Sign in
  await page.goto("https://www.linkedin.com/login/");
  await page.$eval("#username", (el) => (el.value = window.LINKEDIN_USERNAME));
  await page.$eval("#password", (el) => (el.value = window.LINKEDIN_PASSWORD));
  await page.click("button[type='submit']");

  // Go to my network
  await page.waitForSelector(
    ".search-global-typeahead__input.always-show-placeholder"
  );
  await page.goto("https://www.linkedin.com/mynetwork/");

  // Find software engineers section
  const selectorSoftwareEngineers =
    "button[aria-label='See all Software Engineers you may know']";
  await page.waitForSelector(selectorSoftwareEngineers);
  await page.click(selectorSoftwareEngineers);

  // Find connect buttons and click on them
  await page.waitForSelector(
    ".artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view.full-width"
  );
  await page.evaluate(() => {
    const buttons = document.querySelectorAll(
      ".artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view.full-width"
    );
    buttons.forEach((button) => button.click());
  });

  await browser.close();
})();
