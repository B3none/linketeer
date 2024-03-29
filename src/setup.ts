import puppeteer from "puppeteer";
import windowSet from "./utils/window-set";
require("dotenv").config();

const setup = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  windowSet(page, "LINKEDIN_USERNAME", process.env.LINKEDIN_USERNAME);
  windowSet(page, "LINKEDIN_PASSWORD", process.env.LINKEDIN_PASSWORD);

  return { browser, page };
};

export default setup;
