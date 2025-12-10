const {test, expect} = require('@playwright/test'); 

test("End to End test of ecommerce page", async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill("testuser340@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Testuser18$");
    await page.getByRole('Button', {name:'Login'}).click();
    await page.waitForLoadState('networkidle'); 
    await page.locator(".card-body b").first().waitFor();

    await page.locator(".card-body").filter({hasText: 'ZARA COAT 3'}).getByRole("button", {name: "Add To Cart"}).click();
    
    await page.getByRole("listitem").getByRole("button", {name:"Cart"}).click();
    await expect(page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();
    
    await page.getByRole("button", {name: "Checkout"}).click();

    await page.getByPlaceholder("Select Country").pressSequentially("ind", {delay:100});
    await page.getByRole("button", {name: "India"}).nth(1).click();    
    const email = "testuser340@gmail.com";
    await expect(page.locator(".user__name label")).toHaveText(email);


    const couponcode = "rahulshettyacademy";
    await page.locator("input[name$='coupon']").fill(couponcode);
    await page.getByRole("button", {name: "Apply Coupon"}).click();
    await expect(page.getByText("* Coupon Applied")).toHaveText("* Coupon Applied", {timeout:5000});
    await page.getByText("PLACE ORDER").click();
    

    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("Order ID is: "+ orderId);
    
    await page.locator("button[routerlink$='/dashboard/myorders']").click();

    await page.locator("tbody").waitFor();

    const totalrows = await page.locator("tbody tr").count();
    for(let i=0; i<totalrows; i++){
        const rowOrderID = await page.locator("tbody tr th").nth(i).textContent();
        if(orderId.includes(rowOrderID)){
            await page.locator("tbody tr td button:has-text('View')").nth(i).click();
            break;
        }
    }

    await page.pause();
    const orderIdOnSummaryPage = await page.locator(".col-text.-main").textContent();
    expect(orderId.includes(orderIdOnSummaryPage)).toBeTruthy();
});