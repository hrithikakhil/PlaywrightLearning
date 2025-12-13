const {test, expect} = require('@playwright/test');

test("Popup validation test", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'tests/screenshots/displayedTextBox.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'tests/screenshots/hideTextBox.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
});