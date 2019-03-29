const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Items = require('../../models/Items');

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

module.exports = router;
