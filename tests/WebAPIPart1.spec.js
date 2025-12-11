const { test, expect, request } = require('@playwright/test');
const loginPayload = {userEmail: "testuser340@gmail.com", userPassword: "Testuser18$"};
const orderPayload = {orders: [{country: "India", productOrderedId: "68a961959320a140fe1ca57e"}]};

let token;
let orderId;
test.beforeAll("API Testing - Post request", async()=>{

    const apiContext = await request.newContext();
    const loginresponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: loginPayload
    });

    expect(loginresponse.ok()).toBeTruthy();
    const loginJsonResponse = await loginresponse.json();
    token = loginJsonResponse.token;
    console.log("Token is: "+ token);

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
        data: orderPayload,
        headers:{
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });
    const status = orderResponse.status();
    expect(status).toBe(201);
    const orderJsonResponse = await orderResponse.json();
    orderId = orderJsonResponse.orders[0];
    
});

test("API Test - Verify Login", async({page}) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");
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
})