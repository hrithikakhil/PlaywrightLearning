const { test, expect, request } = require('@playwright/test');
const loginPayload = {userEmail: "testuser340@gmail.com", userPassword: "Testuser18$"};
const orderPayload = {orders: [{country: "India", productOrderedId: "68a961959320a140fe1ca57e"}]};
const noOrdersPayload = {data:[], message:"No Orders"};

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

test("Place Order", async({page}) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");

    //API Intercept
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", route=>{

        //intercepting the response - API response -> Mocking/Hijacking -> Sending custom response to the browser
        const actualResposne = page.request.fetch(route.request());
        let body = JSON.stringify(noOrdersPayload);
        route.fulfill(
            {
                actualResposne,
                body,
            },
        )

    });
    await page.locator("button[routerlink$='/dashboard/myorders']").click();
    const noOrdersMessage = await page.locator('div.mt-4').textContent();
    console.log(noOrdersMessage);
})