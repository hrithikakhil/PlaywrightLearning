const {test, expect} = require('@playwright/test'); 

test("End to End test of ecommerce page", async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('#userEmail').fill("testuser340@gmail.com");
    await page.locator('#userPassword').fill("Testuser18$");
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle'); 

    const products = page.locator(".card-body");
    // await page.locator(".card-body b").first().waitFor();
    const prodCount = await products.count();
    for(let i=0; i<prodCount; i++){
        const currentprodName = await products.nth(i).locator("b").textContent();
        if(currentprodName === "ZARA COAT 3"){
            await products.nth(i).locator("text = Add To Cart").click();
            break;
        }
    }
    // await page.pause();

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const isvisiblebool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(isvisiblebool).toBeTruthy();
    console.log("Product is visible in cart"+ isvisiblebool);
    
    await page.locator("button[type$='button']").last().click();

    await page.locator("input[placeholder$='Select Country']").pressSequentially("ind", {delay:100});
    const alloptions = page.locator(".ta-results");
    await alloptions.waitFor();
    const alloptioncount = await alloptions.locator("button").count();

    for(let i=-0; i<alloptioncount; i++){
        const optiontext = await alloptions.locator("button").nth(i).textContent();
        if(optiontext === " India"){
            await alloptions.locator("button").nth(i).click();
            break;
        }
    }
    const email = "testuser340@gmail.com";
    await expect(page.locator(".user__name label")).toHaveText(email);
    const couponcode = "rahulshettyacademy";
    await page.locator("input[name$='coupon']").fill(couponcode);
    await page.locator('button:has-text("Apply Coupon")').click();
    await expect(page.locator("div p:has-text('* Coupon Applied')")).toHaveText("* Coupon Applied", {timeout:5000});
    await page.locator(".action__submit").click();

    const orderconfirmation = await page.locator(".hero-primary").textContent();
    expect(orderconfirmation).toBe(" Thankyou for the order. ");

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