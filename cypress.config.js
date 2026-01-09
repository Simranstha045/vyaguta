const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://dev.vyaguta.lftechnology.com.np',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    video: false,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    experimentalStudio: true,
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    }
  }
});
