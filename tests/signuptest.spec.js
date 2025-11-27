const {test, expect} = require('@playwright/test');

test("Sign up test of ecommerce page", async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await page.locator('a:has-text("Register here")').click();

    const registertitle = await page.locator('h1:has-text("Register")').textContent();
    console.log(registertitle);

    const firstName = page.locator('#firstName');
    const lastName = page.locator('#lastName');
    const userEmail = page.locator('#userEmail');
    const userMobile = page.locator('#userMobile');
    const gender = page.locator("//input[@value='Male']");
    const password = page.locator('#userPassword');
    const confirmPassword = page.locator("#confirmPassword");
    const checkbox = page.locator("input[type='checkbox']");

    const loginBtn = page.locator('#login');

    await firstName.fill("Test");
    await lastName.fill("User");
    await userEmail.fill("testuser344@gmail.com");
    await userMobile.fill("1234095678");
    await gender.click();
    await password.fill("Testuser18$");
    await confirmPassword.fill("Testuser18$");
    await checkbox.click();
    await loginBtn.click();

    await expect(page.locator(':text("Account Created Successfully")')).toContainText("Account Created Successfully");

    await page.locator(':text-is("Login")').click();
    await page.locator('#userEmail').fill("testuser340@gmail.com");
    await page.locator('#userPassword').fill("Testuser18$");
    await page.locator('#login').click();

});

test.only("Just Login Scenario", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('#userEmail').fill("testuser340@gmail.com");
    await page.locator('#userPassword').fill("Testuser18$");
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle'); //Important feature of Playwright, what this will do is wait untill all the network calls are made
    //Alternate to the above wait is waitfor, butr waitfor waits only for one element
    await page.locator(".card-body b").waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
})