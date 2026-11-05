const {test,request} = require('@playwright/test')

const LoginPayload = {email: "Venkatesh@gm.co", password: "Pass@123"}
let fakeBody = {
    success: true,
    data: [],
    pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
    }
}
let token

test.beforeAll(async ()=>{

    const apiContext = await request.newContext()
    const Loginrespose= await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
        {data: LoginPayload}
    )
    
    const loginResponseJson = await Loginrespose.json()
    token = loginResponseJson.token

})

test('Network_interption', async ({browser})=>{

    const context = await browser.newContext()
    const page = await context.newPage()
    page.addInitScript(value=>{
        window.localStorage.setItem('eventhub_token',value)
    },token)

    await page.goto("https://eventhub.rahulshettyacademy.com/bookings")

    await page.route("https://api.eventhub.rahulshettyacademy.com/api/bookings?page=1&limit=10",
      async  route =>{

        const response = await page.request.fetch(route.request())
        let body = JSON.stringify(fakeBody)
        route.fulfill(
            {
                response,
                body
            }
        )

        }
    )
    await page.locator("#nav-bookings").click()
    //await page.waitForResponse("https://api.eventhub.rahulshettyacademy.com/api/bookings*")

    console.log(await page.locator("h3[class*='text-lg']").textContent())


})

test.only("networkInterption_continue", async({page})=>{

    await page.addInitScript(value=>{
         window.localStorage.setItem('eventhub_token',value)
    },token)
    await page.goto("https://eventhub.rahulshettyacademy.com/")
    await page.route("https://eventhub.rahulshettyacademy.com/bookings/*",
        route => route.continue({
            url:"https://eventhub.rahulshettyacademy.com/bookings/49026"
        })
    )
    await page.locator("#nav-bookings").click()
    await page.waitForResponse("https://api.eventhub.rahulshettyacademy.com/api/bookings?page=1&limit=10")
    await page.locator("button[type='button']").first().click()
    await page.pause()



})