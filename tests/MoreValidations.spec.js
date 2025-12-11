const {test, expect} = require('@playwright/test');

test("Popup validation test", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("http://www.gogole.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
});

test("Alert popup handling and mouse hover", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    page.on('dialog', dialog => dialog.accept());
    //page.on - first attribute is event name, second is callback function
    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();
});

test("Frames handling", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("a[href*='all-access']").first().click();
    const totalSubscribers = await framesPage.locator(".text-center .text-2xl").nth(0).textContent();
    console.log("Total Subscribers are: "+ totalSubscribers);
});