//publishable key obtained from stripe dashboard
var stripe = Stripe('pk_test_51LrFM1K7lMXQ0gyzSENceccBnibTyqnOtGEwzs7bjx7m9Y6znXCvHYwUGdilwbH1BdWmCCVqDeoTCX8KsbMbzTub00Xjrt2Uru');
const addMessage = (message) => {

    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    document.querySelector('#messages').append(messageElement);
}
const routeParams = window.location.pathname.split('/');

const paymentMethod = routeParams[routeParams.length - 1];
const amount = routeParams[routeParams.length - 2];
const currency = routeParams[routeParams.length - 3];


var elements = stripe.elements();

var style = {
  base: {
    color: "#32325d",
    height: "40px",
    width: "50%",
    lineHeight: '1.429'
  }
};

var card = elements.create("card", { style: style });
card.mount('#card-element');
var form = document.getElementById('payment-form');
form.addEventListener('submit',  async (e) => {
  e.preventDefault()

//Here we fetch the client secret by sending amount, currency and payment method to the server
//The server will create a payment intent and return the client secret
//The client secret is used to confirm the payment
  const res = await  fetch('/create-payment-intent', {
    method: 'POST',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify({
        amount: amount,
        paymentMethod: [paymentMethod],
        currency: currency,
    })
})
//get input value of the customer. For this, it can be customizable,
//but for this example, we will use the name of the customer(We could add more information on what is needed)

const name = document.querySelector('#name').value
const email = document.querySelector('#email').value

const data = await res.json()
const clientSecret = data.clientSecret;
//Here we confirm the payment
//We pass the client secret and the payment method
//We also pass the billing

const paymentIntent = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
         card: card,
            billing_details: {
                name: name,
                email: email
            }
    }
}).then((result) => {
    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      // The kind of error that could occur and how to ensure its updated.
      // https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=elements#web-handle-errors
      console.log(result.error.message);

    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {

        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Webhook is setup for that.('/webhook')
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
    });

})

//

