console.log('Hello, World!');
var stripe = Stripe('pk_test_51LrFM1K7lMXQ0gyzSENceccBnibTyqnOtGEwzs7bjx7m9Y6znXCvHYwUGdilwbH1BdWmCCVqDeoTCX8KsbMbzTub00Xjrt2Uru');


console.log(stripe);

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

console.log('submit');

  const res = await  fetch('/create-payment-intent', {
    method: 'POST',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify({
        amount: 1000,
        paymentMethod: ['card'],
        currency: 'usd',
    })
})
const data = await res.json()
console.log(data);
const clientSecret = data.clientSecret;
const {paymentIntent, error} = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
         card: card,
            billing_details: {
                name: 'Hello world test',
            }
    }
})
})

