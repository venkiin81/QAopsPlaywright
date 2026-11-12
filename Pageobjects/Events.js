const {expect} = require('@playwright/test')
class Events
{

    constructor(page)
    {
        this.page = page
        this.Events = page.locator("#nav-events")
        this.listOfEvents = page.locator("a[href*='/events/'] h3")

        this.increaseButton = page.getByRole("button",{name:'+'})
        this.fullName = page.getByPlaceholder("Your full name")
        this.emailOnForm =  page.getByPlaceholder('you@email.com')
        this.phoneNumber = page.getByRole('textbox', { name: 'Phone Number*' })
        this.confirmButton = page.getByRole('button', { name: 'Confirm Booking' })
        this.referNumber = page.locator("span[class*='booking-ref']")
        this.BookingsButton = page.getByRole('button', {name:'View My Bookings'})
        this.bookingList = page.locator("[id='booking-card'] span[class*='booking-ref']")

    }

    async bookEvent(EvenText)
    {
        await this.Events.click()
        await expect(this.listOfEvents.last()).toBeVisible({timeout: 10_000})
        const count = await this.listOfEvents.count()

    for(let i=0;i<count;i++)
    {
       let eventName =await this.listOfEvents.nth(i).textContent()
       if (eventName.includes(EvenText))
       {
           await this.page.locator("#book-now-btn").nth(i).click()
           const eventText = await this.page.locator(".text-gray-900.truncate").textContent()
           console.log(eventText)
           break
       }

    }

    await this.increaseButton.click()
    await this.fullName.fill("Venkatesh")
    await this.emailOnForm.fill("venkates@gm.co")
    await this.phoneNumber.fill("8787909878")
    await this.confirmButton.click()
    const refreceNum = await this.referNumber.textContent()
    console.log(refreceNum)

    }

}

module.exports = {Events}