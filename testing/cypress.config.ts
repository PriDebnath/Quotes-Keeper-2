import { defineConfig } from "cypress";
import { beforeRunHook, afterRunHook } from 'cypress-mochawesome-reporter/lib'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
      });

      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
      });
    },
    reporter: 'cypress-mochawesome-reporter',
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

