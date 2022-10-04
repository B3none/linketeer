import setup from "./setup";
import signIn from "./sign-in";
import setSelectors from "./utils/set-selectors";

const selectors = {
  BUTTON_SEE_ALL_SOFTWARE_ENGINEERS:
    "button[aria-label='See all Software Engineers you may know']",
  BUTTON_CONNECT_MODAL:
    ".discover-fluid-entity-list.discover-fluid-entity-list--default-width-cards .artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view.full-width",
};

const goToMyNetworkPage = async (page) => {
  await page.goto("https://www.linkedin.com/mynetwork/");
  await page.waitForSelector(selectors.BUTTON_SEE_ALL_SOFTWARE_ENGINEERS);
};

const seeAllSoftwareEngineers = async (page) => {
  await page.click(selectors.BUTTON_SEE_ALL_SOFTWARE_ENGINEERS);
  await page.waitForSelector(selectors.BUTTON_CONNECT_MODAL);
};

const addSoftwareEngineers = async (page) => {
  await page.evaluate(() => {
    const buttons = document.querySelectorAll(window["BUTTON_CONNECT_MODAL"]);
    buttons.forEach((button) => button.click());
  });
};

const run = async (page) => {
  await signIn(page);
  await goToMyNetworkPage(page);
  await seeAllSoftwareEngineers(page);
  await addSoftwareEngineers(page);
};

(async () => {
  const { browser, page } = await setup();

  setSelectors(page, selectors);

  await run(page);

  await browser.close();
})();
