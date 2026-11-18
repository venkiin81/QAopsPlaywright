const {PoManager} = require('../../Pageobjects/PoManager.js')
const {chromium,expect} = require('@playwright/test')
const {Before, After, BeforeStep, AfterStep, Status} = require('@cucumber/cucumber')

Before(async function () {

    console.log("before exwecuted")
    const browser = await chromium.launch({ headless: false })
    const context = await browser.newContext()
    this.page = await context.newPage()
    this.poManager = new PoManager(this.page)
  
})

BeforeStep( function(){

    console.log("before step exwecuted")

})

AfterStep(async function({result}){

    console.log("After step exwecuted")
    if (result.status === Status.FAILED)
    {
        await this.page.screenshot({path:"screenhot1.png"})
    }
})


After(async function () {
    console.log("After exwecuted")
  // Assuming this.driver is a selenium webdriver
  await this.page.close()
})

