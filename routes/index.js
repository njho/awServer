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
/* GET home page. */
router.get('/requestToken', function(req, res, next) {
  const body = {
    ssl_merchant_id: SSL_MERCHANT_ID,
    ssl_pin: SSL_PIN,
    ssl_transaction_type: 'CCSALE',
    ssl_amount: '14.00',
    ssl_user_id: SSL_USER_ID
  };

  fetch('https://demo.convergepay.com/hosted-payments/transaction_token', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => {
      console.log(res);
      return res.text();
      // console.log(res.text());
    })
    .then(res => {
      console.log(res);

      var response = {
        statusCode: 200,
        headers: {},
        body: res,
        isBase64Encoded: false
      };
      cb(null, response);
    });
});

module.exports = router;
