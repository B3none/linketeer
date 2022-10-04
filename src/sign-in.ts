const signIn = async (page) => {
  await page.goto("https://www.linkedin.com/login/");
  await page.$eval(
    "#username",
    (el) => (el.value = window["LINKEDIN_USERNAME"])
  );
  await page.$eval(
    "#password",
    (el) => (el.value = window["LINKEDIN_PASSWORD"])
  );
  await page.click("button[type='submit']");

  // Wait for home to be loaded
  await page.waitForSelector(
    ".search-global-typeahead__input.always-show-placeholder"
  );
};

export default signIn;
