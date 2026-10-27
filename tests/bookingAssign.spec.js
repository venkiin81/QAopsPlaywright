const {test, expect} = require("@playwright/test")

test("booking_event",async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = "Venkat187@gm.co"
    const passWord = "Connect@123"

    await page.goto("https://eventhub.rahulshettyacademy.com")
    //Login 
    await page.locator("#email").fill(userName)
    await page.locator("#password").fill(passWord)
    await page.locator("#login-btn").click()
    //assertiaon on login 
    await expect(page.getByText("Browse Events →")).toBeVisible();

    //create an Event 

    await page.locator("nav .relative button").click()
    await page.locator("nav .relative a").first().click()

    const timestamp = Date.now()
    const tittle = timestamp+"Venk"

    await page.locator("#event-title-input").fill(tittle)
    await page.locator("textarea[placeholder='Describe the event…']").fill(timestamp)

    const DDoption = page.locator("#category")
    await DDoption.selectOption("Sports")

    await page.locator("#city").fill("Bangalore")
    await page.locator("#venue").fill("Lalbagh")
    await page.locator("input[id='event-date-&-time']").fill("2026-07-25T01:24")
    await page.locator("input[id='price-($)']").fill("20")
    await page.locator("#total-seats").fill("20")
    await page.locator("[type='submit']").click();


})