const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../../models/User');

// Paypal
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Origin',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

router.post('/success', (req, res) => {
  const errors = {};
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(200).json({ errors });
      }
      res.json({ msg: 'Thank you. Payment Successful' });
    })
    .catch(err => res.status(404).json(err));
});

router.post('/cancel', (req, res) => {
  res.send('Cancelled');
});

router.post('/error', (req, res) => {
  res.send('Error');
});

module.exports = router;
