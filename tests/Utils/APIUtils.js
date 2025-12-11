class APIUtils{

    constructor(apiContext, loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken(){
        const loginresponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayload
        });
        const loginJsonResponse = await loginresponse.json();
        const token = loginJsonResponse.token;
        console.log("Token is: "+ token);
        return token;
    }


    async createOrder(orderPayload){
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
            data: orderPayload,
            headers:{
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        });
        const orderJsonResponse = await orderResponse.json();
        const orderId = orderJsonResponse.orders[0];
        response.orderId = orderId;
        return response;
    }
}

module.exports = {APIUtils};