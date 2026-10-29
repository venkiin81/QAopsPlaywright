const { test, expect } = require('@playwright/test')

test("Login", async ({ browser }) => {

    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto("https://eventhub.rahulshettyacademy.com/login")
    await page.locator("#email").fill("Venkatesh@gm.co")
    await page.locator("#password").fill("Pass@123")
    await page.locator("[type='submit']").click()
    await expect(page.locator("#logout-btn")).toBeVisible()
    await expect(page).toHaveTitle("EventHub — Discover & Book Events")

})

test('Invalid_Creds_1', async ({ page }) => {

    await page.goto("https://eventhub.rahulshettyacademy.com/login")
    await page.locator("#email").fill("Venkat")
    await page.locator("#password").fill("Pass3")
    await page.locator("[type='submit']").click()
    const errormessgae1 = await page.locator("[class *='mt-1 ']").first().textContent()
    const errormessage2 = await page.locator("[class *='mt-1 ']").last().textContent()
    console.log(errormessgae1)
    console.log(errormessage2)

})

test("Invalid_cred", async ({ page }) => {

    await page.goto("https://eventhub.rahulshettyacademy.com/login")
    await page.locator("#email").fill("test@gm.co")
    await page.locator("#password").fill("Pass1234")
    await page.locator("[type='submit']").click()

    await expect(page.locator("body > div:nth-child(2)")).toBeVisible()
    const errormessage = await page.locator("body > div:nth-child(2)").textContent()
    console.log(errormessage)

})

test("Fetch_Events", async ({ page }) => {

    await page.goto("https://eventhub.rahulshettyacademy.com/login")
    const email = page.locator("#email")
    const password = page.locator("#password")
    const submitButton = page.locator("[type='submit']")
    const logout = page.locator("#logout-btn")
    const allevents = page.locator("h3[class*='font-semibold']")

    await email.fill("Venkatesh@gm.co")
    await password.fill("Pass@123")
    await submitButton.click()
    await expect(logout).toBeVisible()
    await expect(allevents.last()).toBeVisible()

    const eventCount = await allevents.count()
    console.log("Total Events Count: " + eventCount)
    const eventNames = await allevents.allTextContents()
    console.log("Event Names: " + eventNames)

})

test.only("Dropdow", async ({page})=>{

    await page.goto("https://eventhub.rahulshettyacademy.com/login")
    const email = page.locator("#email")
    const password = page.locator("#password")
    const submitButton = page.locator("[type='submit']")
    const logout = page.locator("#logout-btn")
    const Events = page.locator("#nav-events")
    const Eventlist = page.locator("h3[class*='font-semibold']") 

    const catagoriesOptions = page.locator("select[class*='w-full']").first()
    
    await email.fill("Venkatesh@gm.co")
    await password.fill("Pass@123")
    await submitButton.click()
    await expect(logout).toBeVisible()
    await page.pause()
    await Events.click()

    await catagoriesOptions.selectOption("Concert")
    await expect(Eventlist.first()).toBeVisible()
    const count = await Eventlist.count()
    if (count > 0) {
        const eventNames = await Eventlist.allTextContents()
        console.log("Event Names for Concert Category: " + eventNames)
    }

})

