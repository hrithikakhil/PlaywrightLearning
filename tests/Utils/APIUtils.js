class APIUtils{

    constructor(apiContext, loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken(){
        const loginresponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: loginPayload
        });
        const loginJsonResponse = await loginresponse.json();
        token = loginJsonResponse.token;
        console.log("Token is: "+ token);
        return token;
    }


    async createOrder(orderPayload){
        const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
            data: orderPayload,
            headers:{
                'Authorization': this.getToken(),
                'Content-Type': 'application/json'
            }
        });
        const orderJsonResponse = await orderResponse.json();
        orderId = orderJsonResponse.orders[0];
        return orderId;
    }
}

module.exports = {APIUtils};