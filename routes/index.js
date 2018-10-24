const KeyPublishable = 'pk_test_m6I0kJDsBE424BstJumYnNeX';
const KeySecret = 'sk_test_ynGOnGrRCipeWHnSw5zBsV2n';
var stripe = require('stripe')(KeySecret);
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Stripe post route
// POST http://localhost:3000/charge
router.post("/charge", function(req, res) {
 
  let amount = 5*100; // 500 cents means $5 

  // create a customer 
  stripe.customers.create({
      email: req.body.stripeEmail, // customer email, which user need to enter while making payment
      source: req.body.stripeToken // token for the given card 
  })
  .then(customer =>
      stripe.charges.create({ // charge the customer
      amount,
      description: "Sample Charge",
          currency: "usd",
          customer: customer.id
      }))
  .then(charge => res.render("charge")); // render the charge view: views/charge.pug

});

module.exports = router;
