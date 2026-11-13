const {test,expect} = require('@playwright/test')
const {PoManager} = require('../Pageobjects/PoManager.js')
//dataset convert json > string > object
const dataset = JSON.parse(JSON.stringify(require('../utils/finalE2E_poTestdata.json')))
const paradata = JSON.parse(JSON.stringify(require('../utils/finalE2E_poParametrize.json')))
//from custom fixture
const {customdatatest} =require('../utils/fixData.js')

//to make the each test run paralley 
//test.describe.configure({mode:"parallel"})
//to make the test series and if one fail it skips next etsts 
//test.describe.configure({mode:"serial"})

//taging test using grep @web 
//command npx playwright test tests/finalE2E_Po.spec.js --grep "@web"
// to find list of test tagged 
//npx playwright test tests/finalE2E_Po.spec.js --grep "@web" --list

/**
 * describe or wrap the tests to run in parallel and series 
 * test.describe('name'()={
 * test.describe.configure({mode:parallel/series})
 * test('test1'async({page})=>{----})
 * test('test1'async({page})=>{----})
 * })
 */
test(`@web Fule2e_Po`, async ({page})=>{


    const poManager = new PoManager(page)
    const loginPage = poManager.getLogin()
    const eventspage = poManager.getEvents()

    await loginPage.goto()
    await loginPage.LoginUser(dataset.email,dataset.password)
    await eventspage.bookEvent(dataset.event)
    
})

for(const data of paradata)
{    
test(`@web valid and invalid cred: ${data.email}`, async ({page})=>{

    const poManager = new PoManager(page)
    const loginPage = poManager.getLogin()

    await loginPage.goto()
    await loginPage.LoginUser(data.email,data.password)
    await expect(loginPage.logout).toBeVisible()

})
}

customdatatest('login_using_fix_data',async ({page,datasets})=>{

    const poManager = new PoManager(page)
    const loginPage = poManager.getLogin()

    await loginPage.goto()
    await loginPage.LoginUser(datasets.email,datasets.password)
    await expect(loginPage.logout).toBeVisible()

})