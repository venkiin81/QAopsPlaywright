const{test,expect,request} = require('@playwright/test')
const LoginPayload = {email: "Venkatesh@gm.co", password: "Pass@123"}

test.beforeAll( async ()=>{

    const apiContext = await request.newContext()
   const LoginResponse = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
        {
            data : LoginPayload
        })
    expect(LoginResponse.ok()).toBeTruthy()

    const LoginResponseJson =LoginResponse.json()
    const token = LoginResponse.token;


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