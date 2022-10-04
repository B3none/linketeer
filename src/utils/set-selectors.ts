import windowSet from "./window-set";

const setSelectors = (page, selectors) => {
  Object.entries(selectors).forEach(([key, value]) =>
    windowSet(page, key, value)
  );
};

export default setSelectors;
