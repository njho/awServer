var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const SSL_MERCHANT_ID = process.env.SSL_MERCHANT_ID;
const SSL_PIN = process.env.SSL_PIN;
const SSL_USER_ID = process.env.SSL_USER_ID;

console.log('These are the environment variables: ' + process.env);
console.log(SSL_MERCHANT_ID);
console.log(SSL_PIN);
console.log(SSL_USER_ID);

router.post('/requestToken', async (req, res, next) => {
  const url = 'https://demo.convergepay.com/hosted-payments/transaction_token';

  const { amount } = req.params;

  const body = {
    ssl_merchant_id: SSL_MERCHANT_ID,
    ssl_pin: SSL_PIN,
    ssl_transaction_type: 'CCGETTOKEN',
    ssl_amount: amount,
    ssl_user_id: SSL_USER_ID,
    amount
  };

  let token = '';

  try {
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    token = await result.text();
  } catch (e) {
    console.log('wtf');
    console.log(e);
  }

  res.send(JSON.stringify({ token }));
});

module.exports = router;
