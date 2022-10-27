## Stripe Payment Integration.

This is a simple example of how to integrate stripe payment gateway in your website.

### Prequisites

STRIPE_SECRET_KEY 

STRIPE_PUBLISHABLE_KEY

ENDPOINT_SECRET


Get them on [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
and add them in the `/PaymentController/PyamentController.kt` file.
```kotlin
const val STRIPE_API_KEY  = ""
const val STRIPE_WEBHOOK_SECRET = ""
```

Publishable key is used in frontend, find
`/resources/static/clientWithRouteParameters.js` and add your publishable key there.
```javascript
const PUBLIC_KEY = "
```

### How to run
Build the project using gradle and run the jar file.
```bash
./gradlew build
gradle bootRun
```
### using ngrok
see docs [here](https://ngrok.com/docs/integrations/webhooks/stripe)
### Using stripe to see events
You can use stripe to see events. You can use the following command to see events

```bash
stripe listen --forward-to localhost:8080/payment/webhook
```
This will listen to events and forward them to the endpoint `/webhook` in the backend.
### How to run
- Clone the repo
- Build the project
- Run the project
###USE THIS!!
- Go to `http://localhost:8080/payment/usd/1000/card` to see the form with route parameters

Once here use cards [stripe testing cards](https://stripe.com/docs/testing)

### How to use
There exists files in the `com.example.payment` package. 
The main focus should be based on how one chooses to implement.

#### When using **Routing** parameters
Files to focus on are:
- `com.example.payment.controller.PaymentController`
- `/templates/paymentWithRouteParams.html`
- `/static/clientWithRouteParams.js`
```
@Controller
class PaymentController3 {
//    eg /payment/usd/1000/card

    @GetMapping("/payment/{currency}/{amount}/{paymentMethod}")
    fun payment(@PathVariable currency: String, @PathVariable amount: Int, @PathVariable paymentMethod: String, model: Model): String {
        return "paymentWithRouteParams"
    }
}

```
This returns a view called `paymentWithRouteParams` which is a form that has the following fields

 - Name
 - Email
- Card Number
- Expiry Date
- CVC
- Zip Code

Once the HTML is loaded, the `payment.js` file is loaded which has the following code

```javascript
const routeParams = window.location.pathname.split('/');

const paymentMethod = routeParams[routeParams.length - 1];
const amount = routeParams[routeParams.length - 2];
const currency = routeParams[routeParams.length - 3];
```
This assumes that the route parameters occur on the end of the path and that a payment link is created in the backend.

It is important to note that "Stripe always works in a currency's smallest unit. For example, to charge $10.00, you would specify an amount of 1000 (i.e., 1000 cents)."

The following series of processes will occur for both items
- The form is submitted
- The client will call the `createPaymentIntent` endpoint which will create a payment intent and return the client secret
- The client will call the function `stripe.confirmCardPayment`(**For card payment**) which will confirm the payment and return a response
- The response maybe an error  or a success and the client will handle the response(This is depending on how you need to handle the responses. You can redirect to a success page or a failure page)

For Each event, stripe will send an object to the backend. There are many events as per the docs. The following are the events that are handled in this example

- `payment_intent.succeeded` - This is sent when the payment is successful
- `payment_intent.payment_failed` - This is sent when the payment fails
- `payment_intent.canceled` - This is sent when the payment is canceled
- `payment_intent.created` - This is sent when the payment intent is created
- `payment_intent.processing` - This is sent when the payment is being processed

For this and adding more check the file `PaymentController` in the `com.example.payment` package. 
You will determine how to handle this in your backend.

#### When using **Form** parameters
Files to focus on are:
- `com.example.payment.controller.PaymentController`
- `/templates/payment.html`
- `/static/client.js`

This is similar to the above but the difference is that the parameters are sent as form parameters.
Form parameters, meaning we serve the user a form with the following fields

 - Name
 - Email
 - Card Number
 - Expiry Date
 - CVC
 - Zip Code
 - Currency
 - Amount
 - Payment Method
 - Description
 - Metadata
 - Receipt Email
 and More.

This is not a likely usage but I considered it in this demo, but everything was hardcoded.
### using ngrok
see docs [here](https://ngrok.com/docs/integrations/webhooks/stripe)
### Using stripe to see events
You can use stripe to see events. You can use the following command to see events

```bash
stripe listen --forward-to localhost:8080/payment/webhook
```
This will listen to events and forward them to the endpoint `/webhook` in the backend.
### How to run
- Clone the repo
- Build the project
- Run the project
###USE THIS!!
- Go to `http://localhost:8080/payment/usd/1000/card` to see the form with route parameters

### How to test
- No tests

### How to contribute
- No contributions

### How to report bugs
- No bugs

