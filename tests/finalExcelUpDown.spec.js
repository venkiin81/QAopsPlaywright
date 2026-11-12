const {test} = require ('@playwright/test')
//mkdir Exceljs
//cd exceljs
// npm init 
// npm i exceljs --savedev
//openfrom editor
const ExcelJs = require('exceljs')
const path = require('path')

async function excelTest()
{

    const workBook = new ExcelJs.Workbook()
    await workBook.xlsx.readFile("C:/Users/Venkatesh Prasad/Downloads/download.xlsx")
    const workSheet = workBook.getWorksheet("Sheet1")
    
    workSheet.eachRow((row,rowNumber)=>{

        row.eachCell((cell,colNumber)=>{

            console.log(cell.value)

        })

    })

}

async function WriteFile(SearchText,ReplaceText,change,Path)
{
    
    
    const workBook = new ExcelJs.Workbook()
    await workBook.xlsx.readFile(Path)
    const workSheet = workBook.getWorksheet("Sheet1")
    let outputCell=await readExcel(workSheet,SearchText)

    
    const cell = workSheet.getCell(outputCell.rowNum,outputCell.colNum+change.changecol)
    cell.value = ReplaceText
    await workBook.xlsx.writeFile(Path)

}

async function readExcel(workSheet,SearchText)
{
    let outputCell = {rowNum:-1,colNum:-1}
    workSheet.eachRow((row,rowNumber)=>{

        row.eachCell((cell,colNumber)=>{

            if(cell.value===SearchText)
            {
                outputCell.rowNum = rowNumber
                outputCell.colNum = colNumber
            }
        })
    })
    return outputCell
}

//update Mango price to 350 

//WriteFile("Mango",500,{changerow:0,changecol:2},"C:/Users/Venkatesh Prasad/Downloads/download.xlsx")

test('upload_download_Exceljs',async ({page}, testInfo)=>{

    await page.goto("https://rahulshettyacademy.com/upload-download-test/")
    const filePath = testInfo.outputPath('download.xlsx');
    const downloadPromise = page.waitForEvent('download')
    await page.getByRole("button",{name:"Download"}).click() 
    const download = await downloadPromise
    await download.saveAs(filePath)
    await WriteFile("Mango",500,{changerow:0,changecol:2},filePath)
    await page.locator("#fileinput").setInputFiles(filePath)


})

test.only ("only upload", async ({page})=>{

 await page.goto("https://rahulshettyacademy.com/upload-download-test/")
 await page.locator("#fileinput").setInputFiles("C:/Users/Venkatesh Prasad/Downloads/download.xlsx")


})