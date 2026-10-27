const{test,expect} = require('@playwright/test')

test("e2e", async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")

    //Login 
    const userName =  page.locator("#userEmail")
    const passWord =  page.locator("#userPassword")
    const LoginCTA =  page.locator("#login")

    await userName.fill("laster@gm.co.in")   
    await passWord.fill("Passer@123") 
    await LoginCTA.click()

   // add SKU to cart
    const HomeLink = page.locator("button[routerlink='/dashboard/']")
    const skuS = page.locator(".card-body")
    await expect(HomeLink).toBeVisible()

    await page.locator(".card-body").last().waitFor()
    const countSkus =await skuS.count()
    console.log(countSkus)

   const skuToClick = "ZARA COAT 3"

    for(let i=0 ; i<countSkus; ++i)
    {
        if(await skuS.nth(i).locator("b").textContent()==skuToClick)
        {
            await skuS.nth(i).locator("text= Add To Cart").click()
            break;
        }
    }

    
    // go to cart 
    const cartLink = page.locator("[routerlink='/dashboard/cart']")
    const cartSkus = page.locator(".cart")
    const skuTaken = page.locator(".cart h3")

    await cartLink.click()
    await expect(cartSkus).toBeVisible()
    const bool = await page.locator(".cart h3",{hastext:("ZARA COAT 3")}).isVisible()
    await expect(bool).toBeTruthy()

    await page.locator("text=checkout").click()

    //Place order
    

    const nameLoc = page.locator("[class*= 'user__name'] [type='text']")
    const countryLoc = page.locator("[placeholder*='Country']")
    const searchResult = page.locator(".ta-results")
    const nameOn = await nameLoc.first().textContent()

    await expect(nameOn).toContain("laster@gm.co.in")
    await countryLoc.pressSequentially("ind",{delay:125})

    await expect(searchResult).toBeVisible()

    const countof = await searchResult.locator("button").count()
    console.log(countof)
    
    for(let i=0 ; i<countof; i++)
    {   
        const textTaken = await searchResult.locator("button").nth(i).textContent()
       
        if(textTaken===" India")
        {
            await searchResult.locator("button").nth(i).click()
            break;
        }
        
    }

    //filling form 
    
    const formLoc = page.locator(".form__cc .input")
    const ExptriDate = page.locator(".form__cc .ddl")
     await formLoc.nth(0).fill("")
     await formLoc.nth(0).fill("89898989898") 

    const year =  ExptriDate.first()
    await year.selectOption("10")

    const date = ExptriDate.last()
     await date.selectOption("22")

     await formLoc.nth(3).fill("1234")
     await formLoc.nth(4).fill("Venki")
     
     await page.locator("a.btnn").click()

     // order submitted 
     const thankyouLoc = await page.locator(".hero-primary")

     await thankyouLoc.waitFor()
     await expect(thankyouLoc).toContainText("Thankyou ")
     await page.pause()

     const orderId =await page.locator("label.ng-star-inserted").textContent()
    console.log(orderId)

    const orderLoc = page.locator("label[routerlink*='/myorders']")

    await orderLoc.click()

    //  orders page 

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