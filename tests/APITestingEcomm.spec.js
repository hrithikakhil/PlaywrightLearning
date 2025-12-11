const { test, expect, request } = require('@playwright/test');
const {APIUtils} = require('./Utils/APIUtils');
const loginPayload = {userEmail: "testuser340@gmail.com", userPassword: "Testuser18$"};
const orderPayload = {orders: [{country: "India", productOrderedId: "68a961959320a140fe1ca57e"}]};

let response;

test.beforeAll("API Testing - Post request", async()=>{

    const apiContext = await request.newContext();
    const apiutils = new APIUtils(apiContext, loginPayload);
    response = await apiutils.createOrder(orderPayload);
    
});


test("API Test - Verify Login", async({page}) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink$='/dashboard/myorders']").click();

    await page.locator("tbody").waitFor();

    const totalrows = await page.locator("tbody tr").count();
    for(let i=0; i<totalrows; i++){
        const rowOrderID = await page.locator("tbody tr th").nth(i).textContent();
        if(response.orderId.includes(rowOrderID)){
            await page.locator("tbody tr td button:has-text('View')").nth(i).click();
            break;
        }
    }

    await page.pause();
    const orderIdOnSummaryPage = await page.locator(".col-text.-main").textContent();
    expect(response.orderId.includes(orderIdOnSummaryPage)).toBeTruthy();
}) 