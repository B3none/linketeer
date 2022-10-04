import setup from "./setup";
import signIn from "./sign-in";
import setSelectors from "./utils/set-selectors";

const selectors = {
  INVITATION_MANAGER_TITLE: ".mn-invitation-manager__header",
  BUTTON_ACCEPT_INVITATION:
    ".artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view.invitation-card__action-btn",
};

const goToInvitationManagerPage = async (page) => {
  await page.goto("https://www.linkedin.com/mynetwork/invitation-manager/");

  // Wait for invitation manager page to be loaded
  await page.waitForSelector(selectors["INVITATION_MANAGER_TITLE"]);
};

const acceptAllInvitations = async (page) => {
  await page.evaluate(() => {
    const buttons = document.querySelectorAll(
      window["BUTTON_ACCEPT_INVITATION"]
    );
    buttons.forEach((button) => button.click());
  });
};

const run = async (page) => {
  await signIn(page);
  await goToInvitationManagerPage(page);
  await acceptAllInvitations(page);
};

(async () => {
  const { browser, page } = await setup();

  setSelectors(page, selectors);

  await run(page);

  await browser.close();
})();
