const{test,expect,request} = require('@playwright/test')
const LoginPayload = {email: "Venkatesh@gm.co", password: "Pass@123"}
const bookingPayload={customerName: "Venkate", customerEmail: "v28866@gm.co", customerPhone: "8999897878", quantity: 1,eventId: 285}
const{ApiUtils}=require('../utils/ApiUtils')

let response;

test.beforeAll( async ()=>{

    //Loginapi

    const apiContext = await request.newContext()
    const apiutils = new ApiUtils(apiContext, LoginPayload)
    response = await apiutils.createBooking(bookingPayload)

})

test("Fetch_Events", async ({ page }) => {

    await page.addInitScript(value=>{

        window.localStorage.setItem('eventhub_token',value);

    },response.token)

    await page.goto("https://eventhub.rahulshettyacademy.com/")
    // const email = page.locator("#email")
    // const password = page.locator("#password")
    // const submitButton = page.locator("[type='submit']")
    const logout = page.locator("#logout-btn")
    const allevents = page.locator("h3[class*='font-semibold']")

    // await email.fill("Venkatesh@gm.co")
    // await password.fill("Pass@123")
    // await submitButton.click()
    await expect(logout).toBeVisible()
    await expect(allevents.last()).toBeVisible()

    const eventCount = await allevents.count()
    console.log("Total Events Count: " + eventCount)
    const eventNames = await allevents.allTextContents()
    console.log("Eventbooked:"+response.bookingRefnum)
    console.log("Event Names: " + eventNames)

})