const { Given, When, Then } = require('@cucumber/cucumber')
const {PoManager} = require('../../Pageobjects/PoManager.js')
const {chromium,expect} = require('@playwright/test')

//overide timeout 

Given('login to Eventhub with {string} and {string}',{timeout:10000}, async function (username, password) {

    const browser = await chromium.launch({ headless: false })
    const context = await browser.newContext()
    this.page = await context.newPage()
    const poManager = new PoManager(this.page)
    const loginPage = poManager.getLogin()
    //const eventspage = poManager.getEvents()

    await loginPage.goto()
    await loginPage.LoginUser(username,password)
});

When('land on the home screen',async function () {

    await expect(this.page).toHaveTitle("EventHub — Discover & Book Events")
});

Then('check is the logged in user is of {string}',async function (usermail) {
  
    const email =await this.page.locator("#user-email-display")
    const text = await email.innerText()
    console.log(text)
    if(text===usermail)
    {
        console.log("logged in correctly")
    }
    await this.page.close()
});

