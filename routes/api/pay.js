const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const paypal = require('paypal-rest-sdk');

const keys = require('../../config/keys');
// Paypal

paypal.configure({
  mode: 'sandbox',
  client_id: keys.paypalClientID,
  client_secret: keys.paypalClientSecret
});

const Items = require('../../models/Items');

router.post('/', (req, res) => {
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: 'http://localhost:5000/pay/success',
      cancel_url: 'http://localhost:5000/pay/cancel'
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: 'item',
              sku: 'item',
              price: '25.00',
              currency: 'GBP',
              quantity: 1
            }
          ]
        },
        amount: {
          currency: 'GBP',
          total: '25.00'
        },
        description: 'This is the payment description.'
      }
    ]
  };
  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

router.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: 'GBP',
          total: '25.00'
        }
      }
    ]
  };

  paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
    if (error) throw error;
    else {
      res.json({
        paid: true,
        email: payment.payer.payer_info.email
      });
    }
  });
});

router.get('/cancel', (req, res) => {
  res.send('Cancelled');
});

module.exports = router;
