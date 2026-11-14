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
  //global setting to run tests in parallel 
  fullyParallel: true,
  //retry property 
  retries: 1,
  //test files will run paralley by default 
  //tests in same testfile run in series > this can be made parallel in test 
  //worker is an Env where test is triggred 
  //worker : 1 disabling the parallel mechanishm 
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  projects:[
    {name:"Chrome",    
        use: {
    //timeout for action global lvl
    actionTimeout:15000,
    //timeout for navigation global Lvl
    navigationTimeout:12000,
    headless : false,
    browserName : 'chromium', 
    trace: 'retain-on-failure',
    screenshot:'on',
    //port heigth and length property
   // viewport:{width:720,height:720}
      }
    },
    {
      name:"safari",
      use:{
        headless : false,
      browserName : 'webkit', 
      //log property
      trace: 'retain-on-failure',
      screenshot:'on',
      //device specif property 
      ...devices['iPhone 11'],
      //SSL certification ignore property
      ignoreHTTPSErrors:true,
      //handling permision popup on load 
      permissions:['geolocation'],
      //video property
      video:'retain-on-failure'
      
      }
    }
  ]


});

// comand 
//npx playwright test tests/finalE2E_Po.spec.js --config playwright.config1.js --project=chrome

