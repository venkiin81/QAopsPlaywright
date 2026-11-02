// @ts-check
import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  expect : {
    //timeout customisation global level 
    timeout : 20*1000
  },
  //timeout for whole test 
  timeout : 20*1000,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    //timeout for action global lvl
    actionTimeout:15000,
    //timeout for navigation global Lvl
    navigationTimeout:12000,
    headless : false,
    browserName : 'chromium', 
    trace: 'retain-on-failure',
    screenshot:'on'
  },

});

