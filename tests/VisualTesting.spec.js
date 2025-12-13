const {test, expect} = require('@playwright/test');

test("Visual Testing", async({page})=>{
    await page.goto("https://www.flightaware.com/");
    expect(await page.screenshot()).toMatchSnapshot('flightawareHomePage.png');
});