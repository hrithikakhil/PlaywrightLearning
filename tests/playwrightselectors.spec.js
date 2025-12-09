const {test, expect} = require('@playwright/test');

test("Playwright special selectors - getByLabgel", async({page}) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");

})

test("Playwright special selectors - getByPlaceholder", async({page}) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");


    await page.getByPlaceholder("Password").fill("Testing123");
    await page.getByRole("button", {name: "Submit"}).click();
    await page.getByText("Success! The Form has been submitted successfully!").isVisible();
    await page.getByRole("link", {name: "Shop"}).click();

    //Filter the locator

    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button", {name: "Add"}).click();
    //or
    //await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click(); //Here we can skip name if there is only one button
})