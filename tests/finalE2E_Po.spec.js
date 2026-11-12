const {test,expect} = require('@playwright/test')
const {PoManager} = require('../Pageobjects/PoManager.js')
//dataset convert json > string > object
const dataset = JSON.parse(JSON.stringify(require('../utils/finalE2E_poTestdata.json')))
const paradata = JSON.parse(JSON.stringify(require('../utils/finalE2E_poParametrize.json')))
//from custom fixture
const {customdatatest} =require('../utils/fixData.js')

test('Fule2e_Po', async ({page})=>{


    const poManager = new PoManager(page)
    const loginPage = poManager.getLogin()
    const eventspage = poManager.getEvents()

    await loginPage.goto()
    await loginPage.LoginUser(dataset.email,dataset.password)
    await eventspage.bookEvent(dataset.event)
    
})

for(const data of paradata)
{    
test(`valid and invalid cred: ${data.email}`, async ({page})=>{

    const poManager = new PoManager(page)
    const loginPage = poManager.getLogin()

    await loginPage.goto()
    await loginPage.LoginUser(data.email,data.password)
    await expect(loginPage.logout).toBeVisible()

})
}

customdatatest.only('login_using_fix_data',async ({page,datasets})=>{

    const poManager = new PoManager(page)
    const loginPage = poManager.getLogin()

    await loginPage.goto()
    await loginPage.LoginUser(datasets.email,datasets.password)
    await expect(loginPage.logout).toBeVisible()


})