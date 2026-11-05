class ApiUtils{

    constructor(apiContext,LoginPayload)
    {
        this.apiContext = apiContext
        this.LoginPayload = LoginPayload
    }

   async getToken()
    {
        
           const LoginResponse = await this.apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
                {
                    data : this.LoginPayload
                })
           // expect(LoginResponse.ok()).toBeTruthy()
        
            const LoginResponseJson =await LoginResponse.json()
           const token = LoginResponseJson.token;
            console.log(token)
            return token
    }

    async createBooking(bookingPayload)
    {
        let response = {}
        response.token = await this.getToken()
        const orderResponse=await this.apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/bookings",
    {
        data:bookingPayload,
        headers:{
            Authorization: `Bearer ${response.token}`,
            "content-type":"application/json"

        },

    })
  //  expect(orderResponse.ok()).toBeTruthy()
    const orderjson = await orderResponse.json()
    const bookingRefnum = orderjson.data.bookingRef
    response.bookingRefnum = bookingRefnum
    console.log(bookingRefnum)
    return response
    }

}
module.exports = {ApiUtils};