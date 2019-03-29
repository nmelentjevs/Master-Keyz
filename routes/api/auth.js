const express = require('express');
const router = express.Router();
const passport = require('passport');
const cors = require('cors');

router.use(cors());

router.get(
  '/google',
  passport.authenticate(
    'google',
    {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    },
    (req, res, next) => {
      res.json('Success');
    }
  )
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

module.exports = router;
