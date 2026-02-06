import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: 'test.ts', // Use custom test entry for global delay
  timeout: 30000,
  retries: 0,
  reporter: [['html', { open: 'always' }]],
  use: {
    trace: 'retain-on-failure', // Collect trace for failed tests
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'http://localhost:3001/',
    viewport: null, // makes default for headed testing to be fullscreen
    launchOptions: {
      args: ['--start-maximized'],
      slowMo: 500, // slows actions by 500ms for demo recording
    },
  },
  workers: 12, // Enables parallel test execution with 12 workers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
