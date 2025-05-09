import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // reporter: 'mochawesome', // Just running the tests will generate a report, don't need to mention it in the command
    //    baseUrl: "http://localhost:4200",
    baseUrl: "https://quote-keeper-2.netlify.app",
    watchForFileChanges: false,
    experimentalRunAllSpecs: true,
    chromeWebSecurity: false,
    pageLoadTimeout: 200000,
    viewportWidth: 1450,
    viewportHeight: 950,
  },
  pageLoadTimeout: 100000,
  video: false,
  screenshotOnRunFailure: false,
  videoCompression: 8,
  videosFolder: "cypress/screenshots-and-videos/videos",
  screenshotsFolder: "cypress/screenshots-and-videos/screenshots",
});
