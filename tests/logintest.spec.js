const {test, expect} = require ('@playwright/test');

test('Global fixture (browser) in Playwright Test', async({browser}) =>{
    
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signInBtn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");


    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await signInBtn.click();
    
    const firstproduct = await cardTitles.nth(0).textContent();
    console.log(firstproduct);

    const alltitles = await cardTitles.allTextContents();
    console.log(alltitles)

});