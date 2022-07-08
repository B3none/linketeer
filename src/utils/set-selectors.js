const windowSet = require("./window-set");

const setSelectors = (page, selectors) => {
  Object.entries(selectors).forEach(([key, value]) =>
    windowSet(page, key, value)
  );
};

module.exports = setSelectors;
