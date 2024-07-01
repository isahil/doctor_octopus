import "dotenv/config";
import { PlaywrightTestConfig } from "playwright/test";
 
const { TEST_RESULTS_DIR } = process.env;

const config: PlaywrightTestConfig = {
  testDir: "tests",
  // globalSetup: require.resolve("./global.setup.js"),
  timeout: 30000,
  use: {
    browserName: 'chromium',
    headless: true,
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: TEST_RESULTS_DIR}],
    ['json', { outputFile: `${TEST_RESULTS_DIR}report_card.json` }],
  ],
  projects: [
    {
      name: 'google',
      testMatch: 's3.spec.ts',
      use: { browserName: 'chromium'}
    }
  ]
};

export default config;