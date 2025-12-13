//USe Case - Most of the banking applications have lot of key-value pairs to store user token/data in local storage
//Now login in the UI and store all the values in .json file
const { test, expect } = require('@playwright/test');
let webContext;

test.beforeAll(async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill("testuser340@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Testuser18$");
    await page.getByRole('Button', {name:'Login'}).click();
    await page.waitForLoadState('networkidle'); 
    await context.storageState({path: 'state.json'});
    //Create a new web context with same storage state
    webContext = await browser.newContext({storageState: 'state.json'});
});


test("Test with web storage state", async()=>{

    const newPage = await webContext.newPage();
    await newPage.goto("https://rahulshettyacademy.com/client");
    await newPage.locator(".card-body b").first().waitFor();
    await newPage.locator(".card-body").filter({hasText: 'ZARA COAT 3'}).getByRole("button", {name: "Add To Cart"}).click();
    await newPage.getByRole("listitem").getByRole("button", {name:"Cart"}).click();
    await expect(newPage.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();
    await newPage.getByRole("button", {name: "Checkout"}).click();
    await newPage.getByPlaceholder("Select Country").pressSequentially("ind", {delay:100});
    await newPage.getByRole("button", {name: "India"}).nth(1).click();    
    const email = "testuser340@gmail.com";
    await expect(newPage.locator(".user__name label")).toHaveText(email);
    const couponcode = "rahulshettyacademy";
    await newPage.locator("input[name$='coupon']").fill(couponcode);
    await newPage.getByRole("button", {name: "Apply Coupon"}).click();
    await expect(newPage.getByText("* Coupon Applied")).toHaveText("* Coupon Applied", {timeout:5000});
    await newPage.getByText("PLACE ORDER").click();
    

    await expect(newPage.getByText(" Thankyou for the order. ")).toBeVisible();
    const orderId = await newPage.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("Order ID is: "+ orderId);
});