const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    env: {
      // requestMode: true,
      hideCredentials: false,
    },
    setupNodeEvents(on, config) {

      on('before:browser:launch', (browser = {}, launchOptions) => {
        if(browser.family === 'chromium' && browser.name !== 'electron')
        launchOptions.args.push("--incognito");
      return launchOptions
      })
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: "https://reqres.in/"
  },
});
