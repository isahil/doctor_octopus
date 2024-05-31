import { PlaywrightTestConfig } from '@playwright/test';
const reporter_folder = `playwright-report/results_${Math.ceil(Math.random() * 100)}/`
const config: PlaywrightTestConfig = {
  testDir: 'tests', // Specify the directory where your test files are.
  timeout: 30000, // Specify a timeout of 30 seconds.
  use: {
    // Configure the browser to use for your tests.
    browserName: 'chromium',
    headless: true,
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: reporter_folder }],
    ['json', { outputFile: `${reporter_folder}report_card.json` }],
  ],
  projects: [
    // Run tests on both Firefox and WebKit.
    {
      name: 'google',
      testMatch: 'google.spec.ts',
      use: { browserName: "chromium" },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ]
};

export default config;