// @ts-check
import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  expect : {
    timeout : 10*1000
  },
  timeout : 10*1000,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    headless : false,
    browserName : 'chromium', 
    trace: 'retain-on-failure',
    screenshot:'on'
  },

});

