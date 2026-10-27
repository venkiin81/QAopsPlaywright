const {test, expect} = require('@playwright/test')

test ('First test', async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/")
    console.log(await page.title())

});

test('Second test', async ({page})=>{

    await page.goto("https://www.google.com/")
    console.log(await page.title())

    await expect(page).toHaveTitle("Google")
});

test ('third test ', async({browser})=>{

    const context =await browser.newContext();
    const page = await context.newPage();
    const Username = page.locator("input#username")
    const Password = page.locator("[type='password']")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await Username.fill("Rahhh")
    await Password.fill("Password")
    await page.locator("[type='submit']").click()
    console.log(await page.locator("[style*='block']").textContent())
    await expect(page.locator("[style*='block']")).toContainText("Incorrect")

    await Username.fill("")
    await Username.fill("rahulshettyacademy")
    
    await Password.fill("Learning@830$3mK2")
    await page.locator("[type='submit']").click()

     console.log(await page.locator(".card-title a").nth(1).textContent());
     console.log(await page.locator(".card-title a").first().textContent());

  //  await page.waitForLoadState("networkidle")
    const productLocator = page.locator(".card-title a").last()
    await productLocator.waitFor()
    const allItems = await page.locator(".card-title a").allTextContents();
    console.log(allItems)


} )

test ("Fourt_test", async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    //Static Drawdow
    const drawDownLocator = page.locator("select.form-control")
    await drawDownLocator.selectOption("Teacher")
    await expect(page.locator("[data-style='btn-info']")).toContainText("Teacher")
    

    //Radiobutton 
    const radioButton = page.locator(".checkmark")
    await radioButton.nth(1).check()
    await expect(radioButton.nth(1)).toBeChecked();

    //webpoup
    const popupOK = page.locator("#okayBtn")
    await popupOK.click();

    //uncheck
    await radioButton.first().check()
    await expect(radioButton.nth(1)).not.toBeChecked();

    await page.pause()
    //login 
    await page.locator("#username").fill("rahulshettyacademy")
    await page.locator("#password").fill("Learning@830$3mK2")
    await page.locator("#signInBtn").click()
    await page.locator("[href='/angularpractice']").click()

    
    //checkbox
    const checkBoxLoc = page.locator("#exampleCheck1")
    await checkBoxLoc.check()
    await expect(checkBoxLoc).toBeChecked()

    await checkBoxLoc.uncheck()
    await expect(checkBoxLoc).not.toBeChecked()
})

test.only ("hanndling new page", async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage()

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")

    await page.locator("#userEmail").fill("laster@gm.co.in")
    await page.locator("#userPassword").fill("Passer@123")
    await page.locator("[value='Login']").click()

    //blinking text
    await page.pause();
    const blinkLinkLoc = page.locator("[href*='https://techsmarthire']")

    await expect(blinkLinkLoc).toHaveAttribute('class','blinkingText')

    const[newPage] = await Promise.all
    ([
        context.waitForEvent("page"),
        blinkLinkLoc.click()
        
    ])
    console.log(await newPage.title());

})





