require('dotenv').config();
const express = require('express');
const braintree = require('braintree');
const path = require('path');

// Initialize express
const app = express();

// Parse JSON requests
app.use(express.json());

// Serve static public directory
app.use(express.static(path.join(__dirname, 'public')));

// Validate Braintree environment
if (!process.env.BRAINTREE_ENV || !(process.env.BRAINTREE_ENV in braintree.Environment)) {
  throw new Error(`Invalid BRAINTREE_ENV: ${process.env.BRAINTREE_ENV}`)
}

// Initialize Braintree Gateway
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment[process.env.BRAINTREE_ENV],
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY
});

// Generate a client token
app.get('/client_token', (req, res) => {
  gateway.clientToken.generate({
    customerId: undefined,
    merchantAccountId: undefined
  }, (err, response) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    return res.send(response.clientToken);
  });
});

// Settle transaction
app.post('/sale', (req, res) => {
  const { amount, nonce } = req.body;
  if (!(amount && nonce)) {
    return res.sendStatus(400);
  }
  gateway.transaction.sale({
    amount,
    paymentMethodNonce: nonce,
    // deviceData,
    options: {
      submitForSettlement: true
    }
  }, (err, result) => {
    if (err || !result.success) {
      return res.sendStatus(500);
    }
    // See result.transaction for details
    console.log(JSON.stringify(result.transaction, null, 2));
    return res.sendStatus(200);
  });
});

app.listen(3001, () => {
  console.log('Server started on http://localhost:3001');
});