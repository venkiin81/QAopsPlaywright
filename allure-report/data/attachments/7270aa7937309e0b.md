# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: finalE2E_Po.spec.js >> @web valid and invalid cred: Ven77tesh@gm.co
- Location: tests\finalE2E_Po.spec.js:42:1

# Error details

```
Test timeout of 20000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#logout-btn')
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('#logout-btn') with timeout 20000ms
  - waiting for locator('#logout-btn')
  - Test timeout of 20000ms exceeded.

```

```yaml
- text: RSA Rahul Shetty Academy eventhub.app
- img "EventHub app preview"
- list:
  - listitem: ⚡ Live REST APIs — test real endpoints, not mocks
  - listitem: 🔒 Isolated sandbox — your data, your tests, no conflicts
  - listitem: 🎫 Auth, CRUD, bookings — flows you'll face on the job
  - listitem: 🤖 Built for Selenium, Playwright, RestAssured & more
- paragraph: 50,000+
- paragraph: QA engineers trained worldwide
- 'heading "The #1 QA Practice Hub for Automation Engineers" [level=2]'
- paragraph: EventHub is a production-grade practice app designed so you can sharpen your testing skills on real-world scenarios — before your next interview or project.
- link "API Documentation (Swagger)":
  - /url: https://api.eventhub.rahulshettyacademy.com/api/docs
  - img
  - text: API Documentation (Swagger)
- img
- heading "Sign in to EventHub" [level=1]
- paragraph: Enter your credentials to continue
- text: Email
- textbox "Email":
  - /placeholder: you@email.com
  - text: Ven77tesh@gm.co
- text: Password
- textbox "Password":
  - /placeholder: ••••••
  - text: Pa70s@123
- button "Sign In"
- paragraph:
  - text: Don't have an account?
  - link "Register":
    - /url: /register
- paragraph:
  - text: A practice environment by
  - link "RahulShettyAcademy.com":
    - /url: https://rahulshettyacademy.com
  - text: — used by QA engineers worldwide to master automation testing.
- text: ✕
- paragraph: Invalid email or password
- button "Dismiss": ×
- alert
```

# Test source

```ts
  1  | const {test,expect} = require('@playwright/test')
  2  | const {PoManager} = require('../Pageobjects/PoManager.js')
  3  | //dataset convert json > string > object
  4  | const dataset = JSON.parse(JSON.stringify(require('../utils/finalE2E_poTestdata.json')))
  5  | const paradata = JSON.parse(JSON.stringify(require('../utils/finalE2E_poParametrize.json')))
  6  | //from custom fixture
  7  | const {customdatatest} =require('../utils/fixData.js')
  8  | 
  9  | //to make the each test run paralley 
  10 | //test.describe.configure({mode:"parallel"})
  11 | //to make the test series and if one fail it skips next etsts 
  12 | //test.describe.configure({mode:"serial"})
  13 | 
  14 | //taging test using grep @web 
  15 | //command npx playwright test tests/finalE2E_Po.spec.js --grep "@web"
  16 | // to find list of test tagged 
  17 | //npx playwright test tests/finalE2E_Po.spec.js --grep "@web" --list
  18 | 
  19 | /**
  20 |  * describe or wrap the tests to run in parallel and series 
  21 |  * test.describe('name'()={
  22 |  * test.describe.configure({mode:parallel/series})
  23 |  * test('test1'async({page})=>{----})
  24 |  * test('test1'async({page})=>{----})
  25 |  * })
  26 |  */
  27 | test(`@web Fule2e_Po`, async ({page})=>{
  28 | 
  29 | 
  30 |     const poManager = new PoManager(page)
  31 |     const loginPage = poManager.getLogin()
  32 |     const eventspage = poManager.getEvents()
  33 | 
  34 |     await loginPage.goto()
  35 |     await loginPage.LoginUser(dataset.email,dataset.password)
  36 |     await eventspage.bookEvent(dataset.event)
  37 |     
  38 | })
  39 | 
  40 | for(const data of paradata)
  41 | {    
  42 | test(`@web valid and invalid cred: ${data.email}`, async ({page})=>{
  43 | 
  44 |     const poManager = new PoManager(page)
  45 |     const loginPage = poManager.getLogin()
  46 | 
  47 |     await loginPage.goto()
  48 |     await loginPage.LoginUser(data.email,data.password)
> 49 |     await expect(loginPage.logout).toBeVisible()
     |                                    ^ Error: expect(locator).toBeVisible() failed
  50 | 
  51 | })
  52 | }
  53 | 
  54 | customdatatest('login_using_fix_data',async ({page,datasets})=>{
  55 | 
  56 |     const poManager = new PoManager(page)
  57 |     const loginPage = poManager.getLogin()
  58 | 
  59 |     await loginPage.goto()
  60 |     await loginPage.LoginUser(datasets.email,datasets.password)
  61 |     await expect(loginPage.logout).toBeVisible()
  62 | 
  63 | })
```