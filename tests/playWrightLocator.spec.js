const{test,expect} = require('@playwright/test')

test("playwrightLoc",async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/")

    await page.locator("form input[name='name']").fill("Name")
    await page.locator("form input[name='email']").fill("email@gm.co")
    await page.getByPlaceholder("Password").fill("Pass@123")
    await page.getByLabel("Check me out if you Love IceCreams!").click()
    await page.getByLabel("Gender").selectOption("Female")
    await page.getByRole("button",{name:"Submit"}).click()

    await page.getByRole("link",{name:"Shop"}).click()
    await page.locator('app-card').filter({ hasText: 'Samsung Note 8 $24.99 Lorem' }).getByRole('button').click()

})

test.only("CalenderHandle", async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    const day = '11'
    const month = '10'
    const year = '2026'

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")

    await page.locator(".react-date-picker").click()

    await page.locator(".react-calendar span").click()

    await page.locator(".react-calendar span").click()

    await page.getByRole('button', { name: '2026' }).click()

    await page.locator("div [class*='react-calendar'] button abbr").nth(Number(month)-1).click();

    await page.locator("button[class*='react-calendar__month-view__days__day'] abbr")
    .getByLabel(Number(day)).click()

})