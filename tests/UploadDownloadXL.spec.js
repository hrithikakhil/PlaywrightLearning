const {test, expect} = require('@playwright/test');
const ExcelManager = require('./Utils/ExcelManager');
const path = require('path');

test('Upload and Download Excel XL tests', async({page}) => {

    const searchText = "Mango";

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    
    // Download the file
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', {name: 'Download'}).click();
    const downloadfile = await downloadPromise;
    
    // Save to a specific location
    const filePath = path.join(__dirname, 'test-data', 'download.xlsx');
    await downloadfile.saveAs(filePath);
    
    // Modify the Excel file
    const excelManager = new ExcelManager(filePath);
    const changeObject = {rowChange: 0, colChange: 2, changeVal: "69"};
    await excelManager.updateCellRelative(searchText, changeObject, "Sheet1");
    
    // Upload the modified file
    await page.locator("#fileinput").setInputFiles(filePath);
    
    // Wait for upload to complete (add a small wait or check for upload indicator)
    //await page.waitForTimeout(1000);
    
    // Verification of upload
    const desiredRow = page.getByRole('row').filter({has: page.getByText(searchText)});
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(changeObject.changeVal.toString());

});