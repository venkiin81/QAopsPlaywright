const {test,expect,request} = require('@playwright/test')


const loginPayload = {userEmail:"laster@gm.co.in",userPassword:"Passer@123"}
const orderPayload = {orders:[{country:"Malawi",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
let tokeen;
let apiContext;
let orderId;

test.beforeAll( async ()=>{

    apiContext = await request.newContext()

    const loginResponse =await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
                            {data:loginPayload})
    const loginJson = await loginResponse.json();
    await expect(loginResponse.ok()).toBeTruthy()
    tokeen = loginJson.token
    console.log(tokeen)

})

test.beforeEach(async ()=>{

    const orderResponse =await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data:orderPayload,
        headers:
        {
            'Authorization':tokeen,
            'content-type':'application/json'
        },
    }
   )
   await expect(orderResponse).toBeOK()

   const orderinfo = await orderResponse.json();
    orderId = orderinfo.orders

   console.log(orderId)


})

test("AddSkuApi", async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage()

   await console.log(" in add sku")
   await page.addInitScript(value =>{
        window.localStorage.setItem('token',value)
    },tokeen)

   await page.goto("https://rahulshettyacademy.com/client/")

   const orderLoc = page.locator("button[routerlink*='/myorders']")
    await orderLoc.click()

   const orderlistLoc = page.locator("tbody tr")
    await orderlistLoc.last().waitFor()
    const orderCount = await orderlistLoc.count()

    for(let i=0; i<orderCount; i++)
    {
        const orderOnOrders=await orderlistLoc.locator("th").nth(i).textContent()
        if(orderId.includes(orderOnOrders))
        {
            await orderlistLoc.nth(i).locator(".btn-primary").click()
            break;
        }
    }

    const orderIdOnSummary = page.locator(".col-text")
    await orderIdOnSummary.waitFor()
    const textOrder = await orderIdOnSummary.textContent()
    await expect(orderId.includes(textOrder)).toBeTruthy()
    

})