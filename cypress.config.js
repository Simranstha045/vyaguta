const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://dev.vyaguta.lftechnology.com.np',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 30000,
    responseTimeout: 30000,
    video: false,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    retries: {
      runMode: 2,
      openMode: 0
    },
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    }
  }
});
