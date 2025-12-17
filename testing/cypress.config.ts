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
      // //bypass cloud flare check //@needs review
      // on(
      //   "before:browser:launch",
      //   (browser: Cypress.Browser, launchOptions: Cypress.BeforeBrowserLaunchOptions) => {
      //     if (browser.family === "chromium" && launchOptions.args) {
      //       launchOptions.args.push("--disable-blink-features=AutomationControlled");
      //       launchOptions.args.push(
      //         "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
      //           "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 " +
      //           "Safari/537.36 Cypress/14.5.2"
      //       );
      //     }
      //     return launchOptions;
      //   }
      // );
    },
    reporter: 'cypress-mochawesome-reporter',
    baseUrl: "https://quote-keeper-2.netlify.app",
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
  screenshotOnRunFailure: false,
});
