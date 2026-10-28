import {test,expect} from '@playwright/test';

test("Login",async ({browser})=>{

    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto("https://eventhub.rahulshettyacademy.com/login")

    await page.locator("#email").fill("Venkatesh@gm.co")
    await page.locator("#password").fill("Pass@123")
    await page.locator("[type='submit']").click()
    await expect(page.locator("#logout-btn")).toBeVisible()
    await expect(page).toHaveTitle("EventHub — Discover & Book Events")

})