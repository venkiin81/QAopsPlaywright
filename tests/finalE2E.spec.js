const{test,expect} = require('@playwright/test')

test("Login",async ({browser})=>{

    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto("https://eventhub.rahulshettyacademy.com/login")
    await page.locator("#email").fill("Venkatesh@gm.co")
    await page.locator("#password").fill("Pass@123")
    await page.locator("[type='submit']").click()
    await expect(page.locator("#logout-btn")).toBeVisible()
    await expect(page).toHaveTitle("EventHub — Discover & Book Events")

})

test('Invalid_Creds_1', async ({page})=>{

    await page.goto("https://eventhub.rahulshettyacademy.com/login")
    await page.locator("#email").fill("Venkat")
    await page.locator("#password").fill("Pass3")
    await page.locator("[type='submit']").click()
    const errormessgae1=await page.locator("[class *='mt-1 ']").first().textContent()
    const errormessage2=await page.locator("[class *='mt-1 ']").last().textContent()
    console.log(errormessgae1)
    console.log(errormessage2)

})

test.only("Invalid_cred", async ({page})=>{

    await page.goto("https://eventhub.rahulshettyacademy.com/login")
    await page.locator("#email").fill("test@gm.co")
    await page.locator("#password").fill("Pass1234")
    await page.locator("[type='submit']").click()   
    
    await expect(page.locator("body > div:nth-child(2)")).toBeVisible()
    const errormessage = await page.locator("body > div:nth-child(2)").textContent()
    console.log(errormessage)

})