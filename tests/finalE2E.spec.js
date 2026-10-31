const { test, expect } = require('@playwright/test')

test("Login", async ({ browser }) => {

    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto("https://eventhub.rahulshettyacademy.com/login")
    await page.locator("#email").fill("Venkatesh@gm.co")
    await page.locator("#password").fill("Pass@123")
    await page.locator("[type='submit']").click()
    await expect(page.locator("#logout-btn")).toBeVisible()
    await expect(page).toHaveTitle("EventHub — Discover & Book Events")

})

test('Invalid_Creds_1', async ({ page }) => {

    await page.goto("https://eventhub.rahulshettyacademy.com/login")
    await page.locator("#email").fill("Venkat")
    await page.locator("#password").fill("Pass3")
    await page.locator("[type='submit']").click()
    const errormessgae1 = await page.locator("[class *='mt-1 ']").first().textContent()
    const errormessage2 = await page.locator("[class *='mt-1 ']").last().textContent()
    console.log(errormessgae1)
    console.log(errormessage2)

})

test("Invalid_cred", async ({ page }) => {

    await page.goto("https://eventhub.rahulshettyacademy.com/login")
    await page.locator("#email").fill("test@gm.co")
    await page.locator("#password").fill("Pass1234")
    await page.locator("[type='submit']").click()

    await expect(page.locator("body > div:nth-child(2)")).toBeVisible()
    const errormessage = await page.locator("body > div:nth-child(2)").textContent()
    console.log(errormessage)

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

test("Dropdow", async ({page})=>{

    await page.goto("https://eventhub.rahulshettyacademy.com/login")
    const email = page.locator("#email")
    const password = page.locator("#password")
    const submitButton = page.locator("[type='submit']")
    const logout = page.locator("#logout-btn")
    const Events = page.locator("#nav-events")
    const Eventlist = page.locator("h3[class*='font-semibold']") 

    const catagoriesOptions = page.locator("select[class*='w-full']").first()
    
    await email.fill("Venkatesh@gm.co")
    await password.fill("Pass@123")
    await submitButton.click()
    await expect(logout).toBeVisible()
    await page.pause()
    await Events.click()

    await catagoriesOptions.selectOption("Concert")
    await expect(Eventlist.first()).toBeVisible()
    const count = await Eventlist.count()
    if (count > 0) {
        const eventNames = await Eventlist.allTextContents()
        console.log("Event Names for Concert Category: " + eventNames)
    }

})

test("child_window", async ({browser})=>{

    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto("https://eventhub.rahulshettyacademy.com/login")
    const email = page.locator("#email")
    const password = page.locator("#password")
    const submitButton = page.locator("[type='submit']")
    const logout = page.locator("#logout-btn")
    const apiPageLink = page.locator("div[class*='hidden'] a[href*='/api/docs']")

    await email.fill("Venkatesh@gm.co")
    await password.fill("Pass@123")
    await submitButton.click()
    await expect(logout).toBeVisible()

   const [page2] =await Promise.all([
        context.waitForEvent("page"),
        apiPageLink.click(),
    ])
    const textLoc = page2.locator("h3[id='operations-tag-Auth'] p")

    const page2text = await textLoc.textContent()
    console.log(page2text)


})


test("Allevnets_bookone", async ({browser})=>{

    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://eventhub.rahulshettyacademy.com/login")
    const email = page.locator("#email")
    const password = page.locator("#password")
    const submitButton = page.locator("[type='submit']")
    const logout = page.locator("#logout-btn")
    const Events = page.locator("#nav-events")
    const listOfEvents = page.locator("a[href*='/events/'] h3")

    await email.fill("Venkatesh@gm.co")
    await password.fill("Pass@123")
    await submitButton.click()
    await expect(logout).toBeVisible()
    await Events.click()
    await expect(listOfEvents.last()).toBeVisible()
    const count = await listOfEvents.count()
    

    for(let i=0;i<count;i++)
    {
       let eventName =await listOfEvents.nth(i).textContent()
       if (eventName.includes("Monsoon"))
       {
           await page.locator("#book-now-btn").nth(i).click()
           const eventText = await page.locator(".text-gray-900.truncate").textContent()
           console.log(eventText)
           break
       }

    }

    //Booking 

    const increaseButton = page.getByRole("button",{name:'+'})
    const fullName = page.getByPlaceholder("Your full name")
    const emailOnForm =  page.getByPlaceholder('you@email.com')
    const phoneNumber = page.getByRole('textbox', { name: 'Phone Number*' })
    const confirmButton = page.getByRole('button', { name: 'Confirm Booking' })

    await increaseButton.click()
    await fullName.fill("Venkatesh")
    await emailOnForm.fill("venkates@gm.co")
    await phoneNumber.fill("8787909878")

    //price validation 
    const perTicketPrice = await page.locator("span[class*='text-2xl']").textContent()
    const ticketCount = await page.locator("#ticket-count").textContent()
    const totalCost = await page.locator("span[class='text-indigo-700']").textContent()
    console.log(perTicketPrice)
    console.log(ticketCount)
    console.log(totalCost)

    await confirmButton.click()

    const Bookdetail = page.locator("[class*='text-xl']")
    const textdet = await Bookdetail.textContent()
    console.log(textdet)
    

    const EachTicketPriceint = parseInt(perTicketPrice.replace(/[^0-9.-]/g,""))
    const tickectCountint = parseInt(ticketCount)
    const totalcostint = parseInt(totalCost.replace(/[^0-9.-]/g,""))

    console.log(EachTicketPriceint)
    console.log(tickectCountint)
    console.log(totalcostint)

    if (totalcostint == EachTicketPriceint*tickectCountint)
    {
        console.log("total Match")
    }

})


test('Auto_suggestion', async ({page})=>{

    await page.goto("https://mssit3.lntsufin.com/")

    const searchLoc = page.locator("[name='searchid']")
    const suggestionsList = page.locator("li[class*='buyesearchlist']")
    const dropdowOption = page.locator("[id='suggestion-box']")

    await searchLoc.pressSequentially("Safety",{delay:100})
    const numberOfSuggestion=await suggestionsList.count()
    await expect(suggestionsList.last()).toBeVisible()
   // console.log(numberOfSuggestion)

    const suggestions = await suggestionsList.allInnerTexts()
   // console.log(suggestions)
    const targetText = "Safety Shoes"
    for(let i=0;i<numberOfSuggestion;i++)
    {
        const suggestion = suggestionsList.nth(i)
      //  console.log(suggestion)
        const text = (await suggestion.innerText()).trim();
        //console.log(text)
                 if (text === targetText) {
                            await suggestion.click();
                           // clicked = true;
                            break;
                         }
 
    }


})


test("Auto_suggestion_2",async ({page})=>{

    await page.goto("https://www.booking.com/index.en-gb.html?label=en-in-booking-mobile-PzCtZSeq_K7p82LvC_GUtQSM652796016639%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-334108349%3Alp9062055%3Ali%3Adem%3Adm&gclid=CjwKCAjwgJHXBhBGEiwAHohJqx60F0tvZb6PHVqKgJCvRLTqjUlWXLy0qjKaPU1Zmyq4BGl19MQpXBoCxMkQAvD_BwE&aid=2311236&ws=&gad_source=1&gad_campaignid=19655505510&gbraid=0AAAAAD_Ls1Jg_K5CXfMNNQ8Z-mbpTms_T")

    const EnterDestination = page.locator("[placeholder='Where are you going?']")
    const suggestionBox = page.locator("[data-testid='autocomplete-results']")
    const suggestions = page.locator("[data-testid='autocomplete-results'] li div[class*='b08850ce41']")
    
    const popup = page.getByRole('button', { name: 'Dismiss sign in information.' })

    await expect(popup).toBeVisible()
    await popup.click()

    await EnterDestination.pressSequentially("Thailand",{delay:100})
    await expect(suggestionBox).toBeVisible()
    const count=await suggestions.count()
    console.log("Suggestions count: "+count)
    await expect(suggestions.last()).toBeVisible()

    for(let i=0; i<count; i++)
    {
        const suggestiontext = await suggestions.nth(i).innerText()
        console.log(suggestiontext)
    }

})

test.only("Searchforref_Id_Complete_booking", async ({browser})=>{

    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://eventhub.rahulshettyacademy.com/login")
    const email = page.locator("#email")
    const password = page.locator("#password")
    const submitButton = page.locator("[type='submit']")
    const logout = page.locator("#logout-btn")
    const Events = page.locator("#nav-events")
    const listOfEvents = page.locator("a[href*='/events/'] h3")

    await email.fill("Venkatesh@gm.co")
    await password.fill("Pass@123")
    await submitButton.click()
    await expect(logout).toBeVisible()
    await Events.click()
    await expect(listOfEvents.last()).toBeVisible()
    const count = await listOfEvents.count()

    for(let i=0;i<count;i++)
    {
       let eventName =await listOfEvents.nth(i).textContent()
       if (eventName.includes("Monsoon"))
       {
           await page.locator("#book-now-btn").nth(i).click()
           const eventText = await page.locator(".text-gray-900.truncate").textContent()
           console.log(eventText)
           break
       }

    }

    //Booking 

    const increaseButton = page.getByRole("button",{name:'+'})
    const fullName = page.getByPlaceholder("Your full name")
    const emailOnForm =  page.getByPlaceholder('you@email.com')
    const phoneNumber = page.getByRole('textbox', { name: 'Phone Number*' })
    const confirmButton = page.getByRole('button', { name: 'Confirm Booking' })
    const referNumber = page.locator("span[class*='booking-ref']")
    const BookingsButton = page.getByRole('button', {name:'View My Bookings'})
    const bookingList = page.locator("[id='booking-card'] span[class*='booking-ref']")

    await increaseButton.click()
    await fullName.fill("Venkatesh")
    await emailOnForm.fill("venkates@gm.co")
    await phoneNumber.fill("8787909878")
    await confirmButton.click()
    const refreceNum = await referNumber.textContent()
    console.log(refreceNum)
    await BookingsButton.click()
    await expect(bookingList.last()).toBeVisible()
    const bookingCount = await bookingList.count()
    for(let i=0;i<bookingCount;i++)
    {
        let allbookiRefs = await bookingList.nth(i).innerText()
        console.log(allbookiRefs)

    }


     //[id="booking-card"] span[class*='booking-ref']


})

