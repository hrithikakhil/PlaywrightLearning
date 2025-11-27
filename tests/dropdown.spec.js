const {test, expect} = require('@playwright/test');

test('UI Controls', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signInBtn = page.locator("#signInBtn");
    const dropdown = page.locator('select.form-control');
    const userRadio = page.locator(".radiotextsty").last();
    const terms = page.locator("#terms");

    //Login by entering username and password
    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await dropdown.selectOption("Consultant")
    await userRadio.click();
    await page.locator("#okayBtn").click();
    //Check whether radiobtn is checked or not
    const result = await userRadio.isChecked();
    await expect(userRadio).toBeChecked(); //Action performed outside brackets, hence await is outside
    //await is inside because you're waiting for the value first, then asserting
    console.log(result);

    //check the terms of use checkbox
    await terms.click();
    await expect(terms).toBeChecked();

    //Uncheck the checkbox
    await terms.uncheck();
    expect(await terms.isChecked()).toBeFalsy(); //Action performed inside brackets hence await is inside
    //await is outside because the entire expect() is async and retryable
    await signInBtn.click();
})
