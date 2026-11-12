const {expect} = require('@playwright/test')
class Login
{

    constructor(page)
    {
        this.page = page
        this.email = page.locator("#email")
        this.password = page.locator("#password")
        this.submit = page.locator("[type='submit']")
        this.logout = page.locator("#logout-btn")
    }

    async goto()
    {
       await this.page.goto("https://eventhub.rahulshettyacademy.com/login")
    }

    async LoginUser(email,password)
    {
        await this.email.fill(email)
        await this.password.fill(password)
        await this.submit.click()
        
        await expect(this.page).toHaveTitle("EventHub — Discover & Book Events")
    }


}

module.exports = {Login}