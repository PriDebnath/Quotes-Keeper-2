import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:4200",
    watchForFileChanges: false,
    experimentalRunAllSpecs: true,
    chromeWebSecurity: false,
    pageLoadTimeout: 200000,
    viewportWidth: 1450,
    viewportHeight: 950,
  },
  pageLoadTimeout: 100000,
  video: true,
  videoCompression: 8,
  videosFolder: "cypress/screenshots-and-videos/videos",
  screenshotsFolder: "cypress/screenshots-and-videos/screenshots",
});
