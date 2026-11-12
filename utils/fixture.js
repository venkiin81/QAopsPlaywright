const base = require("@playwright/test")
const {request} = require('@playwright/test')
const {ApiUtils} = require('./ApiUtils.js')

const LoginPayload = {email: "Venkatesh@gm.co", password: "Pass@123"}
const bookingPayload={customerName: "Venkate", customerEmail: "v28866@gm.co", customerPhone: "8999897878", quantity: 1,eventId: 285}

exports.customTest = base.test.extend({
    Loggedin_Page: async ({browser},use)=>{
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto("https://eventhub.rahulshettyacademy.com/login")
    await page.locator("#email").fill("Venkatesh@gm.co")
    await page.locator("#password").fill("Pass@123")
    await page.locator("[type='submit']").click()
    await use(page)
    //testrdaown => Closing of the comtext after all 
    await context.close()
    },
    CreateOrder: async ({},use)=>{

    const apiContext = await request.newContext()
    const apiutils = new ApiUtils(apiContext, LoginPayload)
    const response = await apiutils.createBooking(bookingPayload)
    await use(response)
    //tear down for api => Closing of the comtext after all
    await apiContext.dispose()

    },
    TestDataForORder: {
        DataName: "Venki"
    }

}

)