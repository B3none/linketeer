const windowSet = (page, name, value) =>
  page.evaluateOnNewDocument(`
    Object.defineProperty(window, '${name}', {
      get() {
        return '${value}'
      }
    })
  `);

module.exports = windowSet;
