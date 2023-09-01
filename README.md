# PayPal Testing Project

This project demonstrates how to integrate PayPal payments using Braintree SDK in an Express.js application. It provides a complete flow for processing PayPal payments, including generating client tokens, handling PayPal events, and settling transactions.

The goal of this repo is to provide an end-to-end flow that can be used as a reference when integrating PayPal payments into our payment infrastructure. It serves as a practical example, demonstrating key components and interactions required for a successful integration.


## Environment Variables

Create a `.env` file in the root directory and include the following variables:

```
BRAINTREE_ENV=<Environment>
MERCHANT_ID=<Merchant ID>
PUBLIC_KEY=<Public Key>
PRIVATE_KEY=<Private Key>
```

## Client-side

The client-side code (`public/index.html`) initializes Braintree and PayPal Checkout, rendering a PayPal button. It handles various PayPal events like creating an order, shipping changes, approval, cancellation, and errors. Upon approval, it sends a request to the server to settle the transaction.

## Server-side

The server-side code (`app.js`) sets up an Express server, initializes Braintree Gateway, and provides endpoints to generate a client token and settle transactions. It validates the Braintree environment and handles the sale endpoint.

### How to Run

1. Install the required dependencies:
   ```bash
   npm install express braintree dotenv
   ```
2. Start the server:
   ```bash
   node app.js
   ```
3. Open `http://localhost:3001` in your browser to access the client-side application.

### Note

Replace the Braintree credentials in the `.env` file with your own sandbox or production credentials.

## TODO

- [client] How to customize button? I see some documentation for the v2 SDK, but not v3.
- [client] Venmo button and capture - different endpoints needed?
- [server] How to query for transaction (if even needed)?
- [server] How to cancel a settled transaction?
- [server] How to refund a settled transaction?
