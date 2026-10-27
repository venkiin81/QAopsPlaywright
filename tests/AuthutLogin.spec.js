const {test, expect} = require('@playwright/test')

test('Login_to', async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")

    await page.locator("#userEmail").fill("laster@gm.co.in")
    await page.locator("#userPassword").fill("Passer@123")
    await page.locator("[value='Login']").click()

    await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/dash")

    await page.locator(".card-body b").last().waitFor()

    const allProdduct = await page.locator(".card-body b").allTextContents()

    console.log(allProdduct)

})