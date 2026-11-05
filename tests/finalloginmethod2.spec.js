//Login UI > fetch.json 
//test brow > inject .json to that browser

const {test,expect} = require('@playwright/test')
let webContext;


test.beforeAll(async ({browser})=>{

    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto("https://eventhub.rahulshettyacademy.com/login")
    await page.locator("#email").fill("Venkatesh@gm.co")
    await page.locator("#password").fill("Pass@123")
    await page.locator("[type='submit']").click()
    await expect(page.locator("#logout-btn")).toBeVisible()
    await expect(page).toHaveTitle("EventHub — Discover & Book Events")
    await context.storageState({path:'state.json'})
    webContext = await browser.newContext({storageState:'state.json'})

})

test("test1_login_using_sess",async ({})=>{

    
    const page= await webContext.newPage()
    await page.goto("https://eventhub.rahulshettyacademy.com/")
    const logout = page.locator("#logout-btn")
    const allevents = page.locator("h3[class*='font-semibold']")

    await expect(logout).toBeVisible()
    await expect(allevents.last()).toBeVisible()

    const eventCount = await allevents.count()
    console.log("Total Events Count: " + eventCount)
    const eventNames = await allevents.allTextContents()
    console.log("Event Names: " + eventNames)
})

test("test2", async ()=>{

    
    const page = await webContext.newPage()

    await page.goto("https://eventhub.rahulshettyacademy.com/")
    
    const logout = page.locator("#logout-btn")
    const apiPageLink = page.locator("div[class*='hidden'] a[href*='/api/docs']")
    await expect(logout).toBeVisible()

   const [page2] =await Promise.all([
        webContext.waitForEvent("page"),
        apiPageLink.click(),
    ])
    const textLoc = page2.locator("h3[id='operations-tag-Auth'] p")

    const page2text = await textLoc.textContent()
    console.log(page2text)


})