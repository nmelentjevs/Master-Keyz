const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Items = require('../../models/Items');
const User = require('../../models/User');

router.get('/all', (req, res) => {
  const errors = {};
  Items.find()
    .then(items => {
      if (!items) {
        errors.items = 'There are no items matching';
        res.json(404).json(errors);
      }
      res.json(items);
    })
    .catch(err => res.status(404).json({ items: 'There are no item' }));
});

router.get('/:email', (req, res) => {
  const errors = {};
  const itemsData = [];
  User.find({ email: req.params.email })
    .then(user => {
      if (!user) {
        errors.user = 'User not found';
        res.json(404).json(errors);
      }
      user[0].items.forEach(item => {
        itemsData.unshift(item);
      });
      res.json(itemsData);
    })
    .catch(err => res.status(404).json({ items: 'There are no items' }));
});

router.post('/add', (req, res) => {
  const errors = {};

  User.findOne({ email: req.body.user.email })
    .then(user => {
      if (!user) {
        return res.status(400).json({ errors });
      }
      req.body.basket.forEach(item => {
        user.items.unshift({ item });
      });
      user
        .save()
        .then(user => res.json(user))
        .catch(err => res.json(err));
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
